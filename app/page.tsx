"use client"

import React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import {
  Cloud,
  Server,
  MessageCircle,
  ChevronDown,
  Menu,
  X,
  Globe,
  Award,
  Cpu,
  Rocket,
  Eye,
  ArrowUp,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

// Enhanced translation system with complete translations
const translations = {
  en: {
    // Navigation
    navPlatforms: "PLATFORMS",
    navServices: "SERVICES",
    navProcess: "PROCESS",
    navContact: "CONTACT",

    // Hero Section
    heroTitle: "NEXT-GEN CLOUD MIGRATION",
    heroSubtitle: "TRANSFORM YOUR INFRASTRUCTURE",
    heroDescription:
      "We are certified cloud architects specializing in seamless on-premise to cloud migration. Zero downtime guaranteed, up to 50% cost reduction, 24/7 expert support.",
    heroButton: "START FREE ASSESSMENT",
    heroStats: {
      projects: "50+ Projects",
      uptime: "99.9% Uptime",
      savings: "40% Avg Savings",
      support: "24/7 Support",
    },

    // Sections
    platformsTitle: "CLOUD PLATFORMS",
    platformsSubtitle: "WE ARE CERTIFIED EXPERTS IN LEADING CLOUD PLATFORMS WITH DEEP KNOWLEDGE AND EXPERIENCE.",
    servicesTitle: "OUR SERVICES",
    servicesSubtitle: "WE SPECIALIZE IN CLOUD MIGRATION, BUT READY TO SOLVE ANY TECHNICAL CHALLENGE.",
    contactTitle: "GET IN TOUCH",
    processTitle: "OUR PROCESS",
    processSubtitle: "OUR PROVEN 4-STEP METHODOLOGY ENSURES SUCCESSFUL CLOUD TRANSFORMATION.",

    // Platform descriptions
    awsDescription:
      "Certified Solutions Architect. Expertise in EC2, Lambda, RDS, S3, CloudFormation and other AWS services.",
    azureDescription:
      "Specialists in Azure DevOps, App Services, Virtual Machines, Azure SQL and Microsoft cloud architecture.",
    gcpDescription:
      "Experience with Compute Engine, Kubernetes Engine, BigQuery, Cloud Functions and machine learning in GCP.",

    // Service descriptions
    migrationTitle: "ON-PREMISE TO CLOUD MIGRATION",
    migrationDescription:
      "Complete migration of physical servers, local data centers and legacy systems to AWS, Azure or Google Cloud with zero downtime guarantee.",
    optimizationTitle: "OPTIMIZATION & MODERNIZATION",
    optimizationDescription:
      "Transform monolithic applications to microservices, cost optimization and implementation of modern DevOps practices.",
    securityTitle: "SECURITY & COMPLIANCE",
    securityDescription:
      "Enterprise security implementation, GDPR, HIPAA, SOC2 compliance with automated CI/CD pipelines.",
    developmentTitle: "CLOUD-NATIVE DEVELOPMENT",
    developmentDescription:
      "Building modern web applications from scratch or refactoring existing ones for cloud architecture using serverless technologies.",

    // Process steps
    assessmentTitle: "ASSESSMENT & ANALYSIS",
    assessmentDescription: "Deep dive into your current infrastructure, applications, and business requirements.",
    strategyTitle: "STRATEGY & PLANNING",
    strategyDescription: "Create detailed migration roadmap with timeline, costs, and risk mitigation strategies.",
    migrationExecTitle: "MIGRATION EXECUTION",
    migrationExecDescription: "Seamless migration with zero downtime using proven methodologies and automation.",
    supportTitle: "OPTIMIZATION & SUPPORT",
    supportDescription: "Post-migration optimization, monitoring, and 24/7 ongoing support services.",

    // Contact
    contactHeroTitle: "ESTABLISH CONNECTION",
    contactHeroSubtitle: "READY TO START YOUR DIGITAL TRANSFORMATION? INITIATE CONTACT PROTOCOL FOR FREE CONSULTATION.",
    mainTerminal: "MAIN TERMINAL",
    headquarters: "CHIȘINĂU HEADQUARTERS",
    voiceComm: "VOICE COMM",
    dataLink: "DATA LINK",
    transmitMessage: "TRANSMIT MESSAGE",
    uploadData: "UPLOAD PROJECT DATA - RESPONSE WITHIN 24 HOURS",
    nameLabel: "NAME *",
    emailLabel: "EMAIL *",
    messageLabel: "MESSAGE PAYLOAD *",
    namePlaceholder: "YOUR DESIGNATION",
    emailPlaceholder: "your@domain.net",
    messagePlaceholder: "DESCRIBE PROJECT PARAMETERS, CURRENT INFRASTRUCTURE STATUS, AND MISSION OBJECTIVES...",
    transmitButton: "TRANSMIT MESSAGE",
    transmitting: "TRANSMITTING...",
    messageTransmitted: "MESSAGE TRANSMITTED!",
    acknowledgment: "ACKNOWLEDGMENT RECEIVED. RESPONSE WITHIN 24 HOURS.",
    dataProcessing: "BY TRANSMITTING DATA, YOU AGREE TO PROCESSING PROTOCOLS",

    // Form validation
    nameRequired: "Name is required",
    emailRequired: "Email is required",
    emailInvalid: "Invalid email format",
    messageRequired: "Message is required",
    sendError: "Error sending message. Please try again.",

    // Trust indicators
    trustTitle: "TRUSTED BY INDUSTRY LEADERS",
    certifications: ["AWS Certified", "Azure Expert", "GCP Professional", "ISO 27001"],
  },
  ru: {
    // Navigation
    navPlatforms: "ПЛАТФОРМЫ",
    navServices: "УСЛУГИ",
    navProcess: "ПРОЦЕСС",
    navContact: "КОНТАКТ",

    heroTitle: "МИГРАЦИЯ В ОБЛАКО НОВОГО ПОКОЛЕНИЯ",
    heroSubtitle: "ТРАНСФОРМИРУЙТЕ ИНФРАСТРУКТУРУ",
    heroDescription:
      "Мы сертифицированные облачные архитекторы, специализирующиеся на бесшовной миграции из on-premise в облако. Гарантия нулевого простоя, экономия до 50%, поддержка 24/7.",
    heroButton: "НАЧАТЬ БЕСПЛАТНУЮ ОЦЕНКУ",
    heroStats: {
      projects: "50+ Проектов",
      uptime: "99.9% Аптайм",
      savings: "40% Экономии",
      support: "24/7 Поддержка",
    },

    platformsTitle: "ОБЛАЧНЫЕ ПЛАТФОРМЫ",
    platformsSubtitle: "МЫ СЕРТИФИЦИРОВАННЫЕ ЭКСПЕРТЫ В ВЕДУЩИХ ОБЛАЧНЫХ ПЛАТФОРМАХ С ГЛУБОКИМИ ЗНАНИЯМИ И ОПЫТОМ.",
    servicesTitle: "НАШИ УСЛУГИ",
    servicesSubtitle: "МЫ СПЕЦИАЛИЗИРУЕМСЯ НА МИГРАЦИИ В ОБЛАКО, НО ГОТОВЫ РЕШИТЬ ЛЮБУЮ ТЕХНИЧЕСКУЮ ЗАДАЧУ.",
    contactTitle: "СВЯЗАТЬСЯ С НАМИ",
    processTitle: "НАШ ПРОЦЕСС",
    processSubtitle: "НАША ПРОВЕРЕННАЯ 4-ЭТАПНАЯ МЕТОДОЛОГИЯ ОБЕСПЕЧИВАЕТ УСПЕШНУЮ ТРАНСФОРМАЦИЮ В ОБЛАКО.",

    awsDescription:
      "Сертифицированный архитектор решений. Экспертиза в EC2, Lambda, RDS, S3, CloudFormation и других сервисах AWS.",
    azureDescription:
      "Специалисты по Azure DevOps, App Services, виртуальным машинам, Azure SQL и облачной архитектуре Microsoft.",
    gcpDescription:
      "Опыт работы с Compute Engine, Kubernetes Engine, BigQuery, Cloud Functions и машинным обучением в GCP.",

    migrationTitle: "МИГРАЦИЯ ИЗ ON-PREMISE В ОБЛАКО",
    migrationDescription:
      "Полная миграция физических серверов, локальных дата-центров и устаревших систем в AWS, Azure или Google Cloud с гарантией нулевого простоя.",
    optimizationTitle: "ОПТИМИЗАЦИЯ И МОДЕРНИЗАЦИЯ",
    optimizationDescription:
      "Трансформация монолитных приложений в микросервисы, оптимизация затрат и внедрение современных DevOps практик.",
    securityTitle: "БЕЗОПАСНОСТЬ И СООТВЕТСТВИЕ",
    securityDescription:
      "Внедрение корпоративной безопасности, соответствие GDPR, HIPAA, SOC2 с автоматизированными CI/CD пайплайнами.",
    developmentTitle: "CLOUD-NATIVE РАЗРАБОТКА",
    developmentDescription:
      "Создание современных веб-приложений с нуля или рефакторинг существующих для облачной архитектуры с использованием serverless технологий.",

    assessmentTitle: "ОЦЕНКА И АНАЛИЗ",
    assessmentDescription: "Глубокое погружение в вашу текущую инфраструктуру, приложения и бизнес-требования.",
    strategyTitle: "СТРАТЕГИЯ И ПЛАНИРОВАНИЕ",
    strategyDescription:
      "Создание детального плана миграции с временными рамками, затратами и стратегиями снижения рисков.",
    migrationExecTitle: "ВЫПОЛНЕНИЕ МИГРАЦИИ",
    migrationExecDescription:
      "Бесшовная миграция без простоев с использованием проверенных методологий и автоматизации.",
    supportTitle: "ОПТИМИЗАЦИЯ И ПОДДЕРЖКА",
    supportDescription: "Пост-миграционная оптимизация, мониторинг и круглосуточная поддержка.",

    contactHeroTitle: "УСТАНОВИТЬ СОЕДИНЕНИЕ",
    contactHeroSubtitle:
      "ГОТОВЫ НАЧАТЬ ЦИФРОВУЮ ТРАНСФОРМАЦИЮ? ИНИЦИИРУЙТЕ ПРОТОКОЛ СВЯЗИ ДЛЯ БЕСПЛАТНОЙ КОНСУЛЬТАЦИИ.",
    mainTerminal: "ГЛАВНЫЙ ТЕРМИНАЛ",
    headquarters: "ШТАБ-КВАРТИРА В КИШИНЕВЕ",
    voiceComm: "ГОЛОСОВАЯ СВЯЗЬ",
    dataLink: "КАНАЛ ДАННЫХ",
    transmitMessage: "ПЕРЕДАТЬ СООБЩЕНИЕ",
    uploadData: "ЗАГРУЗИТЬ ДАННЫЕ ПРОЕКТА - ОТВЕТ В ТЕЧЕНИЕ 24 ЧАСОВ",
    nameLabel: "ИМЯ *",
    emailLabel: "EMAIL *",
    messageLabel: "ПОЛЕЗНАЯ НАГРУЗКА СООБЩЕНИЯ *",
    namePlaceholder: "ВАШЕ ОБОЗНАЧЕНИЕ",
    emailPlaceholder: "ваш@домен.net",
    messagePlaceholder: "ОПИШИТЕ ПАРАМЕТРЫ ПРОЕКТА, ТЕКУЩЕЕ СОСТОЯНИЕ ИНФРАСТРУКТУРЫ И ЦЕЛИ МИССИИ...",
    transmitButton: "ПЕРЕДАТЬ СООБЩЕНИЕ",
    transmitting: "ПЕРЕДАЧА...",
    messageTransmitted: "СООБЩЕНИЕ ПЕРЕДАНО!",
    acknowledgment: "ПОДТВЕРЖДЕНИЕ ПОЛУЧЕНО. ОТВЕТ В ТЕЧЕНИЕ 24 ЧАСОВ.",
    dataProcessing: "ПЕРЕДАВАЯ ДАННЫЕ, ВЫ СОГЛАШАЕТЕСЬ С ПРОТОКОЛАМИ ОБРАБОТКИ",

    nameRequired: "Имя обязательно",
    emailRequired: "Email обязателен",
    emailInvalid: "Неверный формат email",
    messageRequired: "Сообщение обязательно",
    sendError: "Ошибка отправки сообщения. Попробуйте снова.",

    trustTitle: "НАМ ДОВЕРЯЮТ ЛИДЕРЫ ИНДУСТРИИ",
    certifications: ["AWS Сертифицированы", "Azure Эксперты", "GCP Профессионалы", "ISO 27001"],
  },
}

// Enhanced analytics and tracking
const useAnalytics = () => {
  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    if (typeof window !== "undefined") {
      console.log("Analytics Event:", eventName, properties)
    }
  }, [])

  return { trackEvent }
}

