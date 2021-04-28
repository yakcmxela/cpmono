import { AuthContext } from "providers";
import { useContext } from "react";
import styles from "./index.module.scss";

const mainMenu = [
  { path: "/account/profile", title: "My Profile" },
  { path: "/account/contribute", title: "Contribute" },
];

const pageMenu = [
  { path: "/account/artist", title: "Artist Page" },
  { path: "/account/organization", title: "Organization Page" },
  { path: "/account/venue", title: "Venue Page" },
];

const eventsMenu = [
  { path: "/account/events", title: "My Events" },
  { path: "/account/events/new", title: "New Event" },
];

export const AccountLayout = ({ children, route }) => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <div className={styles.layout}>
      <aside className={styles.menus}>
        <nav>
          <ul>
            {mainMenu.map((item) => (
              <li
                key={item.path}
                className={
                  item.path === route ? styles.active : styles.inactive
                }
              >
                <a href={process.env.BASE_URL + item.path}>{item.title}</a>
              </li>
            ))}
          </ul>
          <ul>
            {pageMenu.map((item) => (
              <li
                key={item.path}
                className={
                  item.path === route ? styles.active : styles.inactive
                }
              >
                <a href={process.env.BASE_URL + item.path}>{item.title}</a>
              </li>
            ))}
          </ul>
          <ul>
            {eventsMenu.map((item) => (
              <li
                key={item.path}
                className={
                  item.path === route ? styles.active : styles.inactive
                }
              >
                <a href={process.env.BASE_URL + item.path}>{item.title}</a>
              </li>
            ))}
          </ul>
          <ul>
            <li onClick={logout}>Log out</li>
          </ul>
        </nav>
      </aside>
      <article className={styles.content}>{children}</article>
    </div>
  );
};
