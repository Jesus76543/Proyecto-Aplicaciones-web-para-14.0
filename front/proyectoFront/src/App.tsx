import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Dashboard from './modules/dashboard/dashboard';
import routes from './core/menuRoutes'; // Asumo la ruta correcta del archivo de rutas

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((count) => count + 1);
  };

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;