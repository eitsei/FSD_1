import CountryInfo from "./countryInfo"

const Country = ({country}) => {
    return (
      <>
        <p> {country.name.common} <button >Show</button>  
        </p>
      </>
    )
  }
export default Country