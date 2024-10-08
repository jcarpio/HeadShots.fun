export const BLOG_CATEGORIES: {
  title: string;
  slug: "news" | "education";
  description: string;
}[] = [
  {
    title: "News",
    slug: "news",
    description: "Updates and announcements from DreamBez.com",
  },
  {
    title: "Education",
    slug: "education",
    description: "Educational content about DreamBez.com",
  },
    {
    title: "Motivation",
    slug: "motivation",
    description: "Motivational content",
  },
    {
    title: "Stories",
    slug: "stories",
    description: "Stories about dreams",
  },
];

export const BLOG_AUTHORS = {
  UllrAI: {
    name: "UllrAI",
    image: "/_static/avatars/ullrai.svg",
    twitter: "Ullr_AI",
  },
  DreamBez: {
    name: "DreamBez Team",
    image: "/_static/avatars/enkire.svg",
  },
  Enkire: {
    name: "DreamBez Team",
    image: "/_static/avatars/enkire.svg",
  },
};
