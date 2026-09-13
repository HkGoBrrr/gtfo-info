export async function sendPushNotification(title: string, message: string) {
  const topic = process.env.NTFY_TOPIC;
  if (!topic) return;

  try {
    await fetch(`https://ntfy.sh/${topic}`, {
      method: "POST",
      headers: {
        Title: title,
        Priority: "high",
        Tags: "money_with_wings,tada",
      },
      body: message,
    });
  } catch (err) {
    console.error("Push notification failed:", err);
  }
}

export async function sendEmailNotification(
  to: string,
  subject: string,
  html: string
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("RESEND_API_KEY not set, skipping email");
    return;
  }

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "GTFO Info <notifications@gtfoinfo.com>",
        to,
        subject,
        html,
      }),
    });
  } catch (err) {
    console.error("Email notification failed:", err);
  }
}

export function formatSaleNotification(
  customerEmail: string,
  plan: string,
  amount: number
): { title: string; message: string; html: string } {
  const amountStr = `$${(amount / 100).toFixed(2)}`;
  return {
    title: `💰 New GTFO Pro Sale — ${amountStr}`,
    message: `${customerEmail} just subscribed to ${plan} (${amountStr})`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px;">
        <h2 style="color: #00e5ff;">New GTFO Pro Subscription</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #888;">Customer</td><td style="padding: 8px 0;">${customerEmail}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Plan</td><td style="padding: 8px 0;">${plan}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Amount</td><td style="padding: 8px 0;">${amountStr}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Time</td><td style="padding: 8px 0;">${new Date().toLocaleString()}</td></tr>
        </table>
        <p style="margin-top: 16px;"><a href="https://dashboard.stripe.com/customers" style="color: #00e5ff;">View in Stripe →</a></p>
      </div>
    `,
  };
}
