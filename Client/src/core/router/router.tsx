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
import CreateAnimalPage from '../../pages/Admin/CreateAnimalPage';
import AdminAnimalListPage from '../../pages/Admin/AdminAnimalListPage';
import UpdateAnimalPage from '../../pages/Admin/UpdateAnimalPage';
import CreateHabitatPage from '../../pages/Admin/CreateHabitatPage';
import AdminHabitatListPage from '../../pages/Admin/AdminHabitatListPage';
import UpdateHabitatPage from '../../pages/Admin/UpdateHabitatPage';
import CreateAvistamientoPage from '../../pages/Admin/CreateAvistamientoPage';
import AdminAvistamientoListPage from '../../pages/Admin/AdminAvistamientoListPage';
import UpdateAvistamientoPage from '../../pages/Admin/UpdateAvistamientoPage';

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
          {
            path: 'crear',
            element: <CreateAnimalPage />,
          },
          {
            path: 'actualizar',
            element: <AdminAnimalListPage />,
          },
          {
            path: 'actualizar/:id',
            element: <UpdateAnimalPage />,
          },
          {
            path: 'eliminar',
            element: <AdminAnimalListPage />,
          },
          {
            path: 'ver',
            element: <AdminAnimalListPage />,
          },
          {
            path: 'habitats',
            children: [
              {
                path: 'crear',
                element: <CreateHabitatPage />,
              },
              {
                path: 'ver',
                element: <AdminHabitatListPage />,
              },
              {
                path: 'actualizar',
                element: <AdminHabitatListPage />,
              },
              {
                path: 'actualizar/:id',
                element: <UpdateHabitatPage />,
              },
              {
                path: 'eliminar',
                element: <AdminHabitatListPage />,
              },
            ]
          },
          {
            path: 'avistamientos',
            children: [
              {
                path: 'crear',
                element: <CreateAvistamientoPage />,
              },
              {
                path: 'ver',
                element: <AdminAvistamientoListPage />,
              },
              {
                path: 'actualizar',
                element: <AdminAvistamientoListPage />,
              },
              {
                path: 'actualizar/:id',
                element: <UpdateAvistamientoPage />,
              },
              {
                path: 'eliminar',
                element: <AdminAvistamientoListPage />,
              },
            ]
          },
        ],
      },
    ],
  },
]);
