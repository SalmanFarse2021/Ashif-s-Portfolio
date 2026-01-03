import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();

    // Here you would connect to Resend or another email provider
    console.log("Contact API received:", body);

    return NextResponse.json({ success: true, message: "Message sent successfully" });
}
