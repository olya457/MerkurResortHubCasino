import React from 'react';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {androidOuterGap, floatingPanelGap} from '../velvetCore/deviceGaps';
import {palette} from '../velvetCore/palette';

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
};

export function ScreenChrome({children, scroll = true}: Props): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const top = (Platform.OS === 'android' ? Math.max(insets.top, androidOuterGap) : insets.top) + 10;
  const bottom = floatingPanelGap + 88 + insets.bottom;

  if (!scroll) {
    return (
      <View style={[styles.base, {paddingTop: top, paddingBottom: bottom}]}>
        {children}
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.base}
      contentContainerStyle={[styles.content, {paddingTop: top, paddingBottom: bottom}]}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: palette.deep,
  },
  content: {
    paddingHorizontal: 25,
  },
});
