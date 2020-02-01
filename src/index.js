import Checkbox from './CheckBox';

import React, {Component} from 'react';

import {View, Text} from 'react-native';

// import { Container } from './styles';

export default class src extends Component {
  state = {
    check: false,
  };

  handleChange = () => {
    console.log(!this.state.check);
    this.setState({
      check: !this.state.check,
    });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#239292',
        }}>
        {/* <Text>Teste</Text> */}
        <Checkbox
          label="Check"
          tintColor={'#f2792f'}
          boxStyle={{}}
          containerStyle={{}}
          textStyle={{}}
          value={this.state.check}
          onChangeValue={() => this.handleChange()}
        />
      </View>
    );
  }
}
