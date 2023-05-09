import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setAnecdotesAsync } from './slices/anecdotesSlice';

import Notification from './components/UI/Notification/Notification';
import Filter from './components/Filter/Filter';
import AnecdoteList from './components/AnecdoteList/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm/AnecdoteForm';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAnecdotesAsync());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App
