import React from 'react'
import {Card, Avatar, Searchbar} from 'react-native-paper'
import {CardSection} from "./useableComponents/common";
import {Image, Text, View} from "react-native";

class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }


    renderBuyer = (item) => {
        let name = item.item.title
        let price = JSON.parse(item.item.price).price
        let image = JSON.parse(item.item.featured_image).url
        let address = JSON.parse(item.item.address).city
        return (
            <Card style={{margin: 10}} key={Math.random().toString()}>

                <View style={{padding: 10}}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <View style={{flex: 1.5}}>
                            <Avatar.Image size={50} source={{uri: item.item.ownerImg}}
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

            </Card>
        )
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                <Card>
                    <CardSection>
                        <Image source={image.item.uri} style={{
                            height: 300,
                            flex: 1,
                            width: null,
                            marginLeft: 2,
                            marginRight: 2,
                            marginBottom: 2,
                            borderRadius: 5
                        }}/>
                    </CardSection>
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: "white",
        flex: 1,
    }
})
export default Detail
