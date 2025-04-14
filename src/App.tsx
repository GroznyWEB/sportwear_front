import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Header from './components/Header'
import Footer from './components/Footer'
import Contacts from './components/Contacts'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/contacts" element={<Contacts />} /> {/* ⬅️ вот он */}

      </Routes>
      <Footer/>
    </>
  )
}

export default App
