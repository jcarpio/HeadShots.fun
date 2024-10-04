import Stripe from "stripe";
import { env } from "@/env.mjs";
import { prisma } from "@/lib/db"; // Gestión de la base de datos

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
  typescript: true,
});

// Función para crear una sesión de suscripción de Stripe
export async function createCheckoutSessionForSubscription(
  priceId: string, // ID del plan de suscripción mensual
  userId: string,
  emailAddress: string
) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId, // Usamos el ID del precio preconfigurado en Stripe para suscripciones
        quantity: 1,
      },
    ],
    billing_address_collection: "auto",
    customer_creation: "if_required",
    subscription_data: {
      metadata: {
        userId, // Agregamos el ID del usuario a la metadata
      },
    },
    allow_promotion_codes: true,
    automatic_tax: {
      enabled: true,
    },
    mode: "subscription", // Cambiamos a modo "subscription"
    success_url: `${env.NEXT_PUBLIC_APP_URL}/payment-status?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.NEXT_PUBLIC_APP_URL}/pricing`,
    customer_email: emailAddress, // Pre-poblamos el email del cliente
  });

  return session; // Devolvemos la sesión de Stripe completa
}

// Función para manejar webhooks de Stripe
export async function handleStripeWebhook(req: any) {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`⚠️  Webhook signature verification failed: ${err.message}`);
    throw new Error(`Webhook Error: ${err.message}`);
  }

  // Manejar el evento
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode === "subscription") {
        await handleSubscriptionCreation(session);
      }
      break;
    }
    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      await handleSuccessfulSubscriptionPayment(invoice);
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionCancellation(subscription);
      break;
    }
    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  return { received: true };
}

// Manejar la creación de una suscripción
export async function handleSubscriptionCreation(session: Stripe.Checkout.Session) {
  const subscriptionId = session.subscription as string;
  const userId = session.metadata?.userId;

  if (!userId) {
    throw new Error("User ID not found in session metadata");
  }

  // Almacenar la suscripción en la base de datos
  await prisma.subscription.create({
    data: {
      userId: userId,
      stripeSubscriptionId: subscriptionId,
      status: "active", // Inicialmente, está activa
    },
  });
}

// Manejar el pago exitoso de una suscripción
export async function handleSuccessfulSubscriptionPayment(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string;

  const subscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: subscriptionId },
  });

  if (!subscription) {
    throw new Error(`Subscription not found for ID: ${subscriptionId}`);
  }

  // Actualizar el estado de la suscripción como "pagada"
  await prisma.subscription.update({
    where: { stripeSubscriptionId: subscriptionId },
    data: {
      status: "paid",
    },
  });

  // Aquí puedes agregar lógica para aumentar créditos o habilitar características
  await prisma.user.update({
    where: { id: subscription.userId },
    data: {
      credits: { increment: 100 }, // Ejemplo: agregar 100 créditos con cada pago exitoso
    },
  });
}

// Manejar la cancelación de una suscripción
export async function handleSubscriptionCancellation(subscription: Stripe.Subscription) {
  const subscriptionId = subscription.id;

  // Actualizar la suscripción en la base de datos
  await prisma.subscription.update({
    where: { stripeSubscriptionId: subscriptionId },
    data: {
      status: "canceled",
    },
  });
}


/*
import Stripe from "stripe"

import { env } from "@/env.mjs"

export const stripe = new Stripe(env.STRIPE_API_KEY, {
  apiVersion: "2024-04-10",
  typescript: true,
})

*/
