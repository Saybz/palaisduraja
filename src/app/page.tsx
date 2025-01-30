import { prisma } from "@/utils/db";

export default async function Home() {
  const content = await prisma.content.findFirst();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">{content?.title || "Titre par défaut"}</h1>
      <p className="text-lg text-gray-600">{content?.description || "Description par défaut"}</p>

      {content?.image && (
        <img
          src={content.image}
          alt="Image"
          className="w-1/2 rounded-lg shadow-lg mt-4"
        />
      )}

      {content?.pdf && (
        <a
          href={content.pdf}
          target="_blank"
          className="mt-4 text-blue-500 underline"
        >
          Télécharger la carte
        </a>
      )}
    </div>
  );
}
