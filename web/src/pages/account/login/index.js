import { AuthContext } from "providers";
import { LoginForm, RegisterForm } from "components/Account/Forms";
import { useContext, useState } from "react";
import axios from "axios";
import parseUrl from "parse-url";
import styles from "./index.module.scss";

const Auth = () => {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(defaultLogin);
  const [register, setRegister] = useState(null);
  const [authed, setAuthed] = useState(false);

  const { auth, logout, user} = useContext(AuthContext);

  const handleChangeRegister = (event) => {
    setRegister((u) => {
      return {
        ...u,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleChangeLogin = (event) => {
    setLogin((u) => {
      return {
        ...u,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    setLoading(true);
    const requestErrors = validateRequest(register ? register : login);
    if (!Boolean(requestErrors.length)) {
      axios
        .post(
          register
            ? `${process.env.BASE_URL}/api/register`
            : `${process.env.BASE_URL}/api/login`,
          register ? register : login
        )
        .then(() => {
          const { query } = parseUrl(window.location.href);
          if (query.redirect) {
            window.location.href = `${process.env.BASE_URL}/${query.redirect}`;
          } else {
            window.location.href = `${process.env.BASE_URL}/account/profile`;
          }
        })
        .catch(({ response }) => {
          setErrors(response.data.messages);
        });
    } else {
      setErrors(requestErrors);
    }
    setLoading(false);
  };

  const handleSwitchMethod = () => {
    if (!register) {
      setLogin(null);
      setRegister(defaultRegister);
    } else if (!login) {
      setLogin(defaultRegister);
      setRegister(null);
    }
  };

  const validateRequest = (obj) => {
    const errors = [];
    if (obj.confirm && obj.password !== obj.passwordConfirm) {
      errors.push("Password fields must be identical.");
    }
    return errors;
  };

  return (
    <main className={styles.main}>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <section>
          <p>You are already logged in!</p>
          <a href={`${process.env.BASE_URL}/account/profile`}>My account</a>
          <button onClick={logout}>Log out</button>
        </section>
      ) : (
        <section className="card">
          {errors && (
            <ol>
              {errors.map((item, i) => (
                <li key={`errors${i}`}>{item}</li>
              ))}
            </ol>
          )}
          {register ? (
            <RegisterForm
              {...register}
              onChange={handleChangeRegister}
              onSubmit={handleSubmit}
              onSwitch={handleSwitchMethod}
            />
          ) : (
            <LoginForm
              {...login}
              onChange={handleChangeLogin}
              onSubmit={handleSubmit}
              onSwitch={handleSwitchMethod}
            />
          )}
        </section>
      )}
    </main>
  );
};

const defaultLogin = {
  email: "",
  password: "",
};

const defaultRegister = {
  ...defaultLogin,
  firstname: "",
  lastname: "",
  passwordConfirm: "",
  phone: "",
  username: "",
};

export default Auth;
