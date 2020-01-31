import React, {Component} from 'react';

import {View, Text, TouchableOpacity, Animated, Image} from 'react-native';

import check from '../assets/images/check.png';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
    };
  }

  handleColor = () => {
    // var currentColor =
    //   this.props.color !== undefined ? this.props.color : '#23f752';
    // return this.state.color.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['#fff', currentColor],
    // });
  };

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
  }
  componentDidMount() {
    !this.props.value && this.animateBackGround();
  }

  animateBackGround = () => {
    Animated.timing(this.animatedValue, {
      toValue: 150,
      duration: 1500,
    }).start();
  };

  render() {
    let {textStyle, boxStyle, containerStyle} = this.props;

    textStyle = {...textStyle, color: '#000'};

    boxStyle = {
      ...boxStyle,
      marginRight: 10,
      borderRadius: 3,
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: '#ccc',
    };

    containerStyle = {
      ...containerStyle,
      flexDirection: 'row',
    };

    const interpolateColor = this.animatedValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['rgb(255,255,255)', 'rgb(51, 250, 170)'],
    });

    const interpolateColor2 = this.animatedValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['rgb(51, 250, 170)', 'rgb(255,255,255)'],
    });

    const animatedStyle = {
      backgroundColor: this.props.value ? interpolateColor : interpolateColor2,
    };

    return (
      <View style={containerStyle}>
        <AnimatedTouchable
          onPress={() => this.props.onChangeValue()}
          style={[boxStyle, animatedStyle]}>
          <Image style={{backgroundColor: '#00000000'}} source={check} />
        </AnimatedTouchable>
        <Text style={textStyle}>{this.props.label}</Text>
      </View>
    );
  }
}
