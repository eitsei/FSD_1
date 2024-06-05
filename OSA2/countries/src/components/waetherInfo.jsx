import CountriesService from "../services/CountriesService"
import { useState, useEffect } from 'react'

const WeatherInfo = ({country}) => {
    const [weather, setWeather] = useState([])

    useEffect(() => {
        CountriesService.weatherData(country).then(w => setWeather(w))
        
    },[])
    if (Object.keys(weather).length > 0){
        return(
            <>
                <p>Temperature {weather.main.temp} celsius</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
                <p>Wind {weather.wind.speed} m/s</p>
            </>
        )}
    else{
        return(
        <>
            <p>No data available!</p>
        </>
        )}
}
export default WeatherInfo