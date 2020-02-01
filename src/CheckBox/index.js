import React, {Component} from 'react';

import {View, Text, TouchableOpacity, Animated, Image} from 'react-native';

import check from '../assets/images/check.png';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      value: false,
      animate: false,
    };
    this.animatedValue = new Animated.Value(0);
  }

  handleColor = () => {
    // var currentColor =
    //   this.props.color !== undefined ? this.props.color : '#23f752';
    // return this.state.color.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['#fff', currentColor],
    // });
  };

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
      duration: 1500,
    }).start(() => {
      this.animatedValue = new Animated.Value(0);
    });
  };

  render() {
    console.log(this.props.value);
    let {textStyle, boxStyle, containerStyle} = this.props;

    textStyle = {...textStyle, color: '#000'};

    boxStyle = {
      ...boxStyle,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      borderRadius: 3,
      width: 20,
      height: 20,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ccc',
    };

    containerStyle = {
      ...containerStyle,
      flexDirection: 'row',
    };

    const interpolateCheck = this.animatedValue.interpolate({
      inputRange: [0, 150],
      outputRange: [
        'rgb(255,255,255)',
        this.hexToRgb(this.props.tintColor).toString(),
      ],
    });

    const interpolateUncheck = this.animatedValue.interpolate({
      inputRange: [0, 150],
      outputRange: [
        this.hexToRgb(this.props.tintColor).toString(),
        'rgb(255,255,255)',
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
          <Image style={{backgroundColor: '#00000000'}} source={check} />
        </AnimatedTouchable>
        <Text style={textStyle}>{this.props.label}</Text>
      </View>
    );
  }
}
