import { useState, useEffect } from 'react';

import Filter from './components/Filter';
import AddEntry from './components/AddEntry';
import Persons from './components/Persons';

import personService from './services/person.service';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [query, setQuery] = useState('');

  // Fetch initial data
  useEffect(() => {
    personService
      .getAll()
      .then((res) => {
        setPersons(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    // Check if the user is attempting to add a person
    // who already exists in the phonebook
    const existingUser = persons.find((p) => p.name === newName);

    if (existingUser) {
      // Update person if confirmed
      const isConfirmed = confirm(`${ newName } is already in the phonebook. Replace the old number with a new one?`);

      if (isConfirmed) {
        personService
          .update(existingUser.id, newPerson)
          .then((res) => {
            const updatedPersons = persons.map((p) => p.id !== existingUser.id ? p : res.data);
            setPersons(updatedPersons);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      // Add new person
      personService
        .create(newPerson)
        .then((res) => {
          setPersons([...persons, res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // In any case, reset field values
    setNewName('');
    setNewNumber('');
  };

  const removePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    const isConfirmed = confirm(`Delete ${ person.name }?`);

    if (isConfirmed) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChangeName = (e) => setNewName(e.target.value);
  const handleChangeNumber = (e) => setNewNumber(e.target.value);
  const handleChangeQuery = (e) => setQuery(e.target.value);

  const filteredPersons = query
    ? persons.filter((person) => (
      person.name.toLowerCase().includes(query.toLowerCase()))
    ) : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Filter Entries</h2>
      <Filter query={query} handleChangeQuery={handleChangeQuery} />
      <h2>Add New Entry</h2>
      <AddEntry
        addPerson={addPerson}
        newName={newName}
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} removePerson={removePerson} />
    </div>
  );
};

export default App;
