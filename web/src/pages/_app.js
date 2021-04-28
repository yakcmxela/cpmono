import "styles/index.scss";
import 'antd/dist/antd.css';
// import { Amplify } from "aws-amplify";
// import awsExports from "../aws-exports";
import { ApolloProvider } from "@apollo/client";
import {
  apolloProvider,
  AuthProvider,
  ThemeProvider,
  getAuthenticatedUser,
} from "providers";
import { GET_SITE_THEME } from "schema/queries";
import { MainLayout } from "layouts/MainLayout";
// Amplify.configure({ ...awsExports, ssr: true });

function CreativePortland({ Component, pageProps }) {
  const { auth, theme } = pageProps;
  return (
    <ApolloProvider client={apolloProvider(auth && auth.headers)}>
      <AuthProvider auth={auth}>
        <ThemeProvider theme={theme}>
          <MainLayout {...pageProps}>
            <Component {...pageProps} />
          </MainLayout>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

CreativePortland.getInitialProps = async (appContext) => {
  let pageProps = {
    auth: null,
    theme: null,
    user: null,
    route: appContext.router.route,
  };

  const { getInitialProps } = appContext.Component;
  if (appContext.ctx.req) {
    try {
      pageProps = {
        ...pageProps,
        ...(getInitialProps && { ...(await getInitialProps(appContext.ctx)) }),
      };
    } catch (error) {
      console.log(`Error fetching page initialProps: ${error}`);
    }
    try {
      pageProps.auth = await getAuthenticatedUser(
        appContext.ctx.req.headers.cookie
      );
    } catch (error) {
      console.log(`Error fetching auth: ${error}`);
    }
  }

  try {
    const { data } = await apolloProvider(null, true).query({
      query: GET_SITE_THEME,
    });
    if (data.theme) {
      pageProps.theme = data.theme;
    }
  } catch (error) {
    console.log(`Error fetching theme: ${error}`);
  }

  return { pageProps };
};

export default CreativePortland;
