import * as React from "react";
import {
  TouchableOpacity,
  View,
  TextInput,
  Platform,
  StyleSheet
} from "react-native";
import { TextInputMask } from "react-native-masked-text";

const translation = {
  0(val: string) {
    if (/[0-9]/.test(val)) {
      return val;
    }
    return null;
  },
  9(val: string) {
    if (/[0-9 ]/.test(val)) {
      return val;
    }
    return null;
  },
  Z(val: string) {
    if (/[A-Za-z]/.test(val)) {
      return val;
    }
    return null;
  },
  A(val: string) {
    if (/[0-9A-Za-zА-Яа-я]/.test(val)) {
      return val;
    }
    return null;
  }
};

export default class TextBoxInput extends React.Component<any, any> {
  static get defaultProps() {
    return {
      onChangeText: () => {},
      onSelectionChange: () => {},
      onFocus: () => {},
      onBlur: () => {},
      onSubmitEditing: () => {},
      mask: "",
      placeholder: "",
      prefix: "",
      withMask: false,
      value: "",
      name: "some name",
      description: "some description",
      isValid: true,
      isFocused: false,
      autoFocus: false,
      keyboardType: "default",
      maxLength: 38,
      blurOnSubmit: true,
      placeholderTextColor: "gray",
      numberOfLines: 1,
      multiline: false,
      cancelable: false,
      clearTextOnFocus: false,
      textAlign: "left",
      autoCorrect: false,
      underlineColorAndroid: "transparent",
      autoCapitalize: "none",
      secureTextEntry: false
    };
  }

  textinput: any;

  constructor(props: any) {
    super(props);
    this.state = {
      isFocused: false
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus() {
    this.props.onFocus();
  }

  onBlur() {
    this.props.onBlur();
  }

  focus() {
    if (this.props.mask != "") {
      this.textinput.getElement().focus();
    } else {
      this.textinput.focus();
    }
  }

  blur() {
    if (this.props.mask != "") {
      this.textinput.getElement().blur();
    } else {
      this.textinput.blur();
    }
  }

  onChangeText(event: any) {
    this.props.onChangeText(event);
  }

  render() {

    const value = this.props.value;

    const content =
      this.props.mask != "" ? (
        <TextInputMask
          {...this.props}
          ref={"ref"}
          style={[
            styles.input,
            {
              color: value == "" ? "#FFFFFFAA" : "white",
              paddingBottom: value == "" ? 0 : 0
            },
            this.props.customStyle
          ]}
          type="custom"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          value={value}
          options={{
            mask: this.props.mask,
            translation
          }}
        />
      ) : (
        <TextInput
          {...this.props}
          ref={"ref"}
          style={[
            styles.input,
            {
              color: this.props.value == "" ? "#FFFFFFAA" : "white",
              paddingBottom: value == "" ? 0 : 0
            },
            this.props.customStyle,
            Platform.OS != "ios" && { height: 36 }
          ]}
        />
      );

    return (
      <View style={[styles.container, this.props.customContainer]}>
        {content}
        {this.props.cancelable && value != "" && (
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={this.props.onCancel}
          >
            {/* <Image
              resizeMode="contain"
              source={require("../assets/ic_cross.png")}
              style={styles.cross}
            /> */}
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "transparent",
    width: 326,
    height: 36,
    borderBottomWidth: 1,
    borderColor: "white",
    alignItems: "center"
  },
  textInputTitle: {
    fontSize: 14,
    lineHeight: 18
  },
  inputBottomBorder: {
    marginTop: 2,
    backgroundColor: "#2196F3",
    width: (360 - 16 * 2) / 2,
    height: 1
  },
  input: {
    paddingLeft: 0,
    backgroundColor: "transparent",
    width: 316,
    borderRadius: 4,
    fontSize: 16,
    marginBottom: Platform.OS == "ios" ? 0 : 9.5
  },
  cross: {
    width: 15,
    height: 15
  },
  padding: {
    paddingRight: 31
  },
  selected: {
    color: "#2196F3"
  },
  blured: {
    color: "rgba(0, 0, 0, 0.5)"
  },
  error: {
    color: "#EF3A51"
  },
  errorLine: {
    backgroundColor: "#EF3A51"
  },
  selectedLine: {
    backgroundColor: "#2196F3"
  },
  bluredLine: {
    backgroundColor: "rgba(0,0,0,0.2)"
  }
});
