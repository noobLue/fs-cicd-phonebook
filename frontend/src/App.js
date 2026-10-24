import { useState, useEffect } from 'react'
import Persons from './Persons'
import ControlledInput from './ControlledInput'
import Form from './Form'
import Notification from './Notification'

import phonebook from './services/phonebook'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState([]);

  const setMessage = (message, fail) => {
    setErrorMessage([message, fail])
          
    setTimeout(() => {
      setErrorMessage([])
    }, 4000)
  }

  const createPerson = (e) => {
    e.preventDefault();

    const person = { name: newName, number: newNumber }
    const oldPerson = persons.find(p => p.name === newName)
    if(oldPerson)
    {
      if(window.confirm(`${person.name} is already added to the phonebook, replace old number?`))
      {
        phonebook.update(oldPerson.id, person)
          .then(res => {
            setPersons(persons.map(p => p.name !== person.name ? p : res.data));
            setNewNumber('');
            setNewName('');
            setMessage(`Updated ${person.name}.`, false);
          })
          .catch((err)=>{
            setMessage(err.response.data.error, true)
          })
      }
    }
    else 
    {
      phonebook.create(person)
        .then(res => {
          setPersons(persons.concat(res.data));
          setNewNumber('');
          setNewName('');
          setMessage(`Added ${person.name}.`, false);
        })
        .catch((err)=>{
          setMessage(err.response.data.error, true)
        })
    }
  };

  const deletePerson = (id) => {
    const personName = persons.find(p => p.id === id).name;
    if(window.confirm(`Delete ${personName}?`))
    {
      phonebook.deleteObject(id)
        .then((res) => {
          setPersons(persons.filter(p => p.id !== id))
          setMessage(`Deleted ${personName}.`, false);
        }, [])
        .catch((err)=>{
          setMessage(`Failed to remove entry of ${personName} from database. It may have been removed already.`, true);

          setPersons(persons.filter(p => p.id !== id))
        })
    }
  };

  useEffect(() => {
    phonebook.getAll()
      .then(res => {
        setPersons(res.data);
      });
  }, [])

  const inputs = [
    { key:"name", value: newName, callback: setNewName }, 
    { key:"number", value: newNumber, callback: setNewNumber }
  ]
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification obj={errorMessage}></Notification>
      <ControlledInput input={{key: 'filter shown with', value: newFilter, callback: setNewFilter}} />
      <Form inputs={inputs} submit={createPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} newFilter={newFilter} />
    </div>
  )
}

export default App