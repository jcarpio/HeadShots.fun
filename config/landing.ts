import { FeatureLdg, InfoLdg, TestimonialType } from "types";

export const infos: InfoLdg[] = [
  {
    title: "Empower Your Imagination",
    description:
      "At DreamBez, we create illusions using cutting-edge technology, like the advanced nVidia A100 80 GB graphics cards, valued at over $20,000. Our mission is to make AI technology accessible, enabling everyone to create hyper-realistic images effortlessly.",
    image: "/_static/illustrations/work-from-home.jpg",
    list: [
      {
        title: "Dream with Ease",
        description: "Experience a user-friendly platform that simplifies the process of creating stunning images.",
        icon: "laptop",
      },
      {
        title: "Visualize Your Goals",
        description: "Harness the power of advanced AI tools to customize and visualize your dreams into reality.",
        icon: "settings",
      },
      {
        title: "Inspire and Create",
        description: "Whether for personal projects or gifts, let your creativity shine through images that reflect your aspirations.",
        icon: "search",
      },
    ],
  }
];

export const features: FeatureLdg[] = [
  {
    title: "Empowering Dreams",
    description:
      "At DreamBez, we harness advanced AI technology to help you visualize and realize your dreams, turning aspirations into stunning visuals.",
    link: "/",
    icon: "settings", 
  },
  {
    title: "Seamless Illusions",
    description:
      "Create hyper-realistic images effortlessly, using our state-of-the-art tools that simplify the entire creative process.",
    link: "/",
    icon: "magic", 
  },
  {
    title: "Personalized Journeys",
    description:
      "Every creation is a reflection of you. Customize each image to embody your unique vision and emotional journey.",
    link: "/",
    icon: "pencil", 
  },
  {
    title: "Share Your Vision",
    description:
      "Easily share your personalized images with loved ones, making it simple to gift these visualizations of dreams and aspirations.",
    link: "/",
    icon: "share2",
  },
  {
    title: "Privacy and Security",
    description:
      "Your creative journey is safe with us. We prioritize the security of your data and images, ensuring your privacy is always respected.",
    link: "/",
    icon: "shield",
  },
  {
    title: "Joyful Creation Experience",
    description:
      "Engage in a playful and fulfilling process as you create images that inspire and uplift, reflecting your true self and ambitions.",
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
      "Seeing myself in those situations has made me reconsider many things about my life.",
  },
  {
    name: "Jesus Toscano",
    job: "Entrepreneur",
    image: "/_static/index/jesus_toscano.jpg",
    review:
      "I get uplifted when I see the photo, especially if I'm feeling down after chemo.",
  },
  {
    name: "Alejandro Ortiz",
    job: "CEO of New Concept Tarifa",
    image: "/_static/index/alejandro_ortiz.jpg",
    review:
      "I really liked seeing myself as a millionaire, with everything that could mean as a person.",
  },
  {
    name: "Jose Carpio",
    job: "Teacher and CEO of Enkire",
    image: "/_static/index/jose_carpio.jpg",
    review:
      "I started crying when I saw my photo. I always thought: what would it have been like without this illness? And there I was, strong, with hair, happy. That’s my true essence.",
  },
];
