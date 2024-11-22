import { get } from "@vercel/edge-config";

export async function GET() {
  try {
    // Fetch slides from Edge Config
    const slides = await get("slides");

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

    // Fetch the existing slides
    const existingSlides = (await get("slides")) || [];

    // Add the new slide to the array
    const updatedSlides = [...existingSlides, newSlide];

    // Update Edge Config via the REST API
    const response = await fetch(
      `https://edge-config.vercel.com/v1/configs/ecfg_pyozmzdpzbuinehyndzrw4pmi0ef/items`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `8c30652e-539d-4f10-b12b-4af386cf9aa4`,
        },
        body: JSON.stringify({ slides: updatedSlides }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update Edge Config: ${response.statusText}`);
    }

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
