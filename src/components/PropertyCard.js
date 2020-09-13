import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import constants from '../Constants';
import {Card, Avatar, Searchbar} from 'react-native-paper'
import {Button} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const PropertyCard = (props) => {
    const navigation = useNavigation();
    const item = props.item.item;
    // console.log(item)
    // console.log(navigation)
    let name = item.title
    let price = JSON.parse(item.price).price
    let image = JSON.parse(item.featured_image).url
    let address = JSON.parse(item.address).city
    return (

        <TouchableOpacity
            onPress={() => {navigation.navigate('Detail', {item})}}>

            <Card style={{margin: 10}} key={Math.random().toString()}>
                <View style={{padding: 10}}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <View style={{flex: 1.5}}>
                            <Avatar.Image size={50} source={{uri: props.item.ownerImg}}
                                          style={{backgroundColor: '#74C5D5'}}/>
                        </View>
                        <View style={{flex: 6.5, padding: 5}}>
                            <Text style={{fontSize: 14, fontWeight: 'bold', color: constants.whiteColor}}>
                                {name}
                            </Text>
                            <Text style={{fontSize: 13, color: 'black'}}>
                                {address}
                            </Text>
                        </View>
                        <View style={{flex: 2, padding: 5}}>
                            <Text style={{fontSize: 12, color: 'black', fontWeight: 'bold'}}>
                                Price: {price}
                            </Text>
                        </View>
                    </View>
                </View>
                <Card.Cover source={{uri: image}}/>
                {props.isBuyer &&
                <Card.Actions>
                    <Button
                        title="Bid This"
                        buttonStyle={{backgroundColor: 'black'}}
                        onPress={
                            () => {
                                alert('You have bid sucessfully')
                            }
                        }
                    />
                </Card.Actions>
                }
            </Card>
        </TouchableOpacity>
    )
}
export {PropertyCard};
