
import * as React from "react";
import {
  KeyboardAvoidingView,
  NativeModules,
  StatusBarIOS,
} from "react-native";
import { isIphone5, IS_IOS } from "../../utils/normalize";

const { StatusBarManager } = NativeModules;

const offsetWithoutHeader = IS_IOS ? -25 : 0;

const offsetWithHeader = isIphone5 ? 30 : 44;

export default class StyledKeyboardAvoidingView extends React.Component<any, any> {
  state = { statusBarHeight: 0 };

  statusBarListener: any;
  constructor(props: any) {
    super(props);
    this.statusBarListener = null;
  }

  componentDidMount() {
    if (IS_IOS) {
      StatusBarManager.getHeight((statusBarFrameData: any) => {
        this.setState({ statusBarHeight: statusBarFrameData.height });
      });
    } else {
      this.setState({ statusBarHeight: 35 });
    }

    this.statusBarListener = StatusBarIOS.addListener(
      "statusBarFrameWillChange",
      statusBarData => {
        this.setState({ statusBarHeight: statusBarData.frame.height });
      }
    );
  }

  componentWillUnmount() {
    this.statusBarListener.remove();
  }

  render() {
    const { style, children } = this.props;
    const { statusBarHeight } = this.state;
    return (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={
          this.props.hasntHeader
            ? offsetWithoutHeader
            : offsetWithHeader + statusBarHeight
        }
        style={style}>
        {children}
      </KeyboardAvoidingView>
    );
  }
}
