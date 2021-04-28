import { AuthContext } from "providers";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ThemeContext } from "providers";
import { useContext } from "react";
import Head from "next/head";
import styles from "./index.module.scss";

const tempMenu = [
  { path: "events" },
  { path: "account/profile" },
  { path: "account/contribute" },
];
export const MainLayout = ({ children, title }) => {
  const { auth, logout } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Head>
        <title>{title || "Creative Portland"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header menu={tempMenu} />
      <main className ={styles.main}>{children}</main>
      <Footer />
    </>
  );
};
