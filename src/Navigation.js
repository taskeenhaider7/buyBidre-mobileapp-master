import React, {useEffect, useMemo, useState} from 'react';
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
import Contact from './components/Contact';
import MyProperties from './components/MyProperties';
import AddProperty from "./Seller/AddProperty";
import AsyncStorage from "@react-native-community/async-storage";
import {AuthContext} from "./components/context";
import {WEBAPI} from "./Services/Services";
import {ActivityIndicator, Image, StyleSheet, View} from "react-native";
import constants from "./Constants";

const SellerStack = createStackNavigator();
const BuyerStack = createStackNavigator();
const AdminStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Navigation = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [initialDrawer, setInitialDrawer] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(async () => {

            try {
                const value = await AsyncStorage.getItem('response');
                if (value !== null) {
                    const responseObj = JSON.parse(value)
                    console.log("her is the list of ....", responseObj.type)
                    setInitialDrawer(responseObj.type);
                }

                setIsLoggedIn(!!value);
                setIsLoading(false);
            } catch (e) {
                setIsLoading(false);
                console.log(e);
            }
        }, 0);
    });

    const authContext = useMemo(() => ({
        signIn: async (authInfo) => {
            return await new WEBAPI().login(authInfo).then((response) => {

                if (response.message === 'Login Successfully.') {
                    setIsLoading(true);
                    // alert(response.type);
                    setInitialDrawer(response.type);
                    setIsLoading(false);
                    setIsLoggedIn(true);

                }

                return response
            }).catch(e => {
                console.log(e);
            })
        },
        signOut: async () => {
            try {
                await AsyncStorage.clear();
                setIsLoggedIn(false);
                props.navigation.closeDrawer();
            } catch (e) {
                console.log(e);
            }
        }
    }), []);

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
                            name="menu-open"
                            color={'#fff'}
                            style={{fontWeight: 'normal', marginLeft: 7}}
                            size={30}
                            onPress={() => {
                                navigation.openDrawer();
                            }}/>
                    ),
                    headerRight: () => (
                        <Icon
                            name="plus"
                            color={'#fff'}
                            style={{fontWeight: 'normal', marginRight: 7}}
                            size={30}
                            onPress={() => {
                                navigation.navigate("seller", {screen: "AddProperty"});
                            }}/>
                    )
                }}/>
                <SellerStack.Screen name="Detail" component={Detail}/>
                <SellerStack.Screen name="Contact" component={Contact}/>
                <SellerStack.Screen name="MyProperties" component={MyProperties}/>
                <SellerStack.Screen name="AddProperty" component={AddProperty}/>
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
                <SellerStack.Screen name="Contact" component={Contact}/>
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
                            name="menu-open"
                            color={'#fff'}
                            style={{fontWeight: 'normal', marginLeft: 7}}
                            size={30}
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
                drawerLockMode: 'locked-closed',
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

    if (isLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image style={styles.stretch} source={require('../appIcon.jpeg')}/>
            </View>
        );
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {
                    isLoggedIn ?
                        (
                            <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>

                                {
                                    initialDrawer === 'seller' &&
                                    <Drawer.Screen name="seller" component={SellerStackScreen}/>
                                }
                                {
                                    initialDrawer === 'buyer' &&
                                    <Drawer.Screen name="buyer" component={BuyerStackScreen}/>
                                }
                                {
                                    initialDrawer === 'admin' &&
                                    <Drawer.Screen name="admin" component={AdminStackScreen}/>
                                }
                            </Drawer.Navigator>
                        ) : (
                            <Drawer.Navigator>
                                <Drawer.Screen name="SignIn" component={AuthStackScreen}
                                               options={({route, navigation}) => {
                                                   return {
                                                       swipeEnabled: false,
                                                   };
                                               }}/>
                            </Drawer.Navigator>
                        )
                }
            </NavigationContainer>
        </AuthContext.Provider>
    );
};

const styles = StyleSheet.create({
    stretch: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 10, marginTop: 10, marginBottom: 10,
    }
});

export default Navigation;
