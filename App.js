import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import {
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Drawer from 'react-native-drawer';
import {Header} from 'react-native-elements';


import HomeScreen from './screens/HomeScreen'
import InfoScreen from './screens/InfoScreen'
import ProfileScreen from './screens/ProfileScreen'
import DashboardScreen from './screens/DashboardScreen'

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 1, shadowRadius: 10,  borderRightWidth: 1, borderRightColor: '#e6e6e6'},
  main: {paddingLeft: 0},
}

//=========================================================================================


class MainScreen extends React.Component {
  render() {
    return(
      <Drawer
        ref = {(ref) => {this.drawer = ref}}
        type="static"
        content={<DashboardScreen />}
        tapToClose={true}
        openDrawerOffset={100}
        styles={drawerStyles}
        tweenHandler={Drawer.tweenPresets.parallax}
        >
          <View style={styles.plain}>
            <Header
              backgroundColor='#ffffff'
              containerStyle={{borderBottomColor:'#e6e6e6', borderBottomWidth:1}}
              leftComponent={{ icon: 'menu', color: '#000000', onPress: () => {this.drawer.open()} }}
              centerComponent={{ text: 'MY TITLE', style: { color: '#000000' } }}
              rightComponent={{ icon: 'message', color: '#000000', onPress: () => alert("Message") }}
              
            />
            <MainContainer />  
          </View>
      </Drawer>
    );
  }
}

//=========================================================================================

const start = createSwitchNavigator(
  {
    Main : MainScreen,
  }
);

const tabs = createBottomTabNavigator(
  {
    Home : HomeScreen,
    Info : InfoScreen,
    Profile : ProfileScreen,
  },
  {
    initialRouteName : 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-home'; 
        } else if (routeName === 'Info') {
          iconName = 'ios-information-circle-outline';
        } else if (routeName === 'Profile') {
          iconName = 'ios-person';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#000000',
      labelStyle: {
        fontSize: 12,
      },
      showLabel: false,
    }
  }
);



const AppContainer = createAppContainer(start);
const MainContainer = createAppContainer(tabs);


//=========================================================================================

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.plain}>
        <StatusBar barStyle="dark-content" />
        <AppContainer />
      </View>
    );
  }
}

//==========================================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plain: {
    flex: 1,
  },
});


