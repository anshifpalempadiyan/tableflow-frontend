import api from '../axios'


export const userLogin = async ( userData ) => {
    try {
        const { data } = await api.post("/auth/login" , userData )
        return data
    } catch (error) {
        console.log(error.response.data);
        return error.response.data;
    }
}