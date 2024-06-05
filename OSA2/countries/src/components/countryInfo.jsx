import WeatherInfo from "./waetherInfo"

const CountryInfo = ({country}) => {

        return (
        <>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area} km^2</p>
            <h2>Languages:</h2>
            <ul>
                {Object.values(country.languages).map(
                    lang => 
                        <li key={lang}>{lang}</li>)}
            </ul>
            <img src={country.flags.png}></img>
            <h2>Weather in {country.capital}</h2>
            <WeatherInfo country={country} />
        </>
    )
  }
export default CountryInfo