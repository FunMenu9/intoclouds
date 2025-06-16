"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Database, Settings, Users, FileText, Globe } from "lucide-react"

export default function StrapiAdminPage() {
  const [strapiStatus, setStrapiStatus] = useState<"loading" | "online" | "offline">("loading")
  const [stats, setStats] = useState({
    contentTypes: 0,
    entries: 0,
    locales: 0,
  })

  useEffect(() => {
    checkStrapiStatus()
  }, [])

  const checkStrapiStatus = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}/api`)
      if (response.ok) {
        setStrapiStatus("online")
        // Загрузка статистики
        loadStats()
      } else {
        setStrapiStatus("offline")
      }
    } catch (error) {
      setStrapiStatus("offline")
    }
  }

  const loadStats = async () => {
    // Здесь можно загрузить статистику из Strapi API
    setStats({
      contentTypes: 6,
      entries: 25,
      locales: 3,
    })
  }

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-purple-900/20" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div
              className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center"
              style={{ clipPath: "polygon(0 0, 85% 0, 100% 100%, 15% 100%)" }}
            >
              <Database className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-cyan-400">STRAPI CMS</h1>
              <p className="text-gray-400">Content Management System</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${
                strapiStatus === "online"
                  ? "border-green-400 bg-green-400/10 text-green-400"
                  : strapiStatus === "offline"
                    ? "border-red-400 bg-red-400/10 text-red-400"
                    : "border-yellow-400 bg-yellow-400/10 text-yellow-400"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  strapiStatus === "online"
                    ? "bg-green-400"
                    : strapiStatus === "offline"
                      ? "bg-red-400"
                      : "bg-yellow-400"
                }`}
              />
              <span className="text-sm font-medium">
                {strapiStatus === "online" ? "ONLINE" : strapiStatus === "offline" ? "OFFLINE" : "CHECKING..."}
              </span>
            </div>

            {strapiStatus === "online" && (
              <a
                href={`${strapiUrl}/admin`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 rounded hover:bg-cyan-400/20 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">OPEN ADMIN</span>
              </a>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-black/50 border border-cyan-400/20 p-6 rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-8 h-8 text-cyan-400" />
              <div>
                <h3 className="text-lg font-bold text-cyan-400">Content Types</h3>
                <p className="text-gray-400 text-sm">Configured schemas</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-white">{stats.contentTypes}</div>
          </div>

          <div className="bg-black/50 border border-purple-400/20 p-6 rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="text-lg font-bold text-purple-400">Content Entries</h3>
                <p className="text-gray-400 text-sm">Total entries</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-white">{stats.entries}</div>
          </div>

          <div className="bg-black/50 border border-pink-400/20 p-6 rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="w-8 h-8 text-pink-400" />
              <div>
                <h3 className="text-lg font-bold text-pink-400">Languages</h3>
                <p className="text-gray-400 text-sm">Supported locales</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-white">{stats.locales}</div>
          </div>
        </div>

        {/* Content Types */}
        <div className="bg-black/50 border border-cyan-400/20 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">Content Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Hero Section", icon: FileText, color: "cyan" },
              { name: "Services", icon: Settings, color: "purple" },
              { name: "Platforms", icon: Globe, color: "pink" },
              { name: "Process Steps", icon: Users, color: "green" },
              { name: "Contact Info", icon: Database, color: "orange" },
              { name: "Contact Messages", icon: FileText, color: "blue" },
            ].map((type) => (
              <div key={type.name} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded">
                <type.icon className={`w-5 h-5 text-${type.color}-400`} />
                <span className="text-sm text-white">{type.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-black/50 border border-cyan-400/20 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={`${strapiUrl}/admin/content-manager`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-4 bg-cyan-400/10 border border-cyan-400/30 rounded hover:bg-cyan-400/20 transition-colors"
            >
              <FileText className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="font-medium text-cyan-400">Manage Content</div>
                <div className="text-xs text-gray-400">Add, edit, delete content</div>
              </div>
            </a>

            <a
              href={`${strapiUrl}/admin/settings`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-4 bg-purple-400/10 border border-purple-400/30 rounded hover:bg-purple-400/20 transition-colors"
            >
              <Settings className="w-5 h-5 text-purple-400" />
              <div>
                <div className="font-medium text-purple-400">Settings</div>
                <div className="text-xs text-gray-400">Configure CMS settings</div>
              </div>
            </a>
          </div>
        </div>

        {/* Setup Instructions */}
        {strapiStatus === "offline" && (
          <div className="bg-red-400/10 border border-red-400/30 p-6 rounded-lg mt-8">
            <h2 className="text-xl font-bold text-red-400 mb-4">Strapi Not Running</h2>
            <div className="space-y-2 text-sm text-gray-300">
              <p>To start Strapi CMS:</p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>
                  Run: <code className="bg-black/50 px-2 py-1 rounded">./start-strapi.sh</code>
                </li>
                <li>
                  Or manually: <code className="bg-black/50 px-2 py-1 rounded">cd strapi && npm run develop</code>
                </li>
                <li>
                  Open: <code className="bg-black/50 px-2 py-1 rounded">http://localhost:1337/admin</code>
                </li>
                <li>Create admin account and configure content</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
