import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  email: z.string().email("Invalid email address"),
  turnstileToken: z.string().min(1, "Captcha is required"),
});

export async function POST(req: NextRequest) {
  console.log("API: Waiting List request received");
  try {
    let body;
    try {
      body = await req.json();
    } catch (e) {
      console.error("API: Failed to parse JSON body", e);
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    console.log("API: Validating schema", body);
    const { email, turnstileToken } = schema.parse(body);

    // 1. Validate Turnstile Token
    console.log("API: Verifying Turnstile token");
    const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const verificationResponse = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
    });

    const verificationData = await verificationResponse.json();
    console.log("API: Turnstile response", verificationData);
    if (!verificationData.success) {
      return NextResponse.json({ error: "Captcha verification failed" }, { status: 400 });
    }

    // 2. Simple Rate Limiting (Check if email already exists)
    console.log("API: Checking if email exists", email);
    const existing = await prisma.waitingList.findUnique({
      where: { email },
    });

    if (existing) {
      console.log("API: Email already exists", email);
      return NextResponse.json({ error: "You are already on the waiting list!" }, { status: 400 });
    }

    // 3. Save to Database
    console.log("API: Saving to database");
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    await prisma.waitingList.create({
      data: {
        email,
        ip,
      },
    });
    console.log("API: Saved to database successfully");

    // 4. Send Confirmation Email via Resend Template
    console.log("API: Sending email via Resend");
    try {
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: "Hira <hello@hira.guru>",
        to: email,
        subject: "Welcome to the Hira Early Access List",
        template: {
          id: "waiting-list-welcome",
          variables: {
            email: email,
          },
        },
      });

      if (emailError) {
        console.error("API: Resend error", emailError);
      } else {
        console.log("API: Email sent successfully", emailData);
      }
    } catch (emailExc) {
      console.error("API: Resend exception", emailExc);
      // We don't return error here to let the user know they are registered in DB
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API: General error", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error. Please try again." }, { status: 500 });
  }
}
