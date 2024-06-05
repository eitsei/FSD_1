import { useState, useEffect } from 'react'
import Filter from "./components/countryFilter"
import Countries from './components/countries'
import CountriesService from "./services/CountriesService"



const App = () => {

  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [newFilter, setNewFilter] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(null)
  
  useEffect(() => {
    CountriesService.getAll().then(countries => setCountries(countries))},[])

  useEffect(() => {
    setCountriesToShow(
      newFilter === ""
        ? countries
        : countries.filter(country =>
           
          country.name.common.toUpperCase().includes(newFilter.toUpperCase())
          ))
    setSelectedCountry(null)
  }, [countries, newFilter])

  return(
  <div> 
      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>
      <Countries countries={countriesToShow} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
  </div>)}

export default App
