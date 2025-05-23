import axios from "axios";
import Cookies from 'js-cookie';

const url       = process.env.NEXT_PUBLIC_API_BASE_URL;
const users     = JSON.parse(Cookies.get('users') || '[]');

interface Response<T = any>{
    status      : number,
    messages    : string,
    error       : any,
    data        : T
}

export async function RegisterApi(data:any): Promise<Response<any>> {    
    try {
        const body      = {
            nama_user           : data.nama_user,
            email_user          : data.email_user,
            password_user       : data.password_user
        }
        const res = await axios.post(`${url}/Auth/register`, body, {
            headers: {
                "Content-Type"  : "application/json",
            }
        });
        return {
            status: res.data.status,
            messages: res.data.messages,
            error: res.data.error,
            data: res.data.data,
        };
    } catch (error:any) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                status: error.response.status,
                messages: "Request failed",
                error: error.message,
                data: error.response.data,
            };
        }

        // Tangani jika error tidak diketahui (network, dll)
        return {
            status: 500,
            messages: "Internal error",
            error: error?.message || "Unknown error",
            data: [],
        };
    }
}


export async function LoginApi(data:any): Promise<Response<any>> {    
    try {
        const body      = {
            email_user          : data.email_user,
            password_user       : data.password_user
        }
        const res = await axios.post(`${url}/Auth/login`, body, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return {
            status: res.data.status,
            messages: res.data.messages,
            error: res.data.error,
            data: res.data.data,
        };
    } catch (error:any) {
        if (axios.isAxiosError(error) && error.response) {
            return {
                status: error.response.status,
                messages: "Request failed",
                error: error.message,
                data: error.response.data,
            };
        }

        // Tangani jika error tidak diketahui (network, dll)
        return {
            status: 500,
            messages: "Internal error",
            error: error?.message || "Unknown error",
            data: [],
        };
    }
}