// Animated Background Component
const AnimatedBackground: React.FC = React.memo(() => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="fixed inset-0 -z-10 bg-black" />
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "50px 50px"],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: "0 0 10px #00ffff",
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2 + (i % 3),
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-transparent to-black/70" />
    </div>
  )
})

AnimatedBackground.displayName = "AnimatedBackground"

// Glitch Text Component
const GlitchText: React.FC<{
  children: React.ReactNode
  className?: string
}> = React.memo(({ children, className = "" }) => {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 200)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative ${className}`}>
      <div
        className={`${isGlitching ? "animate-pulse" : ""} transition-all duration-100`}
        style={{
          textShadow: isGlitching
            ? "2px 0 #ff0000, -2px 0 #00ffff, 0 0 10px #ff00ff"
            : "0 0 10px rgba(0, 255, 255, 0.5)",
        }}
      >
        {children}
      </div>
      {isGlitching && (
        <>
          <div className="absolute inset-0 text-red-500 opacity-70" style={{ transform: "translate(2px, 0)" }}>
            {children}
          </div>
          <div className="absolute inset-0 text-cyan-400 opacity-70" style={{ transform: "translate(-2px, 0)" }}>
            {children}
          </div>
        </>
      )}
    </div>
  )
})

GlitchText.displayName = "GlitchText"

// Cyberpunk Button Component
const CyberButton: React.FC<{
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "default" | "lg"
  disabled?: boolean
  loading?: boolean
  type?: "button" | "submit" | "reset"
}> = React.memo(
  ({
    children,
    onClick,
    className = "",
    variant = "primary",
    size = "default",
    disabled = false,
    loading = false,
    type = "button",
  }) => {
    const [isHovered, setIsHovered] = useState(false)
    const { trackEvent } = useAnalytics()

    const sizeClasses = {
      sm: "px-4 py-2 text-xs",
      default: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    }

    const handleClick = useCallback(() => {
      if (disabled || loading) return
      trackEvent("button_click", { variant, children: typeof children === "string" ? children : "button" })
      onClick?.()
    }, [disabled, loading, onClick, trackEvent, variant, children])

    return (
      <motion.button
        type={type}
        className={`
        relative overflow-hidden font-bold tracking-wider transition-all duration-300
        ${sizeClasses[size]}
        ${
          variant === "primary"
            ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-black"
            : variant === "secondary"
              ? "bg-transparent border-2 border-cyan-400 text-cyan-400"
              : "bg-transparent text-cyan-400 hover:bg-cyan-400/10"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
        style={{
          clipPath: variant !== "ghost" ? "polygon(0 0, calc(100% - 15px) 0, 100% 100%, 15px 100%)" : "none",
          boxShadow: isHovered && !disabled ? "0 0 20px rgba(0, 255, 255, 0.5)" : "none",
        }}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => !disabled && setIsHovered(false)}
        onClick={handleClick}
        disabled={disabled || loading}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered && !disabled ? "0%" : "-100%" }}
          transition={{ duration: 0.3 }}
        />

        <span className="relative z-10 flex items-center justify-center">
          {loading && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
            />
          )}
          {children}
        </span>
      </motion.button>
    )
  },
)

