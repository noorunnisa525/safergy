import { useKeyboard } from '@react-native-community/hooks';

const keyboard = useKeyboard();

export const keyboardShown = keyboard.keyboardShown;
export const keyboardHide = !keyboard.keyboardShown;
