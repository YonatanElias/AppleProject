import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import "./assets/css/bootstrap.css";
import "./assets/css/styles.css";
import "bootstrap";
import "jquery";
import "font-awesome/css/font-awesome.min.css";
import "./index.css";
import YoutubeVideos from "./components/YoutubeVideos/YoutubeVideos.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
