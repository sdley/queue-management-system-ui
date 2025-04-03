'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[#b26148]">
            sdley QueueMS
          </Link>

          {/* Desktop menu */}
          <nav className="flex space-x-6 max-md:hidden">
            <Link href="/" className="text-sm text-[#00a8e2] hover:underline">Accueil</Link>
            <Link href="/client" className="text-sm text-[#00a8e2] hover:underline">Client</Link>
            <Link href="/agent" className="text-sm text-[#00a8e2] hover:underline">Agent</Link>
            <Link href="/admin" className="text-sm text-[#00a8e2] hover:underline">Admin</Link>
            <Link href="/services" className="text-sm text-[#00a8e2] hover:underline">Services</Link>
          </nav>

          {/* Buttons */}
          <div className="flex space-x-2 max-md:hidden">
            <button className="px-4 py-2 text-sm text-[#b26148] border border-[#b26148] rounded-md hover:bg-[#f8e9e6]">
              Connexion
            </button>
            <button className="px-4 py-2 text-sm text-white bg-[#00a8e2] rounded-md hover:bg-[#0094c8]">
              Inscription
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#b26148]"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <Link href="/" className="block text-[#00a8e2] hover:underline">Accueil</Link>
            <Link href="/client" className="block text-[#00a8e2] hover:underline">Client</Link>
            <Link href="/agent" className="block text-[#00a8e2] hover:underline">Agent</Link>
            <Link href="/admin" className="block text-[#00a8e2] hover:underline">Admin</Link>
            <Link href="/services" className="block text-[#00a8e2] hover:underline">Services</Link>
            <div className="flex gap-2 mt-4">
              <button className="w-full px-4 py-2 text-sm text-[#b26148] border border-[#b26148] rounded-md hover:bg-[#f8e9e6]">
                Connexion
              </button>
              <button className="w-full px-4 py-2 text-sm text-white bg-[#00a8e2] rounded-md hover:bg-[#0094c8]">
                Inscription
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
