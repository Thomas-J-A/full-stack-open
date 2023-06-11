import { Link } from 'react-router-dom';

import { useGetUsersQuery } from '../../../redux/api/apiSlice';

const UsersPage = () => {
  const { data: users, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  return (
    <div>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <th>User Name</th>
            <th>Blogs Created</th>
          </tr>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
