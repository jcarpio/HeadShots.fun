import { env } from "@/env.mjs";

export const pricingData = [

  {
    title: "Photos PLUS",
    price: 9.99,
    regularPrice: 0.99,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PLUS_CREDITS_PRICE_ID ?? "", 
    description: "",
    features: ["PLUS 20 Hyper Realistic photos"],
    quantity: 20, // credits amount
  },
  {
    title: "Starter Pack",
    price: 29.99,
    regularPrice: 33.33, 
    priceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_CREDITS_PRICE_ID ?? "", 
    description: "",
    features: ["10% Discount, 1 Hyper Realistic Model + 40 Hyper Realistic photos"],
    quantity: 65,
  },
  {
    title: "Pro Pack",
    price: 69.99,
    regularPrice: 87.49,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_CREDITS_PRICE_ID ?? "", 
    description: "",
    features: ["20% Discount, 3 Hyper Realistic Models + 94 Hyper Realistic photos"],
    quantity: 169,
  },
];
