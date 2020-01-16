import React, { Component } from 'react'
import { AppState, BackHandler } from 'react-native'
import { Content, Text, Container } from 'native-base'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Header } from '../../../Components'
// Styles
import styles from '../../Styles/SettingsStyle'

class Settings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      appState: AppState.currentState
    }
  }
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
    
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount () {
      AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
      this.setState({appState: nextAppState});
      
      if ( nextAppState === 'active' ) {
          this.props.navigation.navigate('MyParkingScreen', { appStatus: 'active' });
      }
  }

  render () {
    return (
      <Container>
        <Header
          text="Settings"
          leftIcon="menu"
          rightIcons={['filter', 'notifications']}
          onPressLeft={() => this.props.navigation.toggleDrawer()}
          navigation={this.props.navigation}
        />
        <Content></Content>
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
