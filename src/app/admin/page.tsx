"use client";
// Page /admin

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

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

type Section = "hero" | "histoire" | "menu" | "infos" | "contact" | "horaires";

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      setSuccessMessage("Contenu sauvegardé avec succès !");
      const updatedContent = await res.json();
      setContent(updatedContent);
      setSchedules(updatedContent.schedules);
    } else {
      setSuccessMessage("Erreur lors de la sauvegarde du contenu.");
    }
  };

  const sections: { id: Section; label: string; icon: string }[] = [
    { id: "hero", label: "Hero / Bannière", icon: "🏠" },
    { id: "histoire", label: "Histoire", icon: "📖" },
    { id: "menu", label: "Menu", icon: "🍽️" },
    { id: "infos", label: "Infos pratiques", icon: "ℹ️" },
    { id: "contact", label: "Contact", icon: "📧" },
    { id: "horaires", label: "Horaires", icon: "🕒" },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "hero":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Hero / Bannière</h2>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image Bannière
              </label>
              {content.banner && (
                <Image
                  src={content.banner}
                  alt="Bannière"
                  width={600}
                  height={400}
                  className="rounded-md mb-2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewBannerImage(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 bg-white border rounded-lg shadow-sm text-sm"
              />
              {newBannerImage && (
                <Image
                  src={URL.createObjectURL(newBannerImage)}
                  alt="Prévisualisation Bannière"
                  width={100}
                  height={64}
                  className="mt-2 rounded-md"
                />
              )}
            </div>
          </div>
        );

      case "histoire":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Histoire</h2>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Titre Histoire
              </label>
              <input
                type="text"
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description Histoire
              </label>
              <textarea
                value={content.histoire}
                rows={8}
                onChange={(e) => setContent({ ...content, histoire: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image Histoire
              </label>
              {content.histoireImg && (
                <Image
                  src={content.histoireImg}
                  alt="Image Histoire"
                  width={600}
                  height={400}
                  className="rounded-md mb-2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewHistoireImage(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 bg-white border rounded-lg shadow-sm text-sm"
              />
              {newHistoireImage && (
                <Image
                  src={URL.createObjectURL(newHistoireImage)}
                  alt="Prévisualisation Image Histoire"
                  width={100}
                  height={64}
                  className="mt-2 rounded-md"
                />
              )}
            </div>
          </div>
        );

      case "menu":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Menu</h2>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Menu PDF
              </label>
              {content.menuPdf && (
                <a
                  href={content.menuPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 block mb-2 underline"
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
                  className="text-blue-600 block mt-2 underline"
                >
                  Fichier PDF sélectionné : {newPdf.name}
                </a>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Images Menu (4 images)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Image Menu 1", file: newMenuImage1, current: content.menuImg1, setFile: setNewMenuImage1 },
                  { label: "Image Menu 2", file: newMenuImage2, current: content.menuImg2, setFile: setNewMenuImage2 },
                  { label: "Image Menu 3", file: newMenuImage3, current: content.menuImg3, setFile: setNewMenuImage3 },
                  { label: "Image Menu 4", file: newMenuImage4, current: content.menuImg4, setFile: setNewMenuImage4 },
                ].map(({ label, file, current, setFile }, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {label}
                    </label>
                    {current && (
                      <Image
                        src={current}
                        alt={label}
                        width={400}
                        height={300}
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
              </div>
            </div>
          </div>
        );

      case "infos":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Infos pratiques</h2>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cuisine
              </label>
              <input
                type="text"
                value={content.cuisine}
                onChange={(e) => setContent({ ...content, cuisine: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Moyens de paiement
              </label>
              <input
                type="text"
                value={content.paiement}
                onChange={(e) => setContent({ ...content, paiement: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
              />
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact</h2>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Adresse Mail
              </label>
              <input
                type="email"
                value={content.mail}
                onChange={(e) => setContent({ ...content, mail: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Numéro de téléphone (Réservation)
              </label>
              <input
                type="tel"
                value={content.tel}
                onChange={(e) => setContent({ ...content, tel: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
              />
            </div>
          </div>
        );

      case "horaires":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Horaires</h2>
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
                          <div className="flex items-center gap-2 mt-2">
                            <input
                              type="checkbox"
                              checked={s.isClosed}
                              onChange={(e) => updateSchedule(day, s.period, "isClosed", e.target.checked)}
                              className="w-4 h-4"
                            />
                            <span>Fermé</span>
                          </div>
                        );
                      }
                      return (
                        <input
                          type="time"
                          value={s[field] || ""}
                          onChange={(e) => updateSchedule(day, s.period, field, e.target.value)}
                          disabled={s.isClosed}
                          className="border rounded px-2 py-1 w-full mb-2"
                        />
                      );
                    };

                    return (
                      <tr key={day}>
                        <td className="border px-3 py-2 font-medium">{day}</td>
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
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-light flex">
      {/* Bouton burger mobile */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-md border border-gray-200"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
      </button>

      {/* Overlay mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-white border-r border-gray-200 fixed h-screen overflow-y-auto flex flex-col z-40 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Bouton retour au site en haut */}
        <div className="p-4 border-b border-gray-200">
          <Link
            href="/"
            className="text-primary hover:text-primary-light transition-colors font-medium"
          >
            ← Revenir au site
          </Link>
        </div>

        {/* Titre */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-primary">Administration</h1>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex-1">
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => {
                    setActiveSection(section.id);
                    setIsMenuOpen(false); // Fermer le menu mobile après sélection
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-xl">{section.icon}</span>
                  <span className="font-medium">{section.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Boutons en bas */}
        <div className="p-4 border-t border-gray-200 space-y-3">
          <button
            onClick={handleSave}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md"
          >
            💾 Sauvegarder
          </button>
          <button
            onClick={() => signOut()}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {successMessage && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                successMessage.includes("succès")
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {successMessage}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
            {renderSection()}
          </div>
        </div>
      </main>
    </div>
  );
}
