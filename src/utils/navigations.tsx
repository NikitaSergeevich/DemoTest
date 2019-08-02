import {
  Alert,
} from "react-native";
import { attention } from "../strings";

export function showAlert(text: string, title: string = attention) {
  setTimeout(() => {
    Alert.alert(
      title,
      text,
      [
        {
          text: "OK",
          onPress: () => {}
        }
      ],
      { cancelable: true }
    );
  }, 500);
}
