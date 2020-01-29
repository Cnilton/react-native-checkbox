import React, {Component} from 'react';

import {View, Text} from 'react-native';

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

    boxStyle = {
      ...boxStyle,
      borderRadius: 3,
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: '#ccc',
    };

    containerStyle = {
      ...containerStyle,
      flexDirection: 'row',
      flex: 1,
      backgroundColor: '#398',
    };

    return (
      <View style={containerStyle}>
        <View style={boxStyle} />
        <Text style={textStyle}>Blabla</Text>
      </View>
    );
  }
}
