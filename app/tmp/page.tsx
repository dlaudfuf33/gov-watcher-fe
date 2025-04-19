"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SidebarFilter from "@/components/SidebarFilter";
import { Sidebar } from "lucide-react";

export default function TmpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <body>
        <SidebarFilter></SidebarFilter>
      </body>
      <Footer />
    </div>
  );
}
