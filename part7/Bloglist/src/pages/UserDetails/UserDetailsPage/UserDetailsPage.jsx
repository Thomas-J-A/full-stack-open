import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../../../redux/api/apiSlice';

const UserDetailsPage = () => {
  const { id } = useParams();
  const { data: users, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return <p>Loading user&rsquo;s blogs...</p>;
  }

  const user = users.find((u) => u.id === id);

  const blogs = user.blogs.map((b) => <li key={b.id}>{b.title}</li>);

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Blogs added:</h2>
      {blogs.length ? <ul>{blogs}</ul> : <p>None...</p>}
    </div>
  );
};

export default UserDetailsPage;
