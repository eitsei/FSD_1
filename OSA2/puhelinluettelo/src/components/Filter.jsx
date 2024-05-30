
const Filtter = ({newFilter, setNewFilter}) => {
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
      }
    return(
        <div>
            
            filter shown with <input value = {newFilter}  onChange={handleFilterChange}></input>

        </div>
    )
}
export default Filtter