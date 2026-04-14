import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import HomePage from '../../features/home/pages/HomePage';
import EspeciesPage from '../../features/especies/pages/EspeciesPage';
import HabitatsPage from '../../features/habitats/pages/HabitatsPage';
import AvistamientosPage from '../../features/avistamientos/pages/AvistamientosPage';

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
