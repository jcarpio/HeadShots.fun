import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { getStripeCustomerId, hasPurchases } from "@/lib/user";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { siteConfig } from "@/config/site";
import { CreditTransactionHistory } from "@/components/dashboard/billing-credits-list";
import { CustomerPortalButton } from "@/components/forms/customer-portal-button";

export const metadata = constructMetadata({
  title: `Billing – ${siteConfig.title}`,
  description: "Manage billing and your credits.",
});

export default async function BillingPage() {
  const user = await getCurrentUser();
  const stripeCustomerId = await getStripeCustomerId(user.id);
  const hasPaid = await hasPurchases(user.id);
  
  return (
    <>
      <DashboardHeader
        heading="Billing"
        text="Check your credits transactions and usage."
      />
      <div className="grid gap-8">
        <CreditTransactionHistory />
      </div>
        {hasPaid && stripeCustomerId ? (
          <CustomerPortalButton userStripeId={stripeCustomerId} />
        ) : (
          <Link href="/pricing" className={cn(buttonVariants())}>
            Choose a plan
          </Link>
        )}
      <div className="my-8 text-center text-sm text-muted-foreground">
        <p>If you have any questions about billing, please contact us at <a href="mailto:support@dreambez.com">support@headshots.fun</a></p>
      </div>
    </>
  );
}
