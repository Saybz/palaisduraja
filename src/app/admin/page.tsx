"use client";

import { useState, useEffect } from "react";

export default function Admin() {
  const [content, setContent] = useState({
    title: "",
    description: "",
    image: "",
    pdf: "",
  });
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newPdf, setNewPdf] = useState<File | null>(null);

  useEffect(() => {
    // Récupérer le contenu existant
    const fetchContent = async () => {
      const res = await fetch("/admin/api/content");
      const data = await res.json();
      setContent(data || { title: "", description: "", image: "", pdf: "" });
    };
    fetchContent();
  }, []);

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/admin/api/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      return data.fileUrl; // Retourne le chemin du fichier
    }
    return null;
  };

  const handleSave = async () => {
    let uploadedImage = content.image;
    let uploadedPdf = content.pdf;

    // Upload des fichiers si nécessaires
    if (newImage) {
      uploadedImage = await handleFileUpload(newImage);
    }
    if (newPdf) {
      uploadedPdf = await handleFileUpload(newPdf);
    }

    // Sauvegarde du contenu
    const res = await fetch("/admin/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: content.title,
        description: content.description,
        image: uploadedImage,
        pdf: uploadedPdf,
      }),
    });

    if (res.ok) {
      alert("Contenu mis à jour !");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Interface Admin</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Titre</label>
          <input
            type="text"
            value={content.title}
            onChange={(e) => setContent({ ...content, title: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={content.description}
            onChange={(e) =>
              setContent({ ...content, description: e.target.value })
            }
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Image</label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => setNewImage(e.target.files?.[0] || null)}
            className="mt-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Carte</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setNewPdf(e.target.files?.[0] || null)}
            className="mt-2"
          />
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Sauvegarder
        </button>
      </div>
    </div>
  );
}
