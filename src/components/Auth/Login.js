import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions,
    AsyncStorage,
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import constants from '../../Constants';
import {CardSection} from '../useableComponents/common';
import {StackActions} from '@react-navigation/native';
import {WEBAPI} from '../extras/WEBAPI';

const WIDTH = Math.round(Dimensions.get('window').width);

class Login extends React.Component {
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
        let userIdSimple = await AsyncStorage.getItem('UserInfo');
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
    handleLogin = async () => {

        this.setState({spinnerShow: true});
        if (!this.state.email || !this.state.password) {
            this.setState({spinnerShow: false});
            alert("Enter valid Data")
        }
        let obj = {
            email: this.state.email,
            password: this.state.password,
            type: "seller"
        }
        await new WEBAPI().login(obj).then((response) => {
            if (response.message === "Login Successfully.") {
                this.setState({...this.state, loggedIn: true, spinnerShow: false});
                AsyncStorage.setItem('UserInfo', response);
                const pushAction = StackActions.replace('Drawer', {loginTypeSeller: response.type});
                this.props.navigation.dispatch(pushAction);
            } else {
                alert(response.message);
            }
        })

        /*else {
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

       }*/

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
        return (
            <SafeAreaView style={styles.container}>
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

                                <View style={{flex: 1, justifyContent: 'center', marginTop: 50}}>
                                    <Text style={styles.logoStyle}>
                                        Sign In
                                    </Text>
                                    <Image
                                        style={styles.stretch}
                                        source={require('../../appIcon.jpeg')}

                                    />
                                </View>

                                <View style={{flex: 1, alignItems: 'center'}}>
                                    <View style={{marginTop: 20}}>
                                        <TextInput
                                            placeholder='Phone number, email address or username'
                                            placeholderTextColor={constants.whiteColor}
                                            underlineColorAndroid='transparent'
                                            onChangeText={email => this.setState({email})}
                                            value={this.state.email}
                                            style={{
                                                marginTop: 0,
                                                paddingLeft: 10,
                                                width: WIDTH - 55,
                                                fontSize: 15,
                                                backgroundColor: 'rgba(0,0,0,0.02)',
                                                borderColor: this.state.isSignup ? constants.greenColor : constants.redColor,
                                                // shadowOpacity: 2,
                                                borderRadius: 7,
                                                borderWidth: 1,
                                                marginHorizontal: 25,
                                                color: constants.whiteColor
                                            }}/>

                                    </View>

                                    <View>
                                        <TextInput
                                            secureTextEntry
                                            placeholder='Password'
                                            placeholderTextColor={constants.whiteColor}
                                            underlineColorAndroid='transparent'
                                            onChangeText={password => this.setState({password})}
                                            value={this.state.password}
                                            style={{
                                                marginTop: 15,
                                                paddingLeft: 10,
                                                width: WIDTH - 55,
                                                fontSize: 15,
                                                backgroundColor: 'rgba(0,0,0,0.02)',
                                                borderColor: this.state.isSignup ? constants.greenColor : constants.redColor,
                                                shadowOpacity: 2,
                                                borderRadius: 7,
                                                borderWidth: 1,
                                                marginHorizontal: 25,
                                                color: constants.whiteColor
                                            }}/>
                                    </View>

                                    <View style={{marginTop: 7}}>
                                        <TouchableOpacity onPress={() => this.setState({
                                            forgetPassword: !this.state.forgetPassword,
                                            isSignup: false
                                        })}
                                                          style={{flexDirection: 'row'}}
                                        >

                                            <Text style={{
                                                color: constants.whiteColor,
                                                fontSize: 12
                                            }}>{this.state.forgetPassword ? "" : "Forgot your Login details?"}</Text>
                                            <Text style={{
                                                color: constants.whiteColor,
                                                fontSize: 12,
                                                fontWeight: 'bold'
                                            }}> {this.state.forgetPassword ? "Go to Login Screen" : "Get help signing in"}</Text>

                                        </TouchableOpacity>
                                    </View>

                                    <CardSection>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.handleLogin()
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
                                                        <Text style={styles.textStyle}>{'LOGIN'}</Text>
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
                                                          onPress={() => this.props.navigation.navigate('Signup')}
                                        >
                                            <Text style={{color: constants.whiteColor, marginTop: 10, fontSize: 12}}>
                                                Don't have an account
                                            </Text>
                                            <Text style={{
                                                color: constants.whiteColor,
                                                marginTop: 10,
                                                fontSize: 12,
                                                fontWeight: 'bold'
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
        width: 100,
        height: 100,
        resizeMode: 'cover',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 10, marginTop: 10, marginBottom: 10
    },
    signupbtn: {
        backgroundColor: 'red',
        width: 50,
        height: 40
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
        marginTop: 60,
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
})
export default Login;