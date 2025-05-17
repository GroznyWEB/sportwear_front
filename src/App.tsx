import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Contacts from "./components/Contacts";
import Castomers from "./components/Castomers";
import Reservation from "./components/Reservation";
import CatalogPage from "./components/CatalogPage";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps {
  children?: React.ReactNode; // Добавляем children в типы
}

const ScrollToTop = ({ children }: ScrollToTopProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>; // Возвращаем children
};

function App() {
  return (
    <>
      <Header />
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/customers" element={<Castomers />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/catalog" element={<CatalogPage />} />
        </Routes>
      </ScrollToTop>
      <Footer />
    </>
  );
}

export default App;
