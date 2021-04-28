import { apolloProvider } from "providers";
import { LOGIN_USER } from "schema/mutations";
import { withGQLErrors, setCookie } from "./util";

const Login = (req, res) => {
  return apolloProvider()
    .mutate({
      mutation: LOGIN_USER,
      variables: {
        ...(req.body.email && { email: req.body.email }),
        ...(req.body.password && { password: req.body.password }),
      },
    })
    .then(({ data }) => setCookie(res, data, "login"))
    .then((login) => res.status(200).send(login))
    .catch((error) => withGQLErrors(res, error));
};

export default Login;
