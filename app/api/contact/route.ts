import { type NextRequest, NextResponse } from "next/server"
import { submitContactForm } from "@/lib/strapi"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message, language = "en" } = body

    // Валидация данных
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Все поля обязательны для заполнения" }, { status: 400 })
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Неверный формат email" }, { status: 400 })
    }

    // Отправка в Strapi
    try {
      await submitContactForm({
        name,
        email,
        message,
        language,
      })
    } catch (strapiError) {
      console.error("Strapi submission error:", strapiError)
      // Продолжаем выполнение, даже если Strapi недоступен
    }

    // Отправка email (существующий код)
    const nodemailer = require("nodemailer")

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "mail.intoclouds.io",
      port: Number.parseInt(process.env.SMTP_PORT || "465"),
      secure: true,
      auth: {
        user: process.env.SMTP_USER || "dev@intoclouds.io",
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.SMTP_FROM || "dev@intoclouds.io",
      to: "dev@intoclouds.io",
      subject: `Новое сообщение от ${name} - IntoClouds`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #00ffff, #9333ea); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">IntoClouds</h1>
            <p style="color: white; margin: 5px 0;">Новое сообщение с сайта</p>
          </div>
          
          <div style="padding: 20px; background: #f8f9fa;">
            <h2 style="color: #333; border-bottom: 2px solid #00ffff; padding-bottom: 10px;">
              Детали сообщения
            </h2>
            
            <div style="margin: 15px 0;">
              <strong style="color: #555;">Имя:</strong>
              <span style="margin-left: 10px;">${name}</span>
            </div>
            
            <div style="margin: 15px 0;">
              <strong style="color: #555;">Email:</strong>
              <span style="margin-left: 10px;">
                <a href="mailto:${email}" style="color: #00ffff;">${email}</a>
              </span>
            </div>
            
            <div style="margin: 15px 0;">
              <strong style="color: #555;">Язык:</strong>
              <span style="margin-left: 10px;">${language.toUpperCase()}</span>
            </div>
            
            <div style="margin: 15px 0;">
              <strong style="color: #555;">Дата:</strong>
              <span style="margin-left: 10px;">${new Date().toLocaleString("ru-RU")}</span>
            </div>
            
            <div style="margin: 20px 0;">
              <strong style="color: #555;">Сообщение:</strong>
              <div style="background: white; padding: 15px; border-left: 4px solid #00ffff; margin-top: 10px; white-space: pre-wrap;">${message}</div>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background: #e9ecef; border-radius: 5px;">
              <small style="color: #666;">
                <strong>IP:</strong> ${request.headers.get("x-forwarded-for") || "unknown"}<br>
                <strong>User Agent:</strong> ${request.headers.get("user-agent") || "unknown"}
              </small>
            </div>
          </div>
          
          <div style="background: #333; color: white; padding: 15px; text-align: center;">
            <p style="margin: 0;">© 2024 IntoClouds Moldova SRL</p>
          </div>
        </div>
      `,
    })

    // Пример с отправкой в Telegram (нужно создать бота и получить токен)
    /*
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID
    
    if (telegramBotToken && telegramChatId) {
      const telegramMessage = `
🚀 *Новое сообщение с IntoClouds*

👤 *Имя:* ${name}
📧 *Email:* ${email}
💬 *Сообщение:*
${message}
      `
      
      await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: telegramMessage,
          parse_mode: 'Markdown',
        }),
      })
    }
    */

    // Сохранение в базу данных (пример с простым JSON файлом)
    // В продакшене лучше использовать настоящую БД
    const fs = require("fs").promises
    const path = require("path")

    try {
      const dataDir = path.join(process.cwd(), "data")
      const filePath = path.join(dataDir, "contacts.json")

      // Создаем директорию если её нет
      try {
        await fs.access(dataDir)
      } catch {
        await fs.mkdir(dataDir, { recursive: true })
      }

      // Читаем существующие данные
      let contacts = []
      try {
        const data = await fs.readFile(filePath, "utf8")
        contacts = JSON.parse(data)
      } catch {
        // Файл не существует, создаем новый массив
      }

      // Добавляем новое сообщение
      const newContact = {
        id: Date.now(),
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
        ip: request.headers.get("x-forwarded-for") || "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
      }

      contacts.push(newContact)

      // Сохраняем обновленные данные
      await fs.writeFile(filePath, JSON.stringify(contacts, null, 2))
    } catch (error) {
      console.error("Ошибка сохранения в файл:", error)
    }

    // Логирование для отладки
    console.log("Получено новое сообщение:", {
      name,
      email,
      message: message.substring(0, 100) + "...",
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        success: true,
        message: "Сообщение успешно отправлено! Мы свяжемся с вами в течение 24 часов.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Ошибка API contact:", error)
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}
