import { serialize } from "cookie";

const Logout = (_, res) => {
  const maxAge = 0;
  const expires = new Date();
  const path = "/";
  res.setHeader(
    "Set-Cookie",
    serialize("cportland_user", null, {
      maxAge,
      expires,
      path,
    })
  );
  return res.end();
};

export default Logout;
