import { Login } from 'features/auth/pages/Login';
import Page404 from 'features/Page404';
import React from 'react';
import { Route, RouteObject, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'shared/container/Container';
import { magicRoutes } from 'shared/utils/magicRoutes';
import ProtectedRoute, { ProtectedRoutes } from './ProtectedRoutes';

const Body = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-screen h-screen bg-body-main flex justify-center">{children}</div>;
};

export const AppRoutes = () => {
  return (
    <Body>
      <Routes>
        {ProtectedRoutes.map((item: RouteObject) => (
          <Route
            key={item.path}
            path={item.path}
            element={
              <ProtectedRoute>
                <Container>{item.element}</Container>
              </ProtectedRoute>
            }>
            {item.children && magicRoutes(item.children)}
          </Route>
        ))}
        <Route path="*" element={<Page404 />} />
        <Route path={'/login'} element={<Login />} />
      </Routes>
    </Body>
  );
};
