import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { handleSuccessfulSubscriptionPayment, handleSuccessfulPayment } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import type Stripe from "stripe"; // Import Stripe types for TypeScript support

// Webhook handler for Stripe
export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text(); // Stripe expects the raw body to verify the signature

  try {
    // Validate the signature with Stripe
    const event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);

    // Handle different Stripe event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

                    // Get the Stripe customer ID from the session
            let stripeCustomerId: string | undefined;
            
            // Check if session.customer is a string (which would be the customer ID directly)
            if (typeof session.customer === 'string') {
              stripeCustomerId = session.customer; // If it's a string, use it directly
            } else if (session.customer && 'id' in session.customer) {
              // Otherwise, if it's an object, get the ID from the object
              stripeCustomerId = session.customer.id;
            }
            
            // Retrieve email from the session or customer object
            let customerEmail = session.customer_email || 
              (typeof session.customer === 'object' && 'email' in session.customer ? session.customer.email : undefined);
            
            // If the session doesn't provide the customer email or stripeCustomerId, fetch the full customer details from Stripe
            if (!customerEmail || !stripeCustomerId) {
              try {
                const customer = await stripe.customers.retrieve(stripeCustomerId!); // Retrieve full customer object from Stripe
            
                // Check if the customer object has the email and ID, and it's not deleted
                if ('email' in customer && customer.email) {
                  customerEmail = customer.email;
                }
                
                // If stripeCustomerId was not provided in the session, get it from the full customer object
                if ('id' in customer && customer.id) {
                  stripeCustomerId = customer.id;
                } else {
                  console.error('Customer does not have a valid ID or is deleted');
                  throw new Error('Customer does not have a valid ID');
                }
              } catch (error) {
                console.error(`Error retrieving customer details for ID ${stripeCustomerId}:`, error);
                throw new Error('Failed to retrieve customer details');
              }
            }
            
            // At this point, you should have both stripeCustomerId and customerEmail to proceed
        
        // Ensure both userId and stripeCustomerId exist
        if (userId && stripeCustomerId) {
          // Update or store the stripeCustomerId in the User table
          await prisma.user.update({
            where: { id: userId }, // Update the user based on your internal userId
            data: { stripeCustomerId }, // Store the Stripe customer ID
          });
        }

        // Check if the session mode is for a subscription or a one-time payment
        if (session.mode === "subscription") {
          const invoice = await stripe.invoices.retrieve(session.invoice as string);
          await handleSuccessfulSubscriptionPayment(invoice); // Handle subscription payment
        } else if (session.mode === "payment") {
          await handleSuccessfulPayment(session.id); // Handle one-time payment
        }

        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleSuccessfulSubscriptionPayment(invoice); // Handle recurring payments for subscriptions
        break;
      }

      // Handle other Stripe events if needed
      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(`⚠️ Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }
}

/* import { NextResponse } from "next/server";
import { handleSuccessfulSubscriptionPayment } from "@/lib/stripe"; // Use the subscription-related function
import { stripe } from "@/lib/stripe"; 
import type Stripe from 'stripe'; // Import Stripe types for TypeScript support

// Webhook handler for Stripe
export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text(); // Stripe expects the raw body to verify the signature

  try {
    // Validate the signature with Stripe
    const event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);

    // Handle different Stripe event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session; // Use the Stripe type for session
        if (session.mode === "subscription") {
          // Process the subscription completion
          const invoice = await stripe.invoices.retrieve(session.invoice as string);
          await handleSuccessfulSubscriptionPayment(invoice);
        }
        break;
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleSuccessfulSubscriptionPayment(invoice);
        break;
      }
      // Add more event types as needed
      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(`⚠️ Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }
}
*/

/*

import { NextResponse } from "next/server";
import { handleSuccessfulSubscriptionPayment } from "@/lib/stripe"; // Use the subscription-related function
import { stripe } from "@/lib/stripe";

// Webhook handler for Stripe
export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text(); // Stripe expects the raw body to verify the signature

  try {
    // Validate the signature with Stripe
    const event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);

    // Handle different Stripe event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === "subscription") {
          // Process the subscription completion
          const invoice = await stripe.invoices.retrieve(session.invoice as string);
          await handleSuccessfulSubscriptionPayment(invoice);
        }
        break;
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleSuccessfulSubscriptionPayment(invoice);
        break;
      }
      // Add more event types as needed
      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(`⚠️ Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }
}

*/
