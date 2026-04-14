import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import HomePage from '../../pages/HomePage';
import EspeciesPage from '../../pages/EspeciesPage';
import HabitatsPage from '../../pages/HabitatsPage';
import AvistamientosPage from '../../pages/AvistamientosPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'especies',
        element: <EspeciesPage />,
      },
      {
        path: 'habitats',
        element: <HabitatsPage />,
      },
      {
        path: 'avistamientos',
        element: <AvistamientosPage />,
      },
    ],
  },
]);
