import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenChrome} from '../velvetUi/ScreenChrome';
import {SectionTitle} from '../velvetUi/SectionTitle';
import {CompactKeyboardInput} from '../velvetUi/CompactKeyboardInput';
import {palette} from '../velvetCore/palette';
import {storageKeys} from '../velvetCore/storageKeys';

const plans = [
  {id: 'standard', name: 'Standard', price: '€ 2.10 / km', eta: 'Est. arrival: 4 min'},
  {id: 'premium', name: 'Premium', price: '€ 3.50 / km', eta: 'Est. arrival: 6 min'},
  {id: 'business', name: 'Business', price: '€ 5.00 / km', eta: 'Est. arrival: 8 min'},
  {id: 'limousine', name: 'VIP Limousine', price: '€ 8.50 / km', eta: 'Est. arrival: 12 min'},
];

export function TaxiRibbon(): React.JSX.Element {
  const [plan, setPlan] = useState('premium');
  const [destination, setDestination] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(storageKeys.taxiTicket).then(value => {
      if (value) {
        const ticket = JSON.parse(value);
        setPlan(ticket.plan ?? 'premium');
        setDestination(ticket.destination ?? '');
        setSaved(Boolean(ticket.destination));
      }
    });
  }, []);

  const book = async () => {
    await AsyncStorage.setItem(storageKeys.taxiTicket, JSON.stringify({plan, destination}));
    setSaved(true);
  };

  return (
    <ScreenChrome>
      <SectionTitle kicker="TRANSPORT" title="Taxi Service" />
      <Text style={styles.label}>SELECT PLAN</Text>
      {plans.map(item => {
        const active = plan === item.id;
        return (
          <Pressable key={item.id} style={[styles.plan, active && styles.planActive]} onPress={() => setPlan(item.id)}>
            <View>
              <Text style={[styles.planTitle, active && styles.planTitleActive]}>{item.name}</Text>
              <Text style={styles.planMeta}>{item.price}</Text>
              <Text style={styles.planMeta}>{item.eta}</Text>
            </View>
            <View style={[styles.check, active && styles.checkActive]}>
              {active && <View style={styles.checkDot} />}
            </View>
          </Pressable>
        );
      })}
      <View style={styles.split}>
        <View style={styles.fieldHalf}>
          <Text style={styles.label}>DATE</Text>
          <View style={styles.field}>
            <Text style={styles.inputText}>12 July 2026</Text>
          </View>
        </View>
        <View style={styles.fieldHalf}>
          <Text style={styles.label}>TIME</Text>
          <View style={styles.field}>
            <Text style={styles.inputText}>09:30</Text>
          </View>
        </View>
      </View>
      <Text style={styles.label}>PICKUP LOCATION</Text>
      <View style={styles.field}>
        <Text style={styles.inputText}>MERKUR Resort, Main Entrance</Text>
      </View>
      <Text style={styles.label}>DESTINATION</Text>
      <CompactKeyboardInput
        value={destination}
        onChangeText={text => {
          setDestination(text);
          setSaved(false);
        }}
        placeholder="Enter destination..."
      />
      <Pressable style={styles.button} onPress={book}>
        <Text style={styles.buttonText}>{saved ? 'BOOKED' : 'BOOK TAXI'}</Text>
      </Pressable>
    </ScreenChrome>
  );
}

const styles = StyleSheet.create({
  label: {
    color: palette.muted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 4,
    marginBottom: 11,
    marginTop: 4,
  },
  plan: {
    alignItems: 'center',
    borderColor: palette.line,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 9,
    minHeight: 94,
    paddingHorizontal: 17,
    paddingVertical: 14,
  },
  planActive: {
    borderColor: palette.gold,
  },
  planTitle: {
    color: palette.muted,
    fontSize: 16,
    fontWeight: '900',
  },
  planTitleActive: {
    color: palette.text,
  },
  planMeta: {
    color: palette.muted,
    fontSize: 12,
    marginTop: 7,
  },
  check: {
    borderColor: palette.line,
    borderWidth: 2,
    height: 20,
    width: 20,
  },
  checkActive: {
    borderColor: palette.gold,
  },
  checkDot: {
    backgroundColor: palette.gold,
    height: 10,
    margin: 3,
    width: 10,
  },
  split: {
    flexDirection: 'row',
    gap: 12,
  },
  fieldHalf: {
    flex: 1,
  },
  field: {
    borderColor: palette.line,
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  inputText: {
    color: palette.text,
    fontSize: 15,
  },
  button: {
    alignItems: 'center',
    backgroundColor: palette.gold,
    height: 52,
    justifyContent: 'center',
  },
  buttonText: {
    color: palette.ink,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 4,
  },
});
