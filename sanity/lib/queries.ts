import { groq } from "next-sanity"

// Запросы для получения контента
export const heroSectionQuery = groq`
  *[_type == "heroSection" && language == $language][0] {
    title,
    subtitle,
    description,
    buttonText,
    stats[] {
      label,
      value
    }
  }
`

export const servicesQuery = groq`
  *[_type == "service" && language == $language] | order(order asc) {
    title,
    description,
    features,
    icon
  }
`

export const platformsQuery = groq`
  *[_type == "platform" && language == $language] | order(order asc) {
    name,
    description,
    badges,
    logoColor
  }
`

export const processStepsQuery = groq`
  *[_type == "processStep" && language == $language] | order(order asc) {
    title,
    description,
    stepNumber
  }
`

export const contactInfoQuery = groq`
  *[_type == "contactInfo" && language == $language][0] {
    companyName,
    address,
    phone,
    email
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && language == $language][0] {
    siteName,
    siteDescription,
    keywords,
    socialLinks
  }
`
