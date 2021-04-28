import { apolloProvider, getAuthenticatedUser } from "providers";
import { PAGE_BY_PARAMS } from "schema/queries";
import dynamic from "next/dynamic";
import styles from "./index.module.scss";

export default function Home({ page }) {
  return (
    <article className={styles.home}>
      <h1>{page.title}</h1>
      {page.components &&
        page.components.map((component) => {
          const DynamicComponent = dynamic(
            () => import("../components/ImageWithText"),
            {
              loading: () => <p>loading</p>,
            }
          );
          return <DynamicComponent key={component.id} {...component} />;
        })}
    </article>
  );
}

export const getServerSideProps = async (context) => {
  const props = {
    page: {},
  };
  try {
    const { headers = null } = getAuthenticatedUser(context.req.headers.cookie);
    const client = apolloProvider(headers, true);
    const { data } = await client.query({
      query: PAGE_BY_PARAMS,
      variables: {
        where: {
          isHomePage: true,
        },
      },
    });
    if (data.pageByParams) {
      Object.assign(props, {
        page: data.pageByParams,
      });
    }
  } catch (error) {
    console.log(error);
  }
  return {
    props,
  };
};
