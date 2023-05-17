import { Link } from 'react-router-dom';

const Menu = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Anecdotes</Link>
      </li>
      <li>
        <Link to="create-new">Create New</Link>
      </li>
      <li>
        <Link to="about">About</Link>
      </li>
    </ul>
  </nav>
);

export default Menu;
