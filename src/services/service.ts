import axios from 'axios';

export const api = axios.create({
    baseURL:'https://blogpessoaljoao.herokuapp.com/'
})

export const login = async(url: any, _data: any, setData: any) => {
    const result = await api.post(url, _data)
    setData(result.data.token)
}

export const userRegistration = async(url: any, _data: any, setData: any) => {
    const result = await api.post(url, _data)
    setData(result.data)
}