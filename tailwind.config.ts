import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#F5F5F5",
        "bg-secondary": "#F9FAFB",
        "color-primary-900": "#101828",
        "color-primary-600": "#475467",
        "color-secondary-700": "#344054",
        "color-placeholder": "#667085",
        "text-primary-900": "#101828",
        "text-secondary-700": "#344054",
        "text-tertiary-600": "#475467",
        "button-primary-bg": "#7F56D9",
        "button-secondary-fg": "#344054",
        "button-secondary-color-fg": "#6941C6",
        "button-secondary-border": "#D0D5DD",
        "button-secondary-color-border": "#D6BBFB",
        "border-primary": "#D0D5DD",
        "border-secondary": "#EAECF0",
      },
      spacing: {
        "spacing-xs": "4px",
        "spacing-sm": "6px",
        "spacing-xl": "16px",
        "spacing-2xl": "20px",
        "spacing-3xl": "24px",
      },
    },
  },
  plugins: [],
} satisfies Config;
