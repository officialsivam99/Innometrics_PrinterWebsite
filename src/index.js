import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import About from './pages/about';
import Services from './pages/services';
import Pagenotfound from './pages/pagenotfound';

// 👇 import the detail component + your product data
import ProductDetail from './components/ProductDetail';
import { products } from './components/products';
import HomePrinter from './components/HomePrinter';
import InkTonerPaper from './components/InkTonerPaper';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Pagenotfound />,
  },
  {
    path: '/home-pt',
    element: <App />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/services',
    element: <Services />,
  },
  // 👇 full-page product detail route; pass products as a prop
  {
    path: '/product/:id',
    element: <ProductDetail products={products} />,
  },
  {
    path: '/pagenotfound',
    element: <Pagenotfound />,
  },
  {
    path: '/HomePrinter',
    element: <HomePrinter />,
  },
  {
    path: '/InkTonerPaper',
    element: <InkTonerPaper />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
