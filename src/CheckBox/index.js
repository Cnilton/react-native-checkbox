import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Easing,
  Animated,
  Image,
} from 'react-native';

import check from '../assets/images/check.png';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      animate: false,
    };
    this.animatedValue = new Animated.Value(0);
  }

  hexToRgb = hex => {
    var a = hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => '#' + r + r + g + g + b + b,
      )
      .substring(1)
      .match(/.{2}/g)
      .map(x => parseInt(x, 16));
    return `rgb(${a[0]},${a[1]},${a[2]})`;
  };

  static getDerivedStateFromProps(props, state) {
    if (state.value === props.value) {
      return null;
    } else {
      if (props.value) {
        return {
          value: true,
          animate: true,
        };
      } else {
        return {
          value: false,
          animate: true,
        };
      }
    }
  }

  animateBackGround = () => {
    Animated.timing(this.animatedValue, {
      toValue: 150,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver:
        this.props.useNativeDriver !== undefined
          ? this.props.useNativeDriver
          : false,
    }).start(() => {
      this.animatedValue = new Animated.Value(0);
    });
  };

  render() {
    let colorActive =
      this.props.colorActive !== undefined ? this.props.colorActive : '#239292';

    let colorInactive =
      this.props.colorInactive !== undefined
        ? this.props.colorInactive
        : '#fff';

    let {textStyle, boxStyle, containerStyle} = this.props;

    textStyle = {color: '#000', ...textStyle};

    boxStyle = {
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      borderRadius: 3,
      width: 20,
      height: 20,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ccc',
      ...boxStyle,
    };

    containerStyle = {
      flexDirection: 'row',
      ...containerStyle,
    };

    const interpolateCheck = this.animatedValue.interpolate({
      inputRange: [0, 150],
      outputRange: [
        this.hexToRgb(colorInactive).toString(),
        this.hexToRgb(colorActive).toString(),
      ],
    });

    const interpolateUncheck = this.animatedValue.interpolate({
      inputRange: [0, 150],
      outputRange: [
        this.hexToRgb(colorActive).toString(),
        this.hexToRgb(colorInactive).toString(),
      ],
    });

    const animatedStyle = {
      backgroundColor: !this.props.value
        ? interpolateCheck
        : interpolateUncheck,
    };

    return (
      <View style={containerStyle}>
        <AnimatedTouchable
          onPress={() => this.props.onChangeValue()}
          style={[boxStyle, this.state.animate && animatedStyle]}>
          <Image
            style={{backgroundColor: '#00000000'}}
            source={
              this.props.checkImage !== undefined
                ? this.props.checkImage
                : check
            }
          />
        </AnimatedTouchable>
        <Text style={textStyle}>{this.props.label}</Text>
      </View>
    );
  }
}
