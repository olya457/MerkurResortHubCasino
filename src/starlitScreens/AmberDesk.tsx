import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation, type NavigationProp} from '@react-navigation/native';
import {ScreenChrome} from '../velvetUi/ScreenChrome';
import {SectionTitle} from '../velvetUi/SectionTitle';
import {palette} from '../velvetCore/palette';
import {resortArt} from '../velvetCore/assetLedger';
import {todayOffer} from '../velvetCore/resortLedger';
import type {MerkurTabParamList} from '../velvetCore/routeTypes';

export function AmberDesk(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<MerkurTabParamList>>();

  return (
    <ScreenChrome>
      <SectionTitle kicker="GOOD EVENING" title="MERKUR Resort" />
      <Pressable style={styles.reservation} onPress={() => navigation.navigate('TaxiRibbon')}>
        <View style={styles.row}>
          <Text style={styles.label}>YOUR RESERVATION</Text>
          <Text style={styles.active}>▪ ACTIVE</Text>
        </View>
        <View style={styles.columns}>
          <View style={styles.columnWide}>
            <Text style={styles.label}>BOOKING CODE</Text>
            <Text adjustsFontSizeToFit minimumFontScale={0.62} numberOfLines={1} style={styles.big}>
              MK-4821
            </Text>
          </View>
          <View style={styles.columnWide}>
            <Text style={styles.label}>STAY DATES</Text>
            <Text adjustsFontSizeToFit minimumFontScale={0.72} numberOfLines={1} style={styles.mid}>
              07 - 12 Jul
            </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>ROOM</Text>
            <Text style={styles.big}>512</Text>
          </View>
        </View>
        <Text style={styles.muted}>Deluxe Suite · Check-in 15:00 · Floor 5</Text>
      </Pressable>
      <Text style={styles.blockLabel}>TODAY'S OFFER</Text>
      <Pressable style={styles.offer} onPress={() => navigation.navigate('CulinaryLedger')}>
        <Image source={todayOffer.image} style={styles.offerImage} />
        <View style={styles.offerText}>
          <View style={styles.row}>
            <Text style={styles.offerTitle}>{todayOffer.title}</Text>
            <Text style={styles.badge}>TODAY</Text>
          </View>
          <Text style={styles.offerCopy}>{todayOffer.text}</Text>
        </View>
      </Pressable>
      <Text style={styles.blockLabel}>EXPLORE</Text>
      <View style={styles.grid}>
        <Pressable style={styles.tile} onPress={() => navigation.navigate('SalonMap')}>
          <Image source={resortArt.pool} style={styles.tileImage} />
          <Text style={styles.tileTitle}>Spa & Wellness</Text>
          <Text style={styles.tileCopy}>Relax and rejuvenate</Text>
        </Pressable>
        <Pressable style={styles.tile} onPress={() => navigation.navigate('CulinaryLedger')}>
          <Image source={resortArt.restaurant} style={styles.tileImage} />
          <Text style={styles.tileTitle}>Fine Dining</Text>
          <Text style={styles.tileCopy}>Seasonal resort cuisine</Text>
        </Pressable>
      </View>
    </ScreenChrome>
  );
}

const styles = StyleSheet.create({
  reservation: {
    borderColor: palette.line,
    borderWidth: 1,
    marginBottom: 22,
    padding: 20,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: palette.muted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 3,
  },
  active: {
    color: palette.gold,
    fontSize: 11,
    fontWeight: '900',
  },
  columns: {
    borderTopColor: 'rgba(39, 80, 127, 0.65)',
    borderTopWidth: 1,
    flexDirection: 'row',
    marginTop: 20,
    paddingTop: 20,
  },
  columnWide: {
    borderRightColor: palette.line,
    borderRightWidth: 1,
    flex: 1,
    marginRight: 16,
    paddingRight: 16,
  },
  column: {
    alignItems: 'flex-end',
    minWidth: 54,
  },
  big: {
    color: palette.text,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 0,
    marginTop: 12,
  },
  mid: {
    color: palette.text,
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0,
    marginTop: 14,
  },
  muted: {
    color: palette.muted,
    fontSize: 12,
    marginTop: 20,
  },
  blockLabel: {
    color: palette.muted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 4,
    marginBottom: 14,
    marginTop: 2,
  },
  offer: {
    borderColor: palette.line,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 22,
    padding: 16,
  },
  offerImage: {
    height: 70,
    width: 72,
  },
  offerText: {
    flex: 1,
    marginLeft: 16,
  },
  offerTitle: {
    color: palette.text,
    flex: 1,
    fontSize: 15,
    fontWeight: '900',
    paddingRight: 8,
  },
  badge: {
    backgroundColor: palette.gold,
    color: palette.ink,
    fontSize: 10,
    fontWeight: '900',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  offerCopy: {
    color: palette.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 10,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  tile: {
    borderColor: palette.line,
    borderWidth: 1,
    flex: 1,
    paddingBottom: 14,
  },
  tileImage: {
    height: 100,
    width: '100%',
  },
  tileTitle: {
    color: palette.text,
    fontSize: 15,
    fontWeight: '900',
    marginHorizontal: 12,
    marginTop: 12,
  },
  tileCopy: {
    color: palette.muted,
    fontSize: 12,
    marginHorizontal: 12,
    marginTop: 5,
  },
});
