import { HomePage } from 'features/home';
import React from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import { CliCookieService, CLI_COOKIE_KEYS } from 'shared/services/cli-cookie';
import { PROTECTED_ROUTES_PATH } from './RoutesPath';
import { NotificationPage } from 'features/notification';
import { ProductStorePage, TopicPage, UpdateTopic } from 'features/question';
import { UpdateProduct } from 'features/question/product/pages/UpdateProduct';
import { CoursePage, UpdateCourse } from 'features/course';
import { PostPage, UpdatePost } from 'features/news';

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
    path: PROTECTED_ROUTES_PATH.COURSE,
    element: <Outlet />,
    children: [
      {
        path: '',
        element: <CoursePage />
      },
      {
        path: 'add',
        element: <UpdateCourse />
      },
      {
        path: ':id',
        element: <UpdateCourse />
      }
    ]
  },
  {
    path: PROTECTED_ROUTES_PATH.TOPIC_QUESTION,
    element: <Outlet />,
    children: [
      {
        path: '',
        element: <TopicPage />
      },
      {
        path: 'add',
        element: <UpdateTopic />
      },
      {
        path: ':id',
        element: <UpdateTopic />
      }
    ]
  },
  {
    path: PROTECTED_ROUTES_PATH.POST,
    element: <Outlet />,
    children: [
      {
        path: '',
        element: <PostPage />
      },
      {
        path: 'add',
        element: <UpdatePost />
      },
      {
        path: ':id',
        element: <UpdatePost />
      }
    ]
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
