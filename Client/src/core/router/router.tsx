import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import HomePage from '../../pages/HomePage';
import EspeciesPage from '../../pages/EspeciesPage';
import HabitatsPage from '../../pages/HabitatsPage';
import AvistamientosPage from '../../pages/AvistamientosPage';
import RegisterPage from '../../pages/RegisterPage';
import LoginPage from '../../pages/LoginPage';
import AdminDashboard from '../../pages/Admin/AdminDashboard';
import AdminRoute from './AdminRoute';

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
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'admin',
        element: <AdminRoute />,
        children: [
          {
            path: '',
            element: <AdminDashboard />,
          },
        ],
      },
    ],
  },
]);
