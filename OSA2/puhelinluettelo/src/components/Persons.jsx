import Person from "./Part"

const Persons = ({persons}) => {
    return(
        <div>
            {persons.map(person =>
                <Person name={person.name} number = {person.number}/>
            )}
        </div>
    )
}

export default Persons