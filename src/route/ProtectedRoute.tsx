import React, { useEffect, useState } from 'react';
import { useKeycloak } from "@react-keycloak/web";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
                                                           children,
                                                           requiredRoles = []
                                                       }) => {
    const { keycloak, initialized } = useKeycloak();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // Chỉ chạy logic sau khi Keycloak đã initialized
        if (initialized && !keycloak.authenticated) {
            keycloak.login(); // Redirect về trang login của Keycloak nếu chưa auth
            return;
        }

        if (initialized && keycloak.authenticated) {
            // Kiểm tra roles nếu có yêu cầu
            if (requiredRoles.length === 0) {
                setIsAuthorized(true);
                return;
            }

            const hasRole = requiredRoles.some(role =>
                keycloak.tokenParsed?.realm_access?.roles.includes(role) ||
                keycloak.tokenParsed?.resource_access?.[keycloak.clientId!]?.roles.includes(role)
            );

            setIsAuthorized(hasRole);
        }
    }, [keycloak, initialized, requiredRoles]);

    // Hiển thị trạng thái loading trong khi chờ initialized
    if (!initialized) {
        return <div>Loading...</div>;
    }

    // Nếu chưa authorized (do không có quyền), hiển thị thông báo
    if (initialized && keycloak.authenticated && !isAuthorized && requiredRoles.length > 0) {
        return <div>Bạn không có quyền truy cập trang này</div>;
    }

    // Nếu đã authenticated và authorized, hiển thị children
    if (initialized && keycloak.authenticated && isAuthorized) {
        return <>{children}</>;
    }

    // Trường hợp đang chuyển hướng login, hiển thị thông báo
    return <div>Redirecting to login...</div>;
};

export default ProtectedRoute;