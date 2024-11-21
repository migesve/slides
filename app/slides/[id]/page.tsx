import fs from "fs";
import path from "path";

interface Slide {
  id: string;
  title: string;
  content: string;
}

// Helper function to read the slides from the JSON file
function getSlides(): Slide[] {
  const filePath = path.join(process.cwd(), "data", "slides.json");
  const fileContents = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContents) as Slide[];
}

// Generate static parameters for dynamic routing
export async function generateStaticParams() {
  const slides = getSlides();
  return slides.map((slide) => ({ id: slide.id }));
}

// Page component for rendering slides
export default async function SlidePage({ params }: { params: { id: string } }) {
  const { id } = await params; // Await `params` to access `id`

  const slides = getSlides();
  const slide = slides.find((s) => s.id === id);

  if (!slide) {
    return <div>Slide not found</div>;
  }

  const currentIndex = slides.findIndex((s) => s.id === id);
  const prevSlide = slides[currentIndex - 1];
  const nextSlide = slides[currentIndex + 1];

  return (
    <div className="slide-container">
      <div className="slide">
        <h1 className="slide-title">{slide.title}</h1>
        <p className="slide-content">{slide.content}</p>
      </div>
      <div className="slide-navigation">
        <a
          href={prevSlide ? `/slides/${prevSlide.id}` : undefined}
          className={`nav-button ${!prevSlide ? "disabled" : ""}`}
        >
          Previous
        </a>
        <a
          href={nextSlide ? `/slides/${nextSlide.id}` : undefined}
          className={`nav-button ${!nextSlide ? "disabled" : ""}`}
        >
          Next
        </a>
      </div>
    </div>
  );
}
