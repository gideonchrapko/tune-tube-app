"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";

export default function Sidebar({
  onToggle,
}: {
  onToggle: (isOpen: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    onToggle(!isOpen);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-black transition-all duration-300 z-50 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="flex justify-start items-center p-4">
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          <FaBars className="text-2xl" />
        </button>
      </div>
      {isOpen && (
        <div className="flex flex-col pl-4 mt-10 space-y-4">
          <Link
            href="/creator-analytics"
            className="text-white font-bold text-lg cursor-pointer"
          >
            Creator Analytics
          </Link>
          <Link
            href="/sounds"
            className="text-white font-bold text-lg cursor-pointer"
          >
            Sounds
          </Link>
          <Link
            href="/sync"
            className="text-white font-bold text-lg cursor-pointer"
          >
            Sync
          </Link>
          <Link
            href="/settings"
            className="text-white font-bold text-lg cursor-pointer"
          >
            Settings
          </Link>
        </div>
      )}
    </div>
  );
}
