import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';
import TheAppBar from '../components/TheAppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store/store';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      &copy; 2019 Morico
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  footer: {
    padding: theme.spacing(1, 0),
    marginTop: 'auto',
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TheAppBar />
      <main>{children}</main>
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      <style jsx global>{`
        .MuiButton-label {
          line-height: 1em;
        }
      `}</style>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

const MyApp = props => {
  const { Component, pageProps, store } = props;
  return (
    <Provider store={store}>
      <Head>
        <title>カタヌキ</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object,
  store: PropTypes.object,
};

export default withRedux(initStore)(MyApp);
