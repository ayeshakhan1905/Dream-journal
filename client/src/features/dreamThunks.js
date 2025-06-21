import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDreamAPI, deleteDreamAPI, editDreamAPI, fetchDreamsAPI } from "./dreamAPI";

export const fetchDreams = createAsyncThunk('dreams/fetchDreams', async ()=>{
    const res = await fetchDreamsAPI()
    return res.data;
})

export const addDreams = createAsyncThunk('/dreams/addDream', async(dream)=>{
    const res = await addDreamAPI(dream)
    return res.data
})

export const deleteDreams = createAsyncThunk('/dreams/deleteDream', async(id)=>{
    await deleteDreamAPI(id)
    return id
})

export const editDreams = createAsyncThunk('/dreams/editDream', async(dream)=>{
    const res = await editDreamAPI(dream)
    return res.data
})