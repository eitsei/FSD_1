import Country from "./country"
import CountryInfo from "./countryInfo"

const Countries = ({countries}) =>{
    if (countries.length  === 1){
        return(
            <div>
                <CountryInfo 
                            key = {countries[0].id} 
                            country = {countries[0]}/>
            </div>
        )
    }

    else if (countries.length  <= 10){
        return(
            <div>
                {countries.map(c =>{
                    if (c) {
                    return(                
                        <Country 
                            key = {c.id} country = {c}/>
                )}
                })}
            </div>)}
    
    else {
        return(
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }


}

export default Countries