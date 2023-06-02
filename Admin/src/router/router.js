import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error/Error";
import Login from "../pages/Login/Login";
import { userLoader } from "../loader/userLoader";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: userLoader,
    errorElement: <Error />,
    children: [{ index: true }, { path: "/login", element: <Login /> }],
  },
]);
