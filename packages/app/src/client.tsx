import {loadErrorMessages, loadDevMessages} from '@apollo/client/dev';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setContext} from '@apollo/client/link/context';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
// import {setContext} from '@apollo/client/link/context';

const API_URL = `http://localhost:3000/shop-api`;
const AUTH_TOKEN_KEY = 'auth_token';

let channelToken: string | undefined;
let languageCode: string | undefined;

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const httpLink = new HttpLink({
  uri: () => {
    if (languageCode) {
      return `${API_URL}?languageCode=${languageCode}`;
    } else {
      return API_URL;
    }
  },
  // This is required if using cookie-based session management,
  // so that any cookies get sent with the request.
  credentials: 'include',
});

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext();
    const authHeader = context.response.headers.get('vendure-auth-token');
    if (authHeader) {
      // If the auth token has been returned by the Vendure
      // server, we store it in localStorage
      AsyncStorage.setItem(AUTH_TOKEN_KEY, authHeader);
    }
    return response;
  });
});

/**
 * Used to specify a channel token for projects that use
 * multiple Channels.
 */
export function setChannelToken(value: string | undefined) {
  channelToken = value;
}

/**
 * Used to specify a language for any localized results.
 */
export function setLanguageCode(value: string | undefined) {
  languageCode = value;
}

export const client = new ApolloClient({
  link: ApolloLink.from([
    // If we have stored the authToken from a previous
    // response, we attach it to all subsequent requests.
    setContext(async (request, operation) => {
      const authToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      let headers: Record<string, any> = {};
      if (authToken) {
        headers.authorization = `Bearer ${authToken}`;
      }
      if (channelToken) {
        headers['vendure-token'] = channelToken;
      }
      return {headers};
    }),
    afterwareLink,
    httpLink,
  ]),
  cache: new InMemoryCache(),
});
