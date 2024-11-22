"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function AddSlidePage() {
  const [id, setId] = useState(""); // Automatically generated ID
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Generate a new ID based on existing slides
    const fetchNextId = async () => {
      const res = await fetch("/api/slides");
      const slides = await res.json();
      const nextId = (slides.length + 1).toString();
      setId(nextId);
    };
    fetchNextId();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/slides", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, content }),
    });

    if (res.ok) {
      setMessage("Slide ajoutée avec succès !");
      setTitle("");
      setContent("");
      setId((parseInt(id) + 1).toString()); // Generate next ID
    } else {
      setMessage("Erreur lors de l'ajout de la slide.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Ajouter une Slide</h1>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium mb-2 text-foreground"
          >
            Titre de la Slide
          </label>
          <input
            id="title"
            type="text"
            placeholder="Titre de la slide"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-sm font-medium mb-2 text-foreground"
          >
            Contenu de la Slide
          </label>
          <textarea
            id="content"
            placeholder="Contenu de la slide"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Ajouter la Slide
        </button>
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("succès") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-blue-500 hover:underline dark:text-blue-400"
          >
            Retour à l&apos;Accueil
          </Link>
        </div>
      </form>
    </div>
  );
}
