export async function GET() {
  try {
    // Call third-party API
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();

    return Response.json({
      success: true,
      post: data,
    });
  } catch (error) {
    return Response.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
