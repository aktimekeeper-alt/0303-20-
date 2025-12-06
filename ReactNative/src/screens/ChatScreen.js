import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { conversations } from '../data/appData';
import { colors, spacing, borderRadius } from '../styles/theme';

const EditIcon = () => (
  <Svg viewBox="0 0 24 24" width={20} height={20} fill="white">
    <Path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </Svg>
);

const GroupIcon = () => (
  <Svg viewBox="0 0 24 24" width={28} height={28} fill={colors.primary}>
    <Path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </Svg>
);

const PersonIcon = () => (
  <Svg viewBox="0 0 24 24" width={28} height={28} fill={colors.primary}>
    <Path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </Svg>
);

function ConversationItem({ conversation, onPress }) {
  return (
    <TouchableOpacity style={styles.conversationItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          {conversation.type === 'group' ? <GroupIcon /> : <PersonIcon />}
        </View>
        {conversation.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{conversation.unread}</Text>
          </View>
        )}
      </View>

      <View style={styles.conversationContent}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{conversation.name}</Text>
          {conversation.type === 'group' && (
            <Text style={styles.members}>({conversation.members})</Text>
          )}
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {conversation.lastMessage}
        </Text>
      </View>

      <View style={styles.metaContainer}>
        <Text style={styles.time}>{conversation.time}</Text>
        {conversation.type === 'group' && (
          <View style={styles.groupTag}>
            <Text style={styles.groupTagText}>GROUP</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function ChatScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Messages"
        rightIcon={<EditIcon />}
        onRightPress={() => {}}
      />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search conversations..."
        />

        <Text style={styles.sectionTitle}>Conversations</Text>

        <View style={styles.listContainer}>
          {conversations.map((conv) => (
            <ConversationItem
              key={conv.id}
              conversation={conv}
              onPress={() => navigation.navigate('ChatDetail', { conversation: conv })}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  listContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(0, 122, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.danger,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  unreadText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.text,
  },
  conversationContent: {
    flex: 1,
    marginLeft: spacing.md,
    marginRight: spacing.sm,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
  },
  members: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  lastMessage: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  metaContainer: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  time: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  groupTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  groupTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textTertiary,
  },
});
