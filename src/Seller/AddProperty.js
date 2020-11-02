import React from 'react';
import {
    ScrollView,
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity, SafeAreaView,
} from 'react-native';
import constants from '../Constants';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {WEBAPI} from '../Services/Services';
import {Switch, Text, TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {CardSection} from '../components';
import AsyncStorage from '@react-native-community/async-storage';

const options = {
    title: 'Select Options to Upload Your Post',
    takePhotoButtonTitle: 'Open Camera',
    chooseFromLibraryButtonTitle: 'Choose from Gallery',
};

class AddProperty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payload: {
                title: '',
                propertyDescription: '',
                c_id: '',
                prop_for: 'sale',
                propertyTax: '',
                bedroom: '',
                halfBathroom: '',
                bathroom: '',
                sq_area: '',
                floor: '',
                price: '',
                isCommissionPayed: true,
                agentCommission: '',
                offerAmount: '',
                bidAmount: '',
                addr1: '',
                address2: '',
                state: '',
                status: 'pending',
                city: '',
                postal: '',
                country: '',

            },
        };
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
                    this.setState({...this.state, imageResponse: response});
                });
            }
        });
    };
    AddProperty = async () => {
        const property = {
            c_id: this.state.payload.c_id,
            title: this.state.payload.title,
            descp: this.state.payload.propertyDescription,
            prop_for: this.state.payload.prop_for,
            tax_id: this.state.payload.propertyTax,
            status: this.state.payload.status,
            userId: this.state.payload.user_id,
            featured_image: 'featured image',
            details: JSON.stringify({
                'beds': this.state.payload.bedroom,
                'bathrooms': this.state.payload.bathroom,
                'half_bathrooms': this.state.payload.halfBathroom,
                'area': this.state.payload.sq_area,
                'floors': this.state.payload.floor,
                'type': this.state.payload.prop_for,
            }),
            address: JSON.stringify({
                'addr1': this.state.payload.addr1,
                'city': this.state.payload.city,
                'postal': this.state.payload.postal,
                'country': this.state.payload.country,
            }),
            price: JSON.stringify({
                'price': this.state.payload.price,
                'agent_comission': this.state.payload.agentCommission,
                'total_price': '',
            }),
        };

        await new WEBAPI().addProperty(property).then(response => {
            if (response.code === 200) {
                this.props.navigation.navigate('seller', {screen: 'seller'});
                //this.uploadPropertyImage(response.id)
            }
            alert(response.message);
        });
    };

    uploadPropertyImage = async (id) => {
        const data = this.state.imageResponse;
        let imageData = {
            "name": 'avatar',
            "filename" : (data && data.fileName) ? data.fileName : '',
            "type" : data ? data.type : '',
            "data" :  RNFetchBlob.wrap(data.data)
        };

        await new WEBAPI().uploadFile(imageData, id).then(response => {
            response.code !== 400 && this.props.navigation.navigate('seller', {screen: 'seller'});
        });
    };

    toggleCommissionCheck() {
        const isCommissionPayed = !this.state.payload.isCommissionPayed;
        this.setState({
            ...this.state,
            payload: {...this.state.payload, isCommissionPayed},
        });
    }

    async componentDidMount(): void {
        await AsyncStorage.getItem('response').then(value => {
            if (value !== null) {
                const responseObj = JSON.parse(value);
                console.log('user response object ', responseObj);
                this.setState({
                    ...this.state,
                    payload: {...this.state.payload, user_id: responseObj.ID},
                });
            }
        });
    }

    render() {
        return (
            /*<SafeAreaView style={styles.MainContainer}>*/
            <ScrollView>
                <View style={{marginBottom: 10}}>
                    <TextInput
                        label="Property Title"
                        value={this.state.payload.title}
                        onChangeText={title => this.setState({
                            ...this.state,
                            payload: {...this.state.payload, title},
                        })}
                        placeholder='Property Title'
                        underlineColorAndroid='transparent'
                        style={styles.inputStyle}
                    />
                    <TextInput
                        value={this.state.payload.propertyDescription}
                        multiline={true}
                        numberOfLines={4}
                        placeholder='Property Description'
                        underlineColorAndroid='transparent'
                        onChangeText={propertyDescription => this.setState({
                            ...this.state,
                            payload: {...this.state.payload, propertyDescription},
                        })}
                        style={styles.inputStyle}
                    />
                    <DropDownPicker
                        items={[{
                            'value': '15',
                            'label': 'New Category',

                        }, {
                            'value': '10',
                            'label': 'Single Family',

                        }, {
                            'value': '11',
                            'label': 'Bank Owned',

                        }, {
                            'value': '12',
                            'label': 'Land',
                        }, {
                            'value': '13',
                            'label': 'Townhouse  ',

                        }, {
                            'value': '14',
                            'label': 'Office',

                        }, {
                            'value': '16',
                            'label': 'New',

                        }]}
                        defaultIndex={0}
                        placeholder={'Property Category'}
                        style={{borderColor: 'green', backgroundColor: 'rgba(0,0,0,0.02)'}}
                        placeholderStyle={{
                            color: 'rgba(0.1,0.1,0.3,0.4)',
                        }}
                        itemStyle={{justifyContent: 'flex-start'}}
                        labelStyle={{
                            color: '#000',
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        containerStyle={{
                            height: 50,
                            marginHorizontal: 15,
                            marginTop: 15,
                        }}
                        onChangeItem={item => this.setState({
                            ...this.state,
                            payload: {...this.state.payload, c_id: item.value},
                        })}
                    />
                    <DropDownPicker
                        items={[{
                            'value': '15',
                            'label': 'Sale',

                        }, {
                            'value': '10',
                            'label': 'Rent',

                        }, {
                            'value': '11',
                            'label': 'Owned',

                        }]}
                        defaultIndex={0}
                        placeholder={'Property For'}
                        style={{borderColor: 'green', backgroundColor: 'rgba(0,0,0,0.02)'}}
                        placeholderStyle={{
                            color: 'rgba(0.1,0.1,0.3,0.4)',
                        }}
                        labelStyle={{
                            color: '#000',
                        }}
                        itemStyle={{justifyContent: 'flex-start'}}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        containerStyle={{
                            height: 50,
                            marginHorizontal: 15,
                            marginTop: 15,
                        }}
                        onChangeItem={item => this.setState({
                            ...this.state,
                            payload: {...this.state.payload, prop_for: item.value},
                        })}
                    />
                    <TextInput
                        label="Property Tax"
                        value={this.state.payload.propertyTax}
                        onChangeText={propertyTax => this.setState({
                            ...this.state,
                            payload: {...this.state.payload, propertyTax},
                        })}
                        placeholder='Property Tax #id'
                        underlineColorAndroid='transparent'
                        style={styles.inputStyle}
                    />

                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            label="Bedrooms"
                            value={this.state.payload.bedroom}
                            onChangeText={bedroom => this.setState({
                                ...this.state,
                                payload: {...this.state.payload, bedroom},
                            })}
                            placeholder='# of Bedrooms'
                            underlineColorAndroid='transparent'
                            style={styles.leftRowInputStyle}
                        />
                        <TextInput
                            label="Bathrooms"
                            value={this.state.payload.bathroom}
                            onChangeText={bathroom => this.setState({
                                ...this.state,
                                payload: {...this.state.payload, bathroom},
                            })}
                            placeholder='Bathrooms'
                            underlineColorAndroid='transparent'
                            style={styles.rightRowInputStyle}
                        />

                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            label="# of Bathrooms"
                            value={this.state.payload.halfBathroom}
                            onChangeText={halfBathroom => this.setState({
                                ...this.state,
                                payload: {...this.state.payload, halfBathroom},
                            })}
                            placeholder='# of 1/2 Bathrooms'
                            underlineColorAndroid='transparent'
                            style={styles.leftRowInputStyle}
                        />
                        <TextInput
                            label="Area"
                            value={this.state.payload.sq_area}
                            onChangeText={sq_area => this.setState({
                                ...this.state,
                                payload: {...this.state.payload, sq_area},
                            })}
                            placeholder='Area sq Feet'
                            underlineColorAndroid='transparent'
                            style={styles.rightRowInputStyle}
                        />

                    </View>
                    <TextInput
                        label="Floors"
                        value={this.state.payload.floor}
                        onChangeText={floor => this.setState({
                            ...this.state,
                            payload: {...this.state.payload, floor},
                        })}
                        placeholder='Floors'
                        underlineColorAndroid='transparent'
                        style={styles.inputStyle}
                    />
                    <TextInput
                        label="price"
                        value={this.state.payload.price}
                        onChangeText={price => this.setState({
                            ...this.state,
                            payload: {...this.state.payload, price},
                        })}
                        placeholder='price'
                        underlineColorAndroid='transparent'
                        style={styles.inputStyle}
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
                            payload: {...this.state.payload, agentCommission},
                        })}
                        placeholder='Agent Commission'
                        underlineColorAndroid='transparent'
                        style={styles.inputStyle}
                    />
                    <TextInput
                        label="Offer Amount"
                        value={this.state.payload.offerAmount}
                        onChangeText={offerAmount => this.setState({
                            ...this.state,
                            payload: {...this.state.payload, offerAmount},
                        })}
                        placeholder='Offer Amount'
                        underlineColorAndroid='transparent'
                        style={styles.inputStyle}
                    />
                    <TextInput
                        label="Bid Amount"
                        value={this.state.payload.bidAmount}
                        onChangeText={bidAmount => this.setState({
                            ...this.state,
                            payload: {...this.state.payload, bidAmount},
                        })}
                        placeholder='Bid Amount'
                        underlineColorAndroid='transparent'
                        style={styles.inputStyle}
                    />
                    <TextInput
                        label="Address 1"
                        value={this.state.payload.addr1}
                        onChangeText={addr1 => this.setState({
                            ...this.state,
                            payload: {...this.state.payload, addr1},
                        })}
                        placeholder='Address 1'
                        underlineColorAndroid='transparent'
                        style={styles.inputStyle}
                    />
                    <TextInput
                        label="Address 2"
                        value={this.state.payload.address2}
                        onChangeText={address2 => this.setState({
                            ...this.state,
                            payload: {...this.state.payload, address2},
                        })}
                        placeholder='Address 2'
                        underlineColorAndroid='transparent'
                        style={styles.inputStyle}
                    />
                    <View style={{flexDirection: 'row'}}>
                        <DropDownPicker
                            items={[
                                {
                                    label: 'california',
                                    value: 'california',
                                    icon: () => <Icon name="flag" size={18} color="#900"/>,
                                },
                                {
                                    label: 'UK',
                                    value: 'UK',
                                    icon: () => <Icon name="flag" size={18} color="#900"/>,
                                },
                            ]}
                            defaultIndex={0}
                            placeholder={'Select State'}
                            style={{borderColor: 'green', backgroundColor: 'rgba(0,0,0,0.02)'}}
                            placeholderStyle={{
                                color: 'rgba(0.1,0.1,0.3,0.4)',
                            }}
                            labelStyle={{
                                color: '#000',
                            }}
                            itemStyle={{justifyContent: 'flex-start'}}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            containerStyle={{
                                marginTop: 15,
                                marginLeft: 15,
                                marginRight: 15,
                                height: 50,
                                marginHorizontal: 6,
                                flex: 1.1,
                            }}
                            onChangeItem={item => this.setState({
                                ...this.state,
                                payload: {...this.state.payload, state: item.value},
                            })}
                        />
                        <TextInput

                            label="City"
                            value={this.state.payload.city}
                            onChangeText={city => this.setState({
                                ...this.state,
                                payload: {...this.state.payload, city},
                            })}
                            placeholder='City'
                            // placeholderTextColor={constants.whiteColor}
                            underlineColorAndroid='transparent'
                            style={styles.rightRowInputStyle}
                        />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            label="Zip Code"
                            value={this.state.payload.postal}
                            onChangeText={postal => this.setState({
                                ...this.state,
                                payload: {...this.state.payload, postal},
                            })}
                            placeholder='Zip Code'
                            // placeholderTextColor={constants.whiteColor}
                            underlineColorAndroid='transparent'
                            style={styles.leftRowInputStyle}
                        />
                        <TextInput

                            label="United States"
                            value={this.state.payload.country}
                            placeholder='country'
                            onChangeText={country => this.setState({
                                ...this.state,
                                payload: {...this.state.payload, country},
                            })}
                            underlineColorAndroid='transparent'
                            style={styles.rightRowInputStyle}
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
                                this.AddProperty().then();
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
            /*</SafeAreaView>*/
        );

    }
}

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: 'white',
        flex: 1,
    },
    scrollView: {
        backgroundColor: 'white',
        flex: 1,
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
        fontWeight: 'bold',
    },
    buttonStyle: {
        marginTop: 10,
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#2E4053',
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
    rightRowInputStyle: {
        paddingLeft: 10,
        marginRight: 15,
        // marginLeft: 15,
        marginTop: 15,
        flex: 1,
        fontSize: 15,
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderColor: constants.greenColor,
        borderRadius: 7,
        borderWidth: 1,
        marginHorizontal: 0,
        color: constants.whiteColor,
    },
    leftRowInputStyle: {
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        flex: 1,
        fontSize: 15,
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderColor: constants.greenColor,
        borderRadius: 7,
        borderWidth: 1,
        marginHorizontal: 0,
        color: constants.whiteColor,
    },
    inputStyle: {
        paddingLeft: 10,
        marginRight: 15,
        marginLeft: 15,
        marginTop: 15,
        flex: 1,
        fontSize: 15,
        backgroundColor: 'rgba(0,0,0,0.02)',
        borderColor: constants.greenColor,
        borderRadius: 7,
        borderWidth: 1,
        marginHorizontal: 0,
        color: constants.whiteColor,
    },

});
export default AddProperty;
