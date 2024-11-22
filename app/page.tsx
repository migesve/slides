import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Bienvenue sur votre application de présentation
      </h1>
      <div className="space-y-4">
        <Link
          href="/slides/1"
          className="block px-6 py-3 bg-blue-500 text-white rounded-md text-lg font-medium hover:bg-blue-600 transition"
        >
          Demarrer la presentation
        </Link>
        <div className="flex justify-center">
  <Link
    href="/add-slide"
    className="block px-6 py-3 bg-green-500 text-white rounded-md text-lg font-medium hover:bg-green-600 transition"
  >
    Ajouter une Slide
  </Link>
</div>

      </div>
    </main>
  );
}
