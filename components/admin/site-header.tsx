"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

function SiteHeaderTitle() {
  const pathname = usePathname();
  const slug = pathname.replace(/^\/admin\/?/, "");
  const title = slug
    ? slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Dashboard";

  return <h1 className="text-base font-medium">{title}</h1>;
}

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 h-4 data-vertical:self-auto"
        />
        <Suspense
          fallback={<h1 className="text-base font-medium">Dashboard</h1>}
        >
          <SiteHeaderTitle />
        </Suspense>
      </div>
    </header>
  );
}
