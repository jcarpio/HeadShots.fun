import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { HeaderSection } from "../shared/header-section";

// Updated FAQ with the new credits system
const pricingFaqData = [
  {
    id: "item-1",
    question: "How do credits work at DreamBez?",
    answer:
      "At DreamBez, credits are your currency for creativity! Each credit costs $0.40. You can use 1 credit to generate a photo, and creating a custom model costs 25 credits. It’s a simple and flexible system designed to give you full control over your experience.",
  },
  {
    id: "item-2",
    question: "How much does it cost to generate a photo or a custom model?",
    answer:
      "Generating a photo at DreamBez costs 1 credit, which is equivalent to $0.40. If you'd like to create a personalized AI model, it costs 25 credits, or $10. With this system, you pay only for what you use, giving you maximum flexibility.",
  },
  {
    id: "item-3",
    question: "How can I purchase credits?",
    answer:
      "You can easily purchase credits directly from your DreamBez account. Simply choose the number of credits you'd like, starting at just $0.40 per credit. The more credits you buy, the more you can create!",
  },
  {
    id: "item-4",
    question: "What can I use my credits for?",
    answer:
      "Credits at DreamBez can be used to generate AI photos or to create custom models. One credit is all it takes to generate a photo, while a custom model costs 25 credits. The flexibility of credits lets you manage your creative projects on your own terms.",
  },
  {
    id: "item-5",
    question: "Do credits expire?",
    answer:
      "No, your credits at DreamBez do not expire. You can use them whenever you're ready, whether it's for creating a single photo or building a custom model. Keep them for as long as you need and unleash your creativity when inspiration strikes!",
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
