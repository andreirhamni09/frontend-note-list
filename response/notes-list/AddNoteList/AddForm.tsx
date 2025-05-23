export interface NoteListData {
    id_note_lists           : number,
    id_user                 : number,
    nama_user               : string,
    title_note_lists        : string,
    deskripsi_note_lists    : string,
    created_at              : string,
    updated_at              : string,
    deleted_at              : string
}
export interface NoteListResponse<T> {
    status      : number,
    messages    : string,
    error       : string,
    data        : T
}