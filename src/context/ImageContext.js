import React, { createContext, useEffect, useReducer } from "react";
import profileService from "../services/Auth";

export const ImageSystem = createContext();

const initialState = {
  image: [],
  imageItems: 0,
};

const Image = (state, action) => {
  switch (action.type) {
    case "SET_IMAGE":
      return {
        ...state,
        image: action.payload.image,
        imageItems: action.payload.image?.length || 0,
      };
    case "ADD_IMAGE":
      return {
        ...state,
        image: action.payload,
        imageItems: 1,
      };
    default:
      return state;
  }
};

const ImageProvider = ({ children }) => {
  const Phone = localStorage.getItem("phone");
  const [state, dispatch] = useReducer(Image, initialState);

  const fetchProfileData = async () => {
    try {
      if (Phone) {
        const res = await profileService.getProfile({ phone: Phone });
        const ProfileData = res.data || [];
        dispatch({ type: "SET_IMAGE", payload: { profile: ProfileData } });
      }
    } catch (err) {
      console.error("Error fetching in image:", err);
    }
  };

  useEffect(() => {
    if (Phone) {
      fetchProfileData();
    }
  }, [Phone]);

  return (
    <ImageSystem.Provider value={{ state, dispatch }}>
      {children}
    </ImageSystem.Provider>
  );
};
export default ImageProvider;
