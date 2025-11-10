import Keycloak, {
    type KeycloakConfig,
    type KeycloakInitOptions,
} from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
}

// const keycloak = new Keycloak({
//     url: import.meta.env.VITE_KEYCLOAK_URL,
//     realm: import.meta.env.VITE_KEYCLOAK_REALM,
//     clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
// });

const keycloak = new Keycloak(keycloakConfig);



const initOptions: KeycloakInitOptions = {
    pkceMethod: 'S256',                       // enforce PKCE for extra SPA security
    onLoad: "check-sso",  // Tự động load iframe để check SSO
    checkLoginIframe: false,  // Tùy chọn, tránh lỗi nếu cần
};


export { keycloak, initOptions };
