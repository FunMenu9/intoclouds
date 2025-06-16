interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

interface StrapiItem {
  id: number
  attributes: any
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN

// Базовая функция для запросов к Strapi
async function fetchStrapi<T>(endpoint: string, options: RequestInit = {}): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_URL}/api/${endpoint}`

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
    },
  }

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status}`)
  }

  return response.json()
}

// Функции для получения контента
export async function getHeroSection(locale = "en") {
  try {
    const response = await fetchStrapi<StrapiItem>(`hero-section?locale=${locale}&populate=*`)
    return response.data?.attributes || null
  } catch (error) {
    console.error("Error fetching hero section:", error)
    return null
  }
}

export async function getServices(locale = "en") {
  try {
    const response = await fetchStrapi<StrapiItem[]>(`services?locale=${locale}&populate=*&sort=order:asc`)
    return (
      response.data?.map((item) => ({
        id: item.id,
        ...item.attributes,
      })) || []
    )
  } catch (error) {
    console.error("Error fetching services:", error)
    return []
  }
}

export async function getPlatforms(locale = "en") {
  try {
    const response = await fetchStrapi<StrapiItem[]>(`platforms?locale=${locale}&populate=*&sort=order:asc`)
    return (
      response.data?.map((item) => ({
        id: item.id,
        ...item.attributes,
      })) || []
    )
  } catch (error) {
    console.error("Error fetching platforms:", error)
    return []
  }
}

export async function getProcessSteps(locale = "en") {
  try {
    const response = await fetchStrapi<StrapiItem[]>(`process-steps?locale=${locale}&populate=*&sort=order:asc`)
    return (
      response.data?.map((item) => ({
        id: item.id,
        ...item.attributes,
      })) || []
    )
  } catch (error) {
    console.error("Error fetching process steps:", error)
    return []
  }
}

export async function getContactInfo(locale = "en") {
  try {
    const response = await fetchStrapi<StrapiItem>(`contact-info?locale=${locale}&populate=*`)
    return response.data?.attributes || null
  } catch (error) {
    console.error("Error fetching contact info:", error)
    return null
  }
}

// Функция для отправки сообщений через Strapi
export async function submitContactForm(data: {
  name: string
  email: string
  message: string
  language?: string
}) {
  try {
    const response = await fetchStrapi("contact-messages", {
      method: "POST",
      body: JSON.stringify({
        data: {
          name: data.name,
          email: data.email,
          message: data.message,
          language: data.language || "en",
          submittedAt: new Date().toISOString(),
        },
      }),
    })
    return response
  } catch (error) {
    console.error("Error submitting contact form:", error)
    throw error
  }
}

// Утилиты для работы с медиа
export function getStrapiMedia(media: any) {
  if (!media) return null

  const { url } = media.data?.attributes || media.attributes || media
  return url?.startsWith("/") ? `${STRAPI_URL}${url}` : url
}

export function getStrapiMedias(medias: any[]) {
  if (!medias || !Array.isArray(medias)) return []

  return medias.map((media) => getStrapiMedia(media)).filter(Boolean)
}
