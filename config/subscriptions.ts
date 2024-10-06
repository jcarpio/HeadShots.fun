import { PlansRow, SubscriptionPlan } from "types";
import { env } from "@/env.mjs";

export const pricingData: SubscriptionPlan[] = [
  {
    title: "Starter",
    description: "Perfect for beginners",
    benefits: [
      "Credits: 141 yearly / 11 monthly", // Credits for shots and products
      "Take up to 9 shots monthly (1 credit per shot)",
      "Or get 1 Dream Album Digital per year (73 credits each)",
      "Basic email support during work hours",
      "Access to standard templates",
    ],
    limitations: [
      "No custom AI model training (25 credits per model).",
      "No access to printed Dream Albums.",
      "No priority support",
      "Limited to 1 user account.",
    ],
    prices: {
      monthly: 6,
      yearly: 69,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_STARTER_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_STARTER_YEARLY_PLAN_ID,
    },
  },
  {
    title: "Pro",
    description: "Unlock advanced features",
    benefits: [
      "Credits: 321 yearly / 23 monthly", // Credits for shots and products
      "Take up to 21 shots monthly (1 credit per shot)",
      "Or get up to 4 Dream Albums Digital per year (73 credits each)",
      "Or train custom models up to 12 times per year (25 credits each)",
      "Priority chat support during work hours",
      "Access to professional photo templates",
    ],
    limitations: [
      "No access to printed Dream Albums.",
      "Limited to 3 user accounts.",
    ],
    prices: {
      monthly: 15,
      yearly: 144,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
    },
  },
  {
    title: "Business",
    description: "For power users",
    benefits: [
      "Credits: 735 yearly / 52 monthly", // Credits for shots and products
      "Take up to 49 shots monthly (1 credit per shot)",
      "Or get up to 10 Dream Albums Digital per year (73 credits each)",
      "Or get up to 4 Dream Albums Printed per year (180 credits each)",
      "Or train custom models up to 29 times per year (25 credits each)",
      "Chat support during work hours",
      "Assisted onboarding and advanced photo templates",
    ],
    limitations: [],
    prices: {
      monthly: 30,
      yearly: 300,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID,
    },
  },
];

export const plansColumns = [
  "starter",
  "pro",
  "business",
] as const;

export const comparePlans: PlansRow[] = [
    {
    feature: "Credits per Year",
    starter: "154",
    pro: "321",
    business: "735",
  },
  {
    feature: "Credits per Month",
    starter: "11",
    pro: "23",
    business: "52",
  },
   {
    feature: "Shots (1 credit each)",
    starter: "154/year",
    pro: "321/year",
    business: "735/year",
    tooltip: "Each shot requires 1 credit.",
  },
  {
    feature: "Shots (1 credit each)",
    starter: "11/mo",
    pro: "23/mo",
    business: "52/mo",
    tooltip: "Each shot requires 1 credit.",
  },
  {
    feature: "Dream Album (Digital)",
    starter: "2/year",
    pro: "4/year",
    business: "10/year",
    tooltip: "Digital albums require 73 credits each.",
  },
  {
    feature: "Dream Album (Printed)",
    starter: null,
    pro: "1/year",
    business: "4/year",
    tooltip: "Printed albums require 180 credits each.",
  },
  {
    feature: "Custom Model Training",
    starter: "6/year",
    pro: "12/year",
    business: "29/year",
    tooltip: "Train custom models for personalized photo creation (25 credits per model).",
  },
  {
    feature: "Support",
    starter: "Email (work hours)",
    pro: "Chat (work hours)",
    business: "Chat (work hours)",
    tooltip: "Support is available during working hours.",
  },
  {
    feature: "Users per Account",
    starter: "1",
    pro: "Up to 3",
    business: "Unlimited",
    tooltip: "More user accounts are available with higher plans.",
  },
  {
    feature: "Onboarding Assistance",
    starter: "Not included",
    pro: "Self-service",
    business: "Assisted",
    tooltip: "Higher plans include more comprehensive onboarding assistance.",
  },
  {
    feature: "Access to Templates",
    starter: "Basic",
    pro: "Professional",
    business: "All templates",
    tooltip: "Access to a range of templates improves with higher plans.",
  },
];



