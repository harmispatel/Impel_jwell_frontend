import React, { createContext, useContext, useEffect, useReducer } from "react";

export const CartSystem = createContext();

const initialState = {
  cart: [],
  totalQuantity: parseInt(sessionStorage.getItem("totalQuantity")) || 0,
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
          totalQuantity: state.totalQuantity + 1,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { design_id, quantity: 1 }],
          totalQuantity: state.totalQuantity + 1,
        };
      }

    case "REMOVE_TO_CART":
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Cart, initialState);

  useEffect(() => {
    sessionStorage.setItem("totalQuantity", state.totalQuantity.toString());
  }, [state.totalQuantity]);

  return (
    <CartSystem.Provider value={{ state, dispatch }}>
      {children}
    </CartSystem.Provider>
  );
};

export default CartProvider;
