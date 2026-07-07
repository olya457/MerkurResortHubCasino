import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {ScreenChrome} from '../velvetUi/ScreenChrome';
import {SectionTitle} from '../velvetUi/SectionTitle';
import {InfoLine} from '../velvetUi/InfoLine';
import {palette} from '../velvetCore/palette';
import {venues} from '../velvetCore/resortLedger';
import type {VenueNote} from '../velvetCore/types';

export function SalonMap(): React.JSX.Element {
  const [chosen, setChosen] = useState<VenueNote | null>(null);

  if (chosen) {
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
          <View style={styles.rule} />
          <Text style={styles.copy}>{chosen.description}</Text>
        </View>
      </ScreenChrome>
    );
  }

  return (
    <ScreenChrome>
      <SectionTitle kicker="EXPLORE" title="Venues" />
      {venues.map(venue => (
        <Pressable key={venue.id} style={styles.card} onPress={() => setChosen(venue)}>
          <Image source={venue.image} style={styles.image} />
          <View style={styles.cardBody}>
            <View style={styles.backRow}>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{venue.name}</Text>
                <Text style={styles.sub}>{venue.hours}</Text>
                <Text style={styles.sub}>{venue.phone}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </View>
          </View>
        </Pressable>
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
