import Snackbar from 'react-native-snackbar';

export default function (status, message) {
  let color = status === 'success' ? 'green' : 'red';
  Snackbar.show({
    text: message,
    duration: Snackbar?.LENGTH_LONG,
    backgroundColor: color,
  });
}
