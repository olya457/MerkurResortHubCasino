import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {TabActions} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {floatingPanelGap} from '../velvetCore/deviceGaps';
import {palette} from '../velvetCore/palette';

const tabMeta: Record<string, {label: string; icon: string}> = {
  AmberDesk: {label: 'Stay', icon: '⌂'},
  SalonMap: {label: 'Venues', icon: '⌖'},
  CulinaryLedger: {label: 'Dining', icon: '♨'},
  CalendarGlow: {label: 'Events', icon: '▣'},
  TaxiRibbon: {label: 'Taxi', icon: '⌁'},
  ConciergeWire: {label: 'Help', icon: '☊'},
};

export function FloatingResortBar({state, descriptors, navigation}: BottomTabBarProps): React.JSX.Element {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, {bottom: insets.bottom + floatingPanelGap}]}>
      {state.routes.map((route, index) => {
        const active = state.index === index;
        const meta = tabMeta[route.name];
        const options = descriptors[route.key].options;

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={active ? {selected: true} : {}}
            key={route.key}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!active && !event.defaultPrevented) {
                navigation.dispatch({
                  ...TabActions.jumpTo(route.name, route.params),
                  target: state.key,
                });
              }
            }}
            onLongPress={() => navigation.emit({type: 'tabLongPress', target: route.key})}
            hitSlop={8}
            style={styles.item}>
            <View style={[styles.iconCup, active && styles.iconCupActive]}>
              <Text style={[styles.icon, active && styles.iconActive]}>{meta.icon}</Text>
            </View>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={[styles.label, active && styles.labelActive]}>
              {options.tabBarLabel?.toString() ?? meta.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#081827',
    borderColor: 'rgba(58, 105, 151, 0.72)',
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: 'row',
    height: 68,
    justifyContent: 'space-around',
    left: 14,
    paddingHorizontal: 8,
    position: 'absolute',
    right: 14,
    zIndex: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 14},
    shadowOpacity: 0.26,
    shadowRadius: 20,
    elevation: 50,
  },
  item: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    minWidth: 0,
  },
  iconCup: {
    alignItems: 'center',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 38,
  },
  iconCupActive: {
    backgroundColor: 'rgba(247, 195, 54, 0.18)',
    borderColor: palette.gold,
    borderWidth: 1,
  },
  icon: {
    color: '#56789D',
    fontSize: 22,
    fontWeight: '900',
  },
  iconActive: {
    color: palette.gold,
  },
  label: {
    color: '#56789D',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0,
    marginTop: 2,
    maxWidth: 58,
  },
  labelActive: {
    color: palette.gold,
  },
});
