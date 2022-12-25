import { Login } from "features/auth/pages/Login";
import { RouteObject } from "react-router-dom";
import { PUBLIC_ROUTES_PATH } from "./RoutesPath";

export const PublicRoutes: RouteObject[] = [
  {
    path: PUBLIC_ROUTES_PATH.LOGIN,
    element: <Login />,
  },
];
