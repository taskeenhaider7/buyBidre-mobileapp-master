import React from 'react'
import { View, Text, FlatList, Image, AsyncStorage, TouchableOpacity, KeyboardAvoidingView, Dimensions, StyleSheet } from 'react-native';
import constants from '../Constants'
import moment from 'moment'
import { Searchbar } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { scale, verticalScale } from './extras/scalingComponent'

const WIDTH = Math.round(Dimensions.get('window').width); a = 2;


const messagesData = [
    {
        name: "Jhon",
        date: moment().format('ll'),
        message: "hello Brother I want to buy ",
        img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
        name: "William",
        date: moment().format('ll'),
        message: "What is the price ? ",
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/1200px-Pierre-Person.jpg'

    },
    {
        name: "Ahmad",
        date: moment().format('ll'),
        message: "Welcome ",
        img: 'https://miro.medium.com/max/2560/1*gBQxShAkxBp_YPb14CN0Nw.jpeg'

    },
    {
        name: "Khalil",
        date: moment().format('ll'),
        message: "ok got it ",
        img: 'https://www.lifewire.com/thmb/JbIIh6ewCm49Eon66ExjbxCFJfg=/1080x1080/smart/filters:no_upscale()/fb-block-5b0a48eaba61770036afbed4-7df519e007a64108a65084e814ee4740.jpg'

    },
    {
        name: "Jhon",
        date: moment().format('ll'),
        message: "hello Brother I want to buy ",
        img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
        name: "William",
        date: moment().format('ll'),
        message: "What is the price ? ",
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/1200px-Pierre-Person.jpg'

    },
    {
        name: "Ahmad",
        date: moment().format('ll'),
        message: "Welcome ",
        img: 'https://miro.medium.com/max/2560/1*gBQxShAkxBp_YPb14CN0Nw.jpeg'

    },
    {
        name: "Khalil",
        date: moment().format('ll'),
        message: "ok got it ",
        img: 'https://www.lifewire.com/thmb/JbIIh6ewCm49Eon66ExjbxCFJfg=/1080x1080/smart/filters:no_upscale()/fb-block-5b0a48eaba61770036afbed4-7df519e007a64108a65084e814ee4740.jpg'

    },
    {
        name: "Jhon",
        date: moment().format('ll'),
        message: "hello Brother I want to buy ",
        img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
        name: "William",
        date: moment().format('ll'),
        message: "What is the price ? ",
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/1200px-Pierre-Person.jpg'

    },
    {
        name: "Ahmad",
        date: moment().format('ll'),
        message: "Welcome ",
        img: 'https://miro.medium.com/max/2560/1*gBQxShAkxBp_YPb14CN0Nw.jpeg'

    },
    {
        name: "Khalil",
        date: moment().format('ll'),
        message: "ok got it ",
        img: 'https://www.lifewire.com/thmb/JbIIh6ewCm49Eon66ExjbxCFJfg=/1080x1080/smart/filters:no_upscale()/fb-block-5b0a48eaba61770036afbed4-7df519e007a64108a65084e814ee4740.jpg'

    },
    {
        name: "Jhon",
        date: moment().format('ll'),
        message: "hello Brother I want to buy ",
        img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
        name: "William",
        date: moment().format('ll'),
        message: "What is the price ? ",
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/1200px-Pierre-Person.jpg'

    },
    {
        name: "Ahmad",
        date: moment().format('ll'),
        message: "Welcome ",
        img: 'https://miro.medium.com/max/2560/1*gBQxShAkxBp_YPb14CN0Nw.jpeg'

    },
    {
        name: "Khalil",
        date: moment().format('ll'),
        message: "ok got it ",
        img: 'https://www.lifewire.com/thmb/JbIIh6ewCm49Eon66ExjbxCFJfg=/1080x1080/smart/filters:no_upscale()/fb-block-5b0a48eaba61770036afbed4-7df519e007a64108a65084e814ee4740.jpg'

    }
]
class Notifications extends React.Component {
    constructor() {
        super()
        this.state = {
            cartData: [], firstQuery: ""
        }
    }
    renderHeader = () => {
        return (
            <View style={styles.headerStyle}>

                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyleHeader}>Notifications</Text>
                </View>

            </View>
        );
    }
    renderItemData = (item) => {
        console.log("item", item)
        let data = item.item
        return (
            <TouchableOpacity>
                <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ flex: 1.5 }}>
                            <Avatar.Image size={50} source={{ uri: data.img }} style={{ backgroundColor: '#74C5D5' }} />
                        </View>
                        <View style={{ flex: 6.5 ,padding:5}}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold',color:constants.whiteColor }}>
                                {data.name} 
                            </Text>
                            <Text style={{ fontSize: 13, color:'black' }}>
                                just Uploaded a new Posts
                            </Text>
                        </View>
                        <View style={{ flex: 2 ,padding:5}}>
                            <Text style={{ fontSize: 12, color:'black' }}>
                                {data.date}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                {this.renderHeader()}
                <FlatList
                    data={messagesData}
                    renderItem={(item) => this.renderItemData(item)}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    MainContainer:
    {
        backgroundColor: "white",
        flex: 1,
    },
    headerStyle: {
        backgroundColor: constants.whiteColor,
        justifyContent: 'center',
        alignItems: 'center',
        height: verticalScale(50),
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1.9,
        elevation: 2,
        position: 'relative',
        flexDirection: 'row'


    },
    textStyleHeader: {
        fontSize: 25,
        marginLeft: scale(20),
        fontWeight: 'bold',
        color: constants.mainColor,
        paddingTop: verticalScale(10),
        // alignContent: 'center',
        // alignSelf: 'center',
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    backgroundImageStyle: {
        flex: 1,
        width: null,
        height: '100%',
        // justifyContent:'center',
        alignItems: 'center'
    },
    logoStyle: {
        marginTop: 80,
        marginBottom: 10,
        color: 'white',
        // width: 175,
        height: 170,
        fontSize: 30,
        fontWeight: 'bold',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    inputStyle: {
        marginTop: 10,
        paddingLeft: 10,
        width: WIDTH - 55,
        height: 50,
        fontSize: 15,
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderColor: '#E51C24',
        shadowOpacity: 2,
        borderRadius: 12,
        borderWidth: 1,
        marginHorizontal: 25,
        color: 'white'
    },
    loginButtonStyle: {
        paddingLeft: 10,
        paddingRight: 10
    },
    textStyle0: {
        //alignSelf: 'center',
        // marginLeft: 25,
        color: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonStyle: {
        marginTop: 10,
        flex: 1,
        alignSelf: 'stretch',
        // borderColor:'#007aff',
        backgroundColor: '#E51C24',
        // backgroundColor:'white',
        // borderWidth:1,
        marginLeft: 25,
        marginRight: 25,
        borderRadius: 5,
    },
    bottomView: {
        width: '100%',
        marginTop: 80,
        height: 30,
        borderTopWidth: 0.3,
        borderColor: 'white',
        // backgroundColor: '#FF9800', 
        justifyContent: 'flex-end',
        alignItems: 'center',
        // position: 'absolute',
        bottom: 0,

    },
    thumbnailStyle: {
        height: 50,
        width: 50,
        borderRadius: 50
    },
    dataStyle: {
        justifyContent: 'space-around',
        flexDirection: 'column'
    },
    textStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: constants.whiteColor
    },
    thumbnailMarginStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 10
    },
    imageStyle: {
        height: 300,
        flex: 1,
        width: null,
        marginLeft: 2,
        marginRight: 2,
        marginBottom: 2,
        borderRadius: 5
    }
})
export default Notifications