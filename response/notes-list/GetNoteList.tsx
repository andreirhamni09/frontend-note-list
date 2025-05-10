import axios from "axios";
import {NoteListResponse, NoteListData} from '../notes-list/NoteListInterface'

export async function GetNoteList() {
  const response = await axios.get<NoteListResponse<NoteListData[]>>('http://localhost:8000/api/note-lists/get-all');
  return {
    status      : response.data.status,
    messages    : response.data.messages,
    error        : response.data.error,
    data        : response.data.data,
  }
}