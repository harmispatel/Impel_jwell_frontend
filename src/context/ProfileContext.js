import React, { createContext, useEffect, useReducer } from "react";
import profileService from "../services/Auth";

export const ProfileSystem = createContext();

const initialState = {
  profile: [],
  profileItems: 0,
};

const Profile = (state, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      return {
        ...state,
        profile: action.payload.profile,
        profileItems: action.payload.profile?.length,
      };
    case "ADD_PROFILE":
      return {
        ...state,
        profile: action.payload,
        profileItems: 1,
      };
    default:
      return state;
  }
};

const ProfileProvider = ({ children }) => {
  const Phone = localStorage.getItem("phone");
  const [state, dispatch] = useReducer(Profile, initialState);

  const fetchProfileData = async () => {
    try {
      if (Phone) {
        const res = await profileService.getProfile({ phone: Phone });
        const ProfileData = res.data.name || [];
        dispatch({ type: "SET_PROFILE", payload: { profile: ProfileData } });
      }
    } catch (err) {
      console.error("Error fetching in profile:", err);
    }
  };

  useEffect(() => {
    if (Phone) {
      fetchProfileData();
    }
  }, [Phone]);

  return (
    <ProfileSystem.Provider value={{ state, dispatch }}>
      {children}
    </ProfileSystem.Provider>
  );
};
export default ProfileProvider;
