import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { colors, spacing, borderRadius } from '../styles/theme';

const BackIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="white">
    <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </Svg>
);

const SendIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={colors.primary}>
    <Path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </Svg>
);

const initialMessages = [
  { id: 1, sender: 'other', name: '@mountain_carver', text: 'Canyon run this weekend?', time: '10:30 AM' },
  { id: 2, sender: 'me', text: 'Down. What time?', time: '10:32 AM' },
  { id: 3, sender: 'other', name: '@mountain_carver', text: '7am usual spot', time: '10:33 AM' },
  { id: 4, sender: 'me', text: 'Just put new pads on', time: '10:35 AM' },
  { id: 5, sender: 'other', name: '@mountain_carver', text: 'What pads?', time: '10:36 AM' },
  { id: 6, sender: 'me', text: 'Hawk HP+', time: '10:38 AM' },
  { id: 7, sender: 'other', name: '@mountain_carver', text: 'Solid. See you Sat', time: '10:40 AM' },
];

function MessageBubble({ message }) {
  const isMe = message.sender === 'me';
  return (
    <View style={[styles.messageRow, isMe && styles.messageRowMe]}>
      {!isMe && (
        <View style={styles.otherAvatar}>
          <Text style={styles.avatarText}>{message.name[1].toUpperCase()}</Text>
        </View>
      )}
      <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
        <Text style={styles.messageText}>{message.text}</Text>
        <Text style={[styles.messageTime, isMe && styles.messageTimeMe]}>{message.time}</Text>
      </View>
    </View>
  );
}

export default function ChatDetailScreen({ navigation, route }) {
  const conversation = route.params?.conversation || { id: 1, name: 'Mike T', type: 'dm' };
  const [messages, setMessages] = useState(initialMessages);
  const [messageText, setMessageText] = useState('');
  const scrollRef = useRef(null);

  const sendMessage = () => {
    if (!messageText.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: messageText.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };
    setMessages([...messages, newMsg]);
    setMessageText('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{conversation.name}</Text>
          {conversation.type === 'group' && <Text style={styles.memberCount}>{conversation.members} members</Text>}
        </View>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          ref={scrollRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
        >
          <View style={styles.dateHeader}>
            <Text style={styles.dateText}>Today</Text>
          </View>
          {messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input} placeholder="Message..." placeholderTextColor={colors.textTertiary}
            value={messageText} onChangeText={setMessageText} onSubmitEditing={sendMessage} returnKeyType="send" multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage} disabled={!messageText.trim()}>
            <SendIcon />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.cardBorder },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255, 255, 255, 0.1)', justifyContent: 'center', alignItems: 'center' },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  memberCount: { fontSize: 12, color: colors.textSecondary },
  placeholder: { width: 40 },
  keyboardView: { flex: 1 },
  messagesContainer: { flex: 1 },
  messagesContent: { padding: spacing.md },
  dateHeader: { alignItems: 'center', marginBottom: spacing.md },
  dateText: { fontSize: 12, color: colors.textSecondary, backgroundColor: colors.card, paddingHorizontal: spacing.md, paddingVertical: 4, borderRadius: borderRadius.sm },
  messageRow: { flexDirection: 'row', marginBottom: spacing.sm, alignItems: 'flex-end' },
  messageRowMe: { justifyContent: 'flex-end' },
  otherAvatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(0, 122, 255, 0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 6 },
  avatarText: { fontSize: 11, fontWeight: '600', color: colors.primary },
  bubble: { maxWidth: '75%', padding: spacing.sm, borderRadius: borderRadius.lg },
  bubbleOther: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder, borderBottomLeftRadius: 4 },
  bubbleMe: { backgroundColor: colors.primary, borderBottomRightRadius: 4 },
  messageText: { fontSize: 14, color: colors.text, lineHeight: 18 },
  messageTime: { fontSize: 10, color: colors.textTertiary, marginTop: 4, alignSelf: 'flex-end' },
  messageTimeMe: { color: 'rgba(255, 255, 255, 0.7)' },
  inputContainer: { flexDirection: 'row', alignItems: 'flex-end', padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.cardBorder, backgroundColor: colors.background },
  input: { flex: 1, minHeight: 40, maxHeight: 100, backgroundColor: colors.card, borderRadius: borderRadius.lg, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, color: colors.text, fontSize: 14, borderWidth: 1, borderColor: colors.cardBorder },
  sendButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginLeft: spacing.sm },
});
