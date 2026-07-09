import React, {useState} from 'react';
import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation, type NavigationProp} from '@react-navigation/native';
import {ScreenChrome} from '../velvetUi/ScreenChrome';
import {SectionTitle} from '../velvetUi/SectionTitle';
import {palette} from '../velvetCore/palette';
import {resortArt} from '../velvetCore/assetLedger';
import {todayOffer} from '../velvetCore/resortLedger';
import type {MerkurTabParamList} from '../velvetCore/routeTypes';

const stayDates = [
  '18 - 21 Jul',
  '22 - 25 Jul',
  '26 - 29 Jul',
  '30 Jul - 02 Aug',
  '03 - 06 Aug',
  '07 - 10 Aug',
];
const stayRooms = ['204', '318', '512', '724', '806', '912'];

export function AmberDesk(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<MerkurTabParamList>>();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [isStayPickerOpen, setStayPickerOpen] = useState(false);

  return (
    <ScreenChrome>
      <SectionTitle kicker="GOOD EVENING" title="Hello, guest" />
      <View style={styles.reservation}>
        <View style={styles.row}>
          <Text style={styles.label}>OFFLINE STAY WALLET</Text>
          <Pressable
            hitSlop={8}
            onPress={() => setStayPickerOpen(true)}
            style={styles.readyButton}>
            <Text style={styles.active}>READY</Text>
          </Pressable>
        </View>
        <View style={styles.columns}>
          <View style={styles.columnWide}>
            <Text style={styles.label}>STAY DATES</Text>
            <Text
              adjustsFontSizeToFit
              minimumFontScale={0.72}
              numberOfLines={1}
              style={[styles.mid, !selectedDate && styles.placeholder]}>
              {selectedDate || 'Choose date'}
            </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>ROOM</Text>
            <Text style={[styles.big, !selectedRoom && styles.placeholder]}>
              {selectedRoom || 'Choose'}
            </Text>
          </View>
        </View>
        <Text style={styles.muted}>
          Select stay details when you are ready.
        </Text>
      </View>
      <Modal transparent animationType="fade" visible={isStayPickerOpen}>
        <View style={styles.modalShade}>
          <Pressable
            accessibilityLabel="Close stay picker"
            style={styles.modalBackdrop}
            onPress={() => setStayPickerOpen(false)}
          />
          <View style={styles.modalCard}>
            <View style={styles.row}>
              <Text style={styles.modalTitle}>Choose stay</Text>
              <Pressable hitSlop={8} onPress={() => setStayPickerOpen(false)}>
                <Text style={styles.close}>Close</Text>
              </Pressable>
            </View>
            <Text style={styles.modalLabel}>DATE</Text>
            <View style={styles.optionGrid}>
              {stayDates.map(date => (
                <Pressable
                  key={date}
                  onPress={() => setSelectedDate(date)}
                  style={[
                    styles.option,
                    selectedDate === date && styles.optionSelected,
                  ]}>
                  <Text
                    style={[
                      styles.optionText,
                      selectedDate === date && styles.optionTextSelected,
                    ]}>
                    {date}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Text style={styles.modalLabel}>ROOM</Text>
            <View style={styles.optionGrid}>
              {stayRooms.map(room => (
                <Pressable
                  key={room}
                  onPress={() => setSelectedRoom(room)}
                  style={[
                    styles.option,
                    selectedRoom === room && styles.optionSelected,
                  ]}>
                  <Text
                    style={[
                      styles.optionText,
                      selectedRoom === room && styles.optionTextSelected,
                    ]}>
                    {room}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Pressable
              style={styles.doneButton}
              onPress={() => setStayPickerOpen(false)}>
              <Text style={styles.doneText}>DONE</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text style={styles.blockLabel}>TODAY'S OFFER</Text>
      <Pressable
        style={styles.offer}
        onPress={() => navigation.navigate('CalendarGlow')}>
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
        <Pressable
          style={styles.tile}
          onPress={() => navigation.navigate('SalonMap')}>
          <Image source={resortArt.pool} style={styles.tileImage} />
          <Text style={styles.tileTitle}>Spa & Wellness</Text>
          <Text style={styles.tileCopy}>Relax and rejuvenate</Text>
        </Pressable>
        <Pressable
          style={styles.tile}
          onPress={() => navigation.navigate('CulinaryLedger')}>
          <Image source={resortArt.restaurant} style={styles.tileImage} />
          <Text style={styles.tileTitle}>Fine Dining</Text>
          <Text style={styles.tileCopy}>Save dining requests</Text>
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
    color: palette.ink,
    fontSize: 11,
    fontWeight: '900',
  },
  readyButton: {
    backgroundColor: palette.gold,
    paddingHorizontal: 14,
    paddingVertical: 8,
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
    minWidth: 92,
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
  placeholder: {
    color: '#6F8DAA',
  },
  muted: {
    color: palette.muted,
    fontSize: 12,
    marginTop: 20,
  },
  modalShade: {
    alignItems: 'center',
    backgroundColor: 'rgba(2, 8, 15, 0.72)',
    flex: 1,
    justifyContent: 'center',
    padding: 22,
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalCard: {
    backgroundColor: palette.deep,
    borderColor: palette.line,
    borderWidth: 1,
    maxWidth: 420,
    padding: 20,
    width: '100%',
  },
  modalTitle: {
    color: palette.text,
    fontSize: 20,
    fontWeight: '900',
  },
  close: {
    color: palette.gold,
    fontSize: 12,
    fontWeight: '900',
  },
  modalLabel: {
    color: palette.muted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 3,
    marginTop: 22,
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 14,
  },
  option: {
    borderColor: palette.line,
    borderWidth: 1,
    minWidth: 116,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  optionSelected: {
    backgroundColor: palette.gold,
    borderColor: palette.gold,
  },
  optionText: {
    color: palette.text,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
  },
  optionTextSelected: {
    color: palette.ink,
  },
  doneButton: {
    alignItems: 'center',
    backgroundColor: palette.gold,
    marginTop: 24,
    paddingVertical: 14,
  },
  doneText: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: '900',
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
