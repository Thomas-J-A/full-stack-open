import { useEffect } from 'react';

import useField from './hooks/useField';
import useResource from './hooks/useResource';

const host = 'http://localhost:3001';

const App = () => {
  const content = useField('text');
  const name = useField('text');
  const number = useField('text');

  const [notes, noteService] = useResource(`${host}/notes`);
  const [persons, personService] = useResource(`${host}/persons`);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await Promise.all([
          noteService.getAll(),
          personService.getAll()
        ]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchInitialData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    noteService.create({ content: content.value });
  }

  const handlePersonSubmit = (e) => {
    e.preventDefault();
    personService.create({
      name: name.value,
      number: number.value,
    });
  };

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <label htmlFor="content">
          Content:
          <input
            id="content"
            type={content.type}
            value={content.value}
            onChange={content.onChange}
          />
        </label>
        <button type="submit">Create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
        <label htmlFor="name">
          Name:
          <input
            id="name"
            type={name.type}
            value={name.value}
            onChange={name.onChange}
          />
        </label>
        <label htmlFor="number">
          Number:
          <input
            id="number"
            type={number.type}
            value={number.value}
            onChange={number.onChange}
          />
        </label>
        <button type="submit">Create</button>
      </form>
      {persons.map((p) => (
        <p key={p.id}>{`${p.name} | ${p.number}`}</p>
      ))}
    </div>
  );
};

export default App;
