import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  View
} from "react-native";
import { IS_IOS } from "../../utils/normalize";

interface ButtonProps {
  onPress?: (event: any) => void;
  buttonStyle?: Array<object> | object;
  buttonTextStyle?: Array<object> | object;
  text?: string;
  opacity?: number;
}

class Button extends Component<ButtonProps, any> {
  static get defaultProps() {
    return {
      onPress: () => {},
      buttonStyle: {
        backgroundColor: "black",
        width: 200,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
      },
      buttonTextStyle: {
        color: 'white',
        fontSize: 22,
        fontWeight: "500"
      },
      text: "",
      opacity: 1
    };
  }

  renderText = () => {
    const { buttonTextStyle, text } = this.props;
    return <Text style={buttonTextStyle}>{text}</Text>;
  };

  render() {
    const { children, onPress, buttonStyle, text } = this.props;
    if (IS_IOS) {
      return (
        <TouchableOpacity {...this.props} onPress={onPress} style={buttonStyle}>
          {children}
          {text ? this.renderText() : null}
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableNativeFeedback {...this.props} onPress={onPress}>
          <View style={buttonStyle}>
            {children}
            {text ? this.renderText() : null}
          </View>
        </TouchableNativeFeedback>
      );
    }
  }
}

export default Button;
