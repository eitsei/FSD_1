import Person from "./Part"

const Persons = ({persons, deletePersons}) => {
    return(
        <div>
            {persons.map(person =>{
                if (person) {
                return(                
                    <Person 
                        key = {person.id} 
                        name= {person.name} 
                        number = {person.number} 
                        onDelete={() => deletePersons(person.id)}/>
            )}
            })}
        </div>
    )
}

export default Persons