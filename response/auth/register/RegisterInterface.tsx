export interface InputData {
    nama_user       :string,
    email_user      :string,
    password_user   :string 
}
export interface ErrorData {
    nama_user       :string,
    email_user      :string,
    password_user   :string 
}
export interface RegisterResponse<Data, Error> {
    status      : number,
    messages    : string,
    error       : Error,
    data        : Data
}