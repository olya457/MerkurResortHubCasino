import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AureoleArrival} from './src/starlitScreens/AureoleArrival';
import {VelvetPrelude} from './src/starlitScreens/VelvetPrelude';
import {StayCompanionRouteDeck} from './src/navigation/StayCompanionRouteDeck';
import {storageKeys} from './src/velvetCore/storageKeys';

function App(): React.JSX.Element {
  const [gate, setGate] = useState<'arrival' | 'prelude' | 'deck'>('arrival');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const stored = await AsyncStorage.getItem(storageKeys.preludeDone);
      setGate(stored === 'yes' ? 'deck' : 'prelude');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#061423" />
      {gate === 'arrival' && <AureoleArrival />}
      {gate === 'prelude' && <VelvetPrelude onDone={() => setGate('deck')} />}
      {gate === 'deck' && <StayCompanionRouteDeck />}
    </SafeAreaProvider>
  );
}

export default App;
