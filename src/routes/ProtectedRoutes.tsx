import { HomePage } from 'features/home';
import React from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import { CliCookieService, CLI_COOKIE_KEYS } from 'shared/services/cli-cookie';
import { PROTECTED_ROUTES_PATH } from './RoutesPath';
import { NotificationPage } from 'features/notification';
import { CategoryPage, ProductStorePage } from 'features/question';
import { UpdateProduct } from 'features/question/product/pages/UpdateProduct';

export const ProtectedRoutes: RouteObject[] = [
  {
    path: PROTECTED_ROUTES_PATH.HOME,
    element: <HomePage />
  },

  {
    path: PROTECTED_ROUTES_PATH.QUESTION,
    element: <Outlet />,
    children: [
      {
        path: '',
        element: <ProductStorePage />
      },
      {
        path: 'add',
        element: <UpdateProduct />
      },
      {
        path: ':id',
        element: <UpdateProduct />
      }
    ]
  },
  {
    path: PROTECTED_ROUTES_PATH.CATEGORY_QUESTION,
    element: <CategoryPage />
  },
  {
    path: PROTECTED_ROUTES_PATH.NOTIFICATION,
    element: <NotificationPage />
  }
];

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = CliCookieService.get(CLI_COOKIE_KEYS.ACCESS_TOKEN);

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;
