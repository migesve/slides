import { get, set, all } from "@vercel/edge-config";

export async function GET() {
  try {
    // Fetch all slides from Edge Config
    const slides = await all();
    return new Response(JSON.stringify(slides), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch slides", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(req: Request) {
  try {
    const newSlide = await req.json();
    const slideId = newSlide.id;

    // Add new slide to Edge Config
    await set(slideId, newSlide);

    return new Response(
      JSON.stringify({ message: "Slide ajoutée avec succès", slide: newSlide }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to add slide", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
