import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Importa useLocation
import {
  DashboardOutlined,
  UserOutlined,
  BarChartOutlined,
  // Agrega aquí cualquier otro icono de Ant Design que necesites
} from "@ant-design/icons";

// Mapa de nombres de iconos a componentes de icono de Ant Design
const Icons: { [key: string]: React.ComponentType } = {
  DashboardOutlined,
  UserOutlined,
  BarChartOutlined,
  // Añade aquí más iconos si los necesitas para tu menú
};

// Define la interfaz para un elemento de menú dinámico
interface DynamicMenuItem {
  title: string;
  path: string;
  icon: string; // El nombre del icono como string, que luego se mapeará al componente real
  roles?: string[]; // Opcional, si tienes control de acceso basado en roles
}

function MenuDynamic() {
  const [menuItems, setMenuItems] = useState<DynamicMenuItem[]>([]);
  const navigate = useNavigate();
  const location = useLocation(); // Hook para acceder a la ubicación actual

  // Datos de menú de ejemplo
  const fakeMenuData: DynamicMenuItem[] = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: "DashboardOutlined",
      roles: ["665a1f2b40fd3a12b3e77611"],
    },
    {
      title: "Usuarios",
      path: "/users",
      icon: "UserOutlined",
      roles: ["665a1f2b40fd3a12b3e77612"],
    },
    {
      title: "Reportes",
      path: "/reports",
      icon: "BarChartOutlined",
      roles: ["665a1f2b40fd3a12b3e77611", "665a1f2b40fd3a12b3e77612"],
    },
  ];

  // Carga los datos del menú una vez al montar el componente
  useEffect(() => {
    // Simula una llamada a API con un retardo
    const timer = setTimeout(() => {
      setMenuItems(fakeMenuData);
    }, 500);

    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  // Función para renderizar los elementos del menú de Ant Design
  const renderMenu = () => {
    return menuItems.map((item) => {
      // Obtiene el componente de icono del mapa 'Icons'
      const IconComponent = Icons[item.icon];
      return {
        key: item.path,
        icon: IconComponent ? <IconComponent /> : null, // Renderiza el icono si existe
        label: item.title,
        // Si tuvieras submenús, los manejarías aquí con 'children'
        // children: item.children ? item.children.map(...) : undefined,
      };
    });
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]} // Usa location.pathname para que el elemento seleccionado coincida con la ruta actual
      onClick={({ key }) => navigate(key)} // Navega a la ruta cuando se hace clic en un elemento
      items={renderMenu()} // Renderiza los elementos del menú
      style={{ height: "100%", borderRight: 0 }}
    />
  );
}

export default MenuDynamic;