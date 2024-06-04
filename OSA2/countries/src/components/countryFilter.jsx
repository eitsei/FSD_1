
const Filter = ({newFilter, setNewFilter}) => {
    //console.log('New filter: ', newFilter)
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
      }
    return(
        <div>
            Find countries <input value = {newFilter}  onChange={handleFilterChange}></input>
        </div>
    )
}
export default Filter