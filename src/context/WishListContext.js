import React, { createContext, useEffect, useReducer } from "react";

export const WishlistSystem = createContext();

const initialState = {
  wishlist: [],
  wishlistItems: parseInt(sessionStorage.getItem("wishlistItems")) || 0,
};

const Wishlist = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      const { id } = action.payload;
      const wishlistitem = state.wishlist.find((item) => item.id === id);
      if (wishlistitem) {
        return {
          ...state,
          wishlist: state.wishlist.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
          wishlistItems: state.wishlistItems + 1,
        };
      } else {
        return {
          ...state,
          wishlist: [...state.wishlist, { id, quantity: 1 }],
          wishlistItems: state.wishlistItems + 1,
        };
      }

    case "REMOVE_FROM_WISHLIST": {
      const { id } = action.payload;
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== id),
        wishlistItems: state.wishlistItems - 1,
      };
    }

    default:
      return state;
  }
};

const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Wishlist, initialState);

  useEffect(() => {
    sessionStorage.setItem("wishlistItems", state.wishlistItems.toString());
  }, [state.wishlistItems]);

  return (
    <WishlistSystem.Provider value={{ state, dispatch }}>
      {children}
    </WishlistSystem.Provider>
  );
};

export default WishlistProvider;
