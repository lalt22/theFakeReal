import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import './App.css'
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import RefreshContextProvider from "./context/RefreshContextProvider";

function App() {

  return (
    <RefreshContextProvider>
      <BrowserRouter >
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </RefreshContextProvider>
  )
}

export default App
