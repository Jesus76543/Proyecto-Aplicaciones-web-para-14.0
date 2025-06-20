import { RouteElement } from './RouteElement'; // Asumo que esta es la ruta correcta
import OrderData from '../modules/order/OrderData';
import ProductData from '../modules/product/ProductData';
import UserForm from '../modules/user/UserForm';

export interface AppRoute {
  path: string;
  element: React.ReactElement;
  label?: string;
  icon?: string;
  //roleIds?: string[]; // si quieres filtrar por rol
  hidden?: boolean;
}

// Declarar rutas con componentes
const routes: AppRoute[] = [
  {
    path: '/dashboard',
    element: <Dashboard />,
    label: 'Inicio',
    icon: 'HomeOutlined',
  },
  {
    path: '/users',
    element: <UserForm />,
    label: 'Usuarios',
    icon: 'UserOutlined',
  },
  {
    path: '/products',
    element: <ProductData />,
    label: 'Usuarios', // Parece un error aquí, debería ser 'Productos'
    icon: 'UserOutlined', // Icono genérico, quizás ajustar
  },
  {
    path: '/orders',
    element: <OrderData />,
    label: 'Usuarios', // Parece un error aquí, debería ser 'Pedidos'
    icon: 'UserOutlined', // Icono genérico, quizás ajustar
  },
  {
    path: '/report',
    element: <UserForm />, // Asumo un componente genérico o un placeholder
    label: 'Reportes',
    icon: 'UserOutlined', // Icono genérico, quizás ajustar
  },
];

export default routes;