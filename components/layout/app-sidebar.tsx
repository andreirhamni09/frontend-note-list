'use client'
import { NotebookPen, User, UserPen, LogOut } from "lucide-react";
import Cookies from 'js-cookie';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';


export function AppSidebar() {
  const router = useRouter();
  const sideBarMenu = [
    {
      title: "Note List",
      url: "/",
      icon: NotebookPen,
    }
  ];
  const [dropDownItem, setDropDownItem] = useState<any>([]);
  useEffect(() => {
    const users   = JSON.parse(Cookies.get('users') || '[]');
    const data = [
      {
        title : users['nama_user'],
        icon  : UserPen,
        items : [
          {
            title : "Profile",
            url   : "/",
            icon  : UserPen
          }, 
          {
            title : "Logout",
            url   : "/logout",
            icon  : LogOut,
          }
        ]
      }
    ];
    setDropDownItem(data);
  }, [router]);
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sideBarMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon/>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
          <DropdownMenu>
            {dropDownItem.map((dr:any) => (
              <div key={dr.title}>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton key={dr.title}>
                    <User /> {dr.title}
                    <dr.icon className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="top"
                    className="w-[--radix-popper-anchor-width]"
                  >
                  {dr.items.map((itemsData:any) => (
                    <div key={itemsData.title}>
                    <DropdownMenuItem>
                        <a href={itemsData.url}>
                          <span className="flex flex-wrap justify-end gap-2"><itemsData.icon />{itemsData.title}</span>
                        </a>
                    </DropdownMenuItem>
                    </div>
                  ))}
                </DropdownMenuContent>
              </div>
            ))}
          </DropdownMenu>
        </SidebarFooter>
    </Sidebar>
  )
}
