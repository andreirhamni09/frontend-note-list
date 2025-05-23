"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { ErrorData } from "@/response/auth/register/RegisterInterface";
import { useRouter } from 'next/navigation';
import { ArrowBigLeft, UserRoundPlus } from "lucide-react";
import { RegisterApi } from "@/api/auth/api";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const [form, setForm] = useState({
    nama_user     : '',
    email_user    : '',
    password_user : '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorData>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const LoginPages = () => {
    router.push('/auth/login');
  }
  const [apiErrorMessages, setApiErrorMessages]    = useState("");    

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data    = {
        nama_user           : form.nama_user,
        email_user          : form.email_user,
        password_user       : form.password_user
    };
    const res  = await RegisterApi(data);
    if(res.status === 200) {
        router.push('/')
    } else if(res.status === 422){
        setError(res.error)
        setForm(prev => ({
            ...prev,
            nama_user           : res.data?.nama_user       || '',
            email_user          : res.data?.email_user      || '',
            password_user       : res.data?.password_user   || ''
        }));
      setLoading(false);
    } else if(res.status === 500) {
      setApiErrorMessages(res.messages);
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen px-4">
      <Card className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="nama_user">Nama</Label>
                <Input
                  id="nama_user" name="nama_user"
                  type="text"
                  placeholder="Andre"
                  value={form.nama_user}
                  onChange={handleChange}
                />
                {error?.nama_user && (
                  <p className="text-sm text-red-500 mt-1">{error?.nama_user[0]}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email_user">Email</Label>
                <Input
                  id="email_user" name="email_user"
                  type="email_user"
                  placeholder="m@example.com"
                  value={form.email_user}
                  onChange={handleChange}
                />
                {error?.email_user && (
                  <p className="text-sm text-red-500 mt-1">{error.email_user[0]}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password_user">Password</Label>
                </div>
                <Input 
                  id="password_user" 
                  name="password_user" 
                  type="password"
                  value={form.password_user}
                  onChange={handleChange}
                />
                {error?.password_user && (
                  <p className="text-sm text-red-500 mt-1">{error.password_user[0]}</p>
                )}
              </div>
               <div className="mb-6 flex items-center justify-center gap-2">
                  <Button 
                    type="button" 
                    className="w-1/2 bg-cyan-500 text-white py-2 rounded hover:bg-cyan-800 flex items-center justify-center gap-1"
                    onClick={LoginPages}>
                    <ArrowBigLeft /> Back 
                  </Button>
                  <Button type="submit" className="w-1/2 text-white py-2 rounded flex items-center justify-center gap-1" disabled={loading}>
                    <UserRoundPlus />{loading ? 'Registering...' : 'Register'}
                  </Button>
              </div>
            </div>
            { apiErrorMessages && <p className="text-sm text-red-500 mt-1">{apiErrorMessages}</p> }
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
