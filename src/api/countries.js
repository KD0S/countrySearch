import axios from "axios";

const baseUrl = 'https://restcountries.com/v3.1/all'

const getCountry = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export {getCountry}