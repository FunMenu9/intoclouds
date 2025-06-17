#!/bin/bash

echo "🔧 Исправление деплоя IntoClouds"
echo "==============================="

# Проверяем текущее состояние
echo "📊 Проверка текущего состояния..."
echo "PM2 процессы:"
pm2 status

echo ""
echo "Nginx статус:"
sudo systemctl status nginx --no-pager

echo ""
echo "Порты:"
sudo netstat -tlnp | grep -E ':(80|443|3000|1337)'

# Остановка всех процессов
echo ""
echo "🛑 Остановка процессов..."
pm2 stop all
pm2 delete all

# Переход в директорию проекта
cd /var/www/intoclouds

# Проверка структуры проекта
echo ""
echo "📁 Структура проекта:"
ls -la

# Установка зависимостей
echo ""
echo "📦 Переустановка зависимостей..."
rm -rf node_modules package-lock.json
npm install

# Создание правильного .env.local
echo ""
echo "🔧 Создание .env.local..."
cat > .env.local << 'EOF'
# SMTP Configuration
SMTP_HOST=mail.intoclouds.io
SMTP_PORT=465
SMTP_USER=dev@intoclouds.io
SMTP_PASS=K1dw1d123@
SMTP_FROM=dev@intoclouds.io

# Production Settings
NODE_ENV=production
PORT=3000
EOF

# Сборка проекта
echo ""
echo "🔨 Сборка проекта..."
npm run build

# Проверка сборки
if [ -d ".next" ]; then
    echo "✅ Сборка успешна"
else
    echo "❌ Ошибка сборки"
    exit 1
fi

# Запуск через PM2
echo ""
echo "🚀 Запуск через PM2..."
pm2 start ecosystem.config.js

# Проверка запуска
sleep 5
pm2 status

echo ""
echo "🌐 Проверка локального запуска..."
curl -I http://localhost:3000

echo ""
echo "✅ Деплой исправлен!"
echo "Проверьте сайт: http://$(curl -s ifconfig.me)"
