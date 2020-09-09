import React from 'react';
import {
    View,
    Text,
    Image,
    Linking,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView,
    Picker,
    AsyncStorage,
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import constants from '../../Constants';
import {Button, CardSection, Spinner} from '../useableComponents/common';
// import auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';
import {WEBAPI} from '../extras/WEBAPI';
// import { from './useableComponents/common';

const WIDTH = Math.round(Dimensions.get('window').width);

// a = 2;

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stateLanguage: '',
            userInfo: '',
            loggedIn: '',
            email: '',
            password: '',
            spinnerShow: false,
            isSignup: false,
            forgetPassword: false,
            loginTypeSeller: false,
            type: ''
        }
    }

    componentDidMount() {
        // await AsyncStorage.removeItem('AccessToken');
        this.gettingAsyncData();
    }

    gettingAsyncData = async () => {
        let userIdSimple = await AsyncStorage.getItem('AccessTokenSimpleLogin');
        if (userIdSimple) {
            console.log("Already had toked")
            this.setState({loggedIn: false}, () => {
                const pushAction = StackActions.replace('Drawer', {screenProps: this.props.navigation});
                this.props.navigation.dispatch(pushAction);
            });
        } else {
            console.log("Token not exit, logged off");
            this.setState({...this.state, loggedIn: false});
        }
    }
    handleLogin = async (type) => {
        let obj = {
            email: this.state.email,
            password: this.state.password,
            type: type
        }
        await new WEBAPI().login(obj).then((response) => {
            if (response.message === "Login Successfully.") {
                const pushAction = StackActions.replace('Drawer', {loginTypeSeller: response.type});
                this.props.navigation.dispatch(pushAction);
            } else {
                alert(response.message);
            }
        })

        this.setState({spinnerShow: true})
        if (this.state.email == '' || this.state.password == '') {
            this.setState({spinnerShow: false}, () => alert("Enter valid Data"))

            alert("Enter valid Data")
        } else {
            auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((response) => {
                    this.setState({spinnerShow: false})
                    console.log('The response is ', response)
                    AsyncStorage.setItem('AccessTokenSimpleLogin', response.user.uid);
                    const pushAction = StackActions.replace('Drawer', {screenProps: this.props.navigation});
                    this.props.navigation.dispatch(pushAction);
                })
                .catch((error) => {
                        this.setState({spinnerShow: false}, () => alert("Your error is :\n" + error))
                        console.log('The error response is ', error)
                    }
                )

        }

    }

    handleSignup = async (type) => {
        let obj = {
            "fname": "ali",
            "lname": "account",
            "email": this.state.email,
            "password": this.state.password,
            "type": this.state.type,
            "addr1": "test address",
            "city": "Bainbridge",
            "postal": "21904",
            "country": "United States",
            "mobile": "03001111",
            "acctype": "seller",
            "statename": "barcelena",
            "cty": "xyz",
            "zipcode": "12345",

        }

        await new WEBAPI().signup(obj).then((response) => {
            console.log('', response)
            if (response.message === "Signup Successfully") {
                const pushAction = StackActions.replace('Drawer', {loginTypeSeller: response.type});
                this.props.navigation.dispatch(pushAction);
            } else {
                alert(response.message)
            }
        })
        // const pushAction = StackActions.replace('Drawer', { loginTypeSeller: this.state.loginTypeSeller });
        // this.props.navigation.dispatch(pushAction);
        // this.setState({ spinnerShow: true })
        // if (this.state.email == '' || this.state.password == '') {
        //     this.setState({ spinnerShow: false }, () => alert("Enter valid Data"))

        //     alert("Enter valid Data")
        // }
        // else {
        //     auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        //         .then((response) => {
        //             this.setState({ spinnerShow: false }, () => alert('New Account is Created'))
        //             console.log('The create user response is ', response)
        //             AsyncStorage.setItem('AccessTokenSimpleLogin', response.user.uid);

        //         })
        //         .catch((error) => {
        //             this.setState({ spinnerShow: false }, () =>
        //                 alert("Your error is :\n" + error)
        //             )
        //         })
        // }
    }
    resetPassword = () => {
        const pushAction = StackActions.replace('Drawer', {loginTypeSeller: this.state.loginTypeSeller});
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

    }

    showSpinner(size) {
        return (
            <View style={{}}>
                <ActivityIndicator size={size} color={constants.whiteColor}/>
            </View>
        );
    }

    setAcctype(acctype) {
        this.setState({...this.state, acctype});
    }

    render() {
        console.disableYellowBox = true
        // console.log('The states are',this.state)
        return (
            <SafeAreaView style={styles.MainContainer}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.MainContainer}>
                        {this.state.loggedIn
                            ?
                            <View style={{
                                flex: 1, alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                {this.showSpinner("large")}
                            </View>

                            :
                            <View style={styles.backgroundImageStyle}>
                                <View style={{flex: .4, justifyContent: 'center'}}>
                                    <Text style={styles.logoStyle}>
                                        Sign Up
                                    </Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    <View style={{marginTop: 0}}>
                                        <View style={{flexDirection: 'row', marginLeft: 10,}}>
                                            <TextInput
                                                label="First Name"
                                                value={this.state.fname}
                                                onChangeText={text => this.setState({fname})}
                                                placeholder='First Name'
                                                placeholderTextColor={constants.whiteColor}
                                                underlineColorAndroid='transparent'
                                                style={{
                                                    marginTop: 30,
                                                    paddingLeft: 10,
                                                    width: 140,
                                                    height: 40,
                                                    fontSize: 15,
                                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                                    borderColor: this.state.isSignup ? constants.greenColor : constants.redColor,
                                                    // shadowOpacity: 2,
                                                    borderRadius: 12,
                                                    borderWidth: 1,
                                                    marginHorizontal: 15,
                                                    color: constants.whiteColor
                                                }}
                                            />
                                            <TextInput

                                                label="Last Name"
                                                value={this.state.lname}
                                                onChangeText={text => this.setState({lname})}
                                                placeholder='Last Name'
                                                placeholderTextColor={constants.whiteColor}
                                                underlineColorAndroid='transparent'
                                                style={{
                                                    marginTop: 30,
                                                    paddingLeft: 10,
                                                    width: 150,
                                                    height: 40,
                                                    fontSize: 15,
                                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                                    borderColor: this.state.isSignup ? constants.greenColor : constants.redColor,
                                                    // shadowOpacity: 2,
                                                    borderRadius: 12,
                                                    borderWidth: 1,
                                                    marginHorizontal: 0,
                                                    color: constants.whiteColor

                                                }}
                                            />
                                        </View>
                                        <View>
                                            <TextInput
                                                placeholder='Phone number, email address or username'
                                                placeholderTextColor={constants.whiteColor}
                                                underlineColorAndroid='transparent'
                                                onChangeText={email => this.setState({email})}
                                                value={this.state.email}
                                                style={{
                                                    marginTop: 10,
                                                    paddingLeft: 10,
                                                    width: WIDTH - 55,
                                                    height: 40,
                                                    fontSize: 15,
                                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                                    borderColor: this.state.isSignup ? constants.greenColor : constants.redColor,
                                                    // shadowOpacity: 2,
                                                    borderRadius: 12,
                                                    borderWidth: 1,
                                                    marginHorizontal: 25,
                                                    color: constants.whiteColor
                                                }}/>
                                            <TextInput
                                                secureTextEntry
                                                placeholder='Password'
                                                placeholderTextColor={constants.whiteColor}
                                                underlineColorAndroid='transparent'
                                                onChangeText={password => this.setState({password})}
                                                value={this.state.password}
                                                style={{
                                                    marginTop: 10,
                                                    paddingLeft: 10,
                                                    width: WIDTH - 55,
                                                    height: 40,
                                                    fontSize: 15,
                                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                                    borderColor: this.state.isSignup ? constants.greenColor : constants.redColor,
                                                    // shadowOpacity: 2,
                                                    borderRadius: 12,
                                                    borderWidth: 1,
                                                    marginHorizontal: 25,
                                                    color: constants.whiteColor
                                                }}/>
                                            <TextInput
                                                secureTextEntry
                                                placeholder='Ph #'
                                                placeholderTextColor={constants.whiteColor}
                                                underlineColorAndroid='transparent'
                                                onChangeText={mobile => this.setState({mobile})}
                                                value={this.state.mobile}
                                                style={{
                                                    marginTop: 10,
                                                    paddingLeft: 10,
                                                    width: WIDTH - 55,
                                                    height: 40,
                                                    fontSize: 15,
                                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                                    borderColor: this.state.isSignup ? constants.greenColor : constants.redColor,
                                                    // shadowOpacity: 2,
                                                    borderRadius: 12,
                                                    borderWidth: 1,
                                                    marginHorizontal: 25,
                                                    color: constants.whiteColor
                                                }}/>
                                            <TextInput
                                                secureTextEntry
                                                placeholder='choose image'
                                                type='file'
                                                placeholderTextColor={constants.whiteColor}
                                                underlineColorAndroid='transparent'
                                                onChangeText={password => this.setState({password})}
                                                value={this.state.password}
                                                style={{
                                                    marginTop: 10,
                                                    paddingLeft: 10,
                                                    width: WIDTH - 55,
                                                    height: 40,
                                                    fontSize: 15,
                                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                                    borderColor: this.state.isSignup ? constants.greenColor : constants.redColor,
                                                    // shadowOpacity: 2,
                                                    borderRadius: 12,
                                                    borderWidth: 1,
                                                    marginHorizontal: 25,
                                                    color: constants.whiteColor
                                                }}/>
                                            {/*<Dropdown />*/}
                                            <TextInput
                                                secureTextEntry
                                                placeholder='Address line #1'
                                                placeholderTextColor={constants.whiteColor}
                                                underlineColorAndroid='transparent'
                                                onChangeText={mobile => this.setState({mobile})}
                                                value={this.state.mobile}
                                                style={{
                                                    marginTop: 10,
                                                    paddingLeft: 10,
                                                    width: WIDTH - 55,
                                                    height: 40,
                                                    fontSize: 15,
                                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                                    borderColor: this.state.isSignup ? constants.greenColor : constants.redColor,
                                                    // shadowOpacity: 2,
                                                    borderRadius: 12,
                                                    borderWidth: 1,
                                                    marginHorizontal: 25,
                                                    color: constants.whiteColor
                                                }}/>
                                            <TextInput
                                                secureTextEntry
                                                placeholder='Address line #2'
                                                placeholderTextColor={constants.whiteColor}
                                                underlineColorAndroid='transparent'
                                                onChangeText={mobile => this.setState({mobile})}
                                                value={this.state.mobile}
                                                style={{
                                                    marginTop: 10,
                                                    paddingLeft: 10,
                                                    width: WIDTH - 55,
                                                    height: 40,
                                                    fontSize: 15,
                                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                                    borderColor: this.state.isSignup ? constants.greenColor : constants.redColor,
                                                    // shadowOpacity: 2,
                                                    borderRadius: 12,
                                                    borderWidth: 1,
                                                    marginHorizontal: 25,
                                                    color: constants.whiteColor
                                                }}/>
                                            <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 10}}>
                                                <TextInput
                                                    label="Select state"
                                                    value={this.state.statename}
                                                    onChangeText={text => this.setState({statename})}
                                                    placeholder='State Name'
                                                    placeholderTextColor={constants.whiteColor}
                                                    underlineColorAndroid='transparent'
                                                    style={{
                                                        marginTop: 10,
                                                        paddingLeft: 10,
                                                        width: 150,
                                                        height: 40,
                                                        fontSize: 15,
                                                        backgroundColor: 'rgba(0,0,0,0.02)',
                                                        borderColor: this.state.isSignup ? constants.greenColor : constants.redColor,
                                                        // shadowOpacity: 2,
                                                        borderRadius: 12,
                                                        borderWidth: 1,
                                                        marginHorizontal: 15,
                                                        color: constants.whiteColor
                                                    }}
                                                />
                                                <TextInput

                                                    label="City"
                                                    value={this.state.city}
                                                    onChangeText={text => this.setState({city})}
                                                    placeholder='City'
                                                    placeholderTextColor={constants.whiteColor}
                                                    underlineColorAndroid='transparent'
                                                    style={{
                                                        marginTop: 10,
                                                        paddingLeft: 10,
                                                        width: 140,
                                                        height: 40,
                                                        fontSize: 15,
                                                        backgroundColor: 'rgba(0,0,0,0.02)',
                                                        borderColor: this.state.isSignup ? constants.greenColor : constants.redColor,
                                                        // shadowOpacity: 2,
                                                        borderRadius: 12,
                                                        borderWidth: 1,
                                                        marginHorizontal: 0,
                                                        color: constants.whiteColor

                                                    }}
                                                />
                                            </View>
                                            <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 10}}>
                                                <TextInput
                                                    label="Zip Code"
                                                    value={this.state.zipcode}
                                                    onChangeText={text => this.setState({zipcode})}
                                                    placeholder='Zip Code'
                                                    placeholderTextColor={constants.whiteColor}
                                                    underlineColorAndroid='transparent'
                                                    style={{
                                                        marginTop: 10,
                                                        paddingLeft: 10,
                                                        width: 150,
                                                        height: 40,
                                                        fontSize: 15,
                                                        backgroundColor: 'rgba(0,0,0,0.02)',
                                                        borderColor: this.state.isSignup ? constants.greenColor : constants.redColor,
                                                        // shadowOpacity: 2,
                                                        borderRadius: 12,
                                                        borderWidth: 1,
                                                        marginHorizontal: 15,
                                                        color: constants.whiteColor
                                                    }}
                                                />
                                                <TextInput

                                                    label="United States"
                                                    value={this.state.country}
                                                    onChangeText={text => this.setState({country})}
                                                    placeholder='Country'
                                                    placeholderTextColor={constants.whiteColor}
                                                    underlineColorAndroid='transparent'
                                                    style={{
                                                        marginTop: 10,
                                                        paddingLeft: 10,
                                                        width: 140,
                                                        height: 40,
                                                        fontSize: 15,
                                                        backgroundColor: 'rgba(0,0,0,0.02)',
                                                        borderColor: this.state.isSignup ? constants.greenColor : constants.redColor,
                                                        // shadowOpacity: 2,
                                                        borderRadius: 12,
                                                        borderWidth: 1,
                                                        marginHorizontal: 0,
                                                        color: constants.whiteColor

                                                    }}
                                                />
                                            </View>


                                        </View>
                                        {/*{!this.state.forgetPassword &&
                                        <View>
                                            <TextInput
                                                secureTextEntry
                                                placeholder='Password'
                                                placeholderTextColor={constants.whiteColor}
                                                underlineColorAndroid='transparent'
                                                onChangeText={password => this.setState({password})}
                                                value={this.state.password}
                                                style={{
                                                    marginTop: 10,
                                                    paddingLeft: 10,
                                                    width: WIDTH - 55,
                                                    height: 50,
                                                    fontSize: 15,
                                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                                    borderColor: this.state.isSignup ? constants.greenColor : constants.redColor,
                                                    // shadowOpacity: 2,
                                                    borderRadius: 12,
                                                    borderWidth: 1,
                                                    marginHorizontal: 25,
                                                    color: constants.whiteColor
                                                }}/>
                                        </View>
                                        }
                                        {this.state.isSignup &&*/}
                                        <View>
                                            <TextInput
                                                secureTextEntry
                                                placeholder='type'
                                                placeholderTextColor={constants.whiteColor}
                                                underlineColorAndroid='transparent'
                                                onChangeText={type => this.setState({type})}
                                                value={this.state.type}
                                                style={{
                                                    marginTop: 10,
                                                    paddingLeft: 10,
                                                    width: WIDTH - 55,
                                                    height: 50,
                                                    fontSize: 15,
                                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                                    borderColor: this.state.isSignup ? constants.greenColor : constants.redColor,
                                                    // shadowOpacity: 2,
                                                    borderRadius: 12,
                                                    borderWidth: 1,
                                                    marginHorizontal: 25,
                                                    color: constants.whiteColor
                                                }}/>
                                        </View>

                                    </View>


                                    <CardSection>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.handleSignup()
                                            }}
                                            style={{
                                                marginTop: 10,
                                                flex: 1,
                                                alignSelf: 'center',
                                                // borderColor:'#007aff',
                                                backgroundColor: constants.greenColor,
                                                // backgroundColor:constants.whiteColor,
                                                // borderWidth:1,
                                                marginLeft: 25,
                                                marginRight: 25,
                                                borderRadius: 7,
                                            }}>
                                            <View style={{alignSelf: 'center'}}>
                                                <View>
                                                    {this.state.spinnerShow ?
                                                        this.showSpinner("large")
                                                        :
                                                        <Text style={styles.textStyle}>{'SIGNUP'}</Text>
                                                    }
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                    </CardSection>


                                    <View>
                                        <Text style={{color: constants.whiteColor, marginTop: 10}}>
                                            -------------------OR -------------------
                                        </Text>
                                    </View>

                                    <View>
                                        <TouchableOpacity style={{flexDirection: 'row'}}
                                                          onPress={() => this.props.navigation.navigate('Login')}
                                        >
                                            <Text style={{color: constants.whiteColor, marginTop: 10, fontSize: 12}}>
                                                Already have an account
                                            </Text>
                                            <Text style={{
                                                color: constants.whiteColor,
                                                marginTop: 10,
                                                fontSize: 12,
                                                fontWeight: 'bold'
                                            }}>
                                                Login
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

                        }
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
            // alignItems: 'center',
            // justifyContent: 'center',
            // paddingTop: (Platform.OS === 'ios') ? 20 : 0
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
        padding: 10, marginTop: 10, marginBottom: 10
    },
    backgroundImageStyle: {
        flex: 1,
        width: null,
        height: '100%',
        // justifyContent:'center',
        alignItems: 'center',

    },
    logoStyle: {
        marginTop: 18,
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
        color: constants.whiteColor
    },
    loginButtonStyle: {
        paddingLeft: 10,
        paddingRight: 10
    },
    textStyle: {
        //alignSelf: 'center',
        // marginLeft: 25,
        color: constants.mainColor,
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
        backgroundColor: "#2E4053",
        // backgroundColor:constants.whiteColor,
        // borderWidth:1,
        marginLeft: 25,
        marginRight: 25,
        borderRadius: 5,
    },
    buttonStyleGreen: {
        marginTop: 10,
        flex: 1,
        alignSelf: 'stretch',
        // borderColor:'#007aff',
        backgroundColor: constants.greenColor,
        // backgroundColor:constants.whiteColor,
        // borderWidth:1,
        marginLeft: 25,
        marginRight: 25,
        borderRadius: 5,
    },
    bottomView: {
        width: '100%',
        marginTop: 20,
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

        // marginTop: Constants.statusBarHeight,
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 0,
    },
})
export default Signup;