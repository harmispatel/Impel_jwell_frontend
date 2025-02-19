import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";
const api = process.env.REACT_APP_API_KEY;

export const ReadyDesignCartSystem = createContext();

const initialState = {
  cart: [],
  readyCartItems: 0,
};

const Cart = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        cart: action.payload.cart,
        readyCartItems: action.payload.cart?.reduce(
          (total, item) => total + item.quantity,
          0
        ),
      };

    case "ADD_TO_CART":
      const { design_id } = action.payload;
      const cartItem = state.cart.find((item) => item?.TagNo === design_id);

      if (cartItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.TagNo === design_id
              ? { ...item, quantity: item?.quantity + 1 }
              : item
          ),
          readyCartItems: state.readyCartItems + 1,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { design_id, quantity: 1 }],
          readyCartItems: state.readyCartItems + 1,
        };
      }

    case "REMOVE_FROM_CART": {
      const { design_id } = action.payload;
      if (state.readyCartItems > 0) {
        return {
          ...state,
          cart: state?.cart?.filter((item) => item?.TagNo !== design_id),
          readyCartItems: state.readyCartItems - 1,
        };
      }
    }

    case "RESET_CART":
      return {
        ...state,
        readyCartItems: 0,
      };

    default:
      return state;
  }
};

const ReadyDesignCartProvider = ({ children }) => {
  const Phone = localStorage.getItem("phone");
  const [state, dispatch] = useReducer(Cart, initialState);

  const fetchCartData = async () => {
    try {
      if (Phone) {
        const res = await axios.post(api + "ready/cart-list", { phone: Phone });
        const cartData = res?.data?.data?.carts || [];
        dispatch({ type: "SET_CART", payload: { cart: cartData } });
      }
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  };

  useEffect(() => {
    if (Phone) {
      fetchCartData();
    }
  }, [Phone]);

  return (
    <ReadyDesignCartSystem.Provider value={{ state, dispatch }}>
      {children}
    </ReadyDesignCartSystem.Provider>
  );
};
export default ReadyDesignCartProvider;
