import axios from "axios";
import React, {useContext,useReducer} from "react";
import reducer from "../reducer/single_user_reducer";
const initialState = {
    single_user_loading:false,
    single_user_error:false,
    single_user: {}
}
const SingleUserContext = React.createContext();
export const SingleUserProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState);
    const fetchSingleUser = async (url) => {
        try {
            const response = await axios.get(url);
            const singleUser = response.data;
            dispatch({type:"GET_SINGLE_USER_SUCCESS",payload:singleUser})
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