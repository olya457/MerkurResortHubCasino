import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {palette} from '../velvetCore/palette';

type Props = {
  marker?: string;
  text: string;
  gold?: boolean;
};

export function InfoLine({marker = '▪', text, gold = false}: Props): React.JSX.Element {
  return (
    <View style={styles.row}>
      <Text style={[styles.marker, gold && styles.gold]}>{marker}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  marker: {
    color: palette.line,
    fontSize: 12,
    marginRight: 9,
  },
  gold: {
    color: palette.gold,
  },
  text: {
    color: palette.muted,
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
});
