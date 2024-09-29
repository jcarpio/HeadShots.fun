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
    job: "CEO de Pinturas Ortiz",
    image: "/_static/index/jesus_ortiz.jpg",
    review:
      "Verme en esas situaciones me han hecho replantearme muchas cosas sobre mi vida",
  },
  {
    name: "Jesus Toscano",
    job: "Emprendedor",
    image: "/_static/index/jesus_toscano.jpg",
    review:
      "Me vengo arriba cuándo veo la foto si estoy de bajón después de la quimio",
  },
  {
    name: "Alejandro Ortiz",
    job: "CEO de New Concept Tarifa",
    image: "/_static/index/alejandro_ortiz.jpg",
    review:
      "Me ha gustado mucho verme como millonario, con todo lo que eso puede suponer como persona",
  },
    {
    name: "Jose Carpio",
    job: "Profesor y CEO de Enkire",
    image: "/_static/index/jose_carpio.jpg",
    review:
      "Me puse a llorar cuándo vi mi foto. Siempre pensé: como hubiese sido sin esta enfermedad y ahí estaba era yo, fuerte, con pelo, feliz. Esa es mi verdadera esencia.",
  },
];
