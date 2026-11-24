import api from '../axios'


export const getFloor = async () => {
    try {
        const { data } = await api.get("/floor/get" )
        return data
    } catch (error) {
        // console.log(error.response.data);
        return error.response?.data;
    }
}

export const CreateFloor = async (floorData) => {
    try {
        const { data } = await api.post("/floor/create" , floorData )
        return data
    } catch (error) {
        // console.log(error.response.data);
        return error.response?.data;
    }
}

export const EditFloorSize = async (floorData) => {
    try {
        const { data } = await api.patch("/floor/layout" , floorData )
        return data
    } catch (error) {
        // console.log(error.response.data);
        return error.response?.data;
    }
}

export const saveTables = async (tables) => {
    try {
        const { data } = await api.patch("/floor/tables" , { tables } )
        return data
    } catch (error) {
        return error.response?.data
    }
}

export const SaveSetupStep = async (step) => {
    try {
        const { data } = await api.patch("/floor/setup-step" , { step } )
        return data 
    } catch (error) {
        // console.log(error.response.data);
        return error.response?.data;
    }
}