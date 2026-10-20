import api from '../axios'


export const userLogin = async ( userData ) => {
    try {
        const { data } = await api.post("/auth/login" , userData )
        return data
    } catch (error) {
        // console.log(error)
        console.log(error.response.data);
        return error.response.data;
    }
}

export const userSignup = async ( userData ) => {
    try {
        const { data } = await api.post("auth/signup" , userData )
        return data
    } catch (error) {
        // console.log(error)
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

export const userOTPSending = async ( userEmailData ) => {

    try {

        const { data } = await api.post("auth/sending-otp" , userEmailData )
        return data
        
    } catch (error) {
        
        console.log(error.response.data);
        return error.response.data;

    }
}

export const userOTPVerifying = async ( userData ) => {

    try {
        
        const { data } = await api.post("auth/verify-otp" , userData )
        return data

    } catch (error) {

        console.log(error.response.data);
        return error.response.data;
        
    }
}

export const userResetPassword = async ( userData ) => {

    try {
        
        const { data } = await api.post("auth/reset-password" , userData )
        return data

    } catch (error) {

        console.log(error.response.data);
        return error.response.data;
        
    }
}