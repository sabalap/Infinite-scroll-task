const single_user_reducer = (state,action) => {
    if(action.type === "GET_SINGLE_USER_SUCCESS") {
        return {
            ...state,
            single_user_loading:false,
            single_user:action.payload
        }
    }
    if(action.type === "GET_SINGLE_USER_ERROR") {
        return {
            ...state,
            single_user_loading: false,
            single_user_error:true
        }
    }
    throw new Error("Error")
}
export default single_user_reducer;