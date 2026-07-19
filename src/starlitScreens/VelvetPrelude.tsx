import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  FlatList,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {preludeArt} from '../velvetCore/assetLedger';
import {palette} from '../velvetCore/palette';
import {storageKeys} from '../velvetCore/storageKeys';

type Props = {
  onDone: () => void;
};

const slides = [
  {
    kicker: 'WELCOME',
    title: 'Experience Stay Companion',
    text: "Unparalleled comfort throughout your stay.",
  },
  {
    kicker: 'YOUR STAY',
    title: 'The Perfect Room Awaits',
    text: 'Discover exclusive suites and rooms designed for the discerning traveller.',
  },
  {
    kicker: 'CULINARY',
    title: 'Dine in True Excellence',
    text: 'From haute cuisine to casual dining, every meal is an unforgettable experience.',
  },
  {
    kicker: 'BEGIN',
    title: 'Your Journey Starts Here',
    text: 'Your personal concierge is ready to make every moment truly exceptional.',
  },
];

export function VelvetPrelude({onDone}: Props): React.JSX.Element {
  const {width} = useWindowDimensions();
  const list = useRef<FlatList<(typeof slides)[number]>>(null);
  const [index, setIndex] = useState(0);
  const contentPulse = useRef(new Animated.Value(0)).current;
  const controlsPulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    contentPulse.setValue(0);
    Animated.parallel([
      Animated.timing(contentPulse, {
        toValue: 1,
        duration: 720,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(controlsPulse, {
        toValue: 1,
        duration: 860,
        delay: 120,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [contentPulse, controlsPulse, index]);

  const complete = async () => {
    await AsyncStorage.setItem(storageKeys.preludeDone, 'yes');
    onDone();
  };

  const next = () => {
    if (index === slides.length - 1) {
      complete();
      return;
    }
    list.current?.scrollToIndex({index: index + 1});
  };

  const onMomentumEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(event.nativeEvent.contentOffset.x / width));
  };

  return (
    <View style={styles.base}>
      <FlatList
        ref={list}
        horizontal
        pagingEnabled
        data={slides}
        keyExtractor={item => item.kicker}
        onMomentumScrollEnd={onMomentumEnd}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index: slideIndex}) => (
          <ImageBackground source={preludeArt[slideIndex]} resizeMode="cover" style={[styles.slide, {width}]}>
            <View style={styles.scrim} />
            <Animated.View
              style={[
                styles.textStack,
                {
                  opacity: contentPulse,
                  transform: [
                    {
                      translateY: contentPulse.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-22, 0],
                      }),
                    },
                  ],
                },
              ]}>
              <Text style={styles.kicker}>― {item.kicker}</Text>
              <Text adjustsFontSizeToFit numberOfLines={3} style={styles.title}>
                {item.title}
              </Text>
              <Text style={styles.text}>{item.text}</Text>
            </Animated.View>
          </ImageBackground>
        )}
      />
      <Animated.View
        style={[
          styles.controls,
          {
            opacity: controlsPulse,
            transform: [
              {
                translateY: controlsPulse.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}>
        <View style={styles.progress}>
          {slides.map((slide, dotIndex) => (
            <View key={slide.kicker} style={[styles.line, dotIndex === index && styles.lineActive]} />
          ))}
        </View>
        <Pressable style={styles.button} onPress={next}>
          <Text style={styles.buttonText}>{index === slides.length - 1 ? 'GET STARTED' : 'CONTINUE'}</Text>
        </Pressable>
        <Pressable onPress={complete} hitSlop={12}>
          <Text style={styles.skip}>SKIP</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: palette.ink,
    flex: 1,
  },
  slide: {
    flex: 1,
    paddingHorizontal: 34,
    paddingTop: 92,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  textStack: {
    maxWidth: 350,
  },
  kicker: {
    color: palette.gold,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 5,
    marginBottom: 38,
  },
  title: {
    color: palette.text,
    fontSize: 40,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 45,
  },
  text: {
    color: palette.text,
    fontSize: 16,
    lineHeight: 26,
    marginTop: 18,
    maxWidth: 330,
  },
  controls: {
    bottom: 42,
    left: 33,
    position: 'absolute',
    right: 33,
  },
  progress: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  line: {
    backgroundColor: '#245480',
    height: 2,
    marginRight: 10,
    width: 18,
  },
  lineActive: {
    backgroundColor: palette.gold,
    width: 31,
  },
  button: {
    alignItems: 'center',
    backgroundColor: palette.gold,
    height: 54,
    justifyContent: 'center',
  },
  buttonText: {
    color: palette.ink,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 4,
  },
  skip: {
    color: '#47709B',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: 16,
    textAlign: 'center',
  },
});
