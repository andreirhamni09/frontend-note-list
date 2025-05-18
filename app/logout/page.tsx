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
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const url     = 'http://localhost:8000/api/Auth/logout/' + users['id_user'];
                const response = await axios.delete(url); 
                if(response.data.status === 200) {
                    Cookies.remove('users');
                    router.push('/auth/login');
                } else {
                    setErrorMessages(response.data.messages);
                }
            } catch (error:any) {
                setErrorMessages(error.message)
            } finally {
                setLoading(false);
                router.push('/');
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