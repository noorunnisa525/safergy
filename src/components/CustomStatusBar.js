import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { StatusBar } from 'react-native';

export const useStatusBar = backgroundColor => {
  useFocusEffect(
    useCallback(() => {
      // StatusBar.setBarStyle(style);
      StatusBar.setBackgroundColor(backgroundColor);
    }, [backgroundColor]),
  );
};
