import './App.css'

import {ReactKeycloakProvider} from "@react-keycloak/web";
import {initOptions, keycloak} from "./config/keycloak.tsx";
import MainRouter from "./route/MainRoute.tsx";
import { Provider } from 'react-redux';
import {store} from "./store";

function App() {

    return (
        <ReactKeycloakProvider
            authClient={keycloak}
            initOptions={initOptions}
        >
            <Provider store={store}>
                <MainRouter />
            </Provider>
        </ReactKeycloakProvider>
    )
}

export default App
