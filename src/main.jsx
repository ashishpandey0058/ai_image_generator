import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ImageState from "./context/ImageState.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ImageState>
      <RouterProvider router={router} />
    </ImageState>
  </React.StrictMode>
);
