import Country from "./country"
import CountryInfo from "./countryInfo"
import { useState } from 'react'




const Countries = ({countries, selectedCountry,setSelectedCountry}) =>{
    const showCountry = (country) => {
        setSelectedCountry(country)
    }
    

    if (selectedCountry) 
        return(
            <div>
                <CountryInfo 
                            key = {selectedCountry.area} 
                            country = {selectedCountry}/>
            </div>)
    
    else if (countries.length  === 1)
        return(
            <div>
                <CountryInfo 
                            key = {countries[0].area} 
                            country = {countries[0]}/>
            </div>)
    
    else if (countries.length  <= 10)
        return(
            <div>
                {countries.map(c =>{
                    if (c) {
                    return(                
                        <Country key = {c.area} country = {c} showCountry={() => showCountry(c)}/>
                )}
                })}
            </div>)
    
    else 
        return(
            <div>
                <p>Too many matches, specify another filter</p>
            </div>)
}


export default Countries