"use client";
import { cn } from "@/lib/utils";
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
import {ErrorData} from "@/response/auth/register/RegisterInterface";
import { useRouter } from 'next/navigation';



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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
     try {
      const response = await axios.post('http://localhost:8000/api/register', {
        nama_user: form.nama_user,
        email_user: form.email_user,
        password_user: form.password_user,
      });
      setError(response.data.error);
      const responseData = response.data.data;
      if(response.data.status === 200) {
        router.push('login');
      } else if(response.data.status === 422) {
        setForm(prev => ({
          ...prev,
          email_user: responseData?.email_user || '',
          nama_user: responseData?.nama_user || '',
          password_user: responseData?.password_user || ''
        }));
      } 
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className={cn("w-[350px]", className)} {...props}>

      <Card>
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
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
