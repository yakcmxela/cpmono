import { AuthContext } from "providers";
import { useContext, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

export const useGateProps = ({ Component, type, query }) => {
  const [permission, setPermission] = useState(false);
  const [request, response] = useLazyQuery(query);
  const { user, loading, called } = useContext(AuthContext);

  const getIsLoading = () =>
    !called || loading || (response.called && response.loading);

  useEffect(() => {
    if (!getIsLoading()) {
      setPermission(
        (!response.error || response.data) && response.data[type] !== null
      );
    }
  }, [response.loading]);

  useEffect(() => {
    if (user && user[type]) {
      request({
        variables: {
          id: user[type].id,
        },
      });
    }
  }, [user]);

  return {
    Component,
    componentProps: response.data,
    loading: getIsLoading(),
    permission,
    type,
  };
};
