import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {ScreenChrome} from '../velvetUi/ScreenChrome';
import {SectionTitle} from '../velvetUi/SectionTitle';
import {CompactKeyboardInput} from '../velvetUi/CompactKeyboardInput';
import {palette} from '../velvetCore/palette';

const faqs = [
  ['What time is check-out?', 'Check-out is at 12:00 noon.'],
  ['Is breakfast included in my stay?', 'Breakfast is included for Deluxe Suite guests.'],
  ['Can I reserve a window table?', 'Yes, concierge can arrange a preferred table when available.'],
];

type ChatMessage = {
  id: string;
  from: 'guest' | 'concierge';
  text: string;
};

const initialMessages: ChatMessage[] = [
  {id: 'hello', from: 'concierge', text: 'Guten Abend. How may I assist you this evening?'},
  {id: 'sample-guest', from: 'guest', text: "I'd like to arrange a restaurant reservation for two, tomorrow at 20:00."},
  {
    id: 'sample-concierge',
    from: 'concierge',
    text: 'Of course. I have reserved a table for two at 20:00. Shall I add any special requests, such as a window seat?',
  },
  {id: 'sample-guest-2', from: 'guest', text: 'A window table would be lovely, thank you.'},
];

function makeReply(question: string) {
  const text = question.toLowerCase();

  if (text.includes('breakfast')) {
    return 'Breakfast is included for Deluxe Suite guests. I can also reserve your preferred time.';
  }
  if (text.includes('check') || text.includes('checkout')) {
    return 'Check-out is at 12:00 noon. Late check-out can be requested at the front desk.';
  }
  if (text.includes('taxi') || text.includes('transfer')) {
    return 'I can arrange a taxi from the main entrance. Please share your destination and preferred time.';
  }
  if (text.includes('table') || text.includes('restaurant') || text.includes('dinner')) {
    return 'Yes, I can request a restaurant table for you. Please send the time and number of guests.';
  }

  return 'Thank you. I have received your request and will assist you shortly.';
}

export function ConciergeWire(): React.JSX.Element {
  const [open, setOpen] = useState(0);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState(initialMessages);

  const send = () => {
    const text = draft.trim();
    if (!text) {
      return;
    }

    setMessages(current => [
      ...current,
      {id: `guest-${Date.now()}`, from: 'guest', text},
      {id: `concierge-${Date.now()}`, from: 'concierge', text: makeReply(text)},
    ]);
    setDraft('');
  };

  return (
    <ScreenChrome>
      <SectionTitle kicker="SUPPORT" title="Concierge" />
      <View style={styles.chat}>
        {messages.map(message => {
          const guest = message.from === 'guest';
          return (
            <View key={message.id} style={guest ? styles.bubbleRight : styles.bubbleLeft}>
              <Text style={guest ? styles.bubbleDark : styles.bubbleText}>{message.text}</Text>
            </View>
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
