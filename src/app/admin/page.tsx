"use client";
// Page /admin

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [content, setContent] = useState({
    banner: "",
    title: "",
    histoire: "",
    histoireImg: "",
    menuDesc: "",
    menuImg: "",
    menuPdf: "",
    cuisine: "",
    paiement: "",
    horaire1: "",
    horaire1state: "",
    horaire2: "",
    horaire2state: "",
    mail: "",
    tel: "",
  });

  const [newHistoireImage, setNewHistoireImage] = useState<File | null>(null);
  const [newBannerImage, setNewBannerImage] = useState<File | null>(null);
  const [newMenuImage, setNewMenuImage] = useState<File | null>(null);
  const [newPdf, setNewPdf] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      const res = await fetch("/admin/api/content");
      const data = await res.json();
      setContent(data || content);
    };
    fetchContent();
  }, []);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/admin/api/upload", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      return data.fileUrl;
    }
    return null;
  };

  const handleSave = async () => {
    let uploadedBannerImage = content.banner;
    let uploadedHistoireImage = content.histoireImg;
    let uploadedMenuImage = content.menuImg;
    let uploadedPdf = content.menuPdf;

    if (newBannerImage)
      uploadedBannerImage = await handleFileUpload(newBannerImage);
    if (newHistoireImage)
      uploadedHistoireImage = await handleFileUpload(newHistoireImage);
    if (newMenuImage) uploadedMenuImage = await handleFileUpload(newMenuImage);
    if (newPdf) uploadedPdf = await handleFileUpload(newPdf);

    // Sauvegarde du contenu
    const res = await fetch("/admin/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...content,
        banner: uploadedBannerImage,
        histoireImg: uploadedHistoireImage,
        menuImg: uploadedMenuImage,
        menuPdf: uploadedPdf,
      }),
    });

    if (res.ok) {
      // Mettre à jour l'état du message de succès
      setSuccessMessage("Contenu sauvegardé avec succès !");

      // Récupérer à nouveau le contenu mis à jour
      const updatedContent = await res.json();
      setContent(updatedContent); // Mettre à jour le contenu affiché
    } else {
      setSuccessMessage("Erreur lors de la sauvegarde du contenu.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 pt-[100px] pb-[80px] py-12 px-6">
      <div className="relative max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Interface d’administration
        </h1>

        {successMessage && (
          <div className="fixed bottom-[77px] left-0 w-full flex justify-center z-50">
            <div
              className={`w-fit transition-all duration-300 ease-in-out p-4 text-sm font-medium rounded-lg text-white ${
                successMessage.includes("succès")
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {successMessage}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {[
            {
              label: "Titre Histoire",
              type: "text",
              value: content.title,
              onChange: (v: string) => setContent({ ...content, title: v }),
            },
            {
              label: "Description Histoire",
              type: "textarea",
              value: content.histoire,
              onChange: (v: string) => setContent({ ...content, histoire: v }),
            },
            {
              label: "Cuisine",
              type: "text",
              value: content.cuisine,
              onChange: (v: string) => setContent({ ...content, cuisine: v }),
            },
            {
              label: "Paiement",
              type: "text",
              value: content.paiement,
              onChange: (v: string) => setContent({ ...content, paiement: v }),
            },
            {
              label: "Horaire 1",
              type: "text",
              value: content.horaire1,
              onChange: (v: string) => setContent({ ...content, horaire1: v }),
            },
            {
              label: "Horaire 1 Etat",
              type: "text",
              value: content.horaire1state,
              onChange: (v: string) =>
                setContent({ ...content, horaire1state: v }),
            },
            {
              label: "Horaire 2",
              type: "text",
              value: content.horaire2,
              onChange: (v: string) => setContent({ ...content, horaire2: v }),
            },
            {
              label: "Horaire 2 Etat",
              type: "text",
              value: content.horaire2state,
              onChange: (v: string) =>
                setContent({ ...content, horaire2state: v }),
            },
            {
              label: "Adresse Mail",
              type: "text",
              value: content.mail,
              onChange: (v: string) => setContent({ ...content, mail: v }),
            },
            {
              label: "Numéro Réservation",
              type: "text",
              value: content.tel,
              onChange: (v: string) => setContent({ ...content, tel: v }),
            },
          ].map(({ label, type, value, onChange }, idx) => (
            <div key={idx}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {label}
              </label>
              {type === "textarea" ? (
                <textarea
                  value={value}
                  rows={5}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
                />
              ) : (
                <input
                  type={type}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
                />
              )}
            </div>
          ))}

          {/* Fichiers */}
          {[
            {
              label: "Image Bannière",
              file: newBannerImage,
              current: content.banner,
              setFile: setNewBannerImage,
            },
            {
              label: "Image Histoire",
              file: newHistoireImage,
              current: content.histoireImg,
              setFile: setNewHistoireImage,
            },
            {
              label: "Image Menu",
              file: newMenuImage,
              current: content.menuImg,
              setFile: setNewMenuImage,
            },
          ].map(({ label, file, current, setFile }, idx) => (
            <div key={idx}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {label}
              </label>
              {current && (
                <Image
                  src={current}
                  alt={label}
                  width={600}
                  height={400}
                  className="rounded-md mb-2"
                />
              )}
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 bg-white border rounded-lg shadow-sm text-sm"
              />
              {file && (
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`Prévisualisation ${label}`}
                  width={100}
                  height={64}
                  className="mt-2 rounded-md"
                />
              )}
            </div>
          ))}

          {/* PDF */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Menu PDF
            </label>
            {content.menuPdf && (
              <a
                href={content.menuPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 block mb-2"
              >
                Voir le PDF actuel
              </a>
            )}
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setNewPdf(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 bg-white border rounded-lg shadow-sm text-sm"
            />
            {newPdf && (
              <a
                href={URL.createObjectURL(newPdf)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 block mt-2"
              >
                Fichier PDF sélectionné : {newPdf.name}
              </a>
            )}
          </div>

          <div className="text-center mt-6">
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 shadow-md"
            >
              💾 Sauvegarder les modifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
