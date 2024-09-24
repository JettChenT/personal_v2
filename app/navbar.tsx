"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <span
        className={cn(
          "px-1 py-1 border border-transparent",
          isActive
            ? "bg-blue-700 text-white"
            : "text-blue-700 hover:border-blue-200"
        )}
      >
        [{children}]
      </span>
    </Link>
  );
}

export default function Navbar() {
  return (
    <div className="flex justify-between font-mono items-center">
      <h1 className="text-3xl font-bold">Jett Chen</h1>
      <div className="flex gap-2">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/stream">Stream</NavLink>
        <NavLink href="https://blog.jettchen.me">Blog</NavLink>
      </div>
    </div>
  );
}
