import { useState } from "react";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [isCartShown, setCartShown] = useState(false);
  const hideCartHandler = () => {
    setCartShown(false);
  };
  const showCartHandler = () => {
    setCartShown(true);
  };
  return (
    <CartProvider>
      {isCartShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler}></Header>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
