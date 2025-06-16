"use client"

import { useState, useEffect } from "react"
import { Save, Edit3, Plus, Trash2, Globe, Settings, FileText, Server, Users, BarChart3 } from "lucide-react"

// Компоненты UI
import { CyberButton } from "../components/CyberButton"
import { CyberCard } from "../components/CyberCard"

interface ContentItem {
  id: string
  type: "hero" | "service" | "platform" | "process" | "contact"
  language: "en" | "ru" | "ro"
  data: any
  updatedAt: string
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [activeLanguage, setActiveLanguage] = useState<"en" | "ru" | "ro">("en")
  const [content, setContent] = useState<ContentItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null)

  // Загрузка контента
  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const response = await fetch("/api/admin/content")
      const data = await response.json()
      setContent(data)
    } catch (error) {
      console.error("Error loading content:", error)
    }
  }

  const saveContent = async (item: ContentItem) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      })

      if (response.ok) {
        await loadContent()
        setEditingItem(null)
      }
    } catch (error) {
      console.error("Error saving content:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteContent = async (id: string) => {
    if (!confirm("Удалить этот элемент?")) return

    try {
      await fetch(`/api/admin/content/${id}`, { method: "DELETE" })
      await loadContent()
    } catch (error) {
      console.error("Error deleting content:", error)
    }
  }

  const tabs = [
    { id: "dashboard", name: "Dashboard", icon: BarChart3 },
    { id: "hero", name: "Hero Section", icon: FileText },
    { id: "services", name: "Services", icon: Server },
    { id: "platforms", name: "Platforms", icon: Globe },
    { id: "process", name: "Process", icon: Users },
    { id: "settings", name: "Settings", icon: Settings },
  ]

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "ro", name: "Română", flag: "🇷🇴" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-purple-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]" />
      </div>

      {/* Header */}
      <header className="border-b border-cyan-400/20 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div
                className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center"
                style={{ clipPath: "polygon(0 0, 85% 0, 100% 100%, 15% 100%)" }}
              >
                <Settings className="w-5 h-5 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-cyan-400">INTOCLOUDS CMS</h1>
                <p className="text-sm text-gray-400">Content Management System</p>
              </div>
            </div>

            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setActiveLanguage(lang.code as any)}
                  className={`px-3 py-2 text-sm border transition-colors ${
                    activeLanguage === lang.code
                      ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                      : "border-gray-600 text-gray-400 hover:border-cyan-400/50"
                  }`}
                  style={{ clipPath: "polygon(0 0, 90% 0, 100% 100%, 10% 100%)" }}
                >
                  {lang.flag} {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen border-r border-cyan-400/20 bg-black/50">
          <nav className="p-4">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-cyan-400/10 text-cyan-400 border-l-2 border-cyan-400"
                      : "text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/5"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && <DashboardView content={content} />}
          {activeTab === "hero" && (
            <ContentEditor
              type="hero"
              language={activeLanguage}
              content={content.filter((c) => c.type === "hero" && c.language === activeLanguage)}
              onSave={saveContent}
              onDelete={deleteContent}
            />
          )}
          {activeTab === "services" && (
            <ContentEditor
              type="service"
              language={activeLanguage}
              content={content.filter((c) => c.type === "service" && c.language === activeLanguage)}
              onSave={saveContent}
              onDelete={deleteContent}
            />
          )}
          {/* Другие вкладки... */}
        </main>
      </div>
    </div>
  )
}

