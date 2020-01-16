import React, { Component } from 'react';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { BackHandler, View, TouchableOpacity } from 'react-native';
import { Header, Text, SvgIcon } from '../../../../Components';
import _ from 'lodash';
import { Colors } from '../../../../Themes';

const PaymentMethod = props => {
    return <TouchableOpacity onPress={() => props.onPress(props.paymentType)}>
            <View style={{borderRadius: 10, borderColor: Colors.primary.base, borderWidth: 1, width: 286, height: 110, marginTop: props.marginTop, alignItems: 'center', flexDirection: 'row'}}>
                <SvgIcon
                  name={props.paymentType}
                  size={66}
                  color={Colors.primary.base}
                  marginLeft={32}
                />
                <Text
                  textAlign='center'
                  text={`${props.paymentText}>`}
                  size={15}
                  opacity={0.9}
                  marginLeft={28}
                />
           </View>
          </TouchableOpacity>
}

class PayCurrentParking extends Component {

    constructor(props) {
        super(props);
        this.state ={

        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.goBack();
            return true
        });
    }

    onToBack = () => {
        this.props.goBack();
    }

    onChoosePayment = paymentType => {
        console.log('paymentType', paymentType);
        this.props.navigation.navigate('PayInCashScreen');
    }

    render() {
        return (
            <Container>
                <Header
                    text="Payment method"
                    leftIcon="back_arrow"
                    rightIcons={['notifications']}
                    onPressLeft={this.goToBack}
                    onPressRight={(index) => this.handleClickRight(index)}
                    navigation={this.props.navigation}
                />
                <View style={{ alignItems: 'center' }}>
                    <Text
                        textAlign='center'
                        text='CHOOSE PAYMENT METHOD'
                        size={20}
                        marginTop={40}
                    />
                    <Text
                        textAlign='center'
                        text='$10 (0,25$/hour)'
                        size={20}
                        opacity={0.66}
                        marginTop={19}
                    />
                    <PaymentMethod paymentType='card' paymentText='BY CARD' marginTop={39} onPress={this.onChoosePayment}/>
                    <PaymentMethod paymentType='cash' paymentText='IN CASH' marginTop={20} onPress={this.onChoosePayment}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PayCurrentParking)