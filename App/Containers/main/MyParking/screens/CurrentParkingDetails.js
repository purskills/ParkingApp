import React, { Component } from 'react';
import { Container, Content, Button } from 'native-base';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import { BackHandler, View, Image } from 'react-native';
import { Header, Tabs, Tab, Text, SvgIcon, List, Button as TextButton } from '../../../../Components';
import _ from 'lodash';
import { Colors, Images } from '../../../../Themes';
import Modal from 'react-native-modal'

const Row = props => {
    return <View style={{ marginHorizontal: 14, flex: 1, borderColor: Colors.border, borderBottomWidth : props.border ? 1 : 0 }}>
                <View style={{ flexDirection: 'row', flex: 1, paddingBottom: props.border ? 20 : 0  }}>
                    <View style={{flex: props.firstFlex}}>
                        <Text
                            text={props.firstTitle}
                            type='light'
                            marginTop={27}
                            marginLeft={23}
                            color={Colors.grey}
                        />
                        <Text 
                            text={props.firstText}
                            type='light'
                            marginTop={12}
                            marginLeft={27}
                            style={{ width: props.firstTitle === 'Entry:' ? '60%' : '100%'}}
                        />
                    </View>
                    <View style={{flex: props.secondFlex}}>
                        <Text
                            text={props.secondTitle}
                            type='light'
                            marginTop={27}
                            color={Colors.grey}
                        />
                        <Text 
                            text={props.secondText}
                            type='light'
                            color= {props.secondText && props.secondText.includes('UNPAID') ? Colors.secondary : Colors.black.base}
                            marginTop={12}
                            marginLeft={4}
                            style={{ width: props.secondTitle && props.secondTitle === 'Exit:' ? '60%' : '100%'}}
                        />
                        {
                            props.secondText && props.secondText.includes('UNPAID') &&
                            <TextButton style={{ marginTop: 9, width:138, height: 40, borderWidth: 1 }} marginRight= {10}  color={Colors.black.base} name='PAY NOW (1 hour)' backgroundColor='white' borderColor={Colors.primary.base} onPress={props.onPressPayButton}/>
                        }
                    </View>        
                </View>        
            </View>
}

class CurrentParkingDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changedTime : 0,
            hours: 0,
            minutes: 23,
            showEndParkingModal: false,
            confirmEndParking: false,
            showEndParkingConfirmModal: false
        }
    }
    
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.goBack();
            return true
        });
    }

    goToBack = () => {
        this.props.navigation.navigate('MyParkingScreen');
    }

    onPressTimeChange = type => {
        const { hours } = this.state;

        switch ( type ) {
            case 'minus' :
                if ( hours === 0)
                    return;
                this.setState(prevState => ({
                    hours: prevState.hours - 1,
                    changedTime: prevState.changedTime - 1
                }));
                break;
            case 'plus' :
                this.setState(prevState => ({
                    hours: prevState.hours + 1,
                    changedTime: prevState.changedTime + 1
                }));
                break;
            default:
                break;
        }
    }

    changeHours2String = hours => {
        if ( hours < 10 )
            return '0' + hours.toString();

        return hours.toString();
    }
    
    onCancelChangeTime = () => { 
        this.setState(prevState => ({
            hours: prevState.hours - prevState.changedTime, 
            changedTime: 0
        }));
    }

    onEndParking = () => {
        this.setState({showEndParkingModal: true});
    }

    onCancelEndParking = () => {
        this.setState({showEndParkingModal: false});
    }

    onConfirmEndParking = () => {
        this.setState({showEndParkingModal: false, confirmEndParking: true});
    }

    onEndParkingModalHide = () => {
        if ( this.state.confirmEndParking === true ) {
            this.setState({showEndParkingConfirmModal: true});
        }
    }

    onPressPayButton = () => {
        this.props.navigation.navigate('PayCurrentParkingScreen');
    }

    render() {
        const { hours, minutes, changedTime, showEndParkingModal } = this.state;

        return(
            <Container>
                <Header
                    text="Parking title"
                    leftIcon="back_arrow"
                    rightIcons={['notifications']}
                    onPressLeft={this.goToBack}
                    onPressRight={(index) => this.handleClickRight(index)}
                    navigation={this.props.navigation}
                />
                <Modal isVisible={showEndParkingModal} onModalHide={this.onEndParkingModalHide}>
                    <View style={{ height: '55%', backgroundColor: 'white', borderRadius: 10}}>
                        <Text
                            textAlign='center'
                            text='PARKING END CONFIRMATION'
                            size={16}
                            marginTop={54}
                        />
                        <Text
                            textAlign='center'
                            text='Do you really want to end this parking early?'
                            size={16}
                            opacity={0.9}
                            marginTop={54}
                            style={{width: '65%', alignSelf: 'center'}}
                        />
                        <TextButton style={{ width:245, height: 45, alignSelf: 'center' }} marginTop={47} color='white' name='YES, END PARKING' onPress={this.onConfirmEndParking}/>
                        <TextButton style={{ width:245, height: 45, alignSelf: 'center' }} marginTop={10} backgroundColor='#EF625F' color='white' name='CANCEL' onPress={this.onCancelEndParking}/>
                    </View>
                </Modal>
                <Modal isVisible={this.state.showEndParkingConfirmModal}>
                    <View style={{ height: '55%', backgroundColor: 'white', borderRadius: 10}}>
                        <Text
                            textAlign='center'
                            text='PARKING WAS ENDED'
                            size={16}
                            marginTop={54}
                        />
                        <Image source={Images.end} style={{marginTop: 15, alignSelf: 'center'}}/>
                        <TextButton style={{ width: 245, height: 45, alignSelf: 'center' }} marginTop={30} color='white' name='OK'/>
                    </View>
                </Modal>
                <View style={{ flex: 1 }}>
                    <View style={{backgroundColor: 'white', shadowColor: 'black', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.16, shadowRadius: 2, elevation: 1}}>
                        <View style={{ paddingBottom: 24 }}>
                            <Text
                                textAlign='center'
                                text='Parking title'
                                size={18}
                                type='regular'
                                marginTop={23}
                            />
                            <Text
                                textAlign='center'
                                text='Parking end:'
                                size={12}
                                type='light'
                                opacity={0.6}
                                marginTop={17}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Button style={{ width: 45, height: 45 }} onPress={() => this.onPressTimeChange('minus')} disabled={ hours === 0 ? true : false }>
                                    <Icon name='minus' size={23} color='white'/>
                                </Button>
                                <Text
                                    textAlign='center'
                                    text={this.changeHours2String(hours) + `:${minutes}`}
                                    size={35}
                                    style={{ paddingHorizontal: 30 }}
                                />
                                <Button style={{ width: 45, height: 45 }} onPress={() => this.onPressTimeChange('plus') }>
                                    <Icon name='plus' size={23} color='white' />
                                </Button>
                            </View>
                            {
                                changedTime !== 0 &&
                                <>
                                    <Text 
                                        textAlign='center'
                                        text={`You added ${changedTime} hour`}
                                        size={10}
                                        type='light'
                                        opacity={0.8}
                                        display='none'
                                    />
                                    <View style={{ flexDirection: 'row', justifyContent:'center', marginTop: 16 }}>
                                        <TextButton style={{ width:138, height: 40, borderWidth: 1 }} marginRight= {10}  color={Colors.black.base} name='CANCEL' backgroundColor='white' borderColor={Colors.primary.base} onPress={this.onCancelChangeTime}/>
                                        <TextButton style={{ width:138, height: 40, backgroundColor: '#62D321' }} color='white' name='SAVE' />
                                    </View>
                                </>
                            }
                            
                        </View>
                    </View> 
                    <Content>
                        <Row firstTitle={'Address'} firstText={'Easton, Maryland, Some str, region etc'} border firstFlex={1}/>
                        <Row firstTitle={'Duration:'} firstText={'2 hours (09:00 am - 11:00 am)'} firstFlex={1}/>
                        <Row firstTitle={'Entry:'} firstText={'July 25, 2018, 09:00 am'} secondTitle={'Exit:'} secondText={'July 25, 2018, 11:00 am'} firstFlex={1} secondFlex={1} border/>
                        <Row firstTitle={'License plate:'} firstText={'MTF 3768'} secondTitle={'Parking place:'} secondText={'TE1-12'} firstFlex={1} secondFlex={1} border/>
                        <Row firstTitle={'Card number:'} firstText={'MasterCard (0211)'} secondTitle={'Status:'} secondText={'UNPAID (1 of 3 hours)'} firstFlex={1} secondFlex={1} onPressPayButton={this.onPressPayButton}/>
                        <Row firstTitle={'Amount:'} firstText={'$10 (0,25$/hour)'} secondTitle={'Balance:'} secondText={'0,0 $'} firstFlex={1} secondFlex={1} border/>
                        <TextButton
                            style={{ width: 286, height: 45, alignSelf: 'center', marginTop: 30.5, marginBottom: 40 }}
                            name='END EARLY'
                            color='white'
                            backgroundColor={changedTime !== 0 ? '#EF625F' : Colors.primary.base}
                            onPress={this.onEndParking}
                        />
                    </Content>
                    
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

export default connect(mapStateToProps, mapDispatchToProps)(CurrentParkingDetails)