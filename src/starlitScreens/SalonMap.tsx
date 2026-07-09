import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenChrome} from '../velvetUi/ScreenChrome';
import {SectionTitle} from '../velvetUi/SectionTitle';
import {InfoLine} from '../velvetUi/InfoLine';
import {FadeLift} from '../velvetUi/FadeLift';
import {palette} from '../velvetCore/palette';
import {venues} from '../velvetCore/resortLedger';
import {storageKeys} from '../velvetCore/storageKeys';
import type {VenueNote} from '../velvetCore/types';

export function SalonMap(): React.JSX.Element {
  const [chosen, setChosen] = useState<VenueNote | null>(null);
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(storageKeys.savedVenues).then(value => {
      if (value) {
        setSaved(JSON.parse(value));
      }
    });
  }, []);

  const toggleSaved = async (id: string) => {
    const next = saved.includes(id) ? saved.filter(item => item !== id) : [...saved, id];
    setSaved(next);
    await AsyncStorage.setItem(storageKeys.savedVenues, JSON.stringify(next));
  };

  if (chosen) {
    const isSaved = saved.includes(chosen.id);
    return (
      <ScreenChrome>
        <Pressable style={styles.backButton} onPress={() => setChosen(null)}>
          <Text style={styles.back}>‹ BACK TO LIST</Text>
        </Pressable>
        <SectionTitle kicker="EXPLORE" title={chosen.name} />
        <Image source={chosen.image} style={styles.hero} />
        <View style={styles.detail}>
          <View style={styles.backRow}>
            <Text style={styles.detailTitle}>{chosen.name}</Text>
          </View>
          <InfoLine marker="▪" text={chosen.hours} />
          <InfoLine marker="▪" text={chosen.phone} />
          <Pressable style={[styles.saveButton, isSaved && styles.saveButtonActive]} onPress={() => toggleSaved(chosen.id)}>
            <Text style={styles.saveText}>{isSaved ? 'SAVED TO STAY PLAN' : 'SAVE TO STAY PLAN'}</Text>
          </Pressable>
          <View style={styles.rule} />
          <Text style={styles.copy}>{chosen.description}</Text>
        </View>
      </ScreenChrome>
    );
  }

  return (
    <ScreenChrome>
      <SectionTitle
        kicker="EXPLORE"
        title="Venues"
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
          <Text style={styles.savedTitle}>Saved for this stay</Text>
          <Text style={styles.savedCopy}>
            {venues.filter(venue => saved.includes(venue.id)).map(venue => venue.name).join(' · ')}
          </Text>
        </FadeLift>
      )}
      {venues.map((venue, index) => (
        <FadeLift key={venue.id} delay={index * 35}>
          <Pressable style={styles.card} onPress={() => setChosen(venue)}>
            <Image source={venue.image} style={styles.image} />
            <View style={styles.cardBody}>
              <View style={styles.backRow}>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>{venue.name}</Text>
                  <Text style={styles.sub}>{venue.hours}</Text>
                  <Text style={styles.sub}>{venue.phone}</Text>
                </View>
                <Text style={styles.chevron}>{saved.includes(venue.id) ? '★' : '›'}</Text>
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
    marginBottom: 13,
  },
  image: {
    height: 142,
    width: '100%',
  },
  cardBody: {
    backgroundColor: palette.panel,
    paddingHorizontal: 17,
    paddingVertical: 16,
  },
  backRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText: {
    flex: 1,
    paddingRight: 16,
  },
  cardTitle: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0,
  },
  sub: {
    color: palette.muted,
    fontSize: 13,
    marginTop: 7,
  },
  chevron: {
    color: palette.gold,
    fontSize: 30,
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
  hero: {
    height: 174,
    width: '100%',
  },
  detail: {
    backgroundColor: palette.deep,
    paddingTop: 20,
  },
  detailTitle: {
    color: palette.text,
    flex: 1,
    fontSize: 18,
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
  copy: {
    color: palette.text,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
});
