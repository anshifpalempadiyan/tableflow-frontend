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
    } catch (error) {
        // console.log(error.response.data);
        return error.response?.data;
    }
}

export const saveTables = async (tableData) => {
    try {
        const { data } = await api.patch("/floor/tables" , tableData )
        return data
    } catch (error) {
        return error.response?.data
    }
}

export const SaveSetupStep = async (step) => {
    try {
        const { data } = await api.patch("/floor/setup-step" , step )
    } catch (error) {
        // console.log(error.response.data);
        return error.response?.data;
    }
}