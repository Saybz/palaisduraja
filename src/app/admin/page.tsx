"use client";
// Page /admin

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Menu, X, Plus, Trash2, Edit2 } from "lucide-react";

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

type Section = "hero" | "histoire" | "menu" | "plats" | "infos" | "contact" | "horaires" | "blob";

type Dish = {
  id?: number;
  name: string;
  description: string;
  nameEn?: string | null;
  descriptionEn?: string | null;
  price: string;
  image?: string | null;
  order: number;
};

type Lang = "fr" | "en";

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<Lang>("fr");
  const [content, setContent] = useState({
    banner: "",
    // Champs FR
    title: "",
    histoire: "",
    menuDesc: "",
    cuisine: "",
    paiement: "",
    // Champs EN
    titleEn: "",
    histoireEn: "",
    menuDescEn: "",
    cuisineEn: "",
    paiementEn: "",
    // Fichiers (non traduisibles)
    histoireImg: "",
    menuImg: "",
    menuImg1: "",
    menuImg2: "",
    menuImg3: "",
    menuImg4: "",
    menuPdf: "",
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
  const [pdfUrl, setPdfUrl] = useState<string>(""); // Pour entrer directement une URL Cloudinary
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [newDishImage, setNewDishImage] = useState<File | null>(null);
  const [blobFiles, setBlobFiles] = useState<Array<{ url: string; pathname?: string; size?: number; contentType?: string; uploadedAt?: string }>>([]);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchContent = async () => {
      const res = await fetch("/admin/api/content");
      const data = await res.json();
      setContent({
        banner: data?.banner || "",
        // FR
        title: data?.title || "",
        histoire: data?.histoire || "",
        menuDesc: data?.menuDesc || "",
        cuisine: data?.cuisine || "",
        paiement: data?.paiement || "",
        // EN
        titleEn: data?.titleEn || "",
        histoireEn: data?.histoireEn || "",
        menuDescEn: data?.menuDescEn || "",
        cuisineEn: data?.cuisineEn || "",
        paiementEn: data?.paiementEn || "",
        // Fichiers
        histoireImg: data?.histoireImg || "",
        menuImg: data?.menuImg || "",
        menuImg1: data?.menuImg1 || "",
        menuImg2: data?.menuImg2 || "",
        menuImg3: data?.menuImg3 || "",
        menuImg4: data?.menuImg4 || "",
        menuPdf: data?.menuPdf || "",
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
    const fetchDishes = async () => {
      const res = await fetch("/admin/api/dishes");
      if (res.ok) {
        const data = await res.json();
        setDishes(data);
      }
    };
    fetchDishes();
  }, []);

  useEffect(() => {
    // Ne rediriger que si le status est "unauthenticated" (pas pendant "loading")
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchBlobFiles = async () => {
      if (activeSection === "blob") {
        try {
          const res = await fetch("/admin/api/blob");
          if (res.ok) {
            const data = await res.json();
            setBlobFiles(data.blobs || []);
          }
        } catch (error) {
          console.error("Erreur lors du chargement des fichiers:", error);
        }
      }
    };
    fetchBlobFiles();
  }, [activeSection]);

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

  const handleFileUpload = async (file: File): Promise<string | null> => {
    try {
      // Upload vers Cloudinary via FormData
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/admin/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de l'upload");
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Erreur upload:", error);
      return null;
    }
  };

  const handleAddDish = () => {
    setEditingDish({
      name: "",
      description: "",
      nameEn: "",
      descriptionEn: "",
      price: "",
      image: null,
      order: dishes.length,
    });
    setNewDishImage(null);
    setActiveLang("fr"); // Commencer par le français
  };

  const handleEditDish = (dish: Dish) => {
    setEditingDish({ ...dish });
    setNewDishImage(null);
  };

  const handleSaveDish = async () => {
    if (!editingDish) return;

    let imageUrl = editingDish.image || null;
    if (newDishImage) {
      imageUrl = await handleFileUpload(newDishImage);
    }

    const dishData = {
      ...editingDish,
      image: imageUrl,
      nameEn: editingDish.nameEn || null,
      descriptionEn: editingDish.descriptionEn || null,
    };

    try {
      if (editingDish.id) {
        // Mise à jour
        const res = await fetch("/admin/api/dishes", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dishData),
        });
        if (res.ok) {
          const updated = await res.json();
          setDishes(dishes.map((d) => (d.id === updated.id ? updated : d)));
          setSuccessMessage("Plat mis à jour avec succès !");
        } else {
          setSuccessMessage("Erreur lors de la mise à jour du plat.");
        }
      } else {
        // Création
        const res = await fetch("/admin/api/dishes", {
      method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dishData),
        });
        if (res.ok) {
          const newDish = await res.json();
          setDishes([...dishes, newDish]);
          setSuccessMessage("Plat ajouté avec succès !");
        } else {
          setSuccessMessage("Erreur lors de l'ajout du plat.");
        }
      }
      setEditingDish(null);
      setNewDishImage(null);
    } catch {
      setSuccessMessage("Erreur lors de la sauvegarde du plat.");
    }
  };

  const handleDeleteDish = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce plat ?")) return;

    try {
      const res = await fetch(`/admin/api/dishes?id=${id}`, {
        method: "DELETE",
    });
    if (res.ok) {
        setDishes(dishes.filter((d) => d.id !== id));
        setSuccessMessage("Plat supprimé avec succès !");
      } else {
        setSuccessMessage("Erreur lors de la suppression du plat.");
      }
    } catch {
      setSuccessMessage("Erreur lors de la suppression du plat.");
    }
  };

  const handleDeleteBlob = async (url: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce fichier ?")) return;

    try {
      const res = await fetch(`/admin/api/blob?url=${encodeURIComponent(url)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBlobFiles(blobFiles.filter((f) => f.url !== url));
        setSuccessMessage("Fichier supprimé avec succès !");
      } else {
        setSuccessMessage("Erreur lors de la suppression du fichier.");
      }
    } catch {
      setSuccessMessage("Erreur lors de la suppression du fichier.");
    }
  };

  const handleMoveDish = async (dish: Dish, direction: "up" | "down") => {
    const currentIndex = dishes.findIndex((d) => d.id === dish.id);
    if (currentIndex === -1) return;

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= dishes.length) return;

    const newDishes = [...dishes];
    const [moved] = newDishes.splice(currentIndex, 1);
    newDishes.splice(newIndex, 0, moved);

    // Mettre à jour les ordres
    const updatedDishes = newDishes.map((d, idx) => ({ ...d, order: idx }));
    setDishes(updatedDishes);

    // Sauvegarder les ordres
    try {
      await Promise.all(
        updatedDishes.map((d) =>
          fetch("/admin/api/dishes", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: d.id, order: d.order }),
          })
        )
      );
    } catch {
      setSuccessMessage("Erreur lors de la mise à jour de l'ordre.");
    }
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

    if (newBannerImage) {
      const url = await handleFileUpload(newBannerImage);
      if (url) uploadedBannerImage = url;
    }
    if (newHistoireImage) {
      const url = await handleFileUpload(newHistoireImage);
      if (url) uploadedHistoireImage = url;
    }
    if (newMenuImage1) {
      const url = await handleFileUpload(newMenuImage1);
      if (url) uploadedMenuImage1 = url;
    }
    if (newMenuImage2) {
      const url = await handleFileUpload(newMenuImage2);
      if (url) uploadedMenuImage2 = url;
    }
    if (newMenuImage3) {
      const url = await handleFileUpload(newMenuImage3);
      if (url) uploadedMenuImage3 = url;
    }
    if (newMenuImage4) {
      const url = await handleFileUpload(newMenuImage4);
      if (url) uploadedMenuImage4 = url;
    }
    if (newPdf) {
      const url = await handleFileUpload(newPdf);
      if (url) uploadedPdf = url;
    } else if (pdfUrl && pdfUrl.trim() !== "") {
      // Si une URL Cloudinary a été entrée directement, l'utiliser
      uploadedPdf = pdfUrl.trim();
    }

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
    { id: "plats", label: "Plats populaires", icon: "🍛" },
    { id: "infos", label: "Infos pratiques", icon: "ℹ️" },
    { id: "contact", label: "Contact", icon: "📧" },
    { id: "horaires", label: "Horaires", icon: "🕒" },
    { id: "blob", label: "Gestion fichiers", icon: "📁" },
  ];

  // Composant onglets de langue
  const LangTabs = () => (
    <div className="flex gap-2 mb-6">
      <button
        onClick={() => setActiveLang("fr")}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          activeLang === "fr"
            ? "bg-primary text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        🇫🇷 Français
      </button>
      <button
        onClick={() => setActiveLang("en")}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          activeLang === "en"
            ? "bg-primary text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
        🇬🇧 English
      </button>
            </div>
  );

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
            <LangTabs />
            
            {activeLang === "fr" ? (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Titre Histoire (Français)
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
                    Description Histoire (Français)
                  </label>
                  <textarea
                    value={content.histoire}
                    rows={8}
                    onChange={(e) => setContent({ ...content, histoire: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title (English)
                  </label>
                  <input
                    type="text"
                    value={content.titleEn}
                    onChange={(e) => setContent({ ...content, titleEn: e.target.value })}
                    placeholder={content.title || "Enter English title..."}
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description (English)
                  </label>
                  <textarea
                    value={content.histoireEn}
                    rows={8}
                    onChange={(e) => setContent({ ...content, histoireEn: e.target.value })}
                    placeholder={content.histoire || "Enter English description..."}
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image ou Vidéo Histoire (commune aux deux langues)
              </label>
              {content.histoireImg && (
                <>
                  {content.histoireImg.match(/\.(mp4|webm|ogg|mov)$/i) ? (
                    <video
                      src={content.histoireImg}
                      controls
                      className="rounded-md mb-2 w-full max-w-2xl"
                      style={{ maxHeight: "400px" }}
                    >
                      Votre navigateur ne supporte pas la vidéo.
                    </video>
                  ) : (
                    <Image
                      src={content.histoireImg}
                      alt="Image Histoire"
                      width={600}
                      height={400}
                      className="rounded-md mb-2"
                    />
                  )}
                </>
              )}
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setNewHistoireImage(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 bg-white border rounded-lg shadow-sm text-sm"
              />
              {newHistoireImage && (
                <>
                  {newHistoireImage.type.startsWith("video/") ? (
                    <video
                      src={URL.createObjectURL(newHistoireImage)}
                      controls
                      className="mt-2 rounded-md w-full max-w-md"
                      style={{ maxHeight: "200px" }}
                    >
                      Votre navigateur ne supporte pas la vidéo.
                    </video>
                  ) : (
                    <Image
                      src={URL.createObjectURL(newHistoireImage)}
                      alt="Prévisualisation Image Histoire"
                      width={100}
                      height={64}
                      className="mt-2 rounded-md"
                    />
                  )}
                </>
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
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Option 1 : Uploader un fichier PDF
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    setNewPdf(e.target.files?.[0] || null);
                    setPdfUrl(""); // Réinitialiser l'URL si un fichier est sélectionné
                  }}
                  className="w-full px-3 py-2 bg-white border rounded-lg shadow-sm text-sm"
                />
                {newPdf && (
                  <p className="text-xs text-gray-500 mt-1">
                    Fichier sélectionné : {newPdf.name}
                  </p>
                )}
              </div>
              <div className="text-center text-gray-400">OU</div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Option 2 : Entrer directement une URL Cloudinary
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="url"
                  placeholder="https://res.cloudinary.com/.../raw/upload/.../carte.pdf"
                  value={pdfUrl}
                  onChange={(e) => {
                    setPdfUrl(e.target.value);
                    setNewPdf(null); // Réinitialiser le fichier si une URL est entrée
                  }}
                  className="w-full px-3 py-2 bg-white border rounded-lg shadow-sm text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Si l&apos;upload via formulaire ne fonctionne pas, utilisez l&apos;URL Cloudinary du PDF uploadé manuellement
                </p>
              </div>
            </div>
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

      case "plats":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Plats populaires</h2>
              <button
                onClick={handleAddDish}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                <Plus size={20} />
                Ajouter un plat
              </button>
            </div>

            {editingDish ? (
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {editingDish.id ? "Modifier le plat" : "Nouveau plat"}
                </h3>
                <LangTabs />
                
                {activeLang === "fr" ? (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nom du plat (Français) *
                      </label>
                      <input
                        type="text"
                        value={editingDish.name}
                        onChange={(e) =>
                          setEditingDish({ ...editingDish, name: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description (Français) *
                      </label>
                      <textarea
                        value={editingDish.description}
                        rows={4}
                        onChange={(e) =>
                          setEditingDish({ ...editingDish, description: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Dish name (English)
                      </label>
                      <input
                        type="text"
                        value={editingDish.nameEn || ""}
                        onChange={(e) =>
                          setEditingDish({ ...editingDish, nameEn: e.target.value })
                        }
                        placeholder={editingDish.name || "Enter English name..."}
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description (English)
                      </label>
                      <textarea
                        value={editingDish.descriptionEn || ""}
                        rows={4}
                        onChange={(e) =>
                          setEditingDish({ ...editingDish, descriptionEn: e.target.value })
                        }
                        placeholder={editingDish.description || "Enter English description..."}
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Prix * (ex: &quot;12.00 €&quot;)
                  </label>
                  <input
                    type="text"
                    value={editingDish.price}
                    onChange={(e) =>
                      setEditingDish({ ...editingDish, price: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image
                  </label>
                  {editingDish.image && (
                    <Image
                      src={editingDish.image}
                      alt={editingDish.name}
                      width={200}
                      height={150}
                      className="rounded-md mb-2"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewDishImage(e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 bg-white border rounded-lg shadow-sm text-sm"
                  />
                  {newDishImage && (
                    <Image
                      src={URL.createObjectURL(newDishImage)}
                      alt="Prévisualisation"
                      width={100}
                      height={64}
                      className="mt-2 rounded-md"
                    />
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleSaveDish}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Sauvegarder
                  </button>
                  <button
                    onClick={() => {
                      setEditingDish(null);
                      setNewDishImage(null);
                    }}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ) : null}

            <div className="space-y-3">
              {dishes.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Aucun plat pour le moment. Cliquez sur &quot;Ajouter un plat&quot; pour commencer.
                </p>
              ) : (
                dishes.map((dish, index) => (
                  <div
                    key={dish.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {dish.name}
                        </h3>
                        <span className="text-lg font-bold text-primary">
                          {dish.price}€
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{dish.description}</p>
                      {dish.image && (
                        <Image
                          src={dish.image}
                          alt={dish.name}
                          width={150}
                          height={100}
                          className="rounded-md mt-2"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleEditDish(dish)}
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors"
                        title="Modifier"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => dish.id && handleDeleteDish(dish.id)}
                        className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => handleMoveDish(dish, "up")}
                          disabled={index === 0}
                          className="p-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Déplacer vers le haut"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => handleMoveDish(dish, "down")}
                          disabled={index === dishes.length - 1}
                          className="p-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Déplacer vers le bas"
                        >
                          ↓
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case "infos":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Infos pratiques</h2>
            <LangTabs />
            
            {activeLang === "fr" ? (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cuisine (Français)
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
                    Moyens de paiement (Français)
                  </label>
                  <input
                    type="text"
                    value={content.paiement}
                    onChange={(e) => setContent({ ...content, paiement: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cuisine (English)
                  </label>
                  <input
                    type="text"
                    value={content.cuisineEn}
                    onChange={(e) => setContent({ ...content, cuisineEn: e.target.value })}
                    placeholder={content.cuisine || "Enter English cuisine type..."}
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Payment methods (English)
                  </label>
                  <input
                    type="text"
                    value={content.paiementEn}
                    onChange={(e) => setContent({ ...content, paiementEn: e.target.value })}
                    placeholder={content.paiement || "Enter English payment methods..."}
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
                  />
                </div>
              </>
            )}
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

      case "blob":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Gestion des fichiers Blob</h2>
            <p className="text-gray-600 mb-4">
              Espace utilisé: {blobFiles.reduce((acc, f) => acc + (f.size || 0), 0).toLocaleString()} octets
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Nom</th>
                    <th className="border p-2 text-left">Taille</th>
                    <th className="border p-2 text-left">Type</th>
                    <th className="border p-2 text-left">Date</th>
                    <th className="border p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blobFiles.map((file) => (
                    <tr key={file.url}>
                      <td className="border p-2">{file.pathname || "N/A"}</td>
                      <td className="border p-2">{(file.size || 0).toLocaleString()} octets</td>
                      <td className="border p-2">{file.contentType || "N/A"}</td>
                      <td className="border p-2">
                        {file.uploadedAt
                          ? new Date(file.uploadedAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="border p-2">
                        <button
                          onClick={() => handleDeleteBlob(file.url)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
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
