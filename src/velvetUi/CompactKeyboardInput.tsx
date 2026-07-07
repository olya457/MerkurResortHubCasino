import React, {useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {palette} from '../velvetCore/palette';

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
};

const rows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

export function CompactKeyboardInput({value, onChangeText, placeholder, multiline}: Props): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const append = (char: string) => onChangeText(`${value}${char}`);
  const backspace = () => onChangeText(value.slice(0, -1));

  return (
    <View style={styles.wrap}>
      <Pressable
        onPress={() => {
          setOpen(true);
          inputRef.current?.focus();
        }}>
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          placeholderTextColor="#55779E"
          showSoftInputOnFocus={false}
          multiline={multiline}
          style={[styles.input, multiline && styles.multiline]}
        />
      </Pressable>
      {open && (
        <View style={styles.keyboard}>
          {rows.map((row, rowIndex) => (
            <View key={row} style={[styles.row, rowIndex === 1 && styles.rowInset, rowIndex === 2 && styles.rowInsetMore]}>
              {row.split('').map(char => (
                <Pressable key={char} style={styles.key} onPress={() => append(char.toLowerCase())}>
                  <Text style={styles.keyText}>{char}</Text>
                </Pressable>
              ))}
            </View>
          ))}
          <View style={styles.row}>
            <Pressable style={[styles.key, styles.action]} onPress={() => append(' ')}>
              <Text style={styles.keyText}>SPACE</Text>
            </Pressable>
            <Pressable style={[styles.key, styles.actionSmall]} onPress={backspace}>
              <Text style={styles.keyText}>DEL</Text>
            </Pressable>
            <Pressable style={[styles.key, styles.actionSmall]} onPress={() => setOpen(false)}>
              <Text style={styles.keyText}>OK</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 22,
  },
  input: {
    borderColor: palette.line,
    borderWidth: 1,
    color: palette.text,
    fontSize: 15,
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  multiline: {
    minHeight: 74,
    textAlignVertical: 'top',
  },
  keyboard: {
    backgroundColor: '#081827',
    borderColor: palette.line,
    borderTopWidth: 0,
    borderWidth: 1,
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    marginBottom: 6,
  },
  rowInset: {
    paddingHorizontal: 12,
  },
  rowInsetMore: {
    paddingHorizontal: 28,
  },
  key: {
    alignItems: 'center',
    borderColor: 'rgba(247, 195, 54, 0.32)',
    borderWidth: 1,
    flex: 1,
    height: 30,
    justifyContent: 'center',
    minWidth: 24,
  },
  action: {
    flex: 3,
  },
  actionSmall: {
    flex: 1.1,
  },
  keyText: {
    color: palette.gold,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0,
  },
});
