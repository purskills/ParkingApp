import { createSwitchNavigator } from 'react-navigation';

// screens identified by the router
import MessagesScreen from '../../Containers/main/Messages';
import MyParkingScreen from '../../Containers/main/MyParking';
import QRScanScreen from '../../Containers/main/QRscan';
import SearchParkingScreen from '../../Containers/main/SearchParking';
import SettingsScreen from '../../Containers/main/Settings';
import TransactionHistoryScreen from '../../Containers/main/TransactionHistory';
import NotificationsScreen from '../../Containers/main/Notifications';
import CurrentParkingDetailsScreen from '../../Containers/main/MyParking/screens/CurrentParkingDetails';
import PayCurrentParkingScreen from '../../Containers/main/MyParking/screens/PayCurrentParking';
import PayInCashScreen from '../../Containers/main/MyParking/screens/PayInCash';

export const HomeNavigator = createSwitchNavigator(
	{
		MessagesScreen: { screen: MessagesScreen },
		MyParkingScreen: { screen: MyParkingScreen },
		QRScanScreen: { screen: QRScanScreen },
		SearchParkingScreen: { screen: SearchParkingScreen },
		SettingsScreen: { screen: SettingsScreen },
		TransactionHistoryScreen: { screen: TransactionHistoryScreen },
		NotificationsScreen: { screen: NotificationsScreen },
		CurrentParkingDetailsScreen: { screen: CurrentParkingDetailsScreen },
		PayCurrentParkingScreen: { screen: PayCurrentParkingScreen },
		PayInCashScreen: { screen: PayInCashScreen }
	},
	{
		initialRouteName: "SearchParkingScreen",
		headerMode: "none",
	}
);
