import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  try {
    const externalRes = await fetch(url);

    if (!externalRes.ok) {
      return NextResponse.json({ error: "Failed to fetch image" }, { status: externalRes.status });
    }

    const contentType = externalRes.headers.get("content-type") || "application/octet-stream";
    const buffer = await externalRes.arrayBuffer();

    return new NextResponse(Buffer.from(buffer), {
      headers: {
        "Content-Type": contentType,
        // Add cache headers if you want:
        // "Cache-Control": "public, max-age=86400, stale-while-revalidate=86400"
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching image" }, { status: 500 });
  }
}
