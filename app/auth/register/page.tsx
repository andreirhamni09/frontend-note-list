"use client"
import { useState } from 'react';
import { Button} from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/components/auth/AuthLayout';
import { RegisterForm } from '@/components/auth/register/RegisterForm';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi pengiriman data ke backend atau validasi form
    console.log(formData);
  };

  return (
    <AuthLayout>
        <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
