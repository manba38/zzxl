export const SET_TOKEN = (token: string) => {
    localStorage.setItem("Token", token)
}

export const GET_TOKEN = () => {
    return localStorage.getItem('TOKEN');
}