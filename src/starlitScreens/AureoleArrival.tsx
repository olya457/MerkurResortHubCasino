import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {arrivalArt, resortArt} from '../velvetCore/assetLedger';
import {palette} from '../velvetCore/palette';

export function AureoleArrival(): React.JSX.Element {
  const {height, width} = useWindowDimensions();
  const logoSize = Math.min(width * 0.56, height * 0.28, 240);
  const copyGlow = useRef(new Animated.Value(0)).current;
  const sigilGlow = useRef(new Animated.Value(0)).current;
  const floatLoop = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(copyGlow, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(sigilGlow, {
        toValue: 1,
        duration: 1200,
        delay: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatLoop, {
          toValue: 1,
          duration: 1600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatLoop, {
          toValue: 0,
          duration: 1600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [copyGlow, floatLoop, sigilGlow]);

  const sigilLift = floatLoop.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });

  return (
    <ImageBackground
      source={resortArt.facade}
      resizeMode="cover"
      style={styles.full}>
      <View style={styles.dim} />
      <Animated.View
        style={[
          styles.copy,
          {
            opacity: copyGlow,
            transform: [
              {
                translateY: copyGlow.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-18, 0],
                }),
              },
            ],
          },
        ]}>
        <Text style={styles.title}>
          Grand Guest{'\n'}Hub
        </Text>
        <Text style={styles.subtitle}>Every Guest Service in One Place</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.sigilWrap,
          {
            opacity: sigilGlow,
            transform: [{translateY: sigilLift}, {scale: sigilGlow}],
          },
        ]}>
        <Animated.Image
          source={arrivalArt.sigil}
          style={[
            styles.sigil,
            {
              width: logoSize,
              height: logoSize,
            },
          ]}
        />
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
    justifyContent: 'space-between',
  },
  dim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(4, 14, 26, 0.42)',
  },
  copy: {
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 92,
  },
  title: {
    color: palette.text,
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 36,
    textAlign: 'center',
  },
  subtitle: {
    color: palette.text,
    fontSize: 16,
    marginTop: 12,
    opacity: 0.94,
  },
  sigilWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
    shadowColor: '#F9C73D',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 24,
  },
  sigil: {
    resizeMode: 'contain',
  },
});
