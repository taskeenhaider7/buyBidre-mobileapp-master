import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import constants from '../Constants'
import { Searchbar, Avatar } from 'react-native-paper';
import { scale, verticalScale } from './extras/scalingComponent'

const WIDTH = Math.round(Dimensions.get('window').width); a = 2;
class Profile extends React.Component {
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
                    <Text style={styles.textStyleHeader}>Profile</Text>
                </View>

            </View>
        );
    }
    renderProfilePic = () => {
        return (
            <View style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignSelf: 'center',
                paddingTop: verticalScale(12)
            }}>
                <Avatar.Image size={verticalScale(100)} source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }} style={{ backgroundColor: '#74C5D5' }} />

            </View>
        )
    }
    renderProfileData = () => {
        return (
            <View style={{ paddingTop: verticalScale(20) }}>
                <View style={{ flexDirection: 'row', paddingLeft: scale(10), paddingBottom: verticalScale(7) }}>
                    <View style={{}}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Name:</Text>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 13, color: 'gray' }}>Jhon Ally</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: scale(10), paddingBottom: verticalScale(7) }}>
                    <View style={{}}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Contact:</Text>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 13, color: 'gray' }}>+9231234567891</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: scale(10), paddingBottom: verticalScale(7) }}>
                    <View style={{}}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Email:</Text>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 13, color: 'gray' }}>yes@gmail.com</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: scale(10), paddingBottom: verticalScale(7) }}>
                    <View style={{}}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Account Type:</Text>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 13, color: 'gray' }}>{this.props.route.params.loginTypeSeller?'Seller':'Buyer'}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: scale(10), paddingBottom: verticalScale(7) }}>
                    <View style={{}}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Number of Posts:</Text>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 13, color: 'gray' }}>32</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: scale(10), paddingBottom: verticalScale(7) }}>
                    <View style={{}}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Total Views:</Text>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 13, color: 'gray' }}>1.2 M</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: scale(10), paddingBottom: verticalScale(7) }}>
                    <View style={{}}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Address:</Text>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 13, color: 'gray' }}>Islamabad, Pakistan</Text>
                    </View>
                </View>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.MainContainer}>
                {this.renderHeader()}
                {this.renderProfilePic()}
                {this.renderProfileData()}
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
export default Profile