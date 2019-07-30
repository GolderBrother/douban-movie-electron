import Home from '../pages/Home';
// import Detail from '../pages/Detail';
import Box from '../pages/Box';
import Search from '../pages/Search';

import Detail from '../pages/Detail/index';
export default [
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/detail/:id',
    component: Detail,
  },
  {
    path: '/box',
    component: Box,
  },
  {
    path: '/search',
    component: Search,
  }
];
