import React, { Component } from 'react'
import { BackHandler, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes';
import { retrieveToken } from '../Services/AsyncStorage';

// Styles
import styles from './Styles/LoadingScreenStyle'

class LoadingScreen extends Component {

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
    this.loadStorage();
  }

  loadStorage = async () => {
    setTimeout(async() => {
      try {
        const token = await retrieveToken();
        this.props.navigation.navigate(token ? "main" : "auth")
      } catch (error) {
        this.props.navigation.navigate("auth")
        console.log(error);
      }
    }, 1000)
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={Images.splash} style={styles.logo}></Image>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen)