CyberButton.displayName = "CyberButton"

// Cyberpunk Card Component
const CyberCard: React.FC<{
  children: React.ReactNode
  className?: string
  glowColor?: "cyan" | "purple" | "pink"
  interactive?: boolean
}> = React.memo(({ children, className = "", glowColor = "cyan", interactive = true }) => {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const glowColors = {
    cyan: "rgba(0, 255, 255, 0.3)",
    purple: "rgba(147, 51, 234, 0.3)",
    pink: "rgba(236, 72, 153, 0.3)",
  }

  return (
    <motion.div
      ref={ref}
      className={`
        relative bg-black/80 backdrop-blur-sm border border-gray-700 transition-all duration-300
        ${interactive ? "cursor-pointer" : ""}
        ${className}
      `}
      style={{
        clipPath: "polygon(0 0, calc(100% - 15px) 0, 100% calc(100% - 15px), 15px 100%, 0 100%)",
        boxShadow: isHovered ? `0 0 30px ${glowColors[glowColor]}` : "0 0 10px rgba(0, 255, 255, 0.1)",
      }}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      whileHover={interactive ? { y: -5 } : {}}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="absolute inset-0 border-2 border-cyan-400/50"
        style={{
          clipPath: "polygon(0 0, calc(100% - 15px) 0, 100% calc(100% - 15px), 15px 100%, 0 100%)",
        }}
        animate={{
          borderColor: isHovered
            ? ["rgba(0, 255, 255, 0.5)", "rgba(147, 51, 234, 0.8)", "rgba(0, 255, 255, 0.5)"]
            : "rgba(0, 255, 255, 0.2)",
        }}
        transition={{ duration: 2, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
      />

      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

      <div className="relative z-10 p-6">{children}</div>
    </motion.div>
  )
})

CyberCard.displayName = "CyberCard"

// Header Component
const CyberpunkHeader: React.FC<{
  currentLang: string
  setCurrentLang: (lang: string) => void
}> = React.memo(({ currentLang, setCurrentLang }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setScrolled(latest > 50)
    })
    return unsubscribe
  }, [scrollY])

  const t = translations[currentLang as keyof typeof translations]

  const navItems = [
    { name: t.navPlatforms, href: "#platforms", icon: Cloud },
    { name: t.navServices, href: "#services", icon: Server },
    { name: t.navProcess, href: "#process", icon: Cpu },
    { name: t.navContact, href: "#contact", icon: MessageCircle },
  ]

  const handleNavClick = useCallback(
    (item: string) => {
      trackEvent("navigation_click", { item })
      setIsMenuOpen(false)
    },
    [trackEvent],
  )

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-md border-b border-cyan-400/30" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => trackEvent("logo_click")}
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 10px rgba(0, 255, 255, 0.5)",
                  "0 0 20px rgba(147, 51, 234, 0.5)",
                  "0 0 10px rgba(0, 255, 255, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center relative"
              style={{ clipPath: "polygon(0 0, 85% 0, 100% 100%, 15% 100%)" }}
            >
              <Cloud className="w-6 h-6 text-black" />
            </motion.div>
            <div>
              <GlitchText className="text-2xl font-bold text-cyan-400">INTOCLOUDS</GlitchText>
              <div className="text-xs text-purple-400">CLOUD ARCHITECTS</div>
            </div>
          </motion.div>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-cyan-400 hover:text-purple-400 transition-colors text-sm tracking-wider relative group flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleNavClick(item.name)}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all group-hover:w-full" />
              </motion.a>
            ))}

            <div className="relative">
              <CyberButton
                variant="secondary"
                size="sm"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="px-4 py-2"
              >
                <Globe className="w-4 h-4 mr-2" />
                {currentLang.toUpperCase()}
                <ChevronDown className="w-4 h-4 ml-2" />
              </CyberButton>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    className="absolute top-full right-0 mt-2 bg-black/95 border border-cyan-400/30 backdrop-blur-sm overflow-hidden"
                    style={{ clipPath: "polygon(0 0, 90% 0, 100% 100%, 10% 100%)" }}
                  >
                    {[
                      { code: "en", name: "ENGLISH", flag: "🇺🇸" },
                      { code: "ru", name: "РУССКИЙ", flag: "🇷🇺" },
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code)
                          setIsLangOpen(false)
                          trackEvent("language_change", { language: lang.code })
                        }}
                        className="block w-full px-4 py-3 text-left text-cyan-400 hover:bg-cyan-400/10 hover:text-purple-400 transition-colors text-sm flex items-center space-x-2"
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <CyberButton
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden px-3 py-3"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </CyberButton>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-6 pt-6 border-t border-cyan-400/20"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-cyan-400 hover:text-purple-400 transition-colors text-sm tracking-wider flex items-center space-x-3 p-3 rounded border border-cyan-400/20 hover:border-cyan-400/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleNavClick(item.name)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
})

