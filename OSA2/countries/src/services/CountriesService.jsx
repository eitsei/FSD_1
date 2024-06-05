import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => {
    return response.data})
}

const getCountry = country => {
    const request = axios.get(`${baseUrl}/name/${country}`)
    return request.then(response => {
      return response.data})
  }
const weatherData = (country) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.cca2}&APPID=${api_key}&units=metric`
    const request = axios.get(url)
    return request.then(response => {
      return response.data})}

    
export default {getAll,weatherData}