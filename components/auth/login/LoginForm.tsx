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
import { LoginErrorJson } from "@/response/auth/login/LoginInterface";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import AuthLayout from "../AuthLayout";
import { LogIn, UserRoundPlus } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const router = useRouter();
  const [form, setForm] = useState({
    email_user    : '',
    password_user : '',
  });

  const [loading, setLoading]                         = useState(false);
  const [errorMessages, setErrorMessages]             = useState();
  const [loginErrorJson, setLoginErrorJson]           = useState<LoginErrorJson>();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const registerPages = () => {
    router.push('/auth/register');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
     try {
      const response = await axios.post('http://localhost:8000/api/Auth/login', {
        email_user: form.email_user,
        password_user: form.password_user,
      });
      
      if(response.data.status === 200) {
        Cookies.set('users', JSON.stringify(response.data.data));
        router.push('/dashboard')
      } else if (response.data.status === 204){ 
        setErrorMessages(response.data.messages);
      } else {
        setLoginErrorJson(response.data.error);
        setForm(prev => ({
          ...prev,
          email_user: response.data.data?.email_user || '',
          password_user: response.data.data?.password_user || ''
        }));
      }
    } catch (error:any) {
      setErrorMessages(error.message);
      setForm(prev => ({
          ...prev,
        email_user: form.email_user || '',
        password_user: form.password_user || ''
      }));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AuthLayout>
      <div className={cn("w-[350px]", className)} {...props}>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email_user">Email</Label>
                  <Input
                    id="email_user" name="email_user"
                    type="email_user"
                    placeholder="m@example.com"
                    value={form.email_user}
                    onChange={handleChange}
                  />
                  {loginErrorJson?.email_user && (
                    <p className="text-sm text-red-500 mt-1">{loginErrorJson.email_user[0]}</p>
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
                  {loginErrorJson?.password_user && (
                    <p className="text-sm text-red-500 mt-1">{loginErrorJson.password_user[0]}</p>
                  )}
                </div>
                { errorMessages && <p className="text-sm text-red-500 mt-1">{errorMessages}</p> }
                <div className="grid gap-2">
                    <Button 
                      type="submit" 
                      className="w-full bg-cyan-500 text-white py-2 rounded hover:bg-cyan-800 flex items-center justify-center gap-1" 
                      disabled={loading}>
                        <LogIn />
                        {loading ? 'Login...' : 'Login'}
                    </Button>
                    <Button 
                      type="submit" 
                      className="w-full py-2 rounded flex items-center justify-center gap-1" 
                      onClick={registerPages}>
                      <UserRoundPlus />
                      Register
                    </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  )
}
