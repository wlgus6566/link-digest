"use client";

import Link from "next/link";
import { Home, Bookmark, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "홈", href: "/" },
    { icon: Bookmark, label: "보관함", href: "/library" },
    { icon: User, label: "프로필", href: "/profile" },
  ];

  return (
    <div className="bottom-nav">
      <div className="grid h-full grid-cols-3 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link href={item.href} key={item.href} className="relative">
              <div
                className={`bottom-nav-item ${
                  isActive ? "active" : "inactive"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="mt-1 text-[10px] font-medium">
                  {item.label}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute bottom-0 w-12 h-1 rounded-t-full bg-primary-color"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
