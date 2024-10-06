import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { HeaderSection } from "../shared/header-section";

// Updated FAQ with more relevant Dreambez pricing and services questions
const pricingFaqData = [
  {
    id: "item-1",
    question: "How do credits work at Dreambez?",
    answer:
      "Credits are the magic behind Dreambez! They allow you to take amazing shots, create beautiful Dream Albums, or even train custom AI models. Depending on your plan, you get a set number of credits each month or year, and you can use them however you like! One credit equals one shot, while albums or custom models cost more. It’s designed to give you flexibility!",
  },
  {
    id: "item-2",
    question: "Can I buy just one Dream Album?",
    answer:
      "Absolutely! You just need to select the plan with credits closest to the price of your desired Dream Album. For example, the Business plan gives enough credits to create 4 printed albums or 10 digital ones! Plus, for the same price, you get a whole year of fantastic services like support and access to photo templates. And those extra credits? Perfect for shots with loved ones or custom models!",
  },
  {
    id: "item-3",
    question: "What’s included with each plan?",
    answer:
      "Each plan includes credits that you can use for shots, Dream Albums (printed or digital), or custom model training. The Business plan is for power users with the most credits and features, Pro is for advanced users, and Starter is perfect for beginners. Plus, each plan offers different levels of support and templates!",
  },
  {
    id: "item-4",
    question: "Why use credits for products and services?",
    answer:
      "Our credits system gives you ultimate flexibility! You can choose to use them for shots, albums, or custom models. It’s a fun way to balance your creativity with what you need most. You get a lot of value and more than just the product – from support to additional features. It’s like getting bonus gifts along with your purchase!",
  },
  {
    id: "item-5",
    question: "What happens if I don’t use all my credits?",
    answer:
      "No worries! You can roll over your unused credits within the year. If you're on an annual plan, it’s the perfect way to build up extra credits and use them when you’re ready for big projects like a custom Dream Album or creating unique shots with your family and friends!",
  },
  {
    id: "item-6",
    question: "Can I upgrade my plan if I need more credits?",
    answer:
      "Of course! You can upgrade to a higher plan at any time to get more credits, features, and support. If you're creating lots of custom albums or need more shots, upgrading ensures you have everything you need to bring your creative dreams to life!",
  },
  {
    id: "item-7",
    question: "What support options do I get with each plan?",
    answer:
      "Support is tailored to your plan! Starter offers basic email support during working hours, while Pro and Business plans include chat support to help you faster. Our team works only 4 hours a day, but we promise to make those hours count to help you as quickly as possible!",
  },
  {
    id: "item-8",
    question: "How can I make the most out of my Dreambez credits?",
    answer:
      "Use your credits for a mix of shots, albums, and even custom AI models! Plan your projects so that you can capture special moments throughout the year, create stunning Dream Albums, and experiment with personalized AI models. It's all about having fun and creating something unique!",
  },
  {
    id: "item-9",
    question: "What’s the difference between printed and digital Dream Albums?",
    answer:
      "Digital Dream Albums are perfect for sharing online and cost 73 credits each. Printed Dream Albums are great for showing off at home and cost 180 credits each. Both are stunning, but printed albums are more premium, making them an incredible gift or keepsake.",
  },
  {
    id: "item-10",
    question: "Why does Dreambez use a credits system?",
    answer:
      "We believe in giving you flexibility! Credits let you choose how you want to spend them – whether it’s creating gorgeous shots, stunning Dream Albums, or training a custom model. Plus, with every plan, you get more than just products – you'll have access to support and useful tools to get the best experience possible!",
  },
];

export function PricingFaq() {
  return (
    <section className="container max-w-4xl py-2">
      <HeaderSection
        label="FAQ"
        title="Frequently Asked Questions"
        subtitle="Explore our comprehensive FAQ to find quick answers to common
          inquiries. If you need further assistance, don't hesitate to
          contact us for personalized help."
      />

      <Accordion type="single" collapsible className="my-12 w-full">
        {pricingFaqData.map((faqItem) => (
          <AccordionItem key={faqItem.id} value={faqItem.id}>
            <AccordionTrigger>{faqItem.question}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground sm:text-[15px]">
              {faqItem.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}


/*

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { HeaderSection } from "../shared/header-section";

const pricingFaqData = [
  {
    id: "item-1",
    question: "What is the cost of the free plan?",
    answer:
      "Our free plan is completely free, with no monthly or annual charges. It's a great way to get started and explore our basic features.",
  },
  {
    id: "item-2",
    question: "How much does the Basic Monthly plan cost?",
    answer:
      "The Basic Monthly plan is priced at $15 per month. It provides access to our core features and is billed on a monthly basis.",
  },
  {
    id: "item-3",
    question: "What is the price of the Pro Monthly plan?",
    answer:
      "The Pro Monthly plan is available for $25 per month. It offers advanced features and is billed on a monthly basis for added flexibility.",
  },
  {
    id: "item-4",
    question: "Do you offer any annual subscription plans?",
    answer:
      "Yes, we offer annual subscription plans for even more savings. The Basic Annual plan is $144 per year, and the Pro Annual plan is $300 per year.",
  },
  {
    id: "item-5",
    question: "Is there a trial period for the paid plans?",
    answer:
      "We offer a 14-day free trial for both the Pro Monthly and Pro Annual plans. It's a great way to experience all the features before committing to a paid subscription.",
  },
];

export function PricingFaq() {
  return (
    <section className="container max-w-4xl py-2">
      <HeaderSection
        label="FAQ"
        title="Frequently Asked Questions"
        subtitle="Explore our comprehensive FAQ to find quick answers to common
          inquiries. If you need further assistance, don't hesitate to
          contact us for personalized help."
      />

      <Accordion type="single" collapsible className="my-12 w-full">
        {pricingFaqData.map((faqItem) => (
          <AccordionItem key={faqItem.id} value={faqItem.id}>
            <AccordionTrigger>{faqItem.question}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground sm:text-[15px]">
              {faqItem.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

*/
