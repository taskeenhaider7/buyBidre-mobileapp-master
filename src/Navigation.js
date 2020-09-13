import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import SignInScreen from './Auth/SignInScreen';
import SignUpScreen from './Auth/SignUpScreen';
import ForgetPasswordScreen from './Auth/ForgetPasswordScreen';
import AsyncStorage from '@react-native-community/async-storage';
import SellerScreen from './Seller/SellerScreen';
import BuyerScreen from './Buyer/BuyerScreen';
import AdminScreen from './Admin/AdminScreen';
import Detail from './Components/Detail';

const Stack = createStackNavigator();

const Navigation = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkIsLoggedIn = async () => {
        try {
            await AsyncStorage.getItem('userType').then(value => {
                setIsLoggedIn(!!value);
            });
        } catch (e) {
            // saving error
        }
    };
    useEffect(()=>{
        checkIsLoggedIn().done();
    })

    return (
        <NavigationContainer>
            {
                isLoggedIn ? (
                    <Stack.Navigator>
                        <Stack.Screen name="seller" component={SellerScreen} options={{title:"Seller"}}/>
                        <Stack.Screen name="buyer" component={BuyerScreen} options={{title:"Buyer"}}/>
                        <Stack.Screen name="admin" component={AdminScreen} options={{title:"Admin"}}/>
                        <Stack.Screen name="Detail" component={Detail}/>
                    </Stack.Navigator>
                ) : (
                    <Stack.Navigator>
                        <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}}/>
                        <Stack.Screen name="Signup" component={SignUpScreen}
                                      options={{title: 'Sign Up', headerTitleContainerStyle: {left: 50}}}/>
                        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen}
                                      options={{title: 'Reset Password', headerTitleContainerStyle: {left: 50}}}/>

                        <Stack.Screen name="seller" component={SellerScreen} options={{title:"Seller"}}/>
                        <Stack.Screen name="buyer" component={BuyerScreen} options={{title:"Buyer"}}/>
                        <Stack.Screen name="admin" component={AdminScreen} options={{title:"Admin"}}/>
                        <Stack.Screen name="Detail" component={Detail}/>
                    </Stack.Navigator>
                )
            }

        </NavigationContainer>
    );
};

export default Navigation;
