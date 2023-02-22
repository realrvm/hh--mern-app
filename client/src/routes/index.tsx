import { createBrowserRouter, Outlet } from 'react-router-dom';

import { AuthProvider } from 'context';
import { Login, Signup, AuthPage, People, Account } from 'pages';

export const router = createBrowserRouter([
  {
    element: <ContextWrapper />,
    children: [
      {
        element: <AuthPage />,
        path: '/',
        children: [
          {
            element: <Login />,
            path: '/login',
          },
          {
            element: <Signup />,
            path: '/signup',
          },
        ],
      },
      {
        element: <Account />,
        path: '/account',
      },
      {
        element: <People />,
        path: '/people',
      },
    ],
  },
]);

function ContextWrapper() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
