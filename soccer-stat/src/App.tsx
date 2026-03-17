import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Leagues from '@/pages/Leagues';
import Teams from '@/pages/Teams';
import LeagueMatches from '@/pages/LeagueMatches';
import TeamMatches from '@/pages/TeamMatches'

import MainLayout from '@/component/BaseLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // Обертка : hat + nav
    children: [
      {
        index: true,
        element: <Leagues />,
      },
      {
        path: 'leagues/:competitionId', // Dynamic rout для календаря лиг
        element: <LeagueMatches />,
      },
      {
        path: 'teams',
        element: <Teams />,
      },
      {
        path: 'teams/:teamId/matches', // D.r. для календаря команд
        element: <TeamMatches />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />, // redirect -> main page
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;