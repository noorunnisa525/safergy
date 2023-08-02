import Route from '@navigation';
import { persistor, store } from '@store';
import { ThemeProvider } from '@theme';
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  useEffect(() => {
    RNBootSplash.hide({ duration: 1000 });
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle={'dark-content'} backgroundColor="#FFF" />
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          {/* <SafeAreaView style={{ flex: 0, backgroundColor: '#FFF' }} /> */}
          <SafeAreaView style={styles.container}>
            <Route />
          </SafeAreaView>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
