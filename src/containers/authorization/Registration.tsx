import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";
const { width, height } = Dimensions.get("window");
import Button from "../../components/button";
import StyledKeyboardAvoidingView from "../../components/styledkeyboardavoidingview";
import TextBoxInput from "../../components/textboxinput";
const maxWidth = width,
  maxHeight = height;
import * as strings from "../../strings";
import { showAlert } from "../../utils/navigations";

interface RegistrationProps {}

export default class Registration extends React.Component<
  RegistrationProps,
  any
> {
  loginInputRef: TextBoxInput;
  passwordInputRef: TextBoxInput;
  passwordConfirmInputRef: TextBoxInput;

  constructor(props: RegistrationProps) {
    super(props);
    this.loginInputRef = new TextBoxInput(null);
    this.passwordInputRef = new TextBoxInput(null);
    this.passwordConfirmInputRef = new TextBoxInput(null);
    this.state = {
      login: "",
      password: "",
      passwordConfirm: ""
    };
  }

  onChangeLogin = (login: string) => {
    this.setState({ login });
  };
  onChangePassword = (password: string) => {
    this.setState({ password });
  };
  onChangePasswordConfirm = (passwordConfirm: string) => {
    this.setState({ passwordConfirm });
  };
  setLoginRef = (ref: TextBoxInput) => {
    this.loginInputRef = ref;
  };
  setPasswordRef = (ref: TextBoxInput) => {
    this.passwordInputRef = ref;
  };
  setPasswordConfirmRef = (ref: TextBoxInput) => {
    this.passwordConfirmInputRef = ref;
  };

  blur = () => {
    if (this.passwordInputRef) {
      this.passwordInputRef.refs.ref.blur();
    }
    if (this.loginInputRef) {
      this.loginInputRef.refs.ref.blur();
    }
    if (this.passwordConfirmInputRef) {
      this.passwordConfirmInputRef.refs.ref.blur();
    }
  };

  onRegisterPressed = () => {
    this.checkForm();
  };

  checkForm = () => {
    const { login, password, passwordConfirm } = this.state;
    if (
      strings.validateEmail(login) &&
      password.length >= 6 &&
      passwordConfirm === password
    ) {
      showAlert(strings.authorized);
      return true;
    }
    showAlert(strings.validationError);
    return false;
  };

  render() {
    return (
      <SafeAreaView style={styles.rootContainer}>
        <StyledKeyboardAvoidingView style={styles.screenWrapper} hasntHeader>
          <TouchableOpacity
            activeOpacity={1}
            onPress={this.blur}
            style={styles.screenWrapper}
          >
            <View style={styles.inputDataContainer}>
              <TextBoxInput
                customContainer={styles.textBoxContainer}
                customStyle={styles.customStyle}
                cancelable={true}
                placeholderTextColor={"gray"}
                value={this.state.login}
                onChangeText={this.onChangeLogin}
                ref={this.setLoginRef}
                placeholder={strings.loginPlaceholder}
              />
              <TextBoxInput
                customContainer={styles.textBoxContainer}
                customStyle={styles.customStyle}
                cancelable={true}
                secureTextEntry={true}
                placeholderTextColor={"gray"}
                value={this.state.password}
                onChangeText={this.onChangePassword}
                ref={this.setPasswordRef}
                placeholder={strings.passwordPlaceholder}
              />
              <TextBoxInput
                customContainer={styles.textBoxContainer}
                customStyle={styles.customStyle}
                cancelable={true}
                placeholderTextColor={"gray"}
                value={this.state.passwordConfirm}
                onChangeText={this.onChangePasswordConfirm}
                ref={this.setPasswordConfirmRef}
                placeholder={strings.passwordConfirmPlaceholder}
              />
              <Button text="Register" onPress={this.onRegisterPressed} />
            </View>
          </TouchableOpacity>
        </StyledKeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    width: maxWidth,
    height: maxHeight,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  screenWrapper: {
    width: maxWidth,
    height: maxHeight,
    borderRadius: 4,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  inputDataContainer: {
    width: 300,
    height: 310,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray"
  },
  textBoxContainer: {
    height: 44,
    width: "90%",
    marginBottom: 30,
    padding: 6,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "lightgray",
    borderRadius: 4
  },
  customStyle: {
    height: 58,
    width: "90%",
    fontSize: 16,
    lineHeight: 18,
    color: "black"
  }
});
