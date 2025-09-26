import { NextRequest, NextResponse } from "next/server";



// List of explicitly allowed origins
const allowedOrigins = new Set([
  "http://localhost:3000",
  "https://realclearcrime.sanity.studio",
  "https://www.sanity.io",
]);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const page = searchParams.get("page") || "1";
    const pageLength = searchParams.get("page_length") || "10";

    const apiUrl = `https://api.jwplayer.com/v2/sites/QygRRa5W/media/?q=${encodeURIComponent(
      q,
    )}&page=${page}&page_length=${pageLength}`;

    const jwPlayerResponse = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer s1ITu7qXMw-ovV2-F8jXhmInYTBOVGJtUnVZVGd6ZGsxeGEzbzBla0pOWnpkVU9GbHon`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!jwPlayerResponse.ok) {
      const errorText = await jwPlayerResponse.text();
      return NextResponse.json(
        {
          error: "JWPlayer API request failed",
          status: jwPlayerResponse.status,
          details: errorText,
        },
        {
          status: jwPlayerResponse.status,
          headers: corsHeaders(req.headers.get("origin") || undefined),
        },
      );
    }

    const data = await jwPlayerResponse.json();
    return NextResponse.json(data, {
      status: 200,
      headers: corsHeaders(req.headers.get("origin") || undefined),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal server error", message },
      {
        status: 500,
        headers: corsHeaders(req.headers.get("origin") || undefined),
      },
    );
  }
}



function corsHeaders(origin?: string) {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  if (origin && allowedOrigins.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

// Handle preflight
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(req.headers.get("origin") || undefined),
  });
}






