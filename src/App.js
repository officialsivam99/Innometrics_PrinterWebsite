// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/normalize.css";
import "./css/style.css";
import "./css/all.min.css";

import Header from "./components/header";

import HomePrinter from "./components/HomePrinter";

import Hero from "./components/hero";
import WhyChoose from "./components/WhyChoose";
import ShopByCategory from "./components/ShopByCategory";

import ProductGallery from "./components/ProductGallary";
import { products } from "./components/products";

import InkSuppliesShowcase from "./components/InkSuppliesShowcase";
import ChooseUs from "./components/ChooseUs";
import CustomerReviews from "./components/CustomerReviews";
import FAQ from "./components/FAQ";
import SupportAndTrust from "./components/SupportAndTrust";
import LegalFooter from "./components/LegalFooter";
import InkTonerPaper from "./components/InkTonerPaper"; // Assuming you have this component
import OfficePrinters from "./components/OfficePrinters"; // Import the OfficePrinters component
import InkjetPrinter from "./components/InkJetPrinters"; 
import LaserPrinter from "./components/LaserPrinters";// Import the InkjetPrinter component
import ProductDetail from "./components/ProductDetail";
import { LaserProducts } from "./components/LaserProducts";



export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <WhyChoose />
            <ShopByCategory />
            <ProductGallery products={products} />
            <InkSuppliesShowcase />
            <ChooseUs />
            <CustomerReviews />
            <FAQ />
            <SupportAndTrust />
          </>
        } />
        <Route path="/HomePrinter" element={<HomePrinter />} />
        <Route path="/InkTonerPaper" element={<InkTonerPaper />} />
        <Route path="/OfficePrinters" element={<OfficePrinters />} />
        <Route path="/InkJetPrinters" element={<InkjetPrinter />} />
        <Route path="/LaserPrinters" element={<LaserPrinter />} />
        <Route path="/product/:id" element={<ProductDetail products={LaserProducts} />} />

        {/* Add other routes as needed */}
      </Routes>

      <LegalFooter />
    </>
  );
}