// Dashboard компонент
function DashboardView({ content }: { content: ContentItem[] }) {
  const stats = {
    totalContent: content.length,
    byLanguage: {
      en: content.filter((c) => c.language === "en").length,
      ru: content.filter((c) => c.language === "ru").length,
      ro: content.filter((c) => c.language === "ro").length,
    },
    byType: {
      hero: content.filter((c) => c.type === "hero").length,
      service: content.filter((c) => c.type === "service").length,
      platform: content.filter((c) => c.type === "platform").length,
      process: content.filter((c) => c.type === "process").length,
    },
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-cyan-400 mb-2">Dashboard</h2>
        <p className="text-gray-400">Overview of your content management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CyberCard glowColor="cyan">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">{stats.totalContent}</div>
            <div className="text-gray-400 text-sm">Total Content Items</div>
          </div>
        </CyberCard>

        <CyberCard glowColor="purple">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">{stats.byLanguage.en}</div>
            <div className="text-gray-400 text-sm">English Content</div>
          </div>
        </CyberCard>

        <CyberCard glowColor="pink">
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-400 mb-2">{stats.byLanguage.ru}</div>
            <div className="text-gray-400 text-sm">Russian Content</div>
          </div>
        </CyberCard>

        <CyberCard glowColor="cyan">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">{stats.byLanguage.ro}</div>
            <div className="text-gray-400 text-sm">Romanian Content</div>
          </div>
        </CyberCard>
      </div>

      {/* Recent Activity */}
      <CyberCard>
        <h3 className="text-xl font-bold text-cyan-400 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {content.slice(0, 5).map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <div>
                  <div className="text-sm font-medium text-white">{item.type.toUpperCase()}</div>
                  <div className="text-xs text-gray-400">{item.language.toUpperCase()}</div>
                </div>
              </div>
              <div className="text-xs text-gray-400">{new Date(item.updatedAt).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      </CyberCard>
    </div>
  )
}

// Content Editor компонент
function ContentEditor({
  type,
  language,
  content,
  onSave,
  onDelete,
}: {
  type: string
  language: string
  content: ContentItem[]
  onSave: (item: ContentItem) => void
  onDelete: (id: string) => void
}) {
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null)
  const [formData, setFormData] = useState<any>({})

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item)
    setFormData(item.data)
  }

  const handleSave = () => {
    if (editingItem) {
      onSave({
        ...editingItem,
        data: formData,
        updatedAt: new Date().toISOString(),
      })
    }
  }

  const handleCreate = () => {
    const newItem: ContentItem = {
      id: Date.now().toString(),
      type: type as any,
      language: language as any,
      data: {},
      updatedAt: new Date().toISOString(),
    }
    setEditingItem(newItem)
    setFormData({})
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-cyan-400 mb-2">
            {type.charAt(0).toUpperCase() + type.slice(1)} Content
          </h2>
          <p className="text-gray-400">
            Manage {type} content for {language.toUpperCase()}
          </p>
        </div>

        <CyberButton onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </CyberButton>
      </div>

      {/* Content List */}
      <div className="grid gap-4">
        {content.map((item) => (
          <CyberCard key={item.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {item.data.title || item.data.name || `${type} Item`}
                </h3>
                <p className="text-sm text-gray-400">Updated: {new Date(item.updatedAt).toLocaleDateString()}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button onClick={() => handleEdit(item)} className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => onDelete(item.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </CyberCard>
        ))}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <CyberCard className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">
                Edit {type.charAt(0).toUpperCase() + type.slice(1)}
              </h3>

              {/* Dynamic Form Fields */}
              <div className="space-y-4">
                {type === "hero" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-cyan-400 mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title || ""}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 bg-black/50 border border-cyan-400/30 text-white rounded focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-cyan-400 mb-2">Subtitle</label>
                      <input
                        type="text"
                        value={formData.subtitle || ""}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        className="w-full px-3 py-2 bg-black/50 border border-cyan-400/30 text-white rounded focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-cyan-400 mb-2">Description</label>
                      <textarea
                        value={formData.description || ""}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        className="w-full px-3 py-2 bg-black/50 border border-cyan-400/30 text-white rounded focus:border-cyan-400"
                      />
                    </div>
                  </>
                )}

                {/* Добавьте поля для других типов контента */}
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <CyberButton variant="secondary" onClick={() => setEditingItem(null)}>
                  Cancel
                </CyberButton>
                <CyberButton onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </CyberButton>
              </div>
            </div>
          </CyberCard>
        </div>
      )}
    </div>
  )
}
