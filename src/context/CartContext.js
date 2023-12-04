import React, { createContext, useContext, useEffect, useReducer } from "react";

export const CartSystem = createContext();

const initialState = {
  cart: [],
  cartItems: parseInt(sessionStorage.getItem("cartItems")) || 0,
};

const Cart = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const { design_id } = action.payload;
      const cartItem = state.cart.find((item) => item.design_id === design_id);
      if (cartItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.design_id === design_id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          cartItems: state.cartItems + 1,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { design_id, quantity: 1 }],
          cartItems: state.cartItems + 1,
        };
      }

    case "REMOVE_FROM_CART": {
      const { design_id } = action.payload;
      return {
        ...state,
        cart: state.cart.filter((item) => item.design_id !== design_id),
        cartItems: state.cartItems - 1,
      };
    }

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Cart, initialState);

  useEffect(() => {
    sessionStorage.setItem("cartItems", state.cartItems.toString());
  }, [state.cartItems]);

  return (
    <CartSystem.Provider value={{ state, dispatch }}>
      {children}
    </CartSystem.Provider>
  );
};

export default CartProvider;
