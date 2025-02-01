import { NextResponse } from "next/server";
import crypto from "crypto";

let latestPushData = null as any;

export async function POST(request: Request) {
  try {
    // Parse the incoming JSON body
    const body = await request.json();

    // Get the signature from the headers for verification
    const signature = request.headers.get("x-hub-signature-256");

    // GitHub secret (you can store it in .env for better security)
    const secret = process.env.GITHUB_WEBHOOK_SECRET;

    if (!secret) {
      return NextResponse.json(
        { message: "Secret not found" },
        { status: 400 }
      );
    }

    // Verify the signature
    const isValid = verifySignature(body, signature, secret);

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 400 }
      );
    }

    // Store the latest push event (you can store this in a database in production)
    latestPushData = body;

    // Log the data (for debugging purposes)
    console.log("Webhook received", body);

    // Send a success response
    return NextResponse.json({ message: "Webhook received" });
  } catch (error) {
    console.error("Error processing the webhook:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Function to verify the webhook signature
function verifySignature(body: any, signature: string | null, secret: string) {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = `sha256=${hmac.update(JSON.stringify(body)).digest("hex")}`;
  return signature === digest;
}

export async function GET() {
  if (latestPushData) {
    return NextResponse.json(latestPushData);
  } else {
    return NextResponse.json(
      { message: "No push data available" },
      { status: 404 }
    );
  }
}
