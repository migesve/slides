import { get, update } from "@vercel/edge-config";

export async function GET() {
  try {
    // Fetch all slide IDs stored in Edge Config (if stored as a single array)
    const slides = await get("slides"); // Assume all slides are stored under the key "slides"

    if (!slides) {
      return new Response(JSON.stringify({ message: "No slides found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

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

    // Fetch existing slides
    const slides = (await get("slides")) || []; // Assume "slides" is an array of slide objects

    // Add the new slide to the array
    const updatedSlides = [...slides, newSlide];

    // Update Edge Config with the new slides array
    await update({ slides: updatedSlides });

    return new Response(
      JSON.stringify({ message: "Slide added successfully", slide: newSlide }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to add slide", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
