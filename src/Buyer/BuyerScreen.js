import React from 'react';
import Header, {View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons';
import {CardSection} from '../components/CardSection';
import constants from '../Constants';
import {Card, Avatar, Searchbar} from 'react-native-paper';
import {scale, verticalScale} from '../Services/scalingComponents';
import {WEBAPI} from '../Services/Services';

import {Overlay, Input, Button, Icon} from 'react-native-elements';
import {WebView} from 'react-native-webview';
import RNFetchBlob from 'rn-fetch-blob';
import DropDownPicker from 'react-native-dropdown-picker';
import BuyerCard from './BuyerCard';


const options = {
    title: 'Select Options to Upload Your Post',
    takePhotoButtonTitle: 'Open Camera',
    chooseFromLibraryButtonTitle: 'Choose from Gallery',
};

const WIDTH = Math.round(Dimensions.get('window').width);

class BuyerScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: [],
            categoryList: [{
                'value': '15',
                'label': 'New category',

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
        };
    }

    componentDidMount() {
        this.fetchProperties().done();
        this.getCategoryList().done();

    }

    getCategoryList = async () => {
        await new WEBAPI().getCategories().then((response) => {
            this.setState({
                categoryList: response.records,
            });
        });
    };
    fetchProperties = async () => {
        await new WEBAPI().getProperties().then((response) => {
            // console.log('data response is products', response)
            this.setState({
                shopList: response,
            });
        });
    };
    onChangeSearch = (search, category) => {
        if (search === '') {
            this.setState({showSearchData: false});
        } else {
            this.setState({showSearchData: true});
        }
        this.setState({
            search,
            searchData: this.state.shopList.filter(item => item.title.toLowerCase().includes(search.toLowerCase())),
        });
    };
    SearchProperty = () => {
        return (
            <View style={{marginTop: verticalScale(5)}}>
                <Searchbar
                    placeholder={'Search by name'}
                    value={this.state.search}
                    onChangeText={this.onChangeSearch}
                />
                <View style={{marginTop: verticalScale(0)}}>
                    <DropDownPicker
                        items={[{
                            'value': '15',
                            'label': 'New category',

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
                        placeholder={'Select Type'}
                        itemStyle={{
                            justifyContent: 'flex-start', borderBottomColor: 'black',

                        }}

                        dropDownStyle={{backgroundColor: 'white', borderColor: 'grey'}}
                        containerStyle={{
                            height: 50,
                            width: WIDTH,
                            marginHorizontal: 0,
                            marginTop: 2,
                        }}
                        onChangeItem={item => {
                            this.setState({
                                ...this.state,
                                showSearchData: true,
                                searchData: this.state.shopList.filter(prop => prop.category.toString().includes(item.value.toString())),
                            });
                        }}
                    />


                </View>

            </View>
        );
    };

    render() {
        return (
            <View style={styles.MainContainer}>

                <View>
                    {this.SearchProperty()}
                    <FlatList

                        data={this.state.showSearchData ? this.state.searchData : this.state.shopList}
                        renderItem={BuyerCard}
                        ListEmptyComponent={
                            <Text style={{color: 'grey', textAlign: 'center'}}>Click
                                Camera Icon to Add Posts</Text>
                        }
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer:
        {
            backgroundColor: 'white',
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
        flexDirection: 'row',


    },
    textStyleHeader: {
        fontSize: 25,
        marginLeft: scale(20),
        fontWeight: 'bold',
        color: constants.mainColor,
        paddingTop: verticalScale(10),
    },
    textStyleLogout: {
        fontSize: 25,
        marginLeft: scale(20),
        fontWeight: 'bold',
        color: constants.mainColor,
        paddingTop: verticalScale(10),
        textAlign: 'right',
    },
    backgroundImageStyle: {
        flex: 1,
        width: null,
        height: '100%',
        // justifyContent:'center',
        alignItems: 'center',
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
        color: 'white',
    },
    loginButtonStyle: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    textStyle0: {
        //alignSelf: 'center',
        // marginLeft: 25,
        color: 'white',
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
        borderRadius: 50,
    },
    dataStyle: {
        justifyContent: 'space-around',
        flexDirection: 'column',
    },
    textStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: constants.whiteColor,
    },
    thumbnailMarginStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 10,
    },
    imageStyle: {
        height: 300,
        flex: 1,
        width: null,
        marginLeft: 2,
        marginRight: 2,
        marginBottom: 2,
        borderRadius: 5,
    },
});
export default BuyerScreen;
