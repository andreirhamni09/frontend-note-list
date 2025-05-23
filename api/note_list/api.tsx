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

export async function GetNoteListAll(page : number): Promise<ResponsePaginate<any>> {    
    try {
        const pageNumber = page || 1; // default ke 1 jika page undefined/null/0
        const token     = users?.token      || "";
        const id_user   = users?.id_user    || "";
        const res = await axios.get(`${url}/NoteList/GetAll/${id_user}?page=${pageNumber}`, {
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


export async function GetNoteListById(id_note_lists:string): Promise<Response<any>> {    
    try {
        const token     = users?.token      || "";
        const id_user   = users?.id_user    || "";
        const res = await axios.get(`${url}/NoteList/GetByIdNoteList/${id_user}/${id_note_lists}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });
        return {
            status: res?.data.status,
            messages: res?.data.messages,
            error: res?.data.error,
            data: res?.data.data,
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
            data: [],
        };
    }
}

export async function AddNoteList(data:any): Promise<Response<any>> {    
    try {
        const token     = users?.token      || "";
        const id_user   = users?.id_user    || "";
        const body      = {
            id_user                 : id_user,
            title_note_lists        : data.title_note_lists,
            deskripsi_note_lists    : data.deskripsi_note_lists
        }
        const res = await axios.post(`${url}/NoteList/AddNoteList`, body, {
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

export async function UpdateNoteList(data:any): Promise<Response<any>> {    
    try {
        const token     = users?.token      || "";
        const id_user   = users?.id_user    || "";
        const body      = {
            id_note_lists           : data.id_note_lists,
            id_user                 : id_user,
            title_note_lists        : data.title_note_lists,
            deskripsi_note_lists    : data.deskripsi_note_lists
        }
        const res = await axios.post(`${url}/NoteList/UpdateNoteList`, body, {
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

export async function DeleteNoteList(id_note_lists:string): Promise<Response<any>> {    
    try {
        const token     = users?.token      || "";
        const id_user   = users?.id_user    || "";

        const res = await axios.delete(`${url}/NoteList/DeleteNoteList/${id_user}/${id_note_lists}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            }
        });
        return {
            status: res?.data.status        || "",
            messages: res?.data.messages    || "",
            error: res?.data.error          || "",
            data: res?.data.data            || "",
        };
    } catch (error:any) {
        // Tangani jika response dari server punya struktur
        if (axios.isAxiosError(error) && error.response) {
            return {
                status: error?.response.status,
                messages: "Request failed"          ,
                error: error?.message               || "",
                data: error?.response.data          || "",
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