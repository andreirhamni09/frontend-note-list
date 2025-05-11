// components/AuthLayout.tsx
import React from 'react';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
        {children}
    </div>
  );
};

export default AuthLayout;
