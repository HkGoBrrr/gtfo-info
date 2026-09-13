import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  sendPushNotification,
  sendEmailNotification,
  formatSaleNotification,
} from "@/lib/notifications";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL;

  if (!key) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const stripe = new Stripe(key);
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // Allow unsigned events in dev/test (remove this check in production)
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerEmail = session.customer_details?.email || "unknown";
        const amount = session.amount_total || 0;

        // Determine plan type from amount
        const plan = amount >= 6000 ? "Annual" : "Monthly";

        const notification = formatSaleNotification(customerEmail, plan, amount);

        // Send push notification to phone
        await sendPushNotification(notification.title, notification.message);

        // Send email notification to owner
        if (ownerEmail) {
          await sendEmailNotification(
            ownerEmail,
            notification.title,
            notification.html
          );
        }

        console.log(`✅ Sale: ${customerEmail} — ${plan} — $${(amount / 100).toFixed(2)}`);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Notify on cancellation
        await sendPushNotification(
          "❌ Subscription Cancelled",
          `Customer ${customerId} cancelled their GTFO Pro subscription`
        );

        console.log(`❌ Cancellation: ${customerId}`);
        break;
      }

      default:
        console.log(`Unhandled event: ${event.type}`);
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
  }

  return NextResponse.json({ received: true });
}
