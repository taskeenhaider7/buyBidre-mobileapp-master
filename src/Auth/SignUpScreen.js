import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import constants from '../Constants';
import {StackActions} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import {Spinner, CardSection} from '../Components';
import {WEBAPI} from '../Services/Services';

const WIDTH = Math.round(Dimensions.get('window').width);


class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stateLanguage: '',
            userInfo: '',
            loggedIn: '',
            spinnerShow: false,
            loginTypeSeller: false,

            payload: {
                fname: "",
                lname: "",
                email: "",
                password: "",
                type: "",
                addr1: "",
                addr2: "",
                city: "",
                postal: "",
                country: "United States",
                mobile: "",
                state: "",
                cty: "",
                zipcode: "",
            }
        }
    }

    handleSignup = async () => {

        this.setState({...this.state, spinnerShow: true});
        await new WEBAPI().signup(this.state.payload).then((response) => {
            if (response.message === "Signup Successfully") {
                const pushAction = StackActions.replace('Login');
                this.props.navigation.dispatch(pushAction);
                this.setState({...this.state, spinnerShow: false});
            } else {
                alert(response.message);
                this.setState({...this.state, spinnerShow: false});
            }
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.MainContainer}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.MainContainer}>
                        <View style={styles.backgroundImageStyle}>
                            <View style={{flex: 1, alignItems: 'center'}}>
                                <View style={{marginTop: 0}}>
                                    <View style={{flexDirection: 'row', marginLeft: 10,}}>
                                        <TextInput
                                            label="First Name"
                                            value={this.state.payload.fname}
                                            onChangeText={fname => this.setState({
                                                ...this.state,
                                                payload: {...this.state.payload, fname}
                                            })}
                                            placeholder='First Name'
                                            placeholderTextColor={constants.whiteColor}
                                            underlineColorAndroid='transparent'
                                            style={{
                                                marginTop: 30,
                                                paddingLeft: 10,
                                                flex:0.9,
                                                height: 40,
                                                fontSize: 15,
                                                backgroundColor: 'rgba(0,0,0,0.02)',
                                                borderColor: constants.greenColor,
                                                borderRadius: 7,
                                                borderWidth: 1,
                                                marginHorizontal: 15,
                                                color: constants.whiteColor
                                            }}
                                        />
                                        <TextInput

                                            label="Last Name"
                                            value={this.state.payload.lname}
                                            onChangeText={lname => this.setState({
                                                ...this.state,
                                                payload: {...this.state.payload, lname}
                                            })}
                                            placeholder='Last Name'
                                            placeholderTextColor={constants.whiteColor}
                                            underlineColorAndroid='transparent'
                                            style={{
                                                marginTop: 30,
                                                marginRight: 25,
                                                paddingLeft: 10,
                                                flex:1,
                                                height: 40,
                                                fontSize: 15,
                                                backgroundColor: 'rgba(0,0,0,0.02)',
                                                borderColor: constants.greenColor,
                                                borderRadius: 7,
                                                borderWidth: 1,
                                                marginHorizontal: 0,
                                                color: constants.whiteColor

                                            }}
                                        />
                                    </View>
                                    <View style={{zIndex: 10}}>
                                        <TextInput
                                            placeholder='Email address or username'
                                            placeholderTextColor={constants.whiteColor}
                                            underlineColorAndroid='transparent'
                                            onChangeText={email => this.setState({
                                                ...this.state,
                                                payload: {...this.state.payload, email}
                                            })}
                                            value={this.state.payload.email}
                                            style={{
                                                marginTop: 10,
                                                paddingLeft: 10,
                                                width: WIDTH - 55,
                                                height: 40,
                                                fontSize: 15,
                                                backgroundColor: 'rgba(0,0,0,0.02)',
                                                borderColor: constants.greenColor,
                                                borderRadius: 7,
                                                borderWidth: 1,
                                                marginHorizontal: 25,
                                                color: constants.whiteColor
                                            }}/>
                                        <TextInput
                                            secureTextEntry
                                            placeholder='Password'
                                            placeholderTextColor={constants.whiteColor}
                                            underlineColorAndroid='transparent'
                                            onChangeText={password => this.setState({
                                                ...this.state,
                                                payload: {...this.state.payload, password}
                                            })}
                                            value={this.state.payload.password}
                                            style={{
                                                marginTop: 10,
                                                paddingLeft: 10,
                                                width: WIDTH - 55,
                                                height: 40,
                                                fontSize: 15,
                                                backgroundColor: 'rgba(0,0,0,0.02)',
                                                borderColor: constants.greenColor,
                                                borderRadius: 7,
                                                borderWidth: 1,
                                                marginHorizontal: 25,
                                                color: constants.whiteColor
                                            }}/>
                                        <TextInput
                                            secureTextEntry
                                            placeholder='Ph #'
                                            placeholderTextColor={constants.whiteColor}
                                            underlineColorAndroid='transparent'
                                            onChangeText={mobile => this.setState({
                                                ...this.state,
                                                payload: {...this.state.payload, mobile}
                                            })}
                                            value={this.state.payload.mobile}
                                            style={{
                                                marginTop: 10,
                                                paddingLeft: 10,
                                                width: WIDTH - 55,
                                                height: 40,
                                                fontSize: 15,
                                                backgroundColor: 'rgba(0,0,0,0.02)',
                                                borderColor: constants.greenColor,
                                                borderRadius: 7,
                                                borderWidth: 1,
                                                marginHorizontal: 25,
                                                color: constants.whiteColor
                                            }}/>

                                        <DropDownPicker
                                            items={[
                                                {label: 'Seller', value: 'seller'},
                                                {label: 'Buyer', value: 'buyer'},
                                            ]}
                                            defaultIndex={0}
                                            placeholder={'Select Type'}
                                            itemStyle={{
                                                justifyContent: 'flex-start', borderBottomColor: "black"
                                            }}
                                            style={{borderColor: "black"}}
                                            dropDownStyle={{backgroundColor: 'white', borderColor: "black"}}
                                            containerStyle={{
                                                height: 40,
                                                width: WIDTH - 55,
                                                marginHorizontal: 25,
                                                marginTop: 10
                                            }}
                                            onChangeItem={item => this.setState({
                                                ...this.state,
                                                payload: {...this.state.payload, type: item.value}
                                            })}
                                        />
                                        <TextInput
                                            placeholder='Address line #1'
                                            placeholderTextColor={constants.whiteColor}
                                            underlineColorAndroid='transparent'
                                            onChangeText={addr1 => this.setState({
                                                ...this.state,
                                                payload: {...this.state.payload, addr1}
                                            })}
                                            value={this.state.payload.addr1}
                                            style={{
                                                marginTop: 10,
                                                paddingLeft: 10,
                                                width: WIDTH - 55,
                                                height: 40,
                                                fontSize: 15,
                                                backgroundColor: 'rgba(0,0,0,0.02)',
                                                borderColor: constants.greenColor,
                                                borderRadius: 7,
                                                borderWidth: 1,
                                                marginHorizontal: 25,
                                                color: constants.whiteColor
                                            }}/>
                                        <TextInput
                                            placeholder='Address line #2'
                                            placeholderTextColor={constants.whiteColor}
                                            underlineColorAndroid='transparent'
                                            onChangeText={addr2 => this.setState({
                                                ...this.state,
                                                payload: {...this.state.payload, addr2}
                                            })}
                                            value={this.state.payload.addr2}
                                            style={{
                                                marginTop: 10,
                                                paddingLeft: 10,
                                                width: WIDTH - 55,
                                                height: 40,
                                                fontSize: 15,
                                                backgroundColor: 'rgba(0,0,0,0.02)',
                                                borderColor: constants.greenColor,
                                                borderRadius: 7,
                                                borderWidth: 1,
                                                marginHorizontal: 25,
                                                color: constants.whiteColor
                                            }}/>
                                        <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 10}}>
                                            <DropDownPicker
                                                items={[
                                                    {
                                                        label: 'california',
                                                        value: 'california',
                                                        icon: () => <Icon name="flag" size={18} color="#900"/>
                                                    },
                                                    {
                                                        label: 'UK',
                                                        value: 'UK',
                                                        icon: () => <Icon name="flag" size={18} color="#900"/>
                                                    },
                                                ]}
                                                defaultIndex={0}
                                                placeholder={'Select State'}
                                                itemStyle={{
                                                    justifyContent: 'flex-start', borderBottomColor: "black"
                                                }}
                                                style={{borderColor: "black"}}
                                                dropDownStyle={{backgroundColor: 'white', borderColor: "green"}}
                                                containerStyle={{
                                                    height: 40,
                                                    flex:1,
                                                    marginHorizontal: 15
                                                }}
                                                onChangeItem={item => this.setState({
                                                    ...this.state,
                                                    payload: {...this.state.payload, state: item.value}
                                                })}
                                            />
                                            <TextInput

                                                label="City"
                                                value={this.state.payload.city}
                                                onChangeText={city => this.setState({
                                                    ...this.state,
                                                    payload: {...this.state.payload, city}
                                                })}
                                                placeholder='City'
                                                placeholderTextColor={constants.whiteColor}
                                                underlineColorAndroid='transparent'
                                                style={{
                                                    paddingLeft: 10,
                                                    flex:1,
                                                    marginRight:25,
                                                    height: 40,
                                                    fontSize: 15,
                                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                                    borderColor: constants.greenColor,
                                                    borderRadius: 7,
                                                    borderWidth: 1,
                                                    marginHorizontal: 0,
                                                    color: constants.whiteColor

                                                }}
                                            />
                                        </View>
                                        <View style={{flexDirection: 'row', marginTop: 10,marginLeft: 10}}>
                                            <TextInput
                                                label="Zip Code"
                                                value={this.state.payload.zipcode}
                                                onChangeText={zipcode => this.setState({
                                                    ...this.state,
                                                    payload: {...this.state.payload, zipcode}
                                                })}
                                                placeholder='Zip Code'
                                                placeholderTextColor={constants.whiteColor}
                                                underlineColorAndroid='transparent'
                                                style={{
                                                    paddingLeft: 10,
                                                    flex:0.9,
                                                    height: 40,
                                                    fontSize: 15,
                                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                                    borderColor: constants.greenColor,
                                                    borderRadius: 7,
                                                    borderWidth: 1,
                                                    marginHorizontal: 15,
                                                    color: constants.whiteColor
                                                }}
                                            />
                                            <TextInput

                                                label="United States"
                                                value={this.state.payload.country}
                                                placeholder='Country'
                                                placeholderTextColor={constants.whiteColor}
                                                underlineColorAndroid='transparent'
                                                style={{
                                                    paddingLeft: 10,
                                                    marginRight: 25,
                                                    flex:1,
                                                    height: 40,
                                                    fontSize: 15,
                                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                                    borderColor: constants.greenColor,
                                                    borderRadius: 7,
                                                    borderWidth: 1,
                                                    marginHorizontal: 0,
                                                    color: constants.whiteColor

                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>


                                <CardSection>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.handleSignup().done()
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
                                                {this.state.spinnerShow ?
                                                    <Spinner/>
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
        alignItems: 'center',

    },
    logoStyle: {
        marginTop: 18,
        color: constants.whiteColor,
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
        borderRadius: 7,
        borderWidth: 1,
        marginHorizontal: 25,
        color: constants.whiteColor
    },
    loginButtonStyle: {
        paddingLeft: 10,
        paddingRight: 10
    },
    textStyle: {
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
        backgroundColor: "#2E4053",
        marginLeft: 25,
        marginRight: 25,
        borderRadius: 5,
    },
    buttonStyleGreen: {
        marginTop: 10,
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: constants.greenColor,
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
