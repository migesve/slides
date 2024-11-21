import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "slides.json");
  const slides = JSON.parse(await fs.promises.readFile(filePath, "utf-8"));
  return new Response(JSON.stringify(slides), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  const filePath = path.join(process.cwd(), "data", "slides.json");

  // Lire les slides existantes
  const slides = JSON.parse(await fs.promises.readFile(filePath, "utf-8"));

  // Récupérer les données envoyées dans la requête
  const newSlide = await req.json();

  // Ajouter la nouvelle slide au tableau
  slides.push(newSlide);

  // Sauvegarder les données mises à jour
  await fs.promises.writeFile(filePath, JSON.stringify(slides, null, 2));

  return new Response(
    JSON.stringify({ message: "Slide ajoutée avec succès", slide: newSlide }),
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }
  );
}

