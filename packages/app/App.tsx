/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useMemo} from 'react';

import {ThemeProvider, useDarkMode} from 'rn-theme-components';
import {THEME} from 'rn-theme-components';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider, useQuery} from '@apollo/client';

import Routes from './src/routes';

import {client} from './src/client';

// import 'product-flow';

function App(): React.JSX.Element {
  const {theme} = useDarkMode();

  const appTheme = useMemo(
    () =>
      // theme === 'light' ? light : dark
      THEME,
    [theme],
  );

  return (
    <ApolloProvider client={client}>
      {/* <LoadQuery> */}
      <GestureHandlerRootView>
        <ThemeProvider theme={appTheme}>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </ThemeProvider>
      </GestureHandlerRootView>
      {/* </LoadQuery> */}
    </ApolloProvider>
  );
}

export default App;
