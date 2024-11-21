import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "20px", textAlign: "center" }}>
      <h1>Welcome to the Slides Presentation</h1>
      <Link href="/slides/1" style={{ marginTop: "20px", display: "inline-block" }}>
        Start Presentation
      </Link>
      <br />
      <Link href="/add-slide" style={{ marginTop: "20px", display: "inline-block" }}>
        Add Slide
      </Link>
    </main>
  );
}
