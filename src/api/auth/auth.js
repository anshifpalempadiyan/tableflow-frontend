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

export const userSignup = async ( userData ) => {
    try {
        console.log(userData,"userdataaaa")
        const { data } = await api.post("auth/signup" , userData )
        console.log(data,"the data")
        return data
    } catch (error) {
        console.log(error.response.data);
        return error.response.data;
        
    }
}

export const userLogout = async ( userData ) => {
    try {
        const { data } = await api.delete("auth/logout" , userData )
        return data
    } catch (error) {
        console.log(error.response.data);
        return error.response.data;

    }
}