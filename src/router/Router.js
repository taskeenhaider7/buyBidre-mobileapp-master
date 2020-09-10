import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../components/Home'
import Login from '../components/Auth/Login'
import Signup from '../components/Auth/Signup'
import Profile from '../components/Profile'
import Notifications from '../components/Notifications'
import ContactUs from '../components/ContactUs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import {createStackNavigator} from '@react-navigation/stack';
import { AsyncStorage } from 'react-native';


const Drawer = createDrawerNavigator();
const BottomNav = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomScreen = ({route, navigation}) => {
    return (
        <BottomNav.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: '#e91e63',
                inactiveTintColor: 'white',
                style: {
                    backgroundColor: '#1B2631',
                    borderTopColor: '##1B2631'
                }
            }}
        >
            <BottomNav.Screen initialParams={route} name="Profile" component={Profile} options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({color, size}) => (
                    <Icon2 name="Profile" color={color} size={size}/>
                ),
            }}/>
            <BottomNav.Screen name="Home" component={Home} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color, size}) => (
                    <Icon name="home" color={color} size={size}/>
                ),
            }}/>
            <BottomNav.Screen name="Notifications" component={Notifications} options={{
                tabBarLabel: 'Chat',
                tabBarIcon: ({color, size}) => (
                    <Icon2 name="hipchat" color={color} size={size}/>
                ),
            }}/>

        </BottomNav.Navigator>
    )
}
const MyDrawer = ({route, navigation}) => {
    return (
        <Drawer.Navigator
            drawerContentOptions={{
                activeTintColor: '#E51C24',
                inactiveTintColor: 'white',
                style: {marginVertical: 20}
            }}
            initialRouteName="Home"
            drawerStyle={{
                backgroundColor: 'black',
                activeTintColor: 'white',
            }}
        >
            <Drawer.Screen initialParams={route.params} name="Profile" component={Profile}/>
            <Drawer.Screen initialParams={route.params} name="Home" component={Home}/>
            <Drawer.Screen initialParams={route.params} name="Notifications" component={Notifications}/>
            <Drawer.Screen initialParams={route.params} name="ContactUS" component={ContactUs}/>

        </Drawer.Navigator>


    );
}
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Signup" component={Signup}/>
                <Stack.Screen name="Drawer" component={MyDrawer}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}