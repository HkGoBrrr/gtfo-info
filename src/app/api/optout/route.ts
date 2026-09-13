import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { OPT_OUT_METHODS, generateOptOutEmail } from "@/lib/optout";
import { sendEmailNotification, sendPushNotification } from "@/lib/notifications";

export const dynamic = "force-dynamic";

// Trigger opt-out requests for a specific customer
export async function POST(request: NextRequest) {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    const resendKey = process.env.RESEND_API_KEY;

    if (!key) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const stripe = new Stripe(key);
    const body = await request.json();
    const { customerId } = body;

    if (!customerId) {
      return NextResponse.json({ error: "Missing customer ID" }, { status: 400 });
    }

    // Get customer data from Stripe
    const customer = await stripe.customers.retrieve(customerId);

    if (customer.deleted) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    const meta = customer.metadata;
    const profile = {
      firstName: meta.removal_firstName || "",
      lastName: meta.removal_lastName || "",
      address: meta.removal_address || "",
      city: meta.removal_city || "",
      state: meta.removal_state || "",
      zip: meta.removal_zip || "",
      dateOfBirth: meta.removal_dateOfBirth || "",
    };

    if (!profile.firstName || !profile.lastName) {
      return NextResponse.json(
        { error: "Customer hasn't completed onboarding" },
        { status: 400 }
      );
    }

    const results: {
      broker: string;
      method: string;
      status: "sent" | "link_generated" | "skipped";
      detail: string;
    }[] = [];

    // Process each broker
    for (const optOut of OPT_OUT_METHODS) {
      if (optOut.method === "email" && optOut.email && resendKey) {
        // Send opt-out email directly to the broker
        const emailContent = generateOptOutEmail(optOut.brokerName, profile);

        try {
          const fromAddress = process.env.RESEND_FROM || "removals@gtfoinfo.com";
          
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${resendKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: fromAddress,
              to: optOut.email,
              subject: emailContent.subject,
              text: emailContent.body,
              reply_to: customer.email || undefined,
            }),
          });

          results.push({
            broker: optOut.brokerName,
            method: "email",
            status: "sent",
            detail: `Removal email sent to ${optOut.email}`,
          });
        } catch (err) {
          console.error(`Failed to email ${optOut.brokerName}:`, err);
          results.push({
            broker: optOut.brokerName,
            method: "email",
            status: "skipped",
            detail: "Email send failed",
          });
        }
      } else if (optOut.method === "web_form" && optOut.webFormUrl) {
        // For web form brokers, log the link (manual or future automation)
        results.push({
          broker: optOut.brokerName,
          method: "web_form",
          status: "link_generated",
          detail: optOut.webFormUrl,
        });
      } else {
        results.push({
          broker: optOut.brokerName,
          method: optOut.method,
          status: "skipped",
          detail: "No automated method available yet",
        });
      }
    }

    // Update customer metadata with opt-out status
    const sentCount = results.filter((r) => r.status === "sent").length;
    const linkCount = results.filter((r) => r.status === "link_generated").length;

    await stripe.customers.update(customerId, {
      metadata: {
        ...meta,
        removal_status: "in_progress",
        removal_emailsSent: String(sentCount),
        removal_webFormsQueued: String(linkCount),
        removal_lastProcessed: new Date().toISOString(),
      },
    });

    // Notify owner
    await sendPushNotification(
      "🔄 Opt-outs Processed",
      `${profile.firstName} ${profile.lastName}: ${sentCount} emails sent, ${linkCount} web forms queued`
    );

    return NextResponse.json({
      success: true,
      summary: {
        emailsSent: sentCount,
        webFormsQueued: linkCount,
        total: results.length,
      },
      results,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Opt-out error:", message);
    return NextResponse.json(
      { error: "Opt-out processing failed", detail: message },
      { status: 500 }
    );
  }
}
