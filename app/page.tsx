"use client"

import type React from "react"
import { useState } from "react"
import { Cloud, Server, Menu, X, Globe, Award, Cpu, Rocket } from "lucide-react"

const translations = {
  en: {
    navPlatforms: "PLATFORMS",
    navServices: "SERVICES",
    navProcess: "PROCESS",
    navContact: "CONTACT",
    heroTitle: "NEXT-GEN CLOUD MIGRATION",
    heroSubtitle: "TRANSFORM YOUR INFRASTRUCTURE",
    heroDescription:
      "We are certified cloud architects specializing in seamless on-premise to cloud migration. Zero downtime guaranteed, up to 50% cost reduction, 24/7 expert support.",
    heroButton: "START FREE ASSESSMENT",
    platformsTitle: "CLOUD PLATFORMS",
    servicesTitle: "OUR SERVICES",
    contactTitle: "GET IN TOUCH",
    processTitle: "OUR PROCESS",
  },
  ru: {
    navPlatforms: "ПЛАТФОРМЫ",
    navServices: "УСЛУГИ",
    navProcess: "ПРОЦЕСС",
    navContact: "КОНТАКТ",
    heroTitle: "МИГРАЦИЯ В ОБЛАКО НОВОГО ПОКОЛЕНИЯ",
    heroSubtitle: "ТРАНСФОРМИРУЙТЕ ИНФРАСТРУКТУРУ",
    heroDescription:
      "Мы сертифицированные облачные архитекторы, специализирующиеся на бесшовной миграции из on-premise в облако. Гарантия нулевого простоя, экономия до 50%, поддержка 24/7.",
    heroButton: "НАЧАТЬ БЕСПЛАТНУЮ ОЦЕНКУ",
    platformsTitle: "ОБЛАЧНЫЕ ПЛАТФОРМЫ",
    servicesTitle: "НАШИ УСЛУГИ",
    contactTitle: "СВЯЗАТЬСЯ С НАМИ",
    processTitle: "НАШ ПРОЦЕСС",
  },
}

