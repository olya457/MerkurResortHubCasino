import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenChrome} from '../velvetUi/ScreenChrome';
import {SectionTitle} from '../velvetUi/SectionTitle';
import {CompactKeyboardInput} from '../velvetUi/CompactKeyboardInput';
import {FadeLift} from '../velvetUi/FadeLift';
import {palette} from '../velvetCore/palette';
import {storageKeys} from '../velvetCore/storageKeys';

const plans = [
  {
    id: 'standard',
    name: 'Standard',
    price: '€ 2.10 / km',
    eta: 'Est. arrival: 4 min',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '€ 3.50 / km',
    eta: 'Est. arrival: 6 min',
  },
  {
    id: 'business',
    name: 'Business',
    price: '€ 5.00 / km',
    eta: 'Est. arrival: 8 min',
  },
  {
    id: 'limousine',
    name: 'VIP Limousine',
    price: '€ 8.50 / km',
    eta: 'Est. arrival: 12 min',
  },
];

const taxiDates = [
  '12 July 2026',
  '13 July 2026',
  '14 July 2026',
  '15 July 2026',
];
const taxiTimes = ['08:00', '09:30', '11:00', '14:30', '18:00', '21:00'];

export function TaxiRibbon(): React.JSX.Element {
  const [plan, setPlan] = useState('premium');
  const [date, setDate] = useState('12 July 2026');
  const [time, setTime] = useState('09:30');
  const [destination, setDestination] = useState('');
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(storageKeys.taxiTicket).then(value => {
      if (value) {
        const ticket = JSON.parse(value);
        setPlan(ticket.plan ?? 'premium');
        setDate(ticket.date ?? '12 July 2026');
        setTime(ticket.time ?? '09:30');
        setDestination(ticket.destination ?? '');
        setSaved(Boolean(ticket.destination));
      }
    });
  }, []);

  const book = async () => {
    await AsyncStorage.setItem(
      storageKeys.taxiTicket,
      JSON.stringify({plan, date, time, destination}),
    );
    setSaved(true);
  };

  return (
    <ScreenChrome>
      <SectionTitle kicker="TRANSPORT" title="Taxi Service" />
      {saved && (
        <FadeLift style={styles.notice}>
          <Text style={styles.noticeText}>
            Transfer request is saved locally for reception handoff.
          </Text>
        </FadeLift>
      )}
      <Text style={styles.label}>SELECT PLAN</Text>
      {plans.map((item, index) => {
        const active = plan === item.id;
        return (
          <FadeLift key={item.id} delay={index * 45}>
            <Pressable
              style={[styles.plan, active && styles.planActive]}
              onPress={() => setPlan(item.id)}>
              <View>
                <Text
                  style={[styles.planTitle, active && styles.planTitleActive]}>
                  {item.name}
                </Text>
                <Text style={styles.planMeta}>{item.price}</Text>
                <Text style={styles.planMeta}>{item.eta}</Text>
              </View>
              <View style={[styles.check, active && styles.checkActive]}>
                {active && <View style={styles.checkDot} />}
              </View>
            </Pressable>
          </FadeLift>
        );
      })}
      <View style={styles.split}>
        <View style={styles.fieldHalf}>
          <Text style={styles.label}>DATE</Text>
          <Pressable
            style={[styles.field, dateOpen && styles.fieldOpen]}
            onPress={() => {
              setDateOpen(open => !open);
              setTimeOpen(false);
            }}>
            <Text style={styles.inputText}>{date}</Text>
            <Text style={styles.chevron}>{dateOpen ? '▲' : '▼'}</Text>
          </Pressable>
          {dateOpen && (
            <View style={styles.dropdown}>
              {taxiDates.map(item => (
                <Pressable
                  key={item}
                  style={[styles.option, date === item && styles.optionActive]}
                  onPress={() => {
                    setDate(item);
                    setDateOpen(false);
                    setSaved(false);
                  }}>
                  <Text
                    style={[
                      styles.optionText,
                      date === item && styles.optionTextActive,
                    ]}>
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
        <View style={styles.fieldHalf}>
          <Text style={styles.label}>TIME</Text>
          <Pressable
            style={[styles.field, timeOpen && styles.fieldOpen]}
            onPress={() => {
              setTimeOpen(open => !open);
              setDateOpen(false);
            }}>
            <Text style={styles.inputText}>{time}</Text>
            <Text style={styles.chevron}>{timeOpen ? '▲' : '▼'}</Text>
          </Pressable>
          {timeOpen && (
            <View style={styles.dropdown}>
              {taxiTimes.map(item => (
                <Pressable
                  key={item}
                  style={[styles.option, time === item && styles.optionActive]}
                  onPress={() => {
                    setTime(item);
                    setTimeOpen(false);
                    setSaved(false);
                  }}>
                  <Text
                    style={[
                      styles.optionText,
                      time === item && styles.optionTextActive,
                    ]}>
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
      <Text style={styles.label}>PICKUP LOCATION</Text>
      <View style={styles.field}>
        <Text style={styles.inputText}>Grand Guest Hub, Main Entrance</Text>
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
        <Text style={styles.buttonText}>
          {saved ? 'REQUEST SAVED' : 'SAVE REQUEST'}
        </Text>
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
  notice: {
    borderColor: palette.gold,
    borderWidth: 1,
    marginBottom: 14,
    padding: 14,
  },
  noticeText: {
    color: palette.text,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
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
    alignItems: 'center',
    borderColor: palette.line,
    borderWidth: 1,
    flexDirection: 'row',
    height: 48,
    justifyContent: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  fieldOpen: {
    borderColor: palette.gold,
  },
  inputText: {
    color: palette.text,
    flex: 1,
    fontSize: 15,
  },
  chevron: {
    color: palette.gold,
    fontSize: 11,
    fontWeight: '900',
    marginLeft: 8,
  },
  dropdown: {
    borderColor: palette.line,
    borderTopWidth: 0,
    borderWidth: 1,
    marginBottom: 12,
  },
  option: {
    borderBottomColor: 'rgba(39, 80, 127, 0.48)',
    borderBottomWidth: 1,
    minHeight: 42,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  optionActive: {
    backgroundColor: palette.gold,
  },
  optionText: {
    color: palette.text,
    fontSize: 13,
    fontWeight: '800',
  },
  optionTextActive: {
    color: palette.ink,
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
