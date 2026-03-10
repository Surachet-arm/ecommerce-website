import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import appRoutes from './router';
import { useAuthStore } from './store/authStore';

const App = () => {
  const routes = useRoutes(appRoutes);
  const { hydrateUser } = useAuthStore();

  useEffect(() => {
    hydrateUser();
  }, [hydrateUser]);

  return routes;
};

export default App;
