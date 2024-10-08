"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PricingCardsProps {
  pricingData: Array<{
    price: number;
    regularPrice?: number;
    description: string;
    features: string[];
    quantity: number;
    priceId: string;
  }>;
  userId?: string;
  emailAddress?: string;
}

export function PricingCards({ pricingData, userId, emailAddress }: PricingCardsProps) {
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<number | null>(null);

  const handlePurchase = async (plan: typeof pricingData[0], index: number) => {
    if (!userId) {
      toast.error("Please sign in to purchase credits");
      return;
    }

    setLoadingPlan(index);
    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          emailAddress,
          priceId: plan.priceId,
          amount: Math.round(plan.price * 100) / 100,
          quantity: plan.quantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { checkoutUrl } = await response.json();
      if (!checkoutUrl) {
        throw new Error("Invalid checkout URL");
      }

      // Redirect to Stripe Checkout page
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Failed to initiate checkout. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="flex justify-center w-full items-center">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 py-5">
        {pricingData.map((plan, index) => (
          <PricingCard 
            key={index} 
            plan={plan} 
            index={index} 
            handlePurchase={handlePurchase}
            isLoading={loadingPlan === index}
          />
        ))}
      </div>
    </div>
  );
}

function PricingCard({ plan, index, handlePurchase, isLoading }) {
  return (
    <Card className={`relative flex w-full flex-col justify-between overflow-hidden rounded-3xl border transition-all hover:shadow-lg ${index === 1 ? 'border-purple-400' : ''} ${index === 1 ? 'mt-4 overflow-visible' : 'mt-8'}`}>
      {index === 1 && (
        <div className="absolute -top-3 left-1/2 z-10 flex -translate-x-1/2 rounded-full bg-purple-400 px-3 py-1 text-xs font-semibold text-white shadow-md">
          <span>Most&nbsp;Popular</span>
        </div>
      )}
      <CardHeader className="text-center bg-muted/50 p-6">
        <Badge variant="outline" className="mb-2 self-center">
          {plan.quantity} Credits
        </Badge>
        <div className="flex text-left text-3xl font-semibold leading-6">
          {plan.regularPrice && plan.regularPrice > plan.price ? (
            <>
              <span className="mr-2 text-muted-foreground/80 line-through">
                ${plan.regularPrice}
              </span>
              <span className="gradient-text">${plan.price}</span>
            </>
          ) : (
            <span className="gradient-text">${plan.price}</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-sm">
              <svg className="mr-2 size-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
          <Button
            className={`w-full rounded-full ${index === 1 ? "bg-purple-400 text-white hover:bg-purple-500" : "text-purple-500 hover:text-purple-600 hover:border-purple-500"}`} // Modificamos hover para evitar el negro
            onClick={() => handlePurchase(plan, index)}
            variant={index === 1 ? "default" : "outline"}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Purchase"}
        </Button>
      </CardFooter>
    </Card>
  );
}
