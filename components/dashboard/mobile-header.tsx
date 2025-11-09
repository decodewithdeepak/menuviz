"use client";

import Link from "next/link";
import { IoFastFood } from "react-icons/io5";

export function MobileHeader() {
  return (
    <div className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
      <Link href="/dashboard" className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-md shadow-orange-500/30">
          <IoFastFood className="h-5 w-5 text-white" />
        </div>
        <span className="font-bold text-xl text-orange-600 cursive-text">
          MenuViz
        </span>
      </Link>
    </div>
  );
}

