import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import { default as Routes } from "./Routes";
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={"esports"}>
      <RecoilRoot>
        <App />
        <Routes />
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
