import React from 'react'
import Button, {Card, Avatar,Paragraph, DataTable, Searchbar} from 'react-native-paper'



const WIDTH = Math.round(Dimensions.get('window').width);
import Header, {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Image,
    ScrollView,
    SafeAreaView, TextInput, Linking
} from 'react-native'
import constants from "../Constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Input, Overlay} from "react-native-elements";
import {scale} from "../Services/scalingComponents";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "rn-fetch-blob";
import {WEBAPI} from "../Services/Services";
import {Spinner} from "./Spinner";
import {CardSection} from "./CardSection";
import Divider from "react-native-paper";

class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            payload:{
                fname:"",
                lname:"",
                email:"",
                subject: '',
                mobile:"",
                message:""
            }
        }
    }
    render() {

        return (
            <SafeAreaView style={styles.MainContainer}>
                <ScrollView style={{marginHorizontal:10}}>
                    <View >
                        <Text style={{alignSelf:"center",marginTop:15, fontSize:20,fontWeight:"bold",color:"red"}}>Instant Contact</Text>
                        <Text style={{alignSelf:"center",marginTop:10,fontStyle:"italic"}}>+571-437-8377</Text>
                        <Icon
                            name="phone"
                            color={'green'}
                            style={{marginLeft:107,marginTop:-22}}
                            size={25}
                            />
                        <Text style={{alignSelf:"center",marginTop:10,fontStyle:"italic"}}>info@BuyBidRE.com</Text>
                        <Icon
                            name="mail"
                            color={'red'}
                            style={{marginLeft:100,marginTop:-22}}
                            size={25}
                        />

                        <Text style={{alignSelf:"center"}}>______________________</Text>
                    </View>
                    <View >
                        <Text style={{alignSelf:"center",marginTop:15, fontSize:20,fontWeight:"bold"}}>CONTACT US</Text>
                        <Text style={{alignSelf:"center",marginTop:7,fontStyle:"italic"}}>Drop us a Line</Text>
                    </View>
                    <View>
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
                                marginTop: 15,
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
                            placeholder='Email address'
                            placeholderTextColor={constants.whiteColor}
                            underlineColorAndroid='transparent'
                            onChangeText={email => this.setState({
                                ...this.state,
                                payload: {...this.state.payload, email}
                            })}
                            value={this.state.payload.email}
                            style={{
                                marginTop: 15,
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
                            }}/>
                        <TextInput

                            label="Subject"
                            value={this.state.payload.subject}
                            onChangeText={subject => this.setState({
                                ...this.state,
                                payload: {...this.state.payload, subject}
                            })}
                            placeholder='Subject'
                            placeholderTextColor={constants.whiteColor}
                            underlineColorAndroid='transparent'
                            style={{
                                marginTop: 15,
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
                                marginTop: 15,
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
                            }}/>
                        <TextInput
                            secureTextEntry
                            placeholder='message'
                            multiline={true}
                            numberOfLines={6}
                            placeholderTextColor={constants.whiteColor}
                            underlineColorAndroid='transparent'
                            onChangeText={mobile => this.setState({
                                ...this.state,
                                payload: {...this.state.payload, message}
                            })}
                            value={this.state.payload.message}
                            style={{
                                marginTop: 15,
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
                            }}/>
                        <CardSection>
                            <TouchableOpacity
                                onPress={() => {
                                    alert("Thanks for contacting us")
                                }}
                                style={{
                                    marginTop: 20,
                                    flex: 1,
                                    alignSelf: 'center',
                                    backgroundColor: constants.greenColor,
                                    marginLeft: 25,
                                    marginRight: 25,
                                    borderRadius: 7,
                                }}>
                                <View style={{alignSelf: 'center'}}>
                                    <View>
                                            <Text style={{color:"white", fontSize:25}}>{'SUBMIT'}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        </CardSection>
                        <View style={{
                            flexDirection: "row",
                            marginLeft: 2,
                            marginTop: 20,
                            justifyContent: "space-between"
                        }}>
                            <Text style={{color: constants.whiteColor, fontSize: 11}}>
                                Copyright Buybidre.com
                            </Text>
                            <TouchableOpacity onPress={()=>{
                                Linking.openURL('https://documentcloud.adobe.com/link/track?uri=urn%3Aaaid%3Ascds%3AUS%3A146cb0f1-c326-47fd-b320-b41922a8d7f3#pageNum=1');
                            }}>
                                <Text style={{color:"blue", fontSize: 14}}>
                                    Terms and Condition | privacy & policy
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>




                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: "white",
        flex: 1,
    }
})
export default Contact;
