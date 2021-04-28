import { Loader } from "components/Loader";
import { NoPageAccess } from "./NoPageAccess";

export const Gate = ({
  Component,
  componentProps,
  handler,
  loading,
  permission,
  type,
}) => {
  return loading ? (
    <Loader />
  ) : permission === false ? (
    <NoPageAccess type={type} />
  ) : (
    <Component {...componentProps} handler={handler} />
  );
};
