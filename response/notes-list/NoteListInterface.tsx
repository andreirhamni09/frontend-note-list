export interface NoteListData {
    id_note_lists           : number,
    title_note_lists        : string,
    deskripsi_note_lists    : string,
    created_at_note_list    : string,
    updated_at_note_lists   : string,
    deleted_at_note_lists   : string
}
export interface NoteListResponse<T> {
    status      : number,
    messages    : string,
    error       : string,
    data        : T
}