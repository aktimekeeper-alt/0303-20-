import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import { spacing, borderRadius } from '../styles/theme';

const BackIcon = () => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill="white">
    <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </Svg>
);

const SendIcon = ({ color }) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} fill={color}>
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

function MessageBubble({ message, colors }) {
  const isMe = message.sender === 'me';
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.messageRow, isMe && styles.messageRowMe, { opacity: fadeAnim }]}>
      {!isMe && (
        <View style={[styles.otherAvatar, { backgroundColor: `${colors.primary}33` }]}>
          <Text style={[styles.avatarText, { color: colors.primary }]}>{message.name[1].toUpperCase()}</Text>
        </View>
      )}
      <View style={[styles.bubble, isMe ? [styles.bubbleMe, { backgroundColor: colors.primary }] : [styles.bubbleOther, { backgroundColor: colors.card, borderColor: colors.cardBorder }]]}>
        <Text style={[styles.messageText, { color: colors.text }]}>{message.text}</Text>
        <Text style={[styles.messageTime, isMe ? styles.messageTimeMe : { color: colors.textTertiary }]}>{message.time}</Text>
      </View>
    </Animated.View>
  );
}

export default function ChatDetailScreen({ navigation, route }) {
  const { colors } = useTheme();
  const conversation = route.params?.conversation || { id: 1, name: 'Mike T', type: 'dm' };
  const [messages, setMessages] = useState(initialMessages);
  const [messageText, setMessageText] = useState('');
  const scrollRef = useRef(null);
  const sendScale = useRef(new Animated.Value(1)).current;

  const animateSend = () => {
    Animated.sequence([
      Animated.timing(sendScale, { toValue: 0.8, duration: 100, useNativeDriver: true }),
      Animated.spring(sendScale, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();
  };

  const sendMessage = () => {
    if (!messageText.trim()) return;
    animateSend();
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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={[styles.header, { borderBottomColor: colors.cardBorder }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>{conversation.name}</Text>
          {conversation.type === 'group' && <Text style={[styles.memberCount, { color: colors.textSecondary }]}>{conversation.members} members</Text>}
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
            <Text style={[styles.dateText, { backgroundColor: colors.card, color: colors.textSecondary }]}>Today</Text>
          </View>
          {messages.map((msg) => <MessageBubble key={msg.id} message={msg} colors={colors} />)}
        </ScrollView>

        <View style={[styles.inputContainer, { borderTopColor: colors.cardBorder, backgroundColor: colors.background }]}>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, borderColor: colors.cardBorder, color: colors.text }]}
            placeholder="Message..." placeholderTextColor={colors.textTertiary}
            value={messageText} onChangeText={setMessageText} onSubmitEditing={sendMessage} returnKeyType="send" multiline
          />
          <Animated.View style={{ transform: [{ scale: sendScale }] }}>
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage} disabled={!messageText.trim()}>
              <SendIcon color={messageText.trim() ? colors.primary : colors.textTertiary} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, paddingVertical: spacing.md, borderBottomWidth: 1 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255, 255, 255, 0.1)', justifyContent: 'center', alignItems: 'center' },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '700' },
  memberCount: { fontSize: 12 },
  placeholder: { width: 40 },
  keyboardView: { flex: 1 },
  messagesContainer: { flex: 1 },
  messagesContent: { padding: spacing.md },
  dateHeader: { alignItems: 'center', marginBottom: spacing.md },
  dateText: { fontSize: 12, paddingHorizontal: spacing.md, paddingVertical: 4, borderRadius: borderRadius.sm },
  messageRow: { flexDirection: 'row', marginBottom: spacing.sm, alignItems: 'flex-end' },
  messageRowMe: { justifyContent: 'flex-end' },
  otherAvatar: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 6 },
  avatarText: { fontSize: 11, fontWeight: '600' },
  bubble: { maxWidth: '75%', padding: spacing.sm, borderRadius: borderRadius.lg },
  bubbleOther: { borderWidth: 1, borderBottomLeftRadius: 4 },
  bubbleMe: { borderBottomRightRadius: 4 },
  messageText: { fontSize: 14, lineHeight: 18 },
  messageTime: { fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },
  messageTimeMe: { color: 'rgba(255, 255, 255, 0.7)' },
  inputContainer: { flexDirection: 'row', alignItems: 'flex-end', padding: spacing.md, borderTopWidth: 1 },
  input: { flex: 1, minHeight: 40, maxHeight: 100, borderRadius: borderRadius.lg, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, fontSize: 14, borderWidth: 1 },
  sendButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginLeft: spacing.sm },
});
