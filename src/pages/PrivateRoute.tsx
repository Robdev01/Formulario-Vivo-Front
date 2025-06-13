// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const usuarioLogado = localStorage.getItem('usuarioLogado');

  if (!usuarioLogado) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
