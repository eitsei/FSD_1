import CountryInfo from "./countryInfo"

const Country = ({country,showCountry}) => {
    return (
      <>
        <p> {country.name.common} <button onClick={showCountry}>Show</button>  
        </p>
      </>
    )
  }
export default Country