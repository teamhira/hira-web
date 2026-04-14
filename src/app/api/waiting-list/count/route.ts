import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const count = await prisma.waitingList.count();
    return NextResponse.json({ count });
  } catch (error: any) {
    console.error("Failed to fetch waiting list count:", error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
