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
    console.log('Weatherdatan country ', country)
    const cap = country.capital.latlang
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${cap[0]}&lon=${cap[1]}&exclude=minutely,hourly,daily,alerts&appid=${api_key}$units=metric`
    const request = axios.get(url)
    return request.then(response => {
      console.log('Weatherin response: ', response.data)
      return response.data})}

export default {getAll,weatherData}