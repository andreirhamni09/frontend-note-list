import { NotebookPen, User, ChevronUp, UserPen, LogOut, Settings} from "lucide-react";
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

// Menu items.
const sideBarMenu = [
  {
    title: "Note List",
    url: "/",
    icon: NotebookPen,
  }
];

const dropDownItem = [
  {
    title : "Setting",
    icon  : Settings,
    items : [
      {
        title : "Profile",
        url   : "#",
        icon  : UserPen
      }, 
      {
        title : "Logout",
        url   : "#",
        icon  : LogOut
      }
    ]
  }
];

export function AppSidebar() {
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
            {dropDownItem.map((dr) => (
              <div key={dr.title}>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User /> {dr.title}
                    <dr.icon className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="top"
                    className="w-[--radix-popper-anchor-width]"
                  >
                  {dr.items.map((itemsData) => (
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
