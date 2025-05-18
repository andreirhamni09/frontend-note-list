import AuthLayout from '@/components/auth/AuthLayout';
import { RegisterForm } from '@/components/auth/register/RegisterForm';

const Register = () => {
  return (
    <AuthLayout>
        <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
