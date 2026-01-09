"use client";
// Page /admin

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Schedule = {
  id?: number;
  day: "LUNDI" | "MARDI" | "MERCREDI" | "JEUDI" | "VENDREDI" | "SAMEDI" | "DIMANCHE";
  period: "MIDI" | "SOIR";
  openTime?: string;
  closeTime?: string;
  isClosed: boolean;
};

// Constantes
const DAYS: Schedule["day"][] = [
  "LUNDI",
  "MARDI",
  "MERCREDI",
  "JEUDI",
  "VENDREDI",
  "SAMEDI",
  "DIMANCHE",
];
const PERIODS: Schedule["period"][] = ["MIDI", "SOIR"];

export default function AdminPage() {
  const [content, setContent] = useState({
    banner: "",
    title: "",
    histoire: "",
    histoireImg: "",
    menuDesc: "",
    menuImg: "",
    menuImg1: "",
    menuImg2: "",
    menuImg3: "",
    menuImg4: "",
    menuPdf: "",
    cuisine: "",
    paiement: "",
    mail: "",
    tel: "",
  });
  
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const [newHistoireImage, setNewHistoireImage] = useState<File | null>(null);
  const [newBannerImage, setNewBannerImage] = useState<File | null>(null);
  const [newMenuImage1, setNewMenuImage1] = useState<File | null>(null);
  const [newMenuImage2, setNewMenuImage2] = useState<File | null>(null);
  const [newMenuImage3, setNewMenuImage3] = useState<File | null>(null);
  const [newMenuImage4, setNewMenuImage4] = useState<File | null>(null);
  const [newPdf, setNewPdf] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      const res = await fetch("/admin/api/content");
      const data = await res.json();
      // S'assurer que tous les champs sont des chaînes vides et non null/undefined
      setContent({
        banner: data?.banner || "",
        title: data?.title || "",
        histoire: data?.histoire || "",
        histoireImg: data?.histoireImg || "",
        menuDesc: data?.menuDesc || "",
        menuImg: data?.menuImg || "",
        menuImg1: data?.menuImg1 || "",
        menuImg2: data?.menuImg2 || "",
        menuImg3: data?.menuImg3 || "",
        menuImg4: data?.menuImg4 || "",
        menuPdf: data?.menuPdf || "",
        cuisine: data?.cuisine || "",
        paiement: data?.paiement || "",
        mail: data?.mail || "",
        tel: data?.tel || "",
      });
      setSchedules(
        data?.schedules?.length
          ? data.schedules
          : DAYS.flatMap((day) =>
              PERIODS.map((period) => ({
                day,
                period,
                openTime: "",
                closeTime: "",
                isClosed: false,
              }))
            )
      );
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

  // Mettre à jour un horaire
  const updateSchedule = <
  K extends keyof Pick<Schedule, "openTime" | "closeTime" | "isClosed">
  >(
    day: Schedule["day"],
    period: Schedule["period"],
    field: K,
    value: Schedule[K]
  ) => {
    setSchedules((prev) =>
      prev.map((s) =>
        s.day === day && s.period === period
          ? { ...s, [field]: value }
          : s
      )
    );
  };

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
    const uploadedMenuImage = content.menuImg;
    let uploadedMenuImage1 = content.menuImg1;
    let uploadedMenuImage2 = content.menuImg2;
    let uploadedMenuImage3 = content.menuImg3;
    let uploadedMenuImage4 = content.menuImg4;
    let uploadedPdf = content.menuPdf;

    if (newBannerImage)
      uploadedBannerImage = await handleFileUpload(newBannerImage);
    if (newHistoireImage)
      uploadedHistoireImage = await handleFileUpload(newHistoireImage);
    if (newMenuImage1) uploadedMenuImage1 = await handleFileUpload(newMenuImage1);
    if (newMenuImage2) uploadedMenuImage2 = await handleFileUpload(newMenuImage2);
    if (newMenuImage3) uploadedMenuImage3 = await handleFileUpload(newMenuImage3);
    if (newMenuImage4) uploadedMenuImage4 = await handleFileUpload(newMenuImage4);
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
        menuImg1: uploadedMenuImage1,
        menuImg2: uploadedMenuImage2,
        menuImg3: uploadedMenuImage3,
        menuImg4: uploadedMenuImage4,
        menuPdf: uploadedPdf,
        schedules,
      }),
    });

    if (res.ok) {
      // Mettre à jour l'état du message de succès
      setSuccessMessage("Contenu sauvegardé avec succès !");

      // Récupérer à nouveau le contenu mis à jour
      const updatedContent = await res.json();
      setContent(updatedContent); // Mettre à jour le contenu affiché
      setSchedules(updatedContent.schedules); // mettre à jour les horaires
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

          {/* Images Menu (4 images) */}
          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            Images Menu (4 images)
          </h3>
          {[
            {
              label: "Image Menu 1",
              file: newMenuImage1,
              current: content.menuImg1,
              setFile: setNewMenuImage1,
            },
            {
              label: "Image Menu 2",
              file: newMenuImage2,
              current: content.menuImg2,
              setFile: setNewMenuImage2,
            },
            {
              label: "Image Menu 3",
              file: newMenuImage3,
              current: content.menuImg3,
              setFile: setNewMenuImage3,
            },
            {
              label: "Image Menu 4",
              file: newMenuImage4,
              current: content.menuImg4,
              setFile: setNewMenuImage4,
            },
          ].map(({ label, file, current, setFile }, idx) => (
            <div key={idx} className="mb-4">
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
                accept="image/*"
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

          {/* Grille des horaires */}
          <h2 className="text-xl font-semibold mb-4">🕒 Horaires</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-3 py-2 text-left">Jour</th>
                  <th className="border px-3 py-2">Midi</th>
                  <th className="border px-3 py-2">Soir</th>
                </tr>
              </thead>
              <tbody>
                {DAYS.map((day) => {
                  const midi = schedules.find((s) => s.day === day && s.period === "MIDI");
                  const soir = schedules.find((s) => s.day === day && s.period === "SOIR");

                  const renderInput = (s: Schedule | undefined, field: "openTime" | "closeTime" | "isClosed") => {
                    if (!s) return null;
                    if (field === "isClosed") {
                      return (
                        <div>
                        <input
                          type="checkbox"
                          checked={s.isClosed}
                          onChange={(e) => updateSchedule(day, s.period, "isClosed", e.target.checked)}
                          />

                          {" "}Fermé

                        </div>
                      );
                    }
                    return (
                      <input
                        type="time"
                        value={s[field] || ""}
                        onChange={(e) => updateSchedule(day, s.period, field, e.target.value)}
                        disabled={s.isClosed}
                        className="border rounded px-2 py-1 w-full"
                      />
                    );
                  };

                  return (
                    <tr key={day}>
                      <td className="border px-3 py-2">{day}</td>
                      <td className="border px-3 py-2">
                        {renderInput(midi, "openTime")}
                        {renderInput(midi, "closeTime")}
                        {renderInput(midi, "isClosed")}
                      </td>
                      <td className="border px-3 py-2">
                        {renderInput(soir, "openTime")}
                        {renderInput(soir, "closeTime")}
                        {renderInput(soir, "isClosed")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
