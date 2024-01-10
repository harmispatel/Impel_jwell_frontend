import React, { createContext, useReducer } from "react";

export const ImageSystem = createContext();

const initialState = {
  image: false,
};

const Image = (state, action) => {
  switch (action.type) {
    case "SET_IMAGE":
      return {
        ...state,
        image: action?.payload?.image,
      };
    default:
      return state;
  }
};

const ImageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Image, initialState);

  return (
    <ImageSystem.Provider value={{ state, dispatch }}>
      {children}
    </ImageSystem.Provider>
  );
};
export default ImageProvider;