CyberpunkHeader.displayName = "CyberpunkHeader"

// Hero Section Component
const CyberpunkHeroSection: React.FC<{ t: any }> = React.memo(({ t }) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const { trackEvent } = useAnalytics()

  const handleCTAClick = useCallback(() => {
    trackEvent("hero_cta_click", { button: "start_assessment" })
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }, [trackEvent])

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden">
      <motion.div style={{ y }} className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center items-center space-x-6 mb-8"
          >
            {t.certifications.map((cert: string, index: number) => (
              <motion.div
                key={cert}
                className="flex items-center space-x-2 text-xs text-cyan-400/80"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Award className="w-4 h-4" />
                <span>{cert}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-8">
            <GlitchText className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 leading-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t.heroTitle}
            </GlitchText>
            <GlitchText className="text-2xl md:text-3xl lg:text-4xl text-cyan-400 tracking-wider">
              {t.heroSubtitle}
            </GlitchText>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            {t.heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <CyberButton size="lg" onClick={handleCTAClick} className="text-lg px-12 py-6">
              <Rocket className="w-5 h-5 mr-2" />
              {t.heroButton}
            </CyberButton>

            <CyberButton variant="secondary" size="lg" className="text-lg px-8 py-6">
              <Eye className="w-5 h-5 mr-2" />
              WATCH DEMO
            </CyberButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {Object.entries(t.heroStats).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <CyberCard glowColor={["cyan", "purple", "pink", "cyan"][index] as any} className="h-full text-center">
                  <motion.div
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(0, 255, 255, 0.5)",
                        "0 0 20px rgba(147, 51, 234, 0.5)",
                        "0 0 10px rgba(0, 255, 255, 0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2"
                  >
                    {value.split(" ")[0]}
                  </motion.div>
                  <div className="text-gray-400 text-xs tracking-wider">{value.split(" ").slice(1).join(" ")}</div>
                </CyberCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
})

CyberpunkHeroSection.displayName = "CyberpunkHeroSection"

// Platforms Section
const CyberpunkPlatforms: React.FC<{ t: any }> = React.memo(({ t }) => {
  const platforms = [
    {
      name: "AMAZON WEB SERVICES",
      logo: (
        <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-lg rounded-lg">
          AWS
        </div>
      ),
      description: t.awsDescription,
      badges: ["AWS CERTIFIED", "5+ YEARS EXPERIENCE"],
    },
    {
      name: "MICROSOFT AZURE",
      logo: (
        <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-sm rounded-lg">
          AZURE
        </div>
      ),
      description: t.azureDescription,
      badges: ["AZURE EXPERT", "DEVOPS PRO"],
    },
    {
      name: "GOOGLE CLOUD PLATFORM",
      logo: (
        <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-400 via-green-400 to-yellow-400 text-white font-bold text-sm rounded-lg">
          GCP
        </div>
      ),
      description: t.gcpDescription,
      badges: ["GCP PROFESSIONAL", "KUBERNETES"],
    },
  ]

  return (
    <section id="platforms" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <GlitchText className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t.platformsTitle}
          </GlitchText>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">{t.platformsSubtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <CyberCard glowColor={["cyan", "purple", "pink"][index] as any} className="h-full">
                <div className="text-center">
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="mb-6 flex justify-center">
                    {platform.logo}
                  </motion.div>

                  <h3 className="text-xl font-bold text-cyan-400 mb-4 tracking-wider">{platform.name}</h3>

                  <p className="text-gray-300 mb-6 text-sm leading-relaxed">{platform.description}</p>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {platform.badges.map((badge, badgeIndex) => (
                      <motion.span
                        key={badge}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 + badgeIndex * 0.1 + 0.5 }}
                        className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-xs text-cyan-400 tracking-wider"
                        style={{ clipPath: "polygon(0 0, 90% 0, 100% 100%, 10% 100%)" }}
                      >
                        {badge}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </CyberCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
})

CyberpunkPlatforms.displayName = "CyberpunkPlatforms"

// Services Section
const CyberpunkServices: React.FC<{ t: any }> = React.memo(({ t }) => {
  const services = [
    {
      title: t.migrationTitle,
      description: t.migrationDescription,
      features: ["PHYSICAL SERVERS", "VMWARE TO CLOUD", "LEGACY APPS"],
      icon: Server,
    },
    {
      title: t.optimizationTitle,
      description: t.optimizationDescription,
      features: ["MICROSERVICES", "CONTAINERIZATION", "COST OPTIMIZATION"],
      icon: Cpu,
    },
    {
      title: t.securityTitle,
      description: t.securityDescription,
      features: ["GDPR/HIPAA", "ZERO TRUST", "DEVSECOPS"],
      icon: Award,
    },
    {
      title: t.developmentTitle,
      description: t.developmentDescription,
      features: ["SERVERLESS", "API GATEWAY", "AUTO-SCALING"],
      icon: Rocket,
    },
  ]

  return (
    <section id="services" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <GlitchText className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t.servicesTitle}
          </GlitchText>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">{t.servicesSubtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <CyberCard glowColor={["cyan", "purple", "pink", "cyan"][index] as any} className="h-full">
                <div className="flex items-start space-x-4">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center"
                    style={{ clipPath: "polygon(0 0, 85% 0, 100% 100%, 15% 100%)" }}
                  >
                    <service.icon className="w-6 h-6 text-black" />
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-cyan-400 mb-4 tracking-wider">{service.title}</h3>

                    <p className="text-gray-300 mb-6 text-sm leading-relaxed">{service.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <motion.span
                          key={feature}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.2 + featureIndex * 0.1 + 0.5 }}
                          className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-xs text-cyan-400 tracking-wider"
                          style={{ clipPath: "polygon(0 0, 90% 0, 100% 100%, 10% 100%)" }}
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </CyberCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
})

CyberpunkServices.displayName = "CyberpunkServices"

// Process Section
const CyberpunkProcess: React.FC<{ t: any }> = React.memo(({ t }) => {
  const steps = [
    {
      title: t.assessmentTitle,
      description: t.assessmentDescription,
      number: "01",
    },
    {
      title: t.strategyTitle,
      description: t.strategyDescription,
      number: "02",
    },
    {
      title: t.migrationExecTitle,
      description: t.migrationExecDescription,
      number: "03",
    },
    {
      title: t.supportTitle,
      description: t.supportDescription,
      number: "04",
    },
  ]

  return (
    <section id="process" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <GlitchText className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t.processTitle}
          </GlitchText>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">{t.processSubtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <CyberCard glowColor={["cyan", "purple", "pink", "cyan"][index] as any} className="h-full text-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4"
                >
                  {step.number}
                </motion.div>

                <h3 className="text-lg font-bold text-cyan-400 mb-4 tracking-wider">{step.title}</h3>

                <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
              </CyberCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
})

CyberpunkProcess.displayName = "CyberpunkProcess"

// Contact Section
const CyberpunkContact: React.FC<{ t: any }> = React.memo(({ t }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitMessage, setSubmitMessage] = useState("")

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = t.nameRequired
    }

    if (!formData.email.trim()) {
      newErrors.email = t.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.emailInvalid
    }

    if (!formData.message.trim()) {
      newErrors.message = t.messageRequired
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      // Simple mock success for now
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubmitted(true)
      setSubmitMessage(t.acknowledgment)
      setFormData({ name: "", email: "", message: "" })

      setTimeout(() => {
        setIsSubmitted(false)
        setSubmitMessage("")
      }, 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitMessage(t.sendError)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <GlitchText className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t.contactHeroTitle}
          </GlitchText>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">{t.contactHeroSubtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <CyberCard glowColor="cyan">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-cyan-400 mb-2 tracking-wider">{t.transmitMessage}</h3>
                <p className="text-gray-400 text-sm">{t.uploadData}</p>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-16 h-16 mx-auto mb-6"
                    >
                      <CheckCircle className="w-16 h-16 text-green-400" />
                    </motion.div>
                    <h4 className="text-2xl font-bold text-green-400 mb-2">{t.messageTransmitted}</h4>
                    <p className="text-gray-400 text-sm">{submitMessage}</p>
                  </motion.div>
                ) : (
                  <motion.form initial={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-cyan-400 text-sm mb-2 tracking-wider">{t.nameLabel}</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t.namePlaceholder}
                        className={`w-full px-4 py-3 bg-black/50 border text-cyan-400 text-sm focus:outline-none transition-colors ${
                          errors.name ? "border-red-500" : "border-cyan-400/30 focus:border-cyan-400"
                        }`}
                        style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)" }}
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-xs mt-1 flex items-center"
                        >
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-cyan-400 text-sm mb-2 tracking-wider">{t.emailLabel}</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.emailPlaceholder}
                        className={`w-full px-4 py-3 bg-black/50 border text-cyan-400 text-sm focus:outline-none transition-colors ${
                          errors.email ? "border-red-500" : "border-cyan-400/30 focus:border-cyan-400"
                        }`}
                        style={{ clipPath: "polygon(0 0, 95% 0, 100% 100%, 5% 100%)" }}
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-xs mt-1 flex items-center"
                        >
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.email}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label className="block text-cyan-400 text-sm mb-2 tracking-wider">{t.messageLabel}</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t.messagePlaceholder}
                        rows={6}
                        className={`w-full px-4 py-3 bg-black/50 border text-cyan-400 text-sm focus:outline-none transition-colors resize-none ${
                          errors.message ? "border-red-500" : "border-cyan-400/30 focus:border-cyan-400"
                        }`}
                        style={{ clipPath: "polygon(0 0, 98% 0, 100% 100%, 2% 100%)" }}
                      />
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-xs mt-1 flex items-center"
                        >
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.message}
                        </motion.p>
                      )}
                    </div>

                    <CyberButton type="submit" size="lg" loading={isSubmitting} className="w-full">
                      {isSubmitting ? t.transmitting : t.transmitButton}
                    </CyberButton>

                    {submitMessage && !isSubmitted && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm text-center flex items-center justify-center"
                      >
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {submitMessage}
                      </motion.p>
                    )}

                    <p className="text-gray-500 text-xs text-center">{t.dataProcessing}</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </CyberCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <CyberCard glowColor="purple">
              <h3 className="text-xl font-bold text-purple-400 mb-4 tracking-wider">{t.mainTerminal}</h3>
              <p className="text-gray-400 text-sm mb-4">{t.headquarters}</p>
              <div className="space-y-2 text-sm">
                <p className="text-cyan-400 font-bold">INTOCLOUDS MOLDOVA SRL</p>
                <p className="text-gray-300">BD. ȘTEFAN CEL MARE ȘI SFÂNT 123</p>
                <p className="text-gray-300">MD-2001 CHIȘINĂU, MOLDOVA</p>
              </div>
            </CyberCard>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CyberCard glowColor="cyan">
                <h4 className="text-lg font-bold text-cyan-400 mb-2 tracking-wider">{t.voiceComm}</h4>
                <p className="text-gray-300 text-sm">+373-22-123-456</p>
              </CyberCard>

              <CyberCard glowColor="pink">
                <h4 className="text-lg font-bold text-pink-400 mb-2 tracking-wider">{t.dataLink}</h4>
                <p className="text-gray-300 text-sm">dev@intoclouds.io</p>
              </CyberCard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})

