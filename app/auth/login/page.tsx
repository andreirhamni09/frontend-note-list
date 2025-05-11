"use client"
import { useState } from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import { RegisterForm } from '@/components/auth/register/RegisterForm';

const Login = () => {

  return (
    <AuthLayout>
        <RegisterForm />
    </AuthLayout>
  );
};

export default Login;
