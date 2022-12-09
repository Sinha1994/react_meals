import { useReducer } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const newAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const exisitngItemsIdx = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    let updatedItem = null;
    if (exisitngItemsIdx === -1) {
      updatedItem = state.items.concat(action.item);
    } else {
      updatedItem = [...state.items];
      updatedItem[exisitngItemsIdx] = {
        ...updatedItem[exisitngItemsIdx],
        amount: updatedItem[exisitngItemsIdx].amount + action.item.amount,
      };
    }
    return {
      items: updatedItem,
      totalAmount: newAmount,
    };
  } else if (action.type === "REMOVE_ITEM") {
    const removeItemIdx = state.items.findIndex(
      (item) => item.id === action.id
    );
    let updatedItem = null;
    let newAmount = state.totalAmount - state.items[removeItemIdx].price;
    if (state.items[removeItemIdx].amount === 1) {
      updatedItem = state.items.filter((item) => item.id !== action.id);
    } else {
      updatedItem = [...state.items];
      updatedItem[removeItemIdx] = {
        ...updatedItem[removeItemIdx],
        amount: updatedItem[removeItemIdx].amount - 1,
      };
    }
    return {
      items: updatedItem,
      totalAmount: newAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchAction] = useReducer(cartReducer, defaultCartState);
  const addItemsToCartHandler = (item) => {
    dispatchAction({ item: item, type: "ADD_ITEM" });
  };
  const removeItemsToCartHandler = (id) => {
    dispatchAction({ id: id, type: "REMOVE_ITEM" });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemsToCartHandler,
    removeItem: removeItemsToCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
