import type { SchemaTypeDefinition } from "sanity"

// Схемы для контента
const heroSection = {
  name: "heroSection",
  title: "Hero Section",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "buttonText",
      title: "Button Text",
      type: "string",
    },
    {
      name: "stats",
      title: "Statistics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "value", title: "Value", type: "string" },
          ],
        },
      ],
    },
    {
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Russian", value: "ru" },
          { title: "Romanian", value: "ro" },
        ],
      },
    },
  ],
}

const service = {
  name: "service",
  title: "Services",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Service Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "icon",
      title: "Icon Name",
      type: "string",
      description: 'Lucide icon name (e.g., "server", "cpu", "award")',
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
    },
    {
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Russian", value: "ru" },
          { title: "Romanian", value: "ro" },
        ],
      },
    },
  ],
}

const platform = {
  name: "platform",
  title: "Cloud Platforms",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Platform Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "badges",
      title: "Certification Badges",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "logoColor",
      title: "Logo Color Scheme",
      type: "string",
      options: {
        list: [
          { title: "Orange (AWS)", value: "orange" },
          { title: "Blue (Azure)", value: "blue" },
          { title: "Multi (GCP)", value: "multi" },
        ],
      },
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
    },
    {
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Russian", value: "ru" },
          { title: "Romanian", value: "ro" },
        ],
      },
    },
  ],
}

const processStep = {
  name: "processStep",
  title: "Process Steps",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Step Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "stepNumber",
      title: "Step Number",
      type: "string",
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
    },
    {
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Russian", value: "ru" },
          { title: "Romanian", value: "ro" },
        ],
      },
    },
  ],
}

const contactInfo = {
  name: "contactInfo",
  title: "Contact Information",
  type: "document",
  fields: [
    {
      name: "companyName",
      title: "Company Name",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "text",
    },
    {
      name: "phone",
      title: "Phone",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Russian", value: "ru" },
          { title: "Romanian", value: "ro" },
        ],
      },
    },
  ],
}

const siteSettings = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    {
      name: "siteName",
      title: "Site Name",
      type: "string",
    },
    {
      name: "siteDescription",
      title: "Site Description",
      type: "text",
    },
    {
      name: "keywords",
      title: "SEO Keywords",
      type: "text",
    },
    {
      name: "socialLinks",
      title: "Social Media Links",
      type: "object",
      fields: [
        { name: "linkedin", title: "LinkedIn", type: "url" },
        { name: "twitter", title: "Twitter", type: "url" },
        { name: "github", title: "GitHub", type: "url" },
      ],
    },
    {
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Russian", value: "ru" },
          { title: "Romanian", value: "ro" },
        ],
      },
    },
  ],
}

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroSection, service, platform, processStep, contactInfo, siteSettings],
}
