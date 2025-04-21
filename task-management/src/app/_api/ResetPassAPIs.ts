import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL ;
const SEND_EMAIL_API = `${API_URL}/api/emailverification/send-email`;
const CODE_VERIFICATION_API= `${API_URL}/api/emailverification/verify-code`;
const RESET_PASSWORD_API = `${API_URL}/api/auth/reset-pass`;
const RESET_PASSWORD_TOKEN_API = `${API_URL}/api/auth/reset-password`;

export const sendEmailAPI=async (email:string) =>{
    return await axios.post(SEND_EMAIL_API,{email});
}

export const codeVerificationAPI=async(email : string,code:string) =>{
    return await axios.post(CODE_VERIFICATION_API,{email,code});
}

export const resetPassAPI=async(email : string) =>{
    return await axios.post(RESET_PASSWORD_API,{email});
}

export const resetPasswordTokenAPI=async(token : string,password : string) =>{
    return await axios.post(RESET_PASSWORD_TOKEN_API,{token,password});
}