import React, {useEffect, useMemo, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenChrome} from '../velvetUi/ScreenChrome';
import {SectionTitle} from '../velvetUi/SectionTitle';
import {palette} from '../velvetCore/palette';
import {plates} from '../velvetCore/resortLedger';
import {storageKeys} from '../velvetCore/storageKeys';

export function CulinaryLedger(): React.JSX.Element {
  const [basket, setBasket] = useState<string[]>([]);
  const selected = useMemo(() => plates.filter(plate => basket.includes(plate.id)), [basket]);
  const total = selected.reduce((sum, plate) => sum + plate.price, 0);

  useEffect(() => {
    AsyncStorage.getItem(storageKeys.plateBasket).then(value => {
      if (value) {
        setBasket(JSON.parse(value));
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(storageKeys.plateBasket, JSON.stringify(basket));
  }, [basket]);

  const toggle = (id: string) => {
    setBasket(current => (current.includes(id) ? current.filter(item => item !== id) : [...current, id]));
  };

  const order = () => {
    if (basket.length > 0) {
      setBasket([]);
    }
  };

  return (
    <ScreenChrome>
      <SectionTitle
        kicker="CULINARY"
        title="Restaurant"
        right={
          basket.length > 0 ? (
            <View style={styles.cart}>
              <Text style={styles.cartCount}>{basket.length}</Text>
              <Text style={styles.cartIcon}>🛒</Text>
            </View>
          ) : null
        }
      />
      {plates.map(plate => {
        const picked = basket.includes(plate.id);
        return (
          <Pressable key={plate.id} style={[styles.plate, picked && styles.platePicked]} onPress={() => toggle(plate.id)}>
            <Image source={plate.image} style={styles.plateImage} />
            <View style={styles.plateText}>
              <Text numberOfLines={2} adjustsFontSizeToFit style={styles.plateTitle}>
                {plate.name}
              </Text>
              <Text style={styles.meta}>{plate.minutes} min preparation</Text>
              <Text numberOfLines={2} style={styles.ingredients}>
                {plate.ingredients}
              </Text>
            </View>
            <Text style={styles.price}>€ {plate.price}</Text>
          </Pressable>
        );
      })}
      {basket.length > 0 && (
        <View style={styles.summary}>
          {selected.map(plate => (
            <View key={plate.id} style={styles.summaryRow}>
              <Text style={styles.summaryName}>{plate.name}</Text>
              <Text style={styles.summaryPrice}>€ {plate.price}</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.total}>€ {total}</Text>
          </View>
          <Pressable style={styles.button} onPress={order}>
            <Text style={styles.buttonText}>ORDER</Text>
          </Pressable>
          <Pressable onPress={() => setBasket([])} hitSlop={12}>
            <Text style={styles.cancel}>CANCEL</Text>
          </Pressable>
        </View>
      )}
    </ScreenChrome>
  );
}

const styles = StyleSheet.create({
  cart: {
    alignItems: 'center',
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  cartCount: {
    backgroundColor: palette.text,
    borderRadius: 9,
    color: palette.ink,
    fontSize: 10,
    fontWeight: '900',
    minWidth: 18,
    overflow: 'hidden',
    position: 'absolute',
    right: 1,
    textAlign: 'center',
    top: -1,
  },
  cartIcon: {
    color: palette.gold,
    fontSize: 28,
  },
  plate: {
    alignItems: 'center',
    borderColor: palette.line,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 13,
    minHeight: 106,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  platePicked: {
    borderColor: palette.gold,
    backgroundColor: 'rgba(247, 195, 54, 0.06)',
  },
  plateImage: {
    height: 72,
    width: 72,
  },
  plateText: {
    flex: 1,
    marginHorizontal: 15,
  },
  plateTitle: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0,
  },
  meta: {
    color: palette.muted,
    fontSize: 12,
    marginTop: 7,
  },
  ingredients: {
    color: palette.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  price: {
    color: palette.gold,
    fontSize: 16,
    fontWeight: '900',
    minWidth: 46,
    textAlign: 'right',
  },
  summary: {
    borderColor: palette.line,
    borderWidth: 1,
    marginTop: 8,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryName: {
    color: palette.text,
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    paddingRight: 12,
  },
  summaryPrice: {
    color: palette.gold,
    fontSize: 14,
    fontWeight: '900',
  },
  totalRow: {
    borderTopColor: palette.line,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingTop: 15,
  },
  total: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '900',
  },
  button: {
    alignItems: 'center',
    backgroundColor: palette.gold,
    height: 52,
    justifyContent: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: palette.ink,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 4,
  },
  cancel: {
    color: '#56789D',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 3,
    marginTop: 16,
    textAlign: 'center',
  },
});
