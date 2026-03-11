"use client";

import { Biohazard, ChevronUp, Home, User2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { NavMain } from "./nav-main";

const data = {
  main: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
  ],
  izinKerja: [
    {
      title: "Ajukan Izin Kerja",
      icon: Biohazard,
      isActive: true,
      items: [
        { title: "Work Permit", url: "/form/work-permits" },
        { title: "Job Safety Analysis", url: "/form/jsa" },
        { title: "HIRARC", url: "/form/hirarc" },
        { title: "SOP", url: "/form/sop" },
        { title: "Instruksi Kerja", url: "/form/intruksi-kerja" },
      ],
    },
  ],
};

export default function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>,
) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <h1 className="px-4 text-lg font-semibold">Ekstrama</h1>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {/* Dashboard */}
            <SidebarMenu>
              {data.main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            {/* Ajukan Izin Kerja */}
            <NavMain items={data.izinKerja} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 />
                  Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
