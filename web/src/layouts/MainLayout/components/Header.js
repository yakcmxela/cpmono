import styles from "./header.module.scss";

export const Header = ({ menu }) => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.nav}>
          {menu.map((item) => {
            return (
              <li key={item.path}>
                <a href={`${process.env.BASE_URL}/${item.path}`}>{item.path}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
