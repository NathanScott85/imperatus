import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../../context';

// Define the props for the ProtectedRoute component
interface ProtectedRouteProps {
    element: React.ReactElement; // Component to render
    redirectPath?: string; // Optional path to redirect if not authenticated
}

// Create the ProtectedRoute component
export const ProtectedRoute = ({
    element,
    redirectPath, // Default redirect path
}: ProtectedRouteProps) => {
    const { isAuthenticated } = useAppContext(); // Check the authentication status

    // If the user is authenticated, render the component; otherwise, redirect to login
    return isAuthenticated ? (
        element
    ) : (
        <Navigate to={redirectPath as string} replace />
    );
};
