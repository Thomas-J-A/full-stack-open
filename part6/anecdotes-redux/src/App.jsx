import Notification from './components/UI/Notification/Notification';
import Filter from './components/Filter/Filter';
import AnecdoteList from './components/AnecdoteList/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm/AnecdoteForm';

const App = () => (
  <div>
    <h2>Anecdotes</h2>
    <Notification />
    <Filter />
    <AnecdoteList />
    <AnecdoteForm />
    </div>
);

export default App
