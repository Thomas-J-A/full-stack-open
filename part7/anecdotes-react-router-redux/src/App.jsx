import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectNotification } from './redux/notificationSlice';

import Footer from './components/Footer/Footer';
import Menu from './components/Menu/Menu';
import Notification from './components/UI/Notification/Notification';

const App = () => {
  const notification = useSelector(selectNotification);

  return (
    <div>
      <h1>Software Anecdotes</h1>
      <Menu />
      {notification && <Notification msg={notification} />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
