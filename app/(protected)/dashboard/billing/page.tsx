import { getCurrentUser } from "@/lib/session";
import { getStripeCustomerId, hasPurchases } from "@/lib/user";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { siteConfig } from "@/config/site";
import { CreditTransactionHistory } from "@/components/dashboard/billing-credits-list";
import { CustomerPortalButton } from "@/components/forms/customer-portal-button";
import Link from "next/link"; // Import necessary Link component
import { buttonVariants } from "@/components/ui/button"; // Import button variants
import { cn } from "@/lib/utils"; // Utility function for conditionally applying classes

export const metadata = constructMetadata({
  title: `Billing – ${siteConfig.title}`,
  description: "Manage billing and your credits.",
});

export default async function BillingPage() {
  // Get the current user
  const user = await getCurrentUser();

  // If there's no user or user ID, handle the error or redirect
  if (!user || !user.id) {
    return <p>Please log in to manage your billing information.</p>;
  }

  // Get the Stripe customer ID from the user record
  const stripeCustomerId = await getStripeCustomerId(user.id);

  // Check if the user has made any purchases using hasPurchases function
  const hasPaid = await hasPurchases(user.id);

  return (
    <>
      <DashboardHeader
        heading="Billing"
        text="Check your credits transactions and usage."
      />

      <div className="grid gap-8">
        {/* Render the credit transaction history */}
        <CreditTransactionHistory />
      </div>

      <div className="my-8 text-center text-sm text-muted-foreground">
        {/* Conditionally render the button or a link to pricing */}
        {hasPaid && stripeCustomerId ? (
          <CustomerPortalButton userStripeId={stripeCustomerId} />
        ) : (
          <Link href="/pricing" className={cn(buttonVariants())}>
            Choose a plan
          </Link>
        )}
      </div>

      <div className="my-8 text-center text-sm text-muted-foreground">
        <p>
          If you have any questions about billing, please contact us at{" "}
          <a href="mailto:support@enkire.com">support@enkire.com</a>
        </p>
      </div>
    </>
  );
}
