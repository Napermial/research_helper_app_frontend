import React from 'react';
import {createBrowserHistory} from "history";
import { Auth0Provider } from '@auth0/auth0-react';


const Auth0ProviderWithHistory : React.FC = ( props  ) => {
    const domain = process.env.AUTH0_DOMAIN || "";
    const clientId = process.env.AUTH0_CLIENT_ID || "";


    const history = createBrowserHistory();

    const onRedirectCallback = (appState : React.ComponentState) => {
        history.push(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            {props.children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;