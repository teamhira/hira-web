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
  try {
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { email, turnstileToken } = schema.parse(body);

    // 1. Validate Turnstile Token
    const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const verificationResponse = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
    });

    const verificationData = await verificationResponse.json();
    if (!verificationData.success) {
      return NextResponse.json({ error: "Captcha verification failed" }, { status: 400 });
    }

    // 2. Simple Rate Limiting (Check if email already exists)
    const existing = await prisma.waitingList.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json({ error: "You are already on the waiting list!" }, { status: 400 });
    }

    // 3. Save to Database
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    await prisma.waitingList.create({
      data: {
        email,
        ip,
      },
    });

    // 4. Send Confirmation Email via Resend Template
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
        console.error("API: Email sending failed", emailError);
      }
    } catch (emailExc) {
      console.error("API: Email exception", emailExc);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error. Please try again." }, { status: 500 });
  }
}
