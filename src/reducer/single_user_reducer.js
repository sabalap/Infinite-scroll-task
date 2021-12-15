const singleUser_reducer = (state,action) => {
    if(action.type === "GET_SINGLE_USER_BEGIN") {
        return {
            ...state,
            singleUser_loading:true
        }
    }
    if(action.type === "GET_SINGLE_USER_SUCCESS") {
        return {
            ...state,
            single_user_loading:false,
            single_user: action.payload
        }
    }
}
export default singleUser_reducer;