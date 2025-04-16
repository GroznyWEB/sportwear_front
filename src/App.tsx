import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Header from './components/Header'
import Footer from './components/Footer'
import Contacts from './components/Contacts'
import Castomers from './components/Castomers'
import Reservation from './components/Reservation'
import CatalogPage from './components/CatalogPage'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/castomers" element={<Castomers />} />
        <Route path="/reservation" element={<Reservation/>} />
        <Route path="/catalog" element={<CatalogPage />} />

      </Routes>
      <Footer/>
    </>
  )
}

export default App
