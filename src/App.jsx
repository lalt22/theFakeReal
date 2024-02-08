import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import './App.css'
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import RefreshContextProvider from "./context/RefreshContextProvider";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faHeart, fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons"
import CartPage from "./pages/CartPage/CartPage";
import FavouritesPage from "./pages/FavouritesPage/FavouritesPage";
import ProductContextProvider from "./context/ProductsContextProvider";
import WidthContextProvider from "./context/MobileContext";

library.add(far, faHeart, fas);

function App() {
  return (
    <RefreshContextProvider>
      <WidthContextProvider>
      <ProductContextProvider>
          <BrowserRouter >
            <NavBar />
            <Routes>
              <Route path="theFakeReal/" element={<HomePage />} />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="theFakeReal/cart" element={<CartPage />} />
              <Route path="theFakeReal/favourites" element={<FavouritesPage/>} />
            </Routes>
          </BrowserRouter>
      </ProductContextProvider>
      </WidthContextProvider>
    </RefreshContextProvider>
  )
}

export default App
