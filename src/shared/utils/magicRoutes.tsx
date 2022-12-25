import { Route, RouteObject } from 'react-router-dom';
import ProtectedRoute from 'routes/ProtectedRoutes';

export const magicRoutes = (routes: Array<RouteObject>) => {
  return (
    <>
      {routes.map((item: RouteObject) => (
        <Route
          key={item.path}
          path={item.path}
          element={<ProtectedRoute>{item.element}</ProtectedRoute>}>
          {item.children && magicRoutes(item.children)}
        </Route>
      ))}
    </>
  );
};
