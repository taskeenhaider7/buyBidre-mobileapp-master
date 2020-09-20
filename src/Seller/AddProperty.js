import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    Button,
    View,
    TouchableOpacity
} from "react-native";
import constants from "../Constants";
import DropDownPicker from "react-native-dropdown-picker";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "rn-fetch-blob";
import {WEBAPI} from "../Services/Services";
import {RadioButton, Switch, Text, TouchableRipple} from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import {CardSection, Spinner} from "../components";
import {Input} from "react-native-elements";

const options = {
    title: 'Select Options to Upload Your Post',
    takePhotoButtonTitle: 'Open Camera',
    chooseFromLibraryButtonTitle: 'Choose from Gallery',
};

class AddProperty extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            payload: {
                propertyTitle: "",
                propertyDescription: "",
                category: "",
                propertyFor: "sale",
                propertyTax: "",
                bedroom: "",
                halfBathroom: "",
                bathroom: "",
                sq_area: "",
                floor: "",
                price: "",
                isCommissionPayed: true,
                agentCommission: "",
                offerAmount: "",
                bidAmount: "",
                address1: "",
                address2: "",
                state: "",
                cty: "",
                zipcode: "",
                country: ""

            }
        }
    }

    chooseImagePickerOptions = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response, 'state', this.state.avatarSource);
            if (response.didCancel) {
                console.log('User cancel image picker', ' avatar ', this.state.avatarSource);
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                this.setState({avatarSource: response.uri}, () => {
                    this.setState({...this.state, imageResponse: response})
                })
            }
        });
    }
    handleUploadPhoto = async () => {
        const data = this.state.imageResponse;
        let dataImage =[
            {
                name: 'avatar',
                filename: data.fileName ? data.fileName : '',
                type: data.type,
                data: RNFetchBlob.wrap(data.path)
            },
            {
                name: 'info',
                data: JSON.stringify({
                    price: this.state.price,
                    title: this.state.title,
                    prop_for: 'rent',
                    addr1: '',
                    city: this.state.city,
                    postal: '',
                    country: this.state.country,
                })
            },
        ]
        await new WEBAPI().postData(dataImage).then(response => {
            console.log('The post data', response)
            alert(response.message);
            this.props.navigation.navigate('seller', {screen: 'seller'})
        })
    };

    toggleCommissionCheck() {
        const isCommissionPayed = !this.state.payload.isCommissionPayed;
        this.setState({
            ...this.state,
            payload: {...this.state.payload, isCommissionPayed}
        })
    }

    render() {
        return (
            // <SafeAreaView style={styles.MainContainer}>
                <ScrollView style={styles.scrollView}>
                    <View style={{marginBottom: 10}}>
                        <TextInput
                            label="Property Title"
                            value={this.state.payload.propertyTitle}
                            onChangeText={propertyTitle => this.setState({
                                ...this.state,
                                payload: {...this.state.payload, propertyTitle}
                            })}
                            placeholder='Property Title'
                            underlineColorAndroid='transparent'
                            style={{
                                marginTop: 10,
                                paddingLeft: 10,
                                flex: 0.9,
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
                            value={this.state.payload.propertyDescription}
                            multiline={true}
                            numberOfLines={4}
                            placeholder='Property Description'
                            underlineColorAndroid='transparent'
                            onChangeText={propertyDescription => this.setState({
                                ...this.state,
                                payload: {...this.state.payload, propertyDescription}
                            })}
                            style={{
                                marginTop: 10,
                                paddingLeft: 10,
                                flex: 0.9,
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
                        <DropDownPicker
                            items={[{
                                "value": "15",
                                "label": "New category",

                            }, {
                                "value": "10",
                                "label": "Single Family",

                            }, {
                                "value": "11",
                                "label": "Bank Owned",

                            }, {
                                "value": "12",
                                "label": "Land"
                            }, {
                                "value": "13",
                                "label": "Townhouse  ",

                            }, {
                                "value": "14",
                                "label": "Office",

                            }, {
                                "value": "16",
                                "label": "New",

                            }]}
                            defaultIndex={0}
                            placeholder={'Property Category'}
                            itemStyle={{
                                justifyContent: 'flex-start', borderBottomColor: "black",

                            }}
                            dropDownStyle={{backgroundColor: '#fafafa', borderColor: "green"}}
                            containerStyle={{
                                height: 40,
                                marginHorizontal: 15,
                                marginTop: 10,

                            }}
                            onChangeItem={item => this.setState({
                                ...this.state,
                                payload: {...this.state.payload, category: item.value}
                            })}
                        />
                        <DropDownPicker
                            items={[{
                                "value": "15",
                                "label": "Sale",

                            }, {
                                "value": "10",
                                "label": "Rent",

                            }, {
                                "value": "11",
                                "label": "Owned",

                            }]}
                            defaultIndex={0}
                            placeholder={'Property For'}
                            itemStyle={{
                                justifyContent: 'flex-start', borderBottomColor: "black",

                            }}
                            dropDownStyle={{backgroundColor: '#fafafa', borderColor: "green"}}
                            containerStyle={{
                                height: 40,
                                marginHorizontal: 15,
                                marginTop: 10,

                            }}
                            onChangeItem={item => this.setState({
                                ...this.state,
                                payload: {...this.state.payload, propertyFor: item.value}
                            })}
                        />
                        <TextInput
                            label="Property Tax"
                            value={this.state.payload.propertyTax}
                            onChangeText={propertyTax => this.setState({
                                ...this.state,
                                payload: {...this.state.payload, propertyTax}
                            })}
                            placeholder='Property Tax #id'
                            underlineColorAndroid='transparent'
                            style={{
                                marginTop: 10,
                                paddingLeft: 10,
                                flex: 0.9,
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

                        <View style={{flexDirection: "row"}}>
                            <TextInput
                                label="Bedrooms"
                                value={this.state.payload.bedroom}
                                onChangeText={bedroom => this.setState({
                                    ...this.state,
                                    payload: {...this.state.payload, bedroom}
                                })}
                                placeholder='# of Bedrooms'
                                underlineColorAndroid='transparent'
                                style={{
                                    marginTop: 10,
                                    paddingLeft: 10,
                                    flex: 0.9,
                                    height: 40,
                                    width: 140,
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
                                label="Bathrooms"
                                value={this.state.payload.bathroom}
                                onChangeText={bathroom => this.setState({
                                    ...this.state,
                                    payload: {...this.state.payload, bathroom}
                                })}
                                placeholder='Bathrooms'
                                underlineColorAndroid='transparent'
                                style={{
                                    marginTop: 10,
                                    paddingLeft: 10,
                                    flex: 0.9,
                                    height: 40,
                                    width: 140,
                                    fontSize: 15,
                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                    borderColor: constants.greenColor,
                                    borderRadius: 7,
                                    borderWidth: 1,
                                    marginHorizontal: 15,
                                    color: constants.whiteColor
                                }}
                            />

                        </View>
                        <View style={{flexDirection: "row"}}>
                            <TextInput
                                label="# of Bathrooms"
                                value={this.state.payload.halfBathroom}
                                onChangeText={halfBathroom => this.setState({
                                    ...this.state,
                                    payload: {...this.state.payload, halfBathroom}
                                })}
                                placeholder='# of 1/2 Bathrooms'
                                underlineColorAndroid='transparent'
                                style={{
                                    marginTop: 6,
                                    paddingLeft: 10,
                                    flex: 0.9,
                                    height: 40,
                                    width: 140,
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
                                label="Area"
                                value={this.state.payload.sq_area}
                                onChangeText={sq_area => this.setState({
                                    ...this.state,
                                    payload: {...this.state.payload, sq_area}
                                })}
                                placeholder='Area sq Feet'
                                underlineColorAndroid='transparent'
                                style={{
                                    marginTop: 6,
                                    paddingLeft: 10,
                                    flex: 0.9,
                                    height: 40,
                                    width: 140,
                                    fontSize: 15,
                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                    borderColor: constants.greenColor,
                                    borderRadius: 7,
                                    borderWidth: 1,
                                    marginHorizontal: 15,
                                    color: constants.whiteColor
                                }}
                            />

                        </View>
                        <TextInput
                            label="Floors"
                            value={this.state.payload.floor}
                            onChangeText={floor => this.setState({
                                ...this.state,
                                payload: {...this.state.payload, floor}
                            })}
                            placeholder='Floors'
                            underlineColorAndroid='transparent'
                            style={{
                                marginTop: 10,
                                paddingLeft: 10,
                                flex: 0.9,
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
                            label="Price"
                            value={this.state.payload.price}
                            onChangeText={price => this.setState({
                                ...this.state,
                                payload: {...this.state.payload, price}
                            })}
                            placeholder='Price'
                            underlineColorAndroid='transparent'
                            style={{
                                marginTop: 10,
                                paddingLeft: 10,
                                flex: 0.9,
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
                        <TouchableRipple onPress={() => this.toggleCommissionCheck()}>
                            <View style={styles.preference}>
                                <Text style={{fontWeight: 'bold'}}>Buyer Agent Commission</Text>
                                <View pointerEvents="none">
                                    <Switch value={this.state.payload.isCommissionPayed}/>
                                </View>
                            </View>
                        </TouchableRipple>
                        <TextInput
                            label="Agent Commission"
                            value={this.state.payload.agentCommission}
                            onChangeText={agentCommission => this.setState({
                                ...this.state,
                                payload: {...this.state.payload, agentCommission}
                            })}
                            placeholder='Agent Commission'
                            underlineColorAndroid='transparent'
                            style={{
                                marginTop: -2,
                                paddingLeft: 10,
                                flex: 0.9,
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
                            label="Offer Amount"
                            value={this.state.payload.offerAmount}
                            onChangeText={offerAmount => this.setState({
                                ...this.state,
                                payload: {...this.state.payload, offerAmount}
                            })}
                            placeholder='Offer Amount'
                            underlineColorAndroid='transparent'
                            style={{
                                marginTop: 10,
                                paddingLeft: 10,
                                flex: 0.9,
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
                            label="Bid Amount"
                            value={this.state.payload.bidAmount}
                            onChangeText={bidAmount => this.setState({
                                ...this.state,
                                payload: {...this.state.payload, bidAmount}
                            })}
                            placeholder='Bid Amount'
                            underlineColorAndroid='transparent'
                            style={{
                                marginTop: 10,
                                paddingLeft: 10,
                                flex: 0.9,
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
                            label="Address 1"
                            value={this.state.payload.address1}
                            onChangeText={address1 => this.setState({
                                ...this.state,
                                payload: {...this.state.payload, address1}
                            })}
                            placeholder='Address 1'
                            underlineColorAndroid='transparent'
                            style={{
                                marginTop: 10,
                                paddingLeft: 10,
                                flex: 0.9,
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
                            label="Address 2"
                            value={this.state.payload.address2}
                            onChangeText={address2 => this.setState({
                                ...this.state,
                                payload: {...this.state.payload, address2}
                            })}
                            placeholder='Address 2'
                            underlineColorAndroid='transparent'
                            style={{
                                marginTop: 10,
                                paddingLeft: 10,
                                flex: 0.9,
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
                                    flex: 1,
                                    marginHorizontal: 6
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
                                    flex: 1,
                                    marginRight: 17,
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
                        <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 10}}>
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
                                    flex: 0.9,
                                    height: 40,
                                    fontSize: 15,
                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                    borderColor: constants.greenColor,
                                    borderRadius: 7,
                                    borderWidth: 1,
                                    marginHorizontal: 6,
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
                                    marginRight: 17,
                                    flex: 1,
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

                        <CardSection>
                            <TouchableOpacity
                                onPress={() => {
                                    this.chooseImagePickerOptions();
                                }}
                                style={{
                                    marginTop: 10,
                                    flex: 1,
                                    alignSelf: 'center',
                                    backgroundColor: constants.darkMainColor,
                                    marginLeft: 10,
                                    marginRight: 10,
                                    borderRadius: 7,
                                }}>
                                <View style={{alignSelf: 'center'}}>
                                    <View>
                                        {
                                            <Text style={styles.textStyle}>{'Upload Photo'}</Text>
                                        }
                                    </View>
                                </View>
                            </TouchableOpacity>

                        </CardSection>

                        <CardSection>
                            <TouchableOpacity
                                onPress={() => {
                                    this.handleUploadPhoto().then()
                                }}
                                style={{
                                    marginTop: 10,
                                    flex: 1,
                                    alignSelf: 'center',
                                    backgroundColor: constants.greenColor,
                                    marginLeft: 10,
                                    marginRight: 10,
                                    borderRadius: 7,
                                }}>
                                <View style={{alignSelf: 'center'}}>
                                    <Text style={styles.textStyle}>{'Add'}</Text>
                                </View>
                            </TouchableOpacity>

                        </CardSection>


                    </View>
                </ScrollView>
        // </SafeAreaView>
        )

    }
}

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: "white",
        flex: 1,
    },
    scrollView: {
        backgroundColor: "white",
        marginHorizontal: 10,
        flex:1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
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
    }

})
export default AddProperty;
