import Person from "./Part"


const Persons = ({persons, deletePersons}) => {
    //console.log('Persons', persons)
    return(
        <div>
            {persons.map(person =>{
                //console.log("map person:", person)
                return(                
                    <Person 
                        key = {person.id} 
                        name= {person.name} 
                        number = {person.number} 
                        onDelete={() => deletePersons(person.id)}/>
            )
            })}
        </div>
    )
}

export default Persons