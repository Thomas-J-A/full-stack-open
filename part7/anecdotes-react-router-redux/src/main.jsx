import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import store from './redux/store';

import App from './App';
import AboutPage from './pages/About/AboutPage/AboutPage';
import AnecdoteDetailPage from './pages/AnecdoteDetail/AnecdoteDetailPage/AnecdoteDetailPage';
import IndexPage from './pages/Index/IndexPage/IndexPage';
import CreateNewPage from './pages/CreateNew/CreateNewPage/CreateNewPage';
import ErrorPage from './pages/Error/ErrorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <IndexPage /> },
      {
        path: 'create-new',
        element: <CreateNewPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'anecdotes/:anecdoteId',
        element: <AnecdoteDetailPage />,
      },
    ],
  },
]);

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  );
