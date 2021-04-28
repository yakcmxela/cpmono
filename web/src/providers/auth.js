import { createContext, useEffect, useState } from "react";
import { GET_USER_SELF } from "../schema/queries";
import { parse } from "cookie";
import { useLazyQuery } from "@apollo/client";
import axios from "axios";

export const AuthContext = createContext({
  auth: null,
  logout: () => {},
  user: null,
});

const logout = () => {
  axios
    .post(`${process.env.BASE_URL}/api/logout`)
    .then(() => {
      window.location.href = `${process.env.BASE_URL}/account/login`;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const AuthProvider = ({ children, auth }) => {
  const [user, setUser] = useState(null);
  const [getUser, { data, loading, called }] = useLazyQuery(GET_USER_SELF);

  useEffect(() => {
    if (auth && auth.user) {
      getUser({
        variables: {
          id: auth.user.id,
        },
      });
    }
  }, [auth]);

  useEffect(() => {
    if (data && data.getUserSelf) {
      setUser(data.getUserSelf);
    }
  }, [data]);

  return (
    <AuthContext.Provider value={{ auth, logout, user, loading, called }}>
      {children}
    </AuthContext.Provider>
  );
};

export const getAuthenticatedUser = (cookie = "") => {
  const { cportland_user = null } = parse(cookie);
  if (cportland_user) {
    const authUser = JSON.parse(cportland_user);
    return {
      ...authUser,
      credentials: authUser.jwt,
      headers: {
        Authorization: `Bearer ${authUser.jwt}`,
      },
    };
  }
  return null;
};
