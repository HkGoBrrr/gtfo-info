import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const stripe = new Stripe(key);
    const body = await request.json();
    const { sessionId, profile } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session ID" }, { status: 400 });
    }

    // Verify the checkout session is real and paid
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    const customerId = session.customer as string;

    if (!customerId) {
      return NextResponse.json({ error: "No customer found" }, { status: 400 });
    }

    // Save the removal profile to the Stripe customer metadata
    await stripe.customers.update(customerId, {
      name: `${profile.firstName} ${profile.lastName}`,
      metadata: {
        removal_firstName: profile.firstName,
        removal_lastName: profile.lastName,
        removal_address: profile.address,
        removal_city: profile.city,
        removal_state: profile.state,
        removal_zip: profile.zip,
        removal_phone: profile.phone,
        removal_dateOfBirth: profile.dateOfBirth || "",
        removal_additionalEmails: profile.additionalEmails || "",
        removal_status: "pending",
        removal_submittedAt: new Date().toISOString(),
      },
    });

    // Auto-trigger opt-out requests in the background
    const origin = request.nextUrl.origin;
    fetch(`${origin}/api/optout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId }),
    }).catch((err) => console.error("Background opt-out trigger failed:", err));

    return NextResponse.json({ success: true, customerId });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Onboarding error:", message);
    return NextResponse.json(
      { error: "Failed to save profile", detail: message },
      { status: 500 }
    );
  }
}

// GET route to check session status (used by success page on load)
export async function GET(request: NextRequest) {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const stripe = new Stripe(key);
    const sessionId = request.nextUrl.searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session ID" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      status: session.payment_status,
      customerEmail: session.customer_details?.email || null,
      customerName: session.customer_details?.name || null,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
