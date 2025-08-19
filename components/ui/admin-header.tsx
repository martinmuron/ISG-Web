"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { clearSession } from "@/lib/auth";
import { Logo } from "@/components/ui/logo";

export function AdminHeader() {
  const router = useRouter();

  const handleLogout = () => {
    clearSession();
    router.push("/admin");
  };

  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <Logo className="h-8 w-auto text-slate-900" />
          <span className="text-lg font-semibold text-slate-900">Admin Dashboard</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            View Site
          </a>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}