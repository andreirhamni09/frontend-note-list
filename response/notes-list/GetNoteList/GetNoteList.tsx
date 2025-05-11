import axios from "axios";
import {NoteListResponse, NoteListData} from '@/response/notes-list/GetNoteList/NoteListInterface'

export async function GetNoteList() {
  try {
    const response = await axios.get<NoteListResponse<NoteListData[]>>('http://localhost:8000/api/note-lists/get-all');
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