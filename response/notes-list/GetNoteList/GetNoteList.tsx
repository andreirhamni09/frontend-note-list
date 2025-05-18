import axios from "axios";
import {NoteListResponse, NoteListData} from '@/response/notes-list/GetNoteList/NoteListInterface'
import Cookies from 'js-cookie';


export async function GetNoteList() {
  try {
    const users   = JSON.parse(Cookies.get('users') || '[]');
    const token   = users['token'];
    const url     = 'http://localhost:8000/api/NoteList/GetAll/' + users['id_user'];
    const response = await axios.get<NoteListResponse<NoteListData[]>>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      status      : response.data.status,
      messages    : response.data.messages,
      error        : response.data.error,
      data        : response.data.data,
    }
  } catch (error) {
    return {
      status      : 500,
      messages    : "Internal Server Error",
      error        : "Terjadi Masalah Ketika Mengakses API",
      data        : [],
    }
  }
}