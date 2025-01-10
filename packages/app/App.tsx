/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useMemo} from 'react';

import {ThemeProvider, useDarkMode} from 'rn-theme-components';
import {THEME} from 'rn-theme-components';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes';

function App(): React.JSX.Element {
  const {theme} = useDarkMode();

  const appTheme = useMemo(
    () =>
      // theme === 'light' ? light : dark
      THEME,
    [theme],
  );

  return (
    <GestureHandlerRootView>
      <ThemeProvider theme={appTheme}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
        {/* <ScrollView> */}
        {/* <HomeProducts /> */}
        {/* <Collection /> */}
        {/* <Product /> */}
        {/* </ScrollView> */}
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
