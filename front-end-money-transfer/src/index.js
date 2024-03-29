import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline } from "@mui/material";

const root = document.getElementById("root");
const reactRoot = ReactDOM.createRoot(root);

if (process.env.NODE_ENV === "development") {
  reactRoot.render(
    <React.StrictMode>
      <CssBaseline>
        <App />
      </CssBaseline>
    </React.StrictMode>
  );
} else {
  reactRoot.render(<App />);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
