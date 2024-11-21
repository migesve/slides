import fs from "fs";
import path from "path";
import Link from "next/link";

interface Slide {
  id: string;
  title: string;
  content: string;
}

function getSlides(): Slide[] {
  const filePath = path.join(process.cwd(), "data", "slides.json");
  const fileContents = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContents) as Slide[];
}

export async function generateStaticParams() {
  const slides = getSlides();
  return slides.map((slide) => ({ id: slide.id }));
}

export default async function SlidePage({ params }: { params: { id: string } }) {
  const slides = getSlides();
  const slide = slides.find((s) => s.id === params.id);

  if (!slide) {
    return <div>Slide not found</div>;
  }

  const currentIndex = slides.findIndex((s) => s.id === params.id);
  const prevSlide = slides[currentIndex - 1];
  const nextSlide = slides[currentIndex + 1];

  return (
    <div className="slide-container">
      <div className="slide">
        <h1 className="slide-title">{slide.title}</h1>
        <p className="slide-content">{slide.content}</p>
      </div>
      <div className="slide-navigation">
        {prevSlide ? (
          <Link href={`/slides/${prevSlide.id}`} className="nav-button">
            Previous
          </Link>
        ) : (
          <span className="nav-button disabled">Previous</span>
        )}
        {nextSlide ? (
          <Link href={`/slides/${nextSlide.id}`} className="nav-button">
            Next
          </Link>
        ) : (
          <span className="nav-button disabled">Next</span>
        )}
      </div>
    </div>
  );
}
