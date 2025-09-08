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
import OfficePrinters from './components/OfficePrinters';
import InkjetPrinter from './components/InkJetPrinters';
import LaserPrinter from './components/LaserPrinters';
import Privacy from './pages/privacy';
import Terms from './pages/terms';
import Refund from './pages/refund';


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
  },

  {
    path: '/OfficePrinters',
    element: <OfficePrinters />,
  },
  {
    path: '/InkJetPrinters',
    element: <InkjetPrinter />,
  },
  {
    path: '/LaserPrinters',
    element: <LaserPrinter />,
  },
  {
    path: '/privacy',
    element: <Privacy />,
  },
  {
    path: '/terms',
    element: <Terms />,
  },
  {
    path: '/refund',
    element: <Refund />,
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     <Auth0Provider
    domain="devshivam199.us.auth0.com"
    clientId="rj4ojy3QCYwtFrjfc1qPT42ttM1vBaFX"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <RouterProvider router={router} />
  </Auth0Provider>
  
);