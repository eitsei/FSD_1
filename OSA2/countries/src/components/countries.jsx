import Country from "./country"

const Countries = ({countries}) =>{
    console.log('countries length: ', countries.length)
    if (countries.length  <= 10)
        {return(
            <div>
                {countries.map(c =>{
                    if (c) {
                        //console.log('Country:, ',c.name.common)
                    return(                
                        <Country 
                            key = {c.id} 
                            country = {c}/>
                )}
                })}
            </div>)}
    else if (countries.length  === 1){
        return(
            <div>
                <p>Testi</p>
            </div>
        )
    }
    
    else {
        return(
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }


}

export default Countries