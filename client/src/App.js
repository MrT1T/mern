import { useRoutes } from './hooks/use-routes';

function App() {
  const routes = useRoutes(false);
  return routes;
}

export default App;
