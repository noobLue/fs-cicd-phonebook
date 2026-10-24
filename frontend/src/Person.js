
const Person = ({p, deletePerson}) => {
    return (<tr><td className="person">
        {p.name} {p.number} <button onClick={deletePerson}>delete</button>
    </td></tr>)
}

export default Person