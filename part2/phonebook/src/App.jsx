import { useState, useEffect } from 'react';
import axios from "axios";

import Filter from './components/Filter';
import AddEntry from './components/AddEntry';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [query, setQuery] = useState('');

  // Fetch initial data
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((res) => {
        setPersons(res.data);
      });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    // Check if the user is attempting to add a person
    // who already exists in the phonebook
    const alreadyExistsUser = persons.some(
      (person) => person.name === newName
    );

    if (alreadyExistsUser) {
      alert(`${newName} is already in the phonebook, pal.`);
      return;
    }

    // Add new person to persons list, reset input value
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    setPersons([...persons, newPerson]);
    setNewName('');
    setNewNumber('');
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
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
