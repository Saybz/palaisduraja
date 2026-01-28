// Route pour upload de fichiers vers Cloudinary
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    // Vérifier le Content-Type
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("multipart/form-data")) {
      // Si ce n'est pas multipart/form-data, essayer de parser quand même
      // (certains clients peuvent ne pas envoyer le header correctement)
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json(
      { error: "Aucun fichier fourni" },
      { status: 400 }
    );
  }

    // Vérifier le type de fichier
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
      "video/mp4",
      "video/webm",
      "video/quicktime",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Type de fichier non autorisé" },
        { status: 400 }
      );
    }

    // Vérifier la taille (500MB max)
    const maxSize = 500 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Fichier trop volumineux (max 500MB)" },
        { status: 400 }
      );
    }

    // Convertir le fichier en buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Déterminer le type de ressource
    const resourceType =
      file.type.startsWith("video/")
        ? "video"
        : file.type === "application/pdf"
        ? "raw"
        : "image";

    // Déterminer le public_id selon le type de fichier
    let publicId: string;
    if (resourceType === "raw") {
      // Pour les PDFs, utiliser un nom fixe "carte_palaisduraja"
      publicId = "carte_palaisduraja";
    } else {
      // Pour les autres fichiers, utiliser un nom unique avec timestamp
      publicId = `${Date.now()}-${file.name.replace(/\.[^/.]+$/, "")}`;
    }

    // Upload vers Cloudinary en utilisant upload_stream pour éviter les problèmes de Content-Type
    const uploadOptions: {
      resource_type: "image" | "video" | "raw";
      folder: string;
      public_id: string;
      access_mode?: "public";
      type?: "upload";
      eager?: Array<{ transformation: Array<{ quality?: string; format?: string }> }>;
      transformation?: Array<{ quality?: string; format?: string; bit_rate?: string }>;
    } = {
      resource_type: resourceType as "image" | "video" | "raw",
      folder: "palais-du-raja", // Organiser les fichiers dans un dossier
      public_id: publicId,
      access_mode: "public", // S'assurer que les fichiers sont publics
      type: "upload", // Type d'upload explicite
      // Compression pour les vidéos : réduire la qualité et le bitrate
      ...(resourceType === "video" && {
        transformation: [
          { quality: "auto:good" }, // Qualité automatique optimisée
          { bit_rate: "1m" }, // Bitrate max 1Mbps pour réduire la taille
        ],
      }),
    };

    // Utiliser upload_stream pour les gros fichiers
    const result = await new Promise<{
      secure_url: string;
      public_id: string;
      format: string;
      bytes: number;
    }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve({
              secure_url: result.secure_url,
              public_id: result.public_id,
              format: result.format || "",
              bytes: result.bytes,
            });
          } else {
            reject(new Error("Upload failed: no result"));
          }
        }
      );

      // Créer un stream à partir du buffer et le pipe vers uploadStream
      const bufferStream = Readable.from(buffer);
      bufferStream.pipe(uploadStream);
    });

    // Utiliser directement l'URL retournée par Cloudinary (elle est correcte)
    // Pour les PDFs, Cloudinary retourne déjà l'URL correcte avec secure_url
    // Le message "your store is blocked" peut venir de restrictions Cloudinary sur les fichiers raw
    // Solution : Utiliser directement l'URL Cloudinary sans transformation
    
    // Pour les vidéos, on ajoutera des transformations lors de l'affichage pour compresser
    // Pour les PDFs, utiliser directement secure_url qui est la bonne URL

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format || (resourceType === "raw" ? "pdf" : ""),
      size: result.bytes,
      resourceType, // Inclure le type de ressource pour faciliter la détection côté client
    });
  } catch (error) {
    console.error("Erreur upload Cloudinary:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload" },
      { status: 500 }
    );
  }
}
