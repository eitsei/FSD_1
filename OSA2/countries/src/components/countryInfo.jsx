
import CountriesService from "../services/CountriesService"
import { useState, useEffect } from 'react'



const CountryInfo = ({country}) => {

    const [weather, setWeather] = useState([])

    useEffect(() => {
        CountriesService.weatherData(country).then(w => setWeather(w))
        console.log('CoutntyInfo weather ', weather)
    })

    return (
      <>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h2>Languages:</h2>
        <ul>
            {Object.values(country.languages).map(
                lang => 
                    <li key={lang}>{lang}</li>)}
        </ul>
        <img src={country.flags.png}></img>
        <h2>Weather in {country.capital}</h2>
        <p>Temperature {weather.current.temp} celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.current.weather.icon}@2x.png`}></img>
        <p>Wind {weather.current.wind_speed} m/s</p>
      </>
    )
  }
export default CountryInfo