import axios from "axios";

const baseURL = 'https://dream-journal-oi4b.onrender.com/dreams'

export const fetchDreamsAPI = ()=>{
    return axios.get(baseURL)
}

export const addDreamAPI = (dream)=>{
    return axios.post(baseURL , dream)
}

export const deleteDreamAPI = (id)=>{
    return axios.delete(`${baseURL}/${id}`)
}

export const editDreamAPI = (dream)=>{
    return axios.put(`${baseURL}/${dream.id}` , dream)
}