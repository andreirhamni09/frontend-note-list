"use client";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

export default function LogoutPage() {
    const router                = useRouter();
    const [loading, setLoading] = useState(true);
    const [errorMessages, setErrorMessages]     = useState();
    const users   = JSON.parse(Cookies.get('users') || '[]');
    const url     = process.env.NEXT_PUBLIC_API_BASE_URL 
    // console.log(users);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.delete(`${url}/Auth/logout/${users['id_user']}`); 
                if(response.data.status === 200) {
                    Cookies.remove('users');
                    router.push('/auth/login');
                } else {
                    setErrorMessages(response.data.messages);
                    router.push('/');
                }
            } catch (error:any) {
                setErrorMessages(error.message)
                router.push('/');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

  if (loading) return <p>Loading...</p>;
  

  return (
    <div>
        { errorMessages && <p className="text-sm text-red-500 mt-1">{errorMessages}</p> }
    </div>
  );
}