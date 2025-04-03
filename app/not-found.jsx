import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16 max-w-5xl mx-auto">
        {/* Texte à gauche */}
        <div className="text-center md:text-left">
          <h1 className="text-[100px] text-[#b26148] font-bold leading-none">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#00a8e2] mb-4">Page non trouvée</h2>
          <p className="text-gray-700 text-base md:text-lg mb-6">
            Oups ! La page que vous cherchez<br />
            n'existe pas ou a été déplacée.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#00a8e2] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#008ec1] transition"
          >
            Retour à l'accueil
          </Link>
        </div>

        {/* Image à droite */}
        <div className="w-[200px] md:w-[250px]">
          <Image
            src="/404-illustration.png" // assure-toi que ce fichier est placé dans le dossier /public
            alt="Femme confuse"
            width={300}
            height={400}
            layout="responsive"
          />
        </div>
      </div>
    </div>
  );
}
