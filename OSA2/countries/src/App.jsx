import { useState, useEffect } from 'react'
import Filter from "./components/countryFilter"
import Countries from './components/countries'
import CountriesService from "./services/CountriesService"


const App = () => {

  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [newFilter, setNewFilter] = useState("")
  
  useEffect(() => {
    CountriesService.getAll().then(countries => setCountries(countries))},[])

  useEffect(() => {
    setCountriesToShow(
      newFilter === ""
        ? countries
        : countries.filter(country =>
           
          country.name.common.toUpperCase().includes(newFilter.toUpperCase())
          )
          
    )
  }, [newFilter])
  // countriesToShow, newFilter
  return(
  <div> 
      <h1>Testi</h1>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>
      <Countries countries={countriesToShow} />
  </div>)}

export default App
