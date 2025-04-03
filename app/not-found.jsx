// app/not-found.jsx
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-extrabold text-[#b26148] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-[#00a8e2] mb-2">Page non trouvée</h2>
      <p className="text-gray-600 mb-6">
        Oups ! La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#00a8e2] text-white rounded-md hover:bg-[#0094c8] transition"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
