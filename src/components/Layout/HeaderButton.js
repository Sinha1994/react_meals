import { useContext, useState, useEffect } from "react";
import CartContext from "../../store/CartContext";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderButton.module.css";
const HeaderButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const cartCount = cartCtx.items.reduce((currCount, items) => {
    return currCount + items.amount;
  }, 0);
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartCount}</span>
    </button>
  );
};

export default HeaderButton;
