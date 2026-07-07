import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {ScreenChrome} from '../velvetUi/ScreenChrome';
import {SectionTitle} from '../velvetUi/SectionTitle';
import {InfoLine} from '../velvetUi/InfoLine';
import {palette} from '../velvetCore/palette';
import {gathers} from '../velvetCore/resortLedger';
import type {GatherNote} from '../velvetCore/types';

export function CalendarGlow(): React.JSX.Element {
  const [chosen, setChosen] = useState<GatherNote | null>(null);

  if (chosen) {
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
          <View style={styles.rule} />
          <Text style={styles.short}>{chosen.short}</Text>
          <Text style={styles.copy}>{chosen.description}</Text>
        </View>
      </ScreenChrome>
    );
  }

  return (
    <ScreenChrome>
      <SectionTitle kicker="THIS WEEK" title="Events" />
      {gathers.map(event => (
        <Pressable key={event.id} style={styles.card} onPress={() => setChosen(event)}>
          <Image source={event.image} style={styles.image} />
          <View style={styles.cardBody}>
            <Text style={styles.title}>{event.name}</Text>
            <InfoLine marker="▪" gold text={event.date} />
            <InfoLine marker="▪" text={event.time} />
            <InfoLine marker="▪" text={event.location} />
            <View style={styles.ruleSmall} />
            <Text style={styles.short}>{event.short}</Text>
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
    fontSize: 12,
    lineHeight: 18,
  },
  copy: {
    color: palette.text,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    marginTop: 28,
  },
});
