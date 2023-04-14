const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      Username
      <input
        type="text"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      Password
      <input
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">Log In</button>
  </form>
);

export default LoginForm;
