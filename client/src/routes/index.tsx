import { createBrowserRouter, Outlet } from 'react-router-dom';

import { AuthProvider } from 'context';
import { Login, Signup, AuthPage, People, Account, App, Edit } from 'pages';

export const router = createBrowserRouter([
  {
    element: <ContextWrapper />,
    children: [
      {
        element: <AuthPage />,
        children: [
          {
            element: <Login />,
            path: '/login',
          },
          {
            element: <Signup />,
            path: '/signup',
          },
          {
            element: <Edit />,
            path: '/edit',
          },
        ],
      },
      {
        element: <App />,
        path: '/',
        children: [
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
