import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenChrome} from '../velvetUi/ScreenChrome';
import {SectionTitle} from '../velvetUi/SectionTitle';
import {CompactKeyboardInput} from '../velvetUi/CompactKeyboardInput';
import {FadeLift} from '../velvetUi/FadeLift';
import {palette} from '../velvetCore/palette';
import {storageKeys} from '../velvetCore/storageKeys';

const faqs = [
  ['What time is check-out?', 'Check-out is at 12:00 noon.'],
  ['Is breakfast included in my stay?', 'Breakfast is included for Deluxe Suite guests.'],
  ['Can I note a window table?', 'Yes, add the request here and keep it ready for the dining desk.'],
];

type ChatMessage = {
  id: string;
  from: 'guest' | 'concierge';
  text: string;
};

const initialMessages: ChatMessage[] = [
  {id: 'hello', from: 'concierge', text: 'Guten Abend. I can keep your stay requests ready for reception handoff.'},
  {id: 'sample-guest', from: 'guest', text: 'Please note a window table request for two tomorrow at 20:00.'},
  {
    id: 'sample-concierge',
    from: 'concierge',
    text: 'Saved to your local stay notes. Please show this request to the reception or dining desk when convenient.',
  },
];

function makeReply(question: string) {
  const text = question.toLowerCase();

  if (text.includes('breakfast')) {
    return 'Breakfast is included for Deluxe Suite guests. Add your preferred time here and keep it ready offline.';
  }
  if (text.includes('check') || text.includes('checkout')) {
    return 'Check-out is at 12:00 noon. Late check-out can be requested at the front desk.';
  }
  if (text.includes('taxi') || text.includes('transfer')) {
    return 'I can store the transfer details locally. Please share your destination and preferred time.';
  }
  if (text.includes('table') || text.includes('restaurant') || text.includes('dinner')) {
    return 'I can keep a dining request in your stay notes. Please add the time and number of guests.';
  }

  return 'Saved to your local stay notes for reception handoff.';
}

export function ConciergeWire(): React.JSX.Element {
  const [open, setOpen] = useState(0);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(storageKeys.conciergeNotes).then(value => {
      if (value) {
        setMessages(JSON.parse(value));
        setSaved(true);
      }
    });
  }, []);

  const send = async () => {
    const text = draft.trim();
    if (!text) {
      return;
    }

    const nextMessages: ChatMessage[] = [
      ...messages,
      {id: `guest-${Date.now()}`, from: 'guest', text},
      {id: `concierge-${Date.now()}`, from: 'concierge', text: makeReply(text)},
    ];
    setMessages(nextMessages);
    await AsyncStorage.setItem(storageKeys.conciergeNotes, JSON.stringify(nextMessages));
    setSaved(true);
    setDraft('');
  };

  return (
    <ScreenChrome>
      <SectionTitle kicker="SUPPORT" title="Concierge" />
      {saved && (
        <FadeLift style={styles.notice}>
          <Text style={styles.noticeText}>Concierge notes are stored on this device for your stay.</Text>
        </FadeLift>
      )}
      <View style={styles.chat}>
        {messages.map((message, index) => {
          const guest = message.from === 'guest';
          return (
            <FadeLift key={message.id} delay={index * 35} distance={8} style={guest ? styles.bubbleRight : styles.bubbleLeft}>
              <Text style={guest ? styles.bubbleDark : styles.bubbleText}>{message.text}</Text>
            </FadeLift>
          );
        })}
        <View style={styles.messageRow}>
          <CompactKeyboardInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Type a message..."
          />
          <Pressable style={styles.sendButton} onPress={send}>
            <Text style={styles.send}>⌲</Text>
          </Pressable>
        </View>
      </View>
      <Text style={styles.label}>FREQUENTLY ASKED</Text>
      {faqs.map((faq, index) => (
        <Pressable key={faq[0]} style={styles.faq} onPress={() => setOpen(index)}>
          <View style={styles.faqTop}>
            <Text style={styles.question}>{faq[0]}</Text>
            <Text style={styles.arrow}>{open === index ? '⌃' : '⌄'}</Text>
          </View>
          {open === index && <Text style={styles.answer}>{faq[1]}</Text>}
        </Pressable>
      ))}
    </ScreenChrome>
  );
}

const styles = StyleSheet.create({
  chat: {
    borderColor: palette.line,
    borderWidth: 1,
    marginBottom: 25,
    paddingTop: 16,
  },
  notice: {
    borderColor: palette.gold,
    borderWidth: 1,
    marginBottom: 14,
    padding: 14,
  },
  noticeText: {
    color: palette.text,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
  },
  bubbleLeft: {
    alignSelf: 'flex-start',
    backgroundColor: palette.ink,
    borderColor: palette.line,
    borderWidth: 1,
    marginBottom: 12,
    marginLeft: 17,
    maxWidth: '74%',
    padding: 13,
  },
  bubbleRight: {
    alignSelf: 'flex-end',
    backgroundColor: palette.gold,
    marginBottom: 12,
    marginRight: 17,
    maxWidth: '74%',
    padding: 13,
  },
  bubbleText: {
    color: palette.text,
    fontSize: 14,
    lineHeight: 21,
  },
  bubbleDark: {
    color: palette.ink,
    fontSize: 14,
    lineHeight: 21,
  },
  messageRow: {
    borderTopColor: palette.line,
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  sendButton: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  send: {
    color: palette.gold,
    fontSize: 24,
    transform: [{rotate: '-18deg'}],
  },
  label: {
    color: palette.muted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 4,
    marginBottom: 14,
  },
  faq: {
    borderColor: palette.line,
    borderWidth: 1,
    marginBottom: 8,
    padding: 17,
  },
  faqTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  question: {
    color: palette.text,
    flex: 1,
    fontSize: 14,
    fontWeight: '900',
    paddingRight: 12,
  },
  arrow: {
    color: '#56789D',
    fontSize: 18,
  },
  answer: {
    color: palette.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 9,
  },
});
