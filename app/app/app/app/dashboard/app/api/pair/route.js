import { NextResponse } from "next/server";

export async function POST(req) {
  try {

    const body = await req.json();

    const number = body.number;

    if (!number) {
      return NextResponse.json({
        success: false,
        message: "Phone number is required."
      });
    }

    return NextResponse.json({
      success: true,
      number,
      message: "Server connected successfully.",
      pairCode: "Waiting..."
    });

  } catch (err) {

    return NextResponse.json({
      success: false,
      message: err.message
    });

  }
}