/*

import { PlansRow, SubscriptionPlan } from "types";
import { env } from "@/env.mjs";

export const pricingData: SubscriptionPlan[] = [
  {
    title: "Starter",
    description: "For Beginners",
    benefits: [
      "Up to 100 monthly posts",
      "Basic analytics and reporting",
      "Access to standard templates",
    ],
    limitations: [
      "No priority access to new features.",
      "Limited customer support",
      "No custom branding",
      "Limited access to business resources.",
    ],
    prices: {
      monthly: 6,
      yearly: 69,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_STARTER_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_STARTER_YEARLY_PLAN_ID,
    },
  },
  {
    title: "Pro",
    description: "Unlock Advanced Features",
    benefits: [
      "Up to 500 monthly posts",
      "Advanced analytics and reporting",
      "Access to business templates",
      "Priority customer support",
      "Exclusive webinars and training.",
    ],
    limitations: [
      "No custom branding",
      "Limited access to business resources.",
    ],
    prices: {
      monthly: 15,
      yearly: 144,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
    },
  },
  {
    title: "Business",
    description: "For Power Users",
    benefits: [
      "Unlimited posts",
      "Real-time analytics and reporting",
      "Access to all templates, including custom branding",
      "24/7 business customer support",
      "Personalized onboarding and account management.",
    ],
    limitations: [],
    prices: {
      monthly: 30,
      yearly: 300,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID,
    },
  },
];

export const plansColumns = [
  "starter",
  "pro",
  "business",
  "enterprise",
] as const;

export const comparePlans: PlansRow[] = [
  {
    feature: "Access to Analytics",
    starter: true,
    pro: true,
    business: true,
    enterprise: "Custom",
    tooltip: "All plans include basic analytics for tracking performance.",
  },
  {
    feature: "Custom Branding",
    starter: null,
    pro: "500/mo",
    business: "1,500/mo",
    enterprise: "Unlimited",
    tooltip: "Custom branding is available from the Pro plan onwards.",
  },
  {
    feature: "Priority Support",
    starter: null,
    pro: "Email",
    business: "Email & Chat",
    enterprise: "24/7 Support",
  },
  {
    feature: "Advanced Reporting",
    starter: null,
    pro: null,
    business: true,
    enterprise: "Custom",
    tooltip:
      "Advanced reporting is available in Business and Enterprise plans.",
  },
  {
    feature: "Dedicated Manager",
    starter: null,
    pro: null,
    business: null,
    enterprise: true,
    tooltip: "Enterprise plan includes a dedicated account manager.",
  },
  {
    feature: "API Access",
    starter: "Limited",
    pro: "Standard",
    business: "Enhanced",
    enterprise: "Full",
  },
  {
    feature: "Monthly Webinars",
    starter: false,
    pro: true,
    business: true,
    enterprise: "Custom",
    tooltip: "Pro and higher plans include access to monthly webinars.",
  },
  {
    feature: "Custom Integrations",
    starter: false,
    pro: false,
    business: "Available",
    enterprise: "Available",
    tooltip:
      "Custom integrations are available in Business and Enterprise plans.",
  },
  {
    feature: "Roles and Permissions",
    starter: null,
    pro: "Basic",
    business: "Advanced",
    enterprise: "Advanced",
    tooltip:
      "User roles and permissions management improves with higher plans.",
  },
  {
    feature: "Onboarding Assistance",
    starter: false,
    pro: "Self-service",
    business: "Assisted",
    enterprise: "Full Service",
    tooltip: "Higher plans include more comprehensive onboarding assistance.",
  },
  // Add more rows as needed
];
*/
