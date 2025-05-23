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

interface ResponsePaginate<T = any>{
    status      : number,
    messages    : string,
    error       : any,
    data        : T,
    paginate    : T
}

export async function GetNoteTaskAll(id_note_list:string, page : number): Promise<ResponsePaginate<any>> {    
    try {
        const pageNumber = page || 1; // default ke 1 jika page undefined/null/0
        const token     = users?.token      || "";
        const res = await axios.get(`${url}/NoteTask/GetAll/${id_note_list}?page=${pageNumber}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });
        return {
            status      : res?.data.status,
            messages    : res?.data.messages,
            error       : res?.data.error,
            data        : res?.data.data.data,
            paginate    : res?.data.paginate
        };
    } catch (error:any) {
        // Tangani jika response dari server punya struktur
        if (axios.isAxiosError(error) && error.response) {
            return {
                status: error?.response.status,
                messages: "Request failed",
                error: error?.message,
                data: error?.response.data.data,
                paginate:error?.request.paginate || [] 
            };
        }

        // Tangani jika error tidak diketahui (network, dll)
        return {
            status: 500,
            messages: "Internal error",
            error: error?.message || "Unknown error",
            data: [],
            paginate: []
        };
    }
}

export async function GetTaskById(id_note_task:string): Promise<Response<any>> {    
    try {
        const token     = users?.token      || "";
        const res = await axios.get(`${url}/NoteTask/GetById/${id_note_task}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });
        return {
            status      : res?.data.status,
            messages    : res?.data.messages,
            error       : res?.data.error,
            data        : res?.data.data,
        };
    } catch (error:any) {
        // Tangani jika response dari server punya struktur
        if (axios.isAxiosError(error) && error.response) {
            return {
                status: error?.response.status,
                messages: "Request failed",
                error: error?.message,
                data: error?.response.data,
            };
        }

        // Tangani jika error tidak diketahui (network, dll)
        return {
            status: 500,
            messages: "Internal error",
            error: error?.message || "Unknown error",
            data: []
        };
    }
}

export async function AddNoteTask(data:any): Promise<Response<any>> {    
    try {
        const token     = users?.token      || "";
        const res = await axios.post(`${url}/NoteTask/AddNoteTask`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            }
        });
        return {
            status: res.data.status,
            messages: res.data.messages,
            error: res.data.error,
            data: res.data.data,
        };
    } catch (error:any) {
        // Tangani jika response dari server punya struktur
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

export async function UpdateNoteTask(id_note_task:string, data:any): Promise<Response<any>> {    
    try {
        const token     = users?.token      || "";

        const res = await axios.post(`${url}/NoteTask/UpdateNoteTask/${id_note_task}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            }
        });
        return {
            status: res.data.status,
            messages: res.data.messages,
            error: res.data.error,
            data: res.data.data,
        };
    } catch (error:any) {
        // Tangani jika response dari server punya struktur
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

export async function UpdateStatusNoteTask(id_note_task:number, status:string): Promise<Response<any>> {    
    try {
        const token     = users?.token      || "";

        const res = await axios.post(`${url}/NoteTask/UpdateStatusNoteTask/${id_note_task}`, {
            status_task : status
        },{
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            }
        });
        return {
            status: res.data.status,
            messages: res.data.messages || "",
            error: res?.data.error || "",
            data: res?.data.data || [],
        };
    } catch (error:any) {
        // Tangani jika response dari server punya struktur
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

export async function DeleteNoteTask(id_note_task:number): Promise<Response<any>> {    
    try {
        const token     = users?.token      || "";

        const res = await axios.delete(`${url}/NoteTask/DeleteTask/${id_note_task}`,{
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            }
        });
        return {
            status: res?.data.status,
            messages: res?.data.messages || "",
            error: res?.data.error || "",
            data: res?.data.data || [],
        };
    } catch (error:any) {
        // Tangani jika response dari server punya struktur
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