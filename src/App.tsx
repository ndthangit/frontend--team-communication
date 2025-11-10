import './App.css'

import {ReactKeycloakProvider} from "@react-keycloak/web";
import {initOptions, keycloak} from "./config/keycloak.tsx";
import MainRouter from "./route/MainRoute.tsx";
import {AppProvider} from "./context/AppContext.tsx";

function App() {

    return (
        <ReactKeycloakProvider
            authClient={keycloak}
            initOptions={initOptions}
        >
            <AppProvider>
                <MainRouter />
            </AppProvider>
        </ReactKeycloakProvider>
    )
}

export default App
