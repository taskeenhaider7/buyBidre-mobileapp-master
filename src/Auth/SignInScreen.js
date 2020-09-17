import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import {WEBAPI} from '../Services/Services';
import AsyncStorage from '@react-native-community/async-storage';
import constants from '../Constants';
import {CardSection, Spinner} from '../components';
import {AuthContext} from "../components/context";

const WIDTH = Math.round(Dimensions.get('window').width);

const SignInScreen = ({navigation}) => {
    const [showSpinner, setShowSpinner] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = React.useContext(AuthContext);

    useEffect(()=>{
        setShowSpinner(false);
        setEmail('');
        setPassword('');
    },[])
    //LogIn
    const handleLogin = async () => {
        setShowSpinner(true);
        if (!email || !password) {
            setShowSpinner(false);
            alert('Enter valid Data');
        }
        let obj = {email, password};
        await signIn(obj).then((response) => {
            if (response.message === 'Login Successfully.') {
                setShowSpinner(false);
                const stringResponse = JSON.stringify(response);
                AsyncStorage.setItem('response', stringResponse);
                //navigation.navigate(response.type, {screen: response.type});

            } else {
                alert(response.message);
                setShowSpinner(false);
            }
        });

    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.MainContainer}>

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
                                    onChangeText={email => setEmail(email)}
                                    value={email}
                                    style={styles.inputStyle}/>

                            </View>

                            <View>
                                <TextInput
                                    secureTextEntry
                                    placeholder='Password'
                                    placeholderTextColor={constants.whiteColor}
                                    underlineColorAndroid='transparent'
                                    onChangeText={password => setPassword(password)}
                                    value={password}
                                    style={styles.inputStyle}/>
                            </View>

                            <View style={{marginTop: 7}}>
                                <TouchableOpacity style={{flexDirection: 'row'}}
                                                  onPress={() => navigation.navigate('ForgetPassword')}>

                                    <Text style={{
                                        color: constants.whiteColor,
                                        fontSize: 12,
                                    }}>Forgot your Login details?</Text>
                                    <Text style={{
                                        color: constants.whiteColor,
                                        fontSize: 12,
                                        fontWeight: 'bold',
                                    }}>Get help signing in</Text>

                                </TouchableOpacity>
                            </View>

                            <CardSection>
                                <TouchableOpacity
                                    onPress={() => {
                                        handleLogin().done();
                                    }}
                                    style={{
                                        marginTop: 10,
                                        flex: 1,
                                        alignSelf: 'center',
                                        backgroundColor: constants.greenColor,
                                        marginLeft: 25,
                                        marginRight: 25,
                                        borderRadius: 7,
                                    }}>
                                    <View style={{alignSelf: 'center'}}>
                                        <View>
                                            {
                                                showSpinner &&
                                                <Spinner style={styles.textStyle}/>
                                            }
                                            <Text style={styles.textStyle}>{'LOGIN'}</Text>

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
                                                  onPress={() => navigation.navigate('Signup')}>

                                    <Text style={{color: constants.whiteColor, marginTop: 10, fontSize: 12}}>
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
};

const styles = StyleSheet.create({
    MainContainer:
        {
            backgroundColor: constants.mainColor,
            flex: 1,
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
        color: constants.whiteColor,
        fontSize: 30,
        fontWeight: 'bold',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    inputStyle: {
        marginTop: 20,
        paddingLeft: 10,
        width: WIDTH - 55,
        fontSize: 15,
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderColor: constants.redColor,
        borderRadius: 7,
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
});

export default SignInScreen;
