import React, { useContext, useReducer } from "react";
import singleUser_reducer from "../reducer/single_user_reducer";
import { url } from "../utils/constants";
const initialState = {
    single_user_loading: false,
    single_user:{},
}
const SingleUserContext = React.createContext();
export const SingleUserProvider = ({children}) => {
    const [state,dispatch] = useReducer(singleUser_reducer,initialState);
    const fetchSingleUser = async (url) => {
        try {
            const response = await fetch(url)
            const singleUser = await response.json();
            dispatch({type: "GET_SINGLE_USER_SUCCESS",payload:singleUser})
        } catch (error) {
            dispatch({type: "GET_SINGLE_USER_ERROR"})
        }
    }
    return (
        <SingleUserContext.Provider
        value={{...state,fetchSingleUser}}>
            {children}
        </SingleUserContext.Provider>
    )
}
export const useSingleUserContext = () => {
    return useContext(SingleUserContext)
}