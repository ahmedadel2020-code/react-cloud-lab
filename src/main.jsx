import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig.js";
import FirebaseContext from "./FirebaseContext.js";

const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseContext.Provider value={app}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>
);
