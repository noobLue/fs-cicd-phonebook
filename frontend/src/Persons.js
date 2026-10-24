import Person from './Person'

const Persons = ({persons, deletePerson, newFilter}) => {
    return (
        <table>
        <tbody>
            {persons.filter(p=>p.name.toLowerCase().includes(newFilter.toLowerCase())).map((p)=><Person p={p} deletePerson={()=>{deletePerson(p.id)}} key={p.id} />)}
        </tbody>
        </table>
    )
}

export default Persons