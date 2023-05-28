import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
//import { getConfig } from "./oAuth/config";
import history from "./oAuth/history";

//const config = getConfig();

const onRedirectCallback = (appState: any) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

const providerConfig = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(import.meta.env.VITE_AUTH0_AUDIENCE
      ? { audience: import.meta.env.VITE_AUTH0_AUDIENCE }
      : null),
  },
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider {...providerConfig}>
      <HashRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </HashRouter>
    </Auth0Provider>
  </React.StrictMode>
);
