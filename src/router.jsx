import { createBrowserRouter } from 'react-router-dom';

import Booking from './views/Booking';
import Confirmation from './views/Confirmation';

const router = createBrowserRouter([
    {
      path: '/',
      element: <Booking />,
    },
    {
      path: '/confirmation',
      element: <Confirmation />,
    }
],
  {basename: import.meta.env.BASE_URL}
);

export default router;