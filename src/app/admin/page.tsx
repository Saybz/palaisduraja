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
    // Récupérer le contenu existant
    const fetchContent = async () => {
      const res = await fetch("/admin/api/content");
      const data = await res.json();
      setContent(
        data || {
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
        }
      );
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
    let uploadedBannerImage = content.banner;
    let uploadedHistoireImage = content.histoireImg;
    let uploadedMenuImage = content.menuImg;
    let uploadedPdf = content.menuPdf;

    if (newBannerImage) {
      uploadedBannerImage = await handleFileUpload(newBannerImage);
    }
    if (newHistoireImage) {
      uploadedHistoireImage = await handleFileUpload(newHistoireImage);
    }
    if (newMenuImage) {
      uploadedMenuImage = await handleFileUpload(newMenuImage);
    }
    if (newPdf) {
      uploadedPdf = await handleFileUpload(newPdf);
    }

    // Sauvegarde du contenu
    const res = await fetch("/admin/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        banner: uploadedBannerImage,
        title: content.title,
        histoire: content.histoire,
        histoireImg: uploadedHistoireImage,
        menuImg: uploadedMenuImage,
        menuPdf: uploadedPdf,
        cuisine: content.cuisine,
        paiement: content.paiement,
        horaire1: content.horaire1,
        horaire1state: content.horaire1state,
        horaire2: content.horaire2,
        horaire2state: content.horaire2state,
        mail: content.mail,
        tel: content.tel,
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

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]); // Dépendance de la session

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-dark flex justify-center items-center">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Interface Admin</h1>
        {/* Affichage du message de succès */}
        {successMessage && (
          <div
            className={`p-4 mb-4 text-white rounded-md ${
              successMessage.includes("succès") ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {successMessage}
          </div>
        )}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Image bannière</label>
            {content.banner && (
              <div className="mb-2">
                <Image
                  src={content.banner}
                  alt="Image bannière actuelle"
                  width={700}
                  height={475}
                  className="rounded-md"
                />
              </div>
            )}
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => setNewBannerImage(e.target.files?.[0] || null)}
              className="mt-2 p-2 border-gray-300 rounded-md shadow-sm max-w-full"
            />
            {newBannerImage && (
              <div className="mt-2">
                <p>Prévisualisation de l&apos;image bannière :</p>
                <Image
                  src={URL.createObjectURL(newBannerImage)}
                  alt="Prévisualisation bannière"
                  width={100}
                  height={64}
                  className="rounded-md"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Titre histoire</label>
            <input
              type="text"
              value={content.title}
              onChange={(e) =>
                setContent({ ...content, title: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 max-w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Description histoire
            </label>
            <textarea
              value={content.histoire}
              onChange={(e) =>
                setContent({ ...content, histoire: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 max-w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Image histoire</label>
            {content.histoireImg && (
              <div className="mb-2">
                <Image
                  src={content.histoireImg}
                  alt="Image histoire actuelle"
                  width={700}
                  height={475}
                  className="rounded-md"
                />
              </div>
            )}
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => setNewHistoireImage(e.target.files?.[0] || null)}
              className="mt-2 p-2 border-gray-300 rounded-md shadow-sm max-w-full"
            />
            {newHistoireImage && (
              <div className="mt-2">
                <p>Prévisualisation de l&apos;image histoire :</p>
                <Image
                  src={URL.createObjectURL(newHistoireImage)}
                  alt="Prévisualisation image histoire"
                  width={100}
                  height={64}
                  className="rounded-md"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Image Menu</label>
            {content.menuImg && (
              <div className="mb-2">
                <Image
                  src={content.menuImg}
                  alt="Image Menu actuelle"
                  width={700}
                  height={475}
                  className="rounded-md"
                />
              </div>
            )}
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => setNewMenuImage(e.target.files?.[0] || null)}
              className="mt-2 p-2 border-gray-300 rounded-md shadow-sm max-w-full"
            />
            {newMenuImage && (
              <div className="mt-2">
                <p>Prévisualisation de l&apos;image histoire :</p>
                <Image
                  src={URL.createObjectURL(newMenuImage)}
                  alt="Prévisualisation image histoire"
                  width={100}
                  height={64}
                  className="rounded-md"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Menu pdf</label>
            {content.menuPdf && (
              <a
                href={content.menuPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                Voir le PDF actuel
              </a>
            )}
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setNewPdf(e.target.files?.[0] || null)}
              className="mt-2 p-2 border-gray-300 rounded-md shadow-sm max-w-full"
            />
            {newPdf && (
              <div className="mt-2">
                <p>Prévisualisation du fichier PDF :</p>
                <a
                  href={URL.createObjectURL(newPdf)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  Fichier PDF sélectionné : {newPdf.name}
                </a>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Cuisine</label>
            <input
              type="text"
              value={content.cuisine}
              onChange={(e) =>
                setContent({ ...content, cuisine: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 max-w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Paiement</label>
            <input
              type="text"
              value={content.paiement}
              onChange={(e) =>
                setContent({ ...content, paiement: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 max-w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Horaire 1</label>
            <input
              type="text"
              value={content.horaire1}
              onChange={(e) =>
                setContent({ ...content, horaire1: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 max-w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Horaire 1 Etat</label>
            <input
              type="text"
              value={content.horaire1state}
              onChange={(e) =>
                setContent({ ...content, horaire1state: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 max-w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Horaire 2</label>
            <input
              type="text"
              value={content.horaire2}
              onChange={(e) =>
                setContent({ ...content, horaire2: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 max-w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Horaire 2 Etat</label>
            <input
              type="text"
              value={content.horaire2state}
              onChange={(e) =>
                setContent({ ...content, horaire2state: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 max-w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Adresse mail</label>
            <input
              type="text"
              value={content.mail}
              onChange={(e) => setContent({ ...content, mail: e.target.value })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 max-w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Numéro réservation
            </label>
            <input
              type="text"
              value={content.tel}
              onChange={(e) => setContent({ ...content, tel: e.target.value })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 max-w-full"
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
    </div>
  );
}
