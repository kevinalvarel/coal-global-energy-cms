"use client";

import * as React from "react";

import { NavContents } from "@/components/admin/nav-documents";
import { NavMain } from "@/components/admin/nav-main";
import { NavSecondary } from "@/components/admin/nav-secondary";
import { NavUser } from "@/components/admin/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  ListIcon,
  ChartBarIcon,
  FolderIcon,
  UsersIcon,
  Settings2Icon,
  SearchIcon,
  Clock,
  Pencil,
  FileText,
} from "lucide-react";
import Image from "next/image";

const data = {
  user: {
    name: "nanti giganti",
    email: "wowobimjikersamtu@gmail.com ",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: <ChartBarIcon />,
    },
  ],
  NavContent: [
    {
      title: "Semua Postingan",
      url: "/admin/semua-postingan",
      icon: <ListIcon />,
    },
    {
      title: "Buat Postingan",
      url: "/admin/buat-postingan",
      icon: <Pencil />,
    },
    {
      title: "Draf",
      url: "/admin/draf",
      icon: <FolderIcon />,
    },
    {
      title: "Terjadwalkan",
      url: "/admin/terjadwalkan",
      icon: <Clock />,
    },
  ],
  navSecondary: [
    {
      title: "Pengaturan Umum",
      url: "/admin/pengaturan-umum",
      icon: <Settings2Icon />,
    },
    {
      title: "Pengaturan Pengguna",
      url: "/admin/pengaturan-pengguna",
      icon: <UsersIcon />,
    },
    {
      title: "Pencarian",
      url: "/admin/pencarian",
      icon: <SearchIcon />,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="/admin" />}
            >
              <Image
                alt="Logo"
                src="/images/company-logo.png"
                height={32}
                width={32}
              />
              <span className="text-base font-semibold">CGE Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavContents items={data.NavContent} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
