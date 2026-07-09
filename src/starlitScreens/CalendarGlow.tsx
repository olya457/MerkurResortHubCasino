import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenChrome} from '../velvetUi/ScreenChrome';
import {SectionTitle} from '../velvetUi/SectionTitle';
import {InfoLine} from '../velvetUi/InfoLine';
import {FadeLift} from '../velvetUi/FadeLift';
import {palette} from '../velvetCore/palette';
import {gathers} from '../velvetCore/resortLedger';
import {storageKeys} from '../velvetCore/storageKeys';
import type {GatherNote} from '../velvetCore/types';

export function CalendarGlow(): React.JSX.Element {
  const [chosen, setChosen] = useState<GatherNote | null>(null);
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(storageKeys.savedEvents).then(value => {
      if (value) {
        setSaved(JSON.parse(value));
      }
    });
  }, []);

  const toggleSaved = async (id: string) => {
    const next = saved.includes(id) ? saved.filter(item => item !== id) : [...saved, id];
    setSaved(next);
    await AsyncStorage.setItem(storageKeys.savedEvents, JSON.stringify(next));
  };

  if (chosen) {
    const isSaved = saved.includes(chosen.id);
    return (
      <ScreenChrome>
        <Pressable style={styles.backButton} onPress={() => setChosen(null)}>
          <Text style={styles.back}>‹ BACK TO LIST</Text>
        </Pressable>
        <SectionTitle kicker="THIS WEEK" title={chosen.name} />
        <Image source={chosen.image} style={styles.hero} />
        <View style={styles.detail}>
          <View style={styles.row}>
            <Text style={styles.title}>{chosen.name}</Text>
          </View>
          <InfoLine marker="▪" gold text={chosen.date} />
          <InfoLine marker="▪" text={chosen.time} />
          <InfoLine marker="▪" text={chosen.location} />
          <Pressable style={[styles.saveButton, isSaved && styles.saveButtonActive]} onPress={() => toggleSaved(chosen.id)}>
            <Text style={styles.saveText}>{isSaved ? 'SAVED TO ITINERARY' : 'SAVE TO ITINERARY'}</Text>
          </Pressable>
          <View style={styles.rule} />
          <Text style={styles.short}>{chosen.short}</Text>
          <Text style={styles.copy}>{chosen.description}</Text>
        </View>
      </ScreenChrome>
    );
  }

  return (
    <ScreenChrome>
      <SectionTitle
        kicker="THIS WEEK"
        title="Events"
        right={
          saved.length > 0 ? (
            <View style={styles.counter}>
              <Text style={styles.counterText}>{saved.length}</Text>
            </View>
          ) : null
        }
      />
      {saved.length > 0 && (
        <FadeLift style={styles.savedPanel}>
          <Text style={styles.savedTitle}>My itinerary</Text>
          <Text style={styles.savedCopy}>
            {gathers.filter(event => saved.includes(event.id)).map(event => `${event.time} ${event.name}`).join(' · ')}
          </Text>
        </FadeLift>
      )}
      {gathers.map((event, index) => (
        <FadeLift key={event.id} delay={index * 35}>
          <Pressable style={styles.card} onPress={() => setChosen(event)}>
            <Image source={event.image} style={styles.image} />
            <View style={styles.cardBody}>
              <Text style={styles.title}>{event.name}</Text>
              <InfoLine marker="▪" gold text={event.date} />
              <InfoLine marker="▪" text={event.time} />
              <InfoLine marker="▪" text={event.location} />
              <View style={styles.ruleSmall} />
              <View style={styles.eventBottom}>
                <Text style={styles.short}>{event.short}</Text>
                {saved.includes(event.id) && <Text style={styles.savedMark}>SAVED</Text>}
              </View>
            </View>
          </Pressable>
        </FadeLift>
      ))}
    </ScreenChrome>
  );
}

const styles = StyleSheet.create({
  card: {
    borderColor: palette.line,
    borderWidth: 1,
    marginBottom: 14,
  },
  image: {
    height: 142,
    width: '100%',
  },
  cardBody: {
    backgroundColor: palette.panel,
    padding: 17,
  },
  hero: {
    height: 160,
    width: '100%',
  },
  detail: {
    paddingTop: 20,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: palette.text,
    flex: 1,
    fontSize: 16,
    fontWeight: '900',
  },
  back: {
    color: palette.gold,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 3,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    paddingVertical: 8,
  },
  rule: {
    backgroundColor: palette.line,
    height: 1,
    marginVertical: 20,
  },
  ruleSmall: {
    backgroundColor: palette.line,
    height: 1,
    marginVertical: 14,
  },
  short: {
    color: palette.gold,
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  eventBottom: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  savedMark: {
    color: palette.gold,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
  },
  counter: {
    alignItems: 'center',
    borderColor: palette.gold,
    borderWidth: 1,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  counterText: {
    color: palette.gold,
    fontSize: 13,
    fontWeight: '900',
  },
  savedPanel: {
    borderColor: palette.gold,
    borderWidth: 1,
    marginBottom: 15,
    padding: 14,
  },
  savedTitle: {
    color: palette.text,
    fontSize: 13,
    fontWeight: '900',
  },
  savedCopy: {
    color: palette.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 7,
  },
  saveButton: {
    alignItems: 'center',
    borderColor: palette.line,
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    marginTop: 16,
  },
  saveButtonActive: {
    borderColor: palette.gold,
    backgroundColor: 'rgba(247, 195, 54, 0.06)',
  },
  saveText: {
    color: palette.gold,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 3,
  },
  copy: {
    color: palette.text,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    marginTop: 28,
  },
});
