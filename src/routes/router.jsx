import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import ImageEditor from "../components/ImageEditor";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/edit",
        element: <ImageEditor />,
      },
    ],
  },
]);
