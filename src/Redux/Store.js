import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./Slices/userSlice";


const Store = configureStore({
    reducer : {
        user: userReducer,
    },
}) 
export default Store;
