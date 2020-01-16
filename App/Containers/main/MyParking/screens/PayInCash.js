import React, { Component } from 'react';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import {  View } from 'react-native';
import { Header, Text, Button } from '../../../../Components';
import _ from 'lodash';
import { Colors } from '../../../../Themes';
import { TextInput } from '../../../../Components/TextInput';

const cashNumber = _.map(Array(4), (_, i) => {
    const field ={
        id: i,
        value: ''
    }

    return field;
})

class PayInCash extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cashNumber: []
    }
  }

  componentDidMount() {
    console.log('cashNumber', cashNumber);
  }

  onChangeCashNumber = cashNumberId => {
    console.log('cahsNumberId', cashNumberId);
  }

  render() {
    return(
      <Container>
        <Header
          text="Pay in cash"
          leftIcon="back_arrow"
          rightIcons={['notifications']}
          onPressLeft={this.goToBack}
          onPressRight={(index) => this.handleClickRight(index)}
          navigation={this.props.navigation}
        />
        <View style={{ alignItems: 'center' }}>
          <Text
            textAlign='center'
            text='PAYMENT INFORMATION'
            size={20}
            marginTop={40}
          />
          <Text
            textAlign='center'
            text='Lorem ipsum dolor sit  amet consectetuer adipiscing elit sed diam nonummy nibh '
            size={16}
            opacity={0.9}
            marginTop={60}
            style={{width: '70%'}}
          />
          <View style={{flexDirection: 'row', marginTop: 34}}>
           {
               _.map(cashNumber, (item, i) => {
                  return <View style={{width: 65, height: 46, marginHorizontal: 4.5}} key={i}>
                          <TextInput
                           placeholder='-'
                           textAlign='center'
                           value={item.value}
                           onChangeText={() => this.onChangeCashNumber(item.id)}
                          />
                        </View>
               })
           }
          </View>
          <Button style={{ width:286, height: 45, alignSelf: 'center' }} marginTop={167} color={Colors.white.base} name='DONE' disabled/>
        </View>
      </Container>
    )
   }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayInCash)