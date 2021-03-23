import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import 'fontsource-roboto';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer https://api.github.com/graphql` : '',
      authorization: `Bearer d1ba9f835a0a2b7a00e1c441f6058d3f45863293`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
