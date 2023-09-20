import { createContext, useContext, useReducer } from "react";
import DealerWishlist from "../services/Dealer/Collection";
import { useEffect } from "react";

const WishListContext = createContext()

const wishListReducer = (state,action) =>{
    console.log(action);
    switch (action.type) {

        case 'ADD_TO_WISHLIST':
            return [...state,action.payload]

        case 'REMOVE_FROM_WISHLIST':
            return state.filter((item) => item.id !== action.payload.id);
    
        default:
            return state;
    }
}

const WishListProvider = ({children}) =>{

    const [wishListData,dispatch] = useReducer(wishListReducer,[])
    
    return (
        <WishListContext.Provider value={{ wishListData, dispatch }}>
            {children}
        </WishListContext.Provider>
    )
}

const useWishList = () =>{
    const context = useContext(WishListContext)
    if (!context) {
        throw new Error('useWishList must be used within a WishListProvider')
    }
    return context
}

export { WishListProvider,useWishList }