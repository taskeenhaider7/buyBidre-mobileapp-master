import React, {useEffect, useState} from 'react';
import BuyerScreen from './Buyer/BuyerScreen';
import SellerScreen from './Seller/SellerScreen';
import AdminScreen from './Admin/AdminScreen';
import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeScreen = ({navigation}) => {
    const checkIsLoggedIn = async () => {
        try {
            await AsyncStorage.getItem('type').then((userType) => {
                if (userType !== null) {
                    switch (userType){
                        case 'seller' :{
                            navigation.navigate("Seller");
                        }
                        case 'buyer' :{
                            navigation.navigate("Buyer");
                        }
                        case 'admin' :{
                            navigation.navigate("Admin");
                        }
                        default:{
                            navigation.navigate("Seller");
                        }
                    }
                }
            });

        } catch (e) {
            // saving error
        }
    };

    checkIsLoggedIn().done();

    return (

        <></>

    );
};

export default HomeScreen;
