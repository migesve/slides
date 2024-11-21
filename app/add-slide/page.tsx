"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function AddSlidePage() {
  const [id, setId] = useState(""); // ID généré automatiquement
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Générer un nouvel ID basé sur l'existant
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
      setId((parseInt(id) + 1).toString()); // Générer le prochain ID
    } else {
      setMessage("Erreur lors de l'ajout de la slide.");
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Titre de la slide"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Contenu de la slide"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        required
      />
      <button type="submit">Ajouter la slide</button>
      {message && <p>{message}</p>}
      <br />
      <Link href={"/"}>Retour</Link>
    </form>
  );
}
