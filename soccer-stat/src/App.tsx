import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Leagues from '@/pages/Leagues';
import Teams from '@/pages/Teams';
import LeagueMatches from '@/pages/LeagueMatches';
import TeamMatches from '@/pages/TeamMatches'

import MainLayout from '@/component/BaseLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Leagues />,
      },
      {
        path: 'leagues/:competitionId', // (* foolbal.ts)
        element: <LeagueMatches />,
      },
      {
        path: 'teams',
        element: <Teams />,
      },
      {
        path: 'teams/:teamId/matches',
        element: <TeamMatches />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;