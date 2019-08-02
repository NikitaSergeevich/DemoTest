import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Login from "./Login";
import Registration from "./Registration";
//import {Registration} from './Registration';
const { width, height } = Dimensions.get("window");
const maxWidth = width,
  maxHeight = height;

interface Props {}
interface State {
  index: number;
  routes: Array<Object>;
}

export class Authorization extends React.Component<any, any> {
  scrollview: ScrollView;

  static defaultProps = {
    tabContentContainerStyle: {
      height: "20%"
    },
    pageContentContainerStyle: {
      height: "80%"
    }
  };

  constructor(props: any) {
    super(props);
    this.scrollview = new ScrollView({});
  }

  state = {
    index: 0,
    activeTab: 0,
    tabs: [
      {
        title: "Login",
        component: <Login />
      },
      {
        title: "Registation",
        component: <Registration />
      }
    ]
  };

  setScrollViewRef = (ref: ScrollView) => {
    this.scrollview = ref;
  };

  handleScroll = (event: any) => {
    const offset = event.nativeEvent.contentOffset.x;
    if (offset % maxWidth == 0) {
      this.setState({ activeTab: offset / maxWidth });
    }
  };

  render() {
    const { activeTab, tabs } = this.state;
    const { pageContentContainerStyle, tabContentContainerStyle } = this.props;
    return (
      <SafeAreaView>
        <ScrollView
          ref={this.setScrollViewRef}
          automaticallyAdjustContentInsets={false}
          contentInsetAdjustmentBehavior={"never"}
          keyboardShouldPersistTaps="always"
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={this.handleScroll}
          bounces={false}
          style={pageContentContainerStyle}
          contentContainerStyle={styles.scrollViewContentContainer}
        >
          {tabs.map(tab => {
            let component = tab.component;
            return (
              <View style={pageContentContainerStyle} key={tab.title}>
                {component}
              </View>
            );
          })}
        </ScrollView>
        <View style={[styles.tabContentContainer, tabContentContainerStyle]}>
          {tabs.map((tab, i) => {
            return (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  this.scrollview.scrollTo({
                    x: i * maxWidth,
                    y: 0,
                    animated: true
                  });
                }}
                key={tab.title}
                style={[
                  styles.tabContainer,
                  {
                    backgroundColor: i == activeTab ? "gray" : "lightgray"
                  }
                ]}
              >
                <Text>{tab.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: { flex: 1, backgroundColor: "white" },
  scrollViewContentContainer: { height: "100%" },
  tabContentContainer: {
    flexDirection: "row"
  },
  tabContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});