export default function Home() {
  const [currentLang, setCurrentLang] = useState("en")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const t = translations[currentLang as keyof typeof translations]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("Message sent successfully!")
        setFormData({ name: "", email: "", message: "" })
      } else {
        alert("Error sending message")
      }
    } catch (error) {
      alert("Error sending message")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-purple-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-b border-cyan-400/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                <Cloud className="w-6 h-6 text-black" />
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400">INTOCLOUDS</div>
                <div className="text-xs text-purple-400">CLOUD ARCHITECTS</div>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <a
                href="#platforms"
                className="text-cyan-400 hover:text-purple-400 transition-colors text-sm tracking-wider"
              >
                {t.navPlatforms}
              </a>
              <a
                href="#services"
                className="text-cyan-400 hover:text-purple-400 transition-colors text-sm tracking-wider"
              >
                {t.navServices}
              </a>
              <a
                href="#process"
                className="text-cyan-400 hover:text-purple-400 transition-colors text-sm tracking-wider"
              >
                {t.navProcess}
              </a>
              <a
                href="#contact"
                className="text-cyan-400 hover:text-purple-400 transition-colors text-sm tracking-wider"
              >
                {t.navContact}
              </a>

              <button
                onClick={() => setCurrentLang(currentLang === "en" ? "ru" : "en")}
                className="px-4 py-2 border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-colors text-sm"
              >
                <Globe className="w-4 h-4 mr-2 inline" />
                {currentLang.toUpperCase()}
              </button>
            </nav>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-cyan-400">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 leading-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t.heroTitle}
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-cyan-400 tracking-wider">{t.heroSubtitle}</h2>
            </div>

            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              {t.heroDescription}
            </p>

            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold px-12 py-6 text-lg hover:shadow-lg transition-all duration-300"
            >
              <Rocket className="w-5 h-5 mr-2 inline" />
              {t.heroButton}
            </button>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-16">
              {[
                { label: "Projects", value: "50+" },
                { label: "Uptime", value: "99.9%" },
                { label: "Savings", value: "40%" },
                { label: "Support", value: "24/7" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-black/80 backdrop-blur-sm border border-cyan-400/30 p-4 text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-xs tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section id="platforms" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {t.platformsTitle}
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              WE ARE CERTIFIED EXPERTS IN LEADING CLOUD PLATFORMS WITH DEEP KNOWLEDGE AND EXPERIENCE.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "AWS",
                fullName: "AMAZON WEB SERVICES",
                color: "from-orange-500 to-orange-600",
                description:
                  "Certified Solutions Architect. Expertise in EC2, Lambda, RDS, S3, CloudFormation and other AWS services.",
                badges: ["AWS CERTIFIED", "5+ YEARS EXPERIENCE"],
              },
              {
                name: "AZURE",
                fullName: "MICROSOFT AZURE",
                color: "from-blue-500 to-blue-600",
                description:
                  "Specialists in Azure DevOps, App Services, Virtual Machines, Azure SQL and Microsoft cloud architecture.",
                badges: ["AZURE EXPERT", "DEVOPS PRO"],
              },
              {
                name: "GCP",
                fullName: "GOOGLE CLOUD PLATFORM",
                color: "from-blue-400 to-green-400",
                description:
                  "Experience with Compute Engine, Kubernetes Engine, BigQuery, Cloud Functions and machine learning in GCP.",
                badges: ["GCP PROFESSIONAL", "KUBERNETES"],
              },
            ].map((platform, index) => (
              <div
                key={platform.name}
                className="bg-black/80 backdrop-blur-sm border border-cyan-400/30 p-6 hover:border-cyan-400/50 transition-all"
              >
                <div className="text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${platform.color} flex items-center justify-center text-white font-bold rounded-lg`}
                  >
                    {platform.name}
                  </div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-4 tracking-wider">{platform.fullName}</h3>
                  <p className="text-gray-300 mb-6 text-sm leading-relaxed">{platform.description}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {platform.badges.map((badge) => (
                      <span
                        key={badge}
                        className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-xs text-cyan-400 tracking-wider"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {t.servicesTitle}
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              WE SPECIALIZE IN CLOUD MIGRATION, BUT READY TO SOLVE ANY TECHNICAL CHALLENGE.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "ON-PREMISE TO CLOUD MIGRATION",
                icon: Server,
                description:
                  "Complete migration of physical servers, local data centers and legacy systems to AWS, Azure or Google Cloud with zero downtime guarantee.",
                features: ["PHYSICAL SERVERS", "VMWARE TO CLOUD", "LEGACY APPS"],
              },
              {
                title: "OPTIMIZATION & MODERNIZATION",
                icon: Cpu,
                description:
                  "Transform monolithic applications to microservices, cost optimization and implementation of modern DevOps practices.",
                features: ["MICROSERVICES", "CONTAINERIZATION", "COST OPTIMIZATION"],
              },
              {
                title: "SECURITY & COMPLIANCE",
                icon: Award,
                description:
                  "Enterprise security implementation, GDPR, HIPAA, SOC2 compliance with automated CI/CD pipelines.",
                features: ["GDPR/HIPAA", "ZERO TRUST", "DEVSECOPS"],
              },
              {
                title: "CLOUD-NATIVE DEVELOPMENT",
                icon: Rocket,
                description:
                  "Building modern web applications from scratch or refactoring existing ones for cloud architecture using serverless technologies.",
                features: ["SERVERLESS", "API GATEWAY", "AUTO-SCALING"],
              },
            ].map((service, index) => (
              <div
                key={service.title}
                className="bg-black/80 backdrop-blur-sm border border-cyan-400/30 p-6 hover:border-cyan-400/50 transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-cyan-400 mb-4 tracking-wider">{service.title}</h3>
                    <p className="text-gray-300 mb-6 text-sm leading-relaxed">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-xs text-cyan-400 tracking-wider"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {t.processTitle}
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              OUR PROVEN 4-STEP METHODOLOGY ENSURES SUCCESSFUL CLOUD TRANSFORMATION.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              {
                number: "01",
                title: "ASSESSMENT & ANALYSIS",
                description: "Deep dive into your current infrastructure, applications, and business requirements.",
              },
              {
                number: "02",
                title: "STRATEGY & PLANNING",
                description: "Create detailed migration roadmap with timeline, costs, and risk mitigation strategies.",
              },
              {
                number: "03",
                title: "MIGRATION EXECUTION",
                description: "Seamless migration with zero downtime using proven methodologies and automation.",
              },
              {
                number: "04",
                title: "OPTIMIZATION & SUPPORT",
                description: "Post-migration optimization, monitoring, and 24/7 ongoing support services.",
              },
            ].map((step, index) => (
              <div
                key={step.number}
                className="bg-black/80 backdrop-blur-sm border border-cyan-400/30 p-6 hover:border-cyan-400/50 transition-all text-center"
              >
                <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-cyan-400 mb-4 tracking-wider">{step.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {t.contactTitle}
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              READY TO START YOUR DIGITAL TRANSFORMATION? INITIATE CONTACT PROTOCOL FOR FREE CONSULTATION.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            <div className="bg-black/80 backdrop-blur-sm border border-cyan-400/30 p-8">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6 tracking-wider">TRANSMIT MESSAGE</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-cyan-400 text-sm mb-2 tracking-wider">NAME *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-cyan-400/30 text-cyan-400 focus:border-cyan-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-cyan-400 text-sm mb-2 tracking-wider">EMAIL *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-cyan-400/30 text-cyan-400 focus:border-cyan-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-cyan-400 text-sm mb-2 tracking-wider">MESSAGE *</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 bg-black/50 border border-cyan-400/30 text-cyan-400 focus:border-cyan-400 focus:outline-none resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold py-3 px-6 hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? "TRANSMITTING..." : "TRANSMIT MESSAGE"}
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="bg-black/80 backdrop-blur-sm border border-purple-400/30 p-6">
                <h3 className="text-xl font-bold text-purple-400 mb-4 tracking-wider">MAIN TERMINAL</h3>
                <p className="text-gray-400 text-sm mb-4">CHIȘINĂU HEADQUARTERS</p>
                <div className="space-y-2 text-sm">
                  <p className="text-cyan-400 font-bold">INTOCLOUDS MOLDOVA SRL</p>
                  <p className="text-gray-300">BD. ȘTEFAN CEL MARE ȘI SFÂNT 123</p>
                  <p className="text-gray-300">MD-2001 CHIȘINĂU, MOLDOVA</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-black/80 backdrop-blur-sm border border-cyan-400/30 p-6">
                  <h4 className="text-lg font-bold text-cyan-400 mb-2 tracking-wider">VOICE COMM</h4>
                  <p className="text-gray-300 text-sm">+373-22-123-456</p>
                </div>

                <div className="bg-black/80 backdrop-blur-sm border border-pink-400/30 p-6">
                  <h4 className="text-lg font-bold text-pink-400 mb-2 tracking-wider">DATA LINK</h4>
                  <p className="text-gray-300 text-sm">dev@intoclouds.io</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-cyan-400/20">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
              <Cloud className="w-4 h-4 text-black" />
            </div>
            <span className="text-xl font-bold text-cyan-400">INTOCLOUDS</span>
          </div>
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
      </footer>
    </div>
  )
}
