import { Toast } from 'react-native-toast-message/lib/src/Toast';
import moment from 'moment';

export function convertChatTime(t) {
  return moment(t).format("hh:mm A");
}
export function getFileExt(filename) {
  return filename.split('.').pop();
}

export function getAudioTimeString(seconds) {
  const m = parseInt((seconds % (60 * 60)) / 60);
  const s = parseInt(seconds % 60);

  return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
}

export function stringToBoolean(str) {
  switch (str.toLowerCase().trim()) {
    case "true": case "yes": case "1": return true;
    case "false": case "no": case "0": case null: return false;
    default: return Boolean(str);
  }
}

export function getItems(count) {
  return Array.from({ length: count }, (v, k) => k).map(k => (k + 1900).toString());
}

export function generateTopwishInList(count) {
  return Array.from({ length: count }, (v, k) => k).map(k => ({
    id: k,
    content: ''
  }))
}

export function showError(message) {
  Toast.show({
    type: 'error',
    text1: 'Sorry',
    text2: message
  })
}

export function getOrderString(number) {
  switch (number) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return "th";
  }
}