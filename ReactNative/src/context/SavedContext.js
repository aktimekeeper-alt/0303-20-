import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavedContext = createContext();

export function SavedProvider({ children }) {
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    loadSavedPosts();
  }, []);

  const loadSavedPosts = async () => {
    try {
      const saved = await AsyncStorage.getItem('savedPosts');
      if (saved) {
        setSavedPosts(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved posts:', error);
    }
  };

  const savePost = async (post) => {
    try {
      const newSavedPosts = [...savedPosts, post];
      setSavedPosts(newSavedPosts);
      await AsyncStorage.setItem('savedPosts', JSON.stringify(newSavedPosts));
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const unsavePost = async (postId) => {
    try {
      const newSavedPosts = savedPosts.filter(p => p.id !== postId);
      setSavedPosts(newSavedPosts);
      await AsyncStorage.setItem('savedPosts', JSON.stringify(newSavedPosts));
    } catch (error) {
      console.error('Error unsaving post:', error);
    }
  };

  const isPostSaved = (postId) => {
    return savedPosts.some(p => p.id === postId);
  };

  const toggleSavePost = async (post) => {
    if (isPostSaved(post.id)) {
      await unsavePost(post.id);
    } else {
      await savePost(post);
    }
  };

  return (
    <SavedContext.Provider value={{ savedPosts, savePost, unsavePost, isPostSaved, toggleSavePost }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error('useSaved must be used within a SavedProvider');
  }
  return context;
}
