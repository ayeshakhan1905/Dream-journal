import { configureStore } from "@reduxjs/toolkit";
import dreamReducer from "../features/DreamSlice"

export const store = configureStore({
    reducer : {
        dreams : dreamReducer
    }
})