import { env } from "@/env.mjs";

export const pricingData = [

  {
    title: "Starter",
    priceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID,  // Tomado de la variable de entorno
    description: "Casual Charmer: Spice up your social media game",
    price: 9.99,
    quantity: 40, // credits amount
    features: ["40 Credits"],
  },
/*
  {
    price: 0.99,
    description: "Tester: Only to to see my firsts shots",
    features: ["3 Credits"],
    quantity: 3,
  },
  {
    price: 9.99,
    description: "Casual Charmer: Spice up your social media game",
    features: ["40 Credits"],
    quantity: 40,
  },
  {
    price: 19.99,
    description: "Portrait Pro: Elevate your online presence",
    features: ["100 Credits"],
    quantity: 100,
  },
  {
    price: 29.99,
    description: "Team Transformer: Make your whole squad shine",
    features: ["200 Credits"],
    quantity: 200,
  },
  {
    price: 39.99,
    description: "Team Transformer: Make your whole squad shine",
    features: ["400 Credits"],
    quantity: 400,
  },
  */
];
