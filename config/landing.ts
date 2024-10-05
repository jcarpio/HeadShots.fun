import { FeatureLdg, InfoLdg, TestimonialType } from "types";

export const infos: InfoLdg[] = [
  {
    title: "Empower Your Creativity",
    description:
      "Unlock the fun and potential of your headshots with DreamBez.com. Transform simple snapshots into captivating AI-enhanced images that reflect your true self.",
    image: "/_static/illustrations/work-from-home.jpg",
    list: [
      {
        title: "Create Effortlessly",
        description: "Enjoy a seamless and intuitive process that makes creating the perfect headshot a breeze.",
        icon: "laptop",
      },
      {
        title: "Personalize with AI",
        description: "Use advanced AI tools to customize every aspect of your headshot, ensuring it’s uniquely you.",
        icon: "settings",
      },
      {
        title: "Elevate Your Presence",
        description: "Whether for work or play, make sure your online presence stands out with headshots that combine fun with professionalism.",
        icon: "search",
      },
    ],
  }
];

export const features: FeatureLdg[] = [
  {
    title: "Effortless Customization",
    description:
      "Tailor your AI-generated headshots to fit your unique style. Our intuitive tools make it easy to adjust every detail.",
    link: "/",
    icon: "sliders", 
  },
  {
    title: "Instant Results",
    description:
      "Generate stunning headshots in seconds. With the power of AI, you'll never have to wait for professional-quality images.",
    link: "/",
    icon: "zap", 
  },
  {
    title: "Seamless Integration",
    description:
      "Easily incorporate your headshots into your personal or professional profiles, with formats optimized for any platform.",
    link: "/",
    icon: "share2", 
  },
  {
    title: "Secure and Private",
    description:
      "Your data is safe with us. We prioritize your privacy and ensure that your headshots are securely stored and shared.",
    link: "/",
    icon: "shield", 
  },
  {
    title: "AI-Enhanced Creativity",
    description:
      "Leverage the power of AI to explore creative possibilities. Experiment with different styles and looks effortlessly.",
    link: "/",
    icon: "cpu", 
  },
  {
    title: "Fun and Engaging",
    description:
      "Enjoy a playful and engaging experience as you create headshots that are both fun and professional.",
    link: "/",
    icon: "smile", 
  },
];

export const testimonials: TestimonialType[] = [
  {
    name: "Jesus Ortiz",
    job: "CEO of Pinturas Ortiz",
    image: "/_static/index/jesus_ortiz.jpg",
    review:
      "Seeing myself in those situations has made me reconsider many things about my life",
  },
  {
    name: "Jesus Toscano",
    job: "Entrepreneur",
    image: "/_static/index/jesus_toscano.jpg",
    review:
      "I get uplifted when I see the photo, especially if I'm feeling down after chemo",
  },
  {
    name: "Alejandro Ortiz",
    job: "CEO of New Concept Tarifa",
    image: "/_static/index/alejandro_ortiz.jpg",
    review:
      "I really liked seeing myself as a millionaire, with everything that could mean as a person",
  },
  {
    name: "Jose Carpio",
    job: "Teacher and CEO of Enkire",
    image: "/_static/index/jose_carpio.jpg",
    review:
      "I started crying when I saw my photo. I always thought: what would it have been like without this illness? And there I was, strong, with hair, happy. That’s my true essence.",
  },
];
