import React, {Component} from 'react';

import {View, Text} from 'react-native';

// import { Container } from './styles';

export default class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureText: true,
    };
  }

  render() {
    let {textStyle, boxStyle, containerStyle} = this.props;
    textStyle = {...textStyle, color: '#000'};
    boxStyle = {...boxStyle, backgroundColor: '#0f0'};
    containerStyle = {...containerStyle, color: '#f00'};
    return (
      <View style={containerStyle}>
        <View style={boxStyle} />
        <Text style={textStyle}>Blabla</Text>
      </View>
    );
  }
}
