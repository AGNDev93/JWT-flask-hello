// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
// Función para verificar si hay un token JWT
const isAuthenticated = () => {
    const token = localStorage.getItem("token"); // Obtener el token desde localStorage
    return !!token; // Retorna true si el token existe
};
// Componente de Ruta Protegida
const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/" replace />;
};
export default ProtectedRoute;