import { useState, useEffect } from 'react'
import Filter from "./components/countryFilter"
import Countries from './components/countries'
import getAll from "./services/CountriesService"


const App = () => {

  const [countriesToShow, setCountriesToShow] = useState([])
  const [newFilter, setNewFilter] = useState("")
  
  useEffect(() => {
    getAll()
                  .then(countries => setCountriesToShow(countries))

    setCountriesToShow(
      newFilter === ""
        ? countriesToShow
        : countriesToShow.filter(country =>
           
          country.name.common.toUpperCase().includes(newFilter.toUpperCase())
          )
          
    )
  }, [])
  // countriesToShow, newFilter
  return(
  <div> 
      <h1>Testi</h1>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>
      <Countries countries={countriesToShow} />
  </div>)}

export default App
