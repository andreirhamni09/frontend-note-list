'use client';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { isBefore, isAfter, parseISO } from "date-fns";
import { TokenExpired } from "@/api/auth/api";


const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const token = Cookies.get('users') ? JSON.parse(Cookies.get('users')!).token : null;
      if (!token) {
        router.push('/auth/login');
        return;
      }

      try {
        const data      = await TokenExpired();
        
        const formattedDate = data.data.expired.replace(" ", "T");

        const expired = parseISO(formattedDate);

        const now = new Date();
        if (!isBefore(now, expired)) {
          Cookies.remove('users');
          router.push('/auth/login');
        } 
      } catch (err) {
        console.error('Token check error:', err);
        Cookies.remove('users');
        router.push('/auth/login');
      }
    };

    check();
  }, []);
  return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        {children}
    </SidebarProvider>
  );
};

export default PageLayout;
