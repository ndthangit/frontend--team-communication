import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

interface PrivateRouteProps {
    children: React.ReactElement;
    requiredRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return <div>Loading...</div>;  // Hoặc spinner loading
    }

    if (!keycloak.authenticated) {
        keycloak.login();  // Redirect về trang login của Keycloak nếu chưa auth
        return <div>Redirecting to login...</div>;
    }

    return children;
};

export default PrivateRoute;