import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error/Error";
import Login from "../pages/Login/Login";
import { userLoader } from "../loader/userLoader";
import { loginLoader } from "../loader/loginLoader";
import ListCompo from "../pages/Error/ListCompo/ListCompo";
import { protectedRoute } from "../loader/protectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: userLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
      },
      {
        path: "/login",
        loader: loginLoader,
        element: <Login />,
      },
      {
        path: "/component",
        loader: protectedRoute, 
        element: <ListCompo />,
      },
    ],
  },
]);
