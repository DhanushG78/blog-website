"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-5 sticky top-0 z-50 backdrop-blur-xl bg-[#000212]/80 border-b border-white/10 animate-slide-down">
      <Link href="/">
        <h1 className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent hover:to-white transition-all cursor-pointer">
          Nex<span className="text-accent">Blog</span>
        </h1>
      </Link>

      <div className="flex gap-8 items-center">
        <Link
          href="/"
          className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          href="/authors"
          className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 hover:glow"
        >
          Authors
        </Link>
      </div>
    </nav>
  );
}
