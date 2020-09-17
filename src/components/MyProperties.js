import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import constants from '../Constants';
import {Card, Avatar, Searchbar} from 'react-native-paper'
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import SellerCard from "../Seller/SellerCard";
import {WEBAPI} from '../Services/Services';
import AsyncStorage from "@react-native-community/async-storage";

class MyProperties extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            shopList: ""
        }
    }

    componentDidMount() {
        this.getUserInfo().done()
        this.fetchProducts().done()

    }

    async getUserInfo() {
        const user = await AsyncStorage.getItem('response');
        const responseObj = JSON.parse(user)
        console.log(responseObj.uid)
    }

    fetchProducts = async () => {
        await new WEBAPI().getProducts().then((response) => {
            AsyncStorage.getItem('response').then((user) => {
                const responseObj = JSON.parse(user)
                console.log(responseObj.uid)
                // this.setState({
                //     shopList: response.records.filter(item => {item.userId, responseObj.uid})
                // })
                this.setState({
                    shopList: response.records
                })
            });

        })
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.shopList}
                    renderItem={SellerCard}
                />

            </View>
        )
    }


}

export default MyProperties;
