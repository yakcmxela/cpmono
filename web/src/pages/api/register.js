import { apolloProvider } from "providers";
import { REGISTER_USER, UPDATE_USER } from "schema/mutations";
import { withGQLErrors, setCookie } from "./util";

const Register = (req, res) => {
  return apolloProvider()
    .mutate({
      mutation: REGISTER_USER,
      variables: {
        ...(req.body.email && { email: req.body.email }),
        ...(req.body.password && { password: req.body.password }),
        ...(req.body.username && { username: req.body.username }),
      },
    })
    .then(({ data }) => setCookie(res, data, "register"))
    .then((register) => updateUser(req, register))
    .then((user) => res.status(200).send(user))
    .catch((error) => withGQLErrors(res, error));
};

const updateUser = (req, register) => {
  return apolloProvider({
    Authorization: `Bearer ${register.jwt}`,
  })
    .mutate({
      mutation: UPDATE_USER,
      variables: {
        firstname: req.body.firstname || "",
        id: register.user.id,
        lastname: req.body.lastname || "",
        phone: req.body.phone || "",
      },
    })
    .then(({ data = {} }) => {
      return (data.updateUserSelf && data.updateUserSelf.user) || {};
    });
};

export default Register;
