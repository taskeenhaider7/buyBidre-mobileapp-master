import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    SafeAreaView,
    ScrollView, Image,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {CardSection, Spinner} from '../Components';

import constants from '../Constants';

const WIDTH = Math.round(Dimensions.get('window').width);

class ForgetPasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            spinnerShow: false,
        };
    }


    resetPassword = () => {
        const pushAction = StackActions.replace('Login');
        this.props.navigation.dispatch(pushAction);
        // this.setState({ spinnerShow: true })
        // if (this.state.email == '') {
        //     this.setState({ spinnerShow: false }, () => alert("Enter valid Data"))
        //     alert("Enter valid Data")
        // }
        // else {
        //     auth().sendPasswordResetEmail(this.state.email).then((response) => {
        //         this.setState({ spinnerShow: false }, () => alert('Email has been send '))
        //         console.log('The email reset response is ', response)
        //     })
        //         .catch((error) => {
        //             this.setState({ spinnerShow: false }, () =>
        //                 alert("Your error is :\n" + error)
        //             )
        //         })
        // }

    };

    render() {
        console.disableYellowBox = true;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.MainContainer}>
                        <View style={styles.backgroundImageStyle}>
                            <View style={{flex: 1, justifyContent: 'center', marginTop: 50}}>
                                <Image
                                    style={styles.stretch}
                                    source={require('../../appIcon.jpeg')}

                                />
                            </View>
                            <View style={{flex: 1.3, alignItems: 'center'}}>
                                <View style={{marginTop: 50}}>
                                    <TextInput
                                        placeholder='email address'
                                        placeholderTextColor={constants.whiteColor}
                                        underlineColorAndroid='transparent'
                                        onChangeText={email => this.setState({email})}
                                        value={this.state.email}
                                        style={{
                                            marginTop: 15,
                                            paddingLeft: 10,
                                            width: WIDTH - 55,
                                            height: 50,
                                            fontSize: 15,
                                            backgroundColor: 'rgba(0,0,0,0.02)',
                                            borderColor: this.state.isSignup ? constants.greenColor : constants.redColor,
                                            borderRadius: 7,
                                            borderWidth: 1,
                                            marginHorizontal: 25,
                                            color: constants.whiteColor,
                                        }}/>

                                </View>

                                <CardSection>
                                    <TouchableOpacity
                                        onPress={
                                            () => {
                                                this.resetPassword();
                                            }
                                        }
                                        style={styles.buttonStyleGreen}>
                                        <View style={{alignSelf: 'center'}}>
                                            <View>
                                                {
                                                    this.state.spinnerShow ?
                                                        <Spinner/>
                                                        :
                                                        <Text style={styles.textStyle}>Reset password</Text>
                                                }
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </CardSection>

                                <View style={{marginTop: 7}}>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigate('Login')}
                                        style={{flexDirection: 'row'}}>

                                        <Text style={{
                                            color: constants.whiteColor,
                                            fontSize: 12,
                                            marginRight: 5
                                        }}>Already have an account</Text>
                                        <Text style={{
                                            color: constants.whiteColor,
                                            textAlign:"right",
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                        }}>Go to Login Screen</Text>

                                    </TouchableOpacity>
                                </View>

                                <View>
                                    <Text style={{color: constants.whiteColor, marginTop: 10}}>
                                        -------------------OR -------------------
                                    </Text>
                                </View>

                                <View>
                                    <TouchableOpacity style={{flexDirection: 'row'}}
                                                      onPress={() => this.props.navigation.navigate('Signup')}>

                                        <Text style={{color: constants.whiteColor, marginTop: 10, marginRight: 5, fontSize: 12}}>
                                            Don't have an account
                                        </Text>
                                        <Text style={{
                                            color: constants.whiteColor,
                                            marginTop: 10,
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                        }}>
                                            Sign up
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.bottomView}>
                                    <Text style={{color: constants.whiteColor, fontSize: 12}}>
                                        BUY BIDRE " Sell Your Property "
                                    </Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer:
        {
            backgroundColor: constants.mainColor,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: (Platform.OS === 'ios') ? 20 : 0
        },
    stretch: {
        width: 130,
        height: 130,
        resizeMode: 'cover',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 10, marginTop: 10, marginBottom: 10,
    },
    backgroundImageStyle: {
        flex: 1,
        width: null,
        height: '100%',
        // justifyContent:'center',
        alignItems: 'center',

    },
    logoStyle: {
        marginTop: 0,
        // backgroundColor:'red',
        // marginBottom: 10,
        color: constants.whiteColor,
        // width: 175,
        // height: 50,
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
        borderColor: constants.redColor,
        shadowOpacity: 2,
        borderRadius: 12,
        borderWidth: 1,
        marginHorizontal: 25,
        color: constants.whiteColor,
    },
    loginButtonStyle: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    textStyle: {
        //alignSelf: 'center',
        // marginLeft: 25,
        color: constants.mainColor,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonStyle: {
        marginTop: 10,
        flex: 1,
        alignSelf: 'stretch',
        // borderColor:'#007aff',
        backgroundColor: '#2E4053',
        // backgroundColor:constants.whiteColor,
        // borderWidth:1,
        marginLeft: 25,
        marginRight: 25,
        borderRadius: 5,
    },
    buttonStyleGreen: {
        marginTop: 15,
        flex: 1,
        height: 50,
        alignSelf: 'stretch',
        backgroundColor: constants.greenColor,
        marginLeft: 25,
        marginRight: 25,
        borderRadius: 5,
    },
    bottomView: {
        width: '100%',
        marginTop: 80,
        height: 30,
        borderTopWidth: 0.3,
        borderColor: constants.whiteColor,
        // backgroundColor: '#FF9800',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // position: 'absolute',
        bottom: 0,

    },
    container: {
        flex: 1,
        // marginTop: Constants.statusBarHeight,
    },
    scrollView: {
        backgroundColor: 'white',
        marginHorizontal: 0,
    },
});
export default ForgetPasswordScreen;
