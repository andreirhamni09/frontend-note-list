export interface LoginSuccesfull {
    id_user             : number,
    token               : string,
    expired             : string,
    email_user          : string,
    password_user       : string,
    nama_user           : string
}
export interface LoginErrorJson {
    email_user          : string,
    password_user       : string,
}