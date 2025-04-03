import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* LOGO */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-2xl font-bold text-[#b26148]">
              sdley QueueMS
            </Link>
          </div>

          {/* MENU */}
          <nav className="flex space-x-6 max-sm:hidden">
            <Link href="/" className="text-sm text-[#00a8e2] hover:underline">Accueil</Link>
            <Link href="/client" className="text-sm text-[#00a8e2] hover:underline">Client</Link>
            <Link href="/agent" className="text-sm text-[#00a8e2] hover:underline">Agent</Link>
            <Link href="/admin" className="text-sm text-[#00a8e2] hover:underline">Admin</Link>
            <Link href="/services" className="text-sm text-[#00a8e2] hover:underline">Services</Link>
          </nav>

          {/* BOUTONS */}
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm text-[#b26148] border border-[#b26148] rounded-md hover:bg-[#f8e9e6]">
              Connexion
            </button>
            <button className="px-4 py-2 text-sm text-white bg-[#00a8e2] rounded-md hover:bg-[#0094c8]">
              Inscription
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
