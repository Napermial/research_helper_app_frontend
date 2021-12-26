import React from 'react';
import {createBrowserHistory} from "history";
import { Auth0Provider } from '@auth0/auth0-react';


const Auth0ProviderWithHistory : React.FC = ( props ) => {
    const domain = process.env.REACT_APP_AUTH0_DOMAIN || "";
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || "";


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
            audience={process.env.REACT_APP_AUTH0_AUDIENCE}
        >
            {props.children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;