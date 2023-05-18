import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/*' element={<App />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
