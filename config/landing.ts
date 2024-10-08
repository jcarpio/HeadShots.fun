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
    title: "Effortless Customization",
    description:
      "Tailor your AI-generated images to express your unique vision. Our intuitive tools allow for easy adjustments to every detail.",
    link: "/",
    icon: "sliders",
  },
  {
    title: "Instant Results",
    description:
      "Create stunning images in seconds. With AI technology, you can achieve professional-quality visuals without the wait.",
    link: "/",
    icon: "zap",
  },
  {
    title: "Seamless Integration",
    description:
      "Easily incorporate your images into personal or professional profiles, with formats optimized for any platform.",
    link: "/",
    icon: "share2",
  },
  {
    title: "Secure and Private",
    description:
      "Your data is safe with us. We prioritize your privacy and ensure that your images are securely stored and shared.",
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
      "Enjoy a playful and interactive experience as you create images that are both enjoyable and professional.",
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
