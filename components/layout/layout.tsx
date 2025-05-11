// components/AuthLayout.tsx
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        {children}
    </SidebarProvider>
  );
};

export default PageLayout;
