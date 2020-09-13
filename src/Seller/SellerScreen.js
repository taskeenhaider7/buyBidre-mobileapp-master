
import React from 'react'
import Header, {View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, Image} from 'react-native'
import ImagePicker from 'react-native-image-picker';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons';
import {CardSection,} from '../Components';
import constants from '../Constants';
import {Card, Avatar, Searchbar} from 'react-native-paper'
import {scale, verticalScale} from '../Services/scalingComponents';
import {WEBAPI} from '../Services/Services';

import {Overlay, Input, Button, Icon} from 'react-native-elements'
import RNFetchBlob from 'rn-fetch-blob';
import DropDownPicker from "react-native-dropdown-picker";
import SellerCard from './SellerCard';


const options = {
    title: 'Select Options to Upload Your Post',
    takePhotoButtonTitle: 'Open Camera',
    chooseFromLibraryButtonTitle: 'Choose from Gallery',
};

const WIDTH = Math.round(Dimensions.get('window').width);

class SellerScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarSource: [],
            categoryList: [{
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

            }],
            isVisible: false,
            shopList: [],
            title: '',
            city: '',
            price: '',
            country: '',
            showSearchData: false,
            search: '',
            searchData: '',
        }
    }
    componentDidMount() {
        this.fetchProducts()
        this.getCategoryList()

    }
    getCategoryList = async () => {
        await new WEBAPI().getCategories().then((response) => {
            this.setState({
                categoryList: response.records
            })
        })
    }
    fetchProducts = async () => {
        await new WEBAPI().getProducts().then((response) => {
            console.log('data response is products', response)
            this.setState({
                shopList: response.records
            })
        })
    }
    chooseImagePickerOptions = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response, 'state', this.state.avatarSource);
            if (response.didCancel) {
                console.log('User cancelled image picker', ' avatar ', this.state.avatarSource);
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                this.setState({avatarSource: response.uri}, () => {
                    this.handleUploadPhoto(response)
                })
            }
        });
    }
    renderRow = (image) => {
        return (
            <Card>
                <CardSection>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 5,
                        marginRight: 10
                    }}>
                        <Image
                            source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/1200px-Pierre-Person.jpg'}}
                            style={styles.thumbnailStyle}/>
                    </View>
                    <View>
                        <Text style={{fontSize: 15, fontWeight: 'bold', color: constants.whiteColor}}>Donald
                            Trump</Text>

                        <Text style={{fontSize: 10, color: constants.whiteColor}}>United States</Text>

                        <View style={{flexDirection: 'row', marginTop: 5}}>
                            <Text style={{fontSize: 10, color: constants.whiteColor, fontWeight: 'bold'}}>52M$</Text>
                            <Text style={{
                                fontSize: 10,
                                textDecorationLine: 'line-through',
                                color: 'gray',
                                marginLeft: 5
                            }}>54M$</Text>
                        </View>
                    </View>
                </CardSection>
                <CardSection>
                    <Image source={image.item.uri} style={{
                        height: 300,
                        flex: 1,
                        width: null,
                        marginLeft: 2,
                        marginRight: 2,
                        marginBottom: 2,
                        borderRadius: 5
                    }}/>
                </CardSection>

            </Card>
        )
    }
    renderModal = () => {
        return (
            <Overlay
                isVisible={this.state.isVisible}>
                    <View style={{
                        width: scale(200)
                    }}>
                        <View style={{flexDirection: 'row-reverse'}}>
                            <Icon
                                style={{}}
                                name='close'
                                type='font-awesome'
                                color='black'
                                onPress={() => {
                                    this.setState({isVisible: false})
                                }}
                            />
                        </View>
                        <Input
                            placeholder='Add Title'
                            value={this.state.title}
                            onChange={(text) => {
                                this.setState({title: text})
                            }}
                        />
                        <Input
                            placeholder='Add City'
                            value={this.state.city}
                            onChange={(text) => {
                                this.setState({city: text})
                            }}
                        />
                        <Input
                            placeholder='Add Country'
                            value={this.state.country}
                            onChange={(text) => {
                                this.setState({country: text})
                            }}
                        />
                        <Input
                            placeholder='Add Price'
                            value={this.state.price}
                            onChange={(text) => {
                                this.setState({price: text})
                            }}
                        />

                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            {/*<Button*/}
                            {/*    title="Upload Image and Posts"*/}
                            {/*    buttonStyle={{backgroundColor: 'black'}}*/}
                            {/*    onPress={*/}
                            {/*        this.chooseImagePickerOptions.bind(this)*/}
                            {/*    }*/}
                            {/*/>*/}
                        </View>

                    </View>
                }
            </Overlay>
        )
    }
    handleUploadPhoto = async (data) => {
        alert(data)
        this.setState({updateAppointmentSettingsSpinner: true})
        let dataImage = [
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
            alert(response.message)
        })
    };
    onChangeSearch = (search, categoty) => {
        if (search === "") {
            this.setState({showSearchData: false})
        } else {
            this.setState({showSearchData: true})
        }
        this.setState({
            search,
            searchData: this.state.shopList.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
        });
    }
    renderSearchBar = () => {
        return (
            <View style={{marginTop: verticalScale(5)}}>
                <Searchbar
                    placeholder={"Search by name"}
                    value={this.state.search}
                    onChangeText={this.onChangeSearch}
                />
                <View style={{marginTop: verticalScale(0)}}>
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
                        placeholder={'Select Type'}
                        itemStyle={{
                            justifyContent: 'flex-start', borderBottomColor: "black",

                        }}

                        dropDownStyle={{backgroundColor: 'white', borderColor: "grey"}}
                        containerStyle={{
                            height: 50,
                            width: WIDTH,
                            marginHorizontal: 0,
                            marginTop: 2,
                        }}
                        onChangeItem={item => this.setState({
                            ...this.state,
                            showSearchData: true,
                            searchData: this.state.shopList.filter(item => item.category.toString().includes(item.value.toString()))
                        })}
                    />


                </View>

            </View>
        )
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                {this.renderModal()}

                <View style={{flex: 1}}>
                    {this.renderSearchBar()}
                    <FlatList
                        data={this.state.showSearchData ? this.state.searchData : this.state.shopList}
                        renderItem={SellerCard}
                        ListEmptyComponent={
                            <Text style={{textAlign: 'center', color: constants.whiteColor}}>Click Camera
                                Icon to Add Posts</Text>
                        }
                    />
                </View>

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
        shadowOffset: {width: 0, height: 2},
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
        paddingTop: verticalScale(10)
        // alignContent: 'center',
        // alignSelf: 'center',
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    textStyleLogout: {
        fontSize: 25,
        marginLeft: scale(20),
        fontWeight: 'bold',
        color: constants.mainColor,
        paddingTop: verticalScale(10),
        textAlign: 'right'
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
export default SellerScreen
