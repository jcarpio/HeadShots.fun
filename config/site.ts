import { SidebarNavItem, SiteConfig } from "types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  title: "Regala Sueños | DreamBez.com",
  name: "DreamBez.com",
  description:
    "En DreamBez.com creamos tu Álbum de Sueños Hiper Realista con Inteligencia Artificial y mucho Amor.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    twitter: "https://twitter.com/jcarpio",
    github: "https://github.com/jcarpio/DreamBez",
  },
  mailSupport: "soporte@dreambez.com",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DreamBez.com",
    "url": site_url,
    "description": "En DreamBez.com creamos tu Álbum de Sueños Hiper Realista con Inteligencia Artificial y mucho Amor.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${site_url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  },
  keywords: [
      "Dreams",
  ],
  authors: [
    {
      name: "Enkire",
    },
  ],
  creator: "Enkire",
  twitterCreator: "@enkire",
  icons: "/favicon.ico",
  manifest: `${site_url}/site.webmanifest`,
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "Company",
    items: [
      { title: "About", href: "/about" },
      { title: "Terms", href: "/terms" },
      { title: "Privacy", href: "/privacy" },
    ],
  },
  {
    title: "Enkire Products",
    items: [
      { title: "DreamBez", href: "https://DreamBez.com" },
      { title: "Enkire", href: "https://enkire.com" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Styles", href: "/generator-styles" },
      { title: "Pricing", href: "/pricing" },
      { title: "Blog", href: "/blog" },
    ],
  },
];
