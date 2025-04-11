import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Header from './components/Header'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </>
  )
}

export default App
