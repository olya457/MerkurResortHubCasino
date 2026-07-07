import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {palette} from '../velvetCore/palette';

type Props = {
  kicker: string;
  title: string;
  right?: React.ReactNode;
};

export function SectionTitle({kicker, title, right}: Props): React.JSX.Element {
  return (
    <View style={styles.wrap}>
      <View style={styles.textBlock}>
        <Text style={styles.kicker}>{kicker}</Text>
        <Text adjustsFontSizeToFit numberOfLines={2} style={styles.title}>
          {title}
        </Text>
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  textBlock: {
    flex: 1,
    paddingRight: 14,
  },
  kicker: {
    color: palette.gold,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 4,
    marginBottom: 14,
  },
  title: {
    color: palette.text,
    fontSize: 31,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 36,
  },
});
