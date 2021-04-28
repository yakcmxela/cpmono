export const LoginForm = ({
  email,
  onChange,
  onSubmit,
  onSwitch,
  password,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <label>
        Email
        <input
          aria-label="email"
          name="email"
          onChange={onChange}
          placeholder="Email"
          type="email"
          value={email}
        />
      </label>
      <label>
        Password
        <input
          aria-label="password"
          name="password"
          onChange={onChange}
          placeholder="Password"
          type="password"
          value={password}
        />
      </label>
      <p style={{ padding: "0 12px" }}>
        Don't have an account?{" "}
        <a href="#register" onClick={onSwitch}>
          Register
        </a>
      </p>
      <button type="submit">Log In</button>
    </form>
  );
};
