import { RootError } from '../shared/components/route-error';
import Application from './pages/Application/Application';
import Applications from './pages/Applications/Applications';
import Home from './pages/Home/Home';
import Preview from './pages/Preview/Preview';
import Release from './pages/Release/Release';

export const CoreRoutes = [
  {
    path: '',
    element: <Home />,
    errorElement: <RootError />,
    children: [{ path: 'applications', element: <Applications /> }]
  },
  {
    path: '/application',
    errorElement: <RootError />,
    children: [{ path: ':id', element: <Application /> }]
  },
  {
    path: '/preview/:id',
    element: <Preview />,
    errorElement: <RootError />
  },
  {
    path: '/release/:id',
    element: <Release />,
    errorElement: <RootError />
  }
];