CyberpunkContact.displayName = "CyberpunkContact"

// Footer Component
const CyberpunkFooter: React.FC = React.memo(() => {
  return (
    <footer className="py-12 px-4 border-t border-cyan-400/20 relative">
      <div className="container mx-auto">
        <div className="text-center">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center justify-center space-x-3 mb-6">
            <div
              className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center"
              style={{ clipPath: "polygon(0 0, 85% 0, 100% 100%, 15% 100%)" }}
            >
              <Cloud className="w-4 h-4 text-black" />
            </div>
            <span className="text-xl font-bold text-cyan-400">INTOCLOUDS</span>
          </motion.div>

          <p className="text-gray-400 text-sm mb-4">© 2024 INTOCLOUDS MOLDOVA SRL. ALL RIGHTS RESERVED.</p>

          <div className="flex justify-center space-x-6 text-xs text-gray-500">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              PRIVACY POLICY
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              TERMS OF SERVICE
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              SECURITY
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
})

CyberpunkFooter.displayName = "CyberpunkFooter"

// Scroll to top button
const ScrollToTop: React.FC = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsVisible(latest > 500)
    })
    return unsubscribe
  }, [scrollY])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-black rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  )
})

ScrollToTop.displayName = "ScrollToTop"

// Main App Component
const CyberpunkIntoClouds: React.FC = () => {
  const [currentLang, setCurrentLang] = useState("en")

  const t = translations[currentLang as keyof typeof translations]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <AnimatedBackground />

      <CyberpunkHeader currentLang={currentLang} setCurrentLang={setCurrentLang} />

      <main>
        <CyberpunkHeroSection t={t} />
        <CyberpunkPlatforms t={t} />
        <CyberpunkServices t={t} />
        <CyberpunkProcess t={t} />
        <CyberpunkContact t={t} />
      </main>

      <CyberpunkFooter />

      <ScrollToTop />
    </div>
  )
}

export default CyberpunkIntoClouds
