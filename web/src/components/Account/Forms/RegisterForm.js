export const RegisterForm = ({
  email,
  firstname,
  lastname,
  onChange,
  onSubmit,
  onSwitch,
  password,
  passwordConfirm,
  phone,
  username,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <label>
        First name
        <input
          name="firstname"
          onChange={onChange}
          type="text"
          value={firstname}
        />
      </label>
      <label>
        Last name
        <input
          name="lastname"
          onChange={onChange}
          type="text"
          value={lastname}
        />
      </label>
      <label>
        Username
        <input
          name="username"
          onChange={onChange}
          type="text"
          value={username}
        />
      </label>
      <label>
        Phone number
        <input name="phone" onChange={onChange} type="text" value={phone} />
      </label>
      <label>
        Email
        <input
          name="email"
          onChange={onChange}
          required
          type="email"
          value={email}
        />
      </label>
      <label>
        Password
        <input
          name="password"
          onChange={onChange}
          type="password"
          value={password}
          required
        />
      </label>
      <label>
        Confirm your password
        <input
          name="passwordConfirm"
          onChange={onChange}
          type="password"
          value={passwordConfirm}
          required
        />
      </label>
      <p>
        Already have an account?{" "}
        <a href="#login" onClick={onSwitch}>
          Log in
        </a>
      </p>
      <button type="submit">Register</button>
    </form>
  );
};
