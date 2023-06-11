import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import store from './redux/store';

import App from './App';
import IndexPage from './pages/Index/IndexPage/IndexPage';
import UsersPage from './pages/Users/UsersPage/UsersPage';
import UserDetailsPage from './pages/UserDetails/UserDetailsPage/UserDetailsPage';
import BlogDetailsPage from './pages/BlogDetails/BlogDetailsPage/BlogDetailsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <IndexPage /> },
      {
        path: '/users',
        element: <UsersPage />,
      },
      {
        path: '/users/:id',
        element: <UserDetailsPage />,
      },
      {
        path: '/blogs/:id',
        element: <BlogDetailsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
