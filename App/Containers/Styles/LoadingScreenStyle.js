import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'
import { Platform, screenWidth, screenHeight } from '../../Lib/platfrom';
const ratio = screenWidth/900;
export default StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    width: '100%',
    backgroundColor: Colors.primary.base,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    marginTop: Platform.isIos ? 0 : 10,
    marginLeft: 50,
    marginRight: 50,
    width: screenWidth,
    height: 1509 * ratio,
    resizeMode: "contain",
    marginBottom: 10,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary.base
  }
})
