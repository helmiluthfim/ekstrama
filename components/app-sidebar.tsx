"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  FileDiff,
  GalleryVerticalEnd,
  Home,
  Settings2,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { GrUserManager } from "react-icons/gr";
import { PiToolboxBold } from "react-icons/pi";
import { RiErrorWarningLine } from "react-icons/ri";

// Sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: "Izin Kerja",
      url: "/",
      icon: FileDiff,
      isActive: true,
      items: [
        {
          title: "WP",
          url: "/wp",
        },
        {
          title: "JSA",
          url: "/jsa",
        },
        {
          title: "HIRARC",
          url: "/hirarc",
        },
        {
          title: "SOP",
          url: "/sop",
        },
        {
          title: "IK",
          url: "/ik",
        },
      ],
    },
    {
      title: "Pemeriksaan Personil",
      url: "/",
      icon: GrUserManager,
    },
    {
      title: "Pemeriksaan Alat",
      url: "/",
      icon: PiToolboxBold,
    },
    {
      title: "Temuan",
      url: "/",
      icon: RiErrorWarningLine,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
