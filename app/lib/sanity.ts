import { client } from "../../sanity/lib/client"
import {
  heroSectionQuery,
  servicesQuery,
  platformsQuery,
  processStepsQuery,
  contactInfoQuery,
  siteSettingsQuery,
} from "../../sanity/lib/queries"

// Функции для получения данных из Sanity
export async function getHeroSection(language: string) {
  return await client.fetch(heroSectionQuery, { language })
}

export async function getServices(language: string) {
  return await client.fetch(servicesQuery, { language })
}

export async function getPlatforms(language: string) {
  return await client.fetch(platformsQuery, { language })
}

export async function getProcessSteps(language: string) {
  return await client.fetch(processStepsQuery, { language })
}

export async function getContactInfo(language: string) {
  return await client.fetch(contactInfoQuery, { language })
}

export async function getSiteSettings(language: string) {
  return await client.fetch(siteSettingsQuery, { language })
}
