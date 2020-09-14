import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SignInScreen from './Auth/SignInScreen';
import SignUpScreen from './Auth/SignUpScreen';
import ForgetPasswordScreen from './Auth/ForgetPasswordScreen';
import SellerScreen from './Seller/SellerScreen';
import BuyerScreen from './Buyer/BuyerScreen';
import AdminScreen from './Admin/AdminScreen';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DrawerContent} from './DrawerContent';
import Detail from './components/Detail';

const SellerStack = createStackNavigator();
const BuyerStack = createStackNavigator();
const AdminStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Navigation = () => {

    const SellerStackScreen = () => {
        const navigation = useNavigation();
        return (
            <SellerStack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: 'red',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
                <SellerStack.Screen name="seller" component={SellerScreen} options={{
                    title: 'Seller',
                    headerLeft: () => (
                        <Icon
                            name="home-outline"
                            color='white'
                            size={25}
                        />
                    ),
                }}/>
                <SellerStack.Screen name="Detail" component={Detail}/>
            </SellerStack.Navigator>
        );
    };

    const BuyerStackScreen = () => {
        const navigation = useNavigation();
        return (
            <BuyerStack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: 'red',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
                <BuyerStack.Screen name="buyer" component={BuyerScreen} options={{
                    title: 'Buyer',
                    headerLeft: () => (
                        <Icon
                            name="menu-open"
                            color={'#fff'}
                            style={{fontWeight: 'normal', marginLeft: 7}}
                            size={30}
                            onPress={() => {
                                navigation.openDrawer();
                            }}/>
                    ),
                }}/>
                <BuyerStack.Screen name="Detail" component={Detail}/>
            </BuyerStack.Navigator>
        );
    };

    const AdminStackScreen = () => {
        const navigation = useNavigation();
        return (
            <AdminStack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: 'red',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
                <AdminStack.Screen name="admin" component={AdminScreen} options={{
                    title: 'Admin',
                    headerLeft: () => (
                        <Icon
                            name="menu-outline"
                            backgroundColor="red"
                            onPress={() => {
                                navigation.openDrawer();
                            }}/>
                    ),
                }}/>
            </AdminStack.Navigator>
        );
    };

    const AuthStackScreen = () => {
        const navigation = useNavigation();
        return (
            <AuthStack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: 'red',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
                <AuthStack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}}
                                  initialParams={navigation}/>

                <AuthStack.Screen name="Signup" component={SignUpScreen} options={{
                    title: 'Sign Up',
                    headerTitleContainerStyle: {left: 50},
                }}/>

                <AuthStack.Screen name="ForgetPassword" component={ForgetPasswordScreen} options={{
                    title: 'Reset Password',
                    headerTitleContainerStyle: {left: 50},
                }}/>

            </AuthStack.Navigator>
        );
    };

    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
                <Drawer.Screen name="SignIn" component={AuthStackScreen}/>
                <Drawer.Screen name="seller" component={SellerStackScreen}/>
                <Drawer.Screen name="buyer" component={BuyerStackScreen}/>
                <Drawer.Screen name="admin" component={AdminStackScreen}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
