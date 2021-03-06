import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, Image } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons';
import { CardSection, } from './useableComponents/common';
import constants from '../Constants'
import { Card, Title, Paragraph, Avatar, Searchbar } from 'react-native-paper'
import { scale, verticalScale } from './extras/scalingComponent'
import { WEBAPI } from './extras/WEBAPI'

import { Overlay, Input, Button, Icon } from 'react-native-elements'
import { WebView } from 'react-native-webview';
import RNFetchBlob from 'rn-fetch-blob'


const options = {
    title: 'Select Options to Upload Your Post',
    takePhotoButtonTitle: 'Open Camera',
    chooseFromLibraryButtonTitle: 'Choose from Gallery',
};
const shops = [
    {
        name: 'Hassam',
        ownerImg: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        img: 'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
        rate: '300000$',
        address: 'Islamabad ,Pakistan'
    },
    {
        name: 'Ali',
        ownerImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/1200px-Pierre-Person.jpg',
        img: 'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
        rate: '400000$',
        address: 'Islamabad ,Pakistan'
    },
    {
        name: 'Atif',
        ownerImg: 'https://miro.medium.com/max/2560/1*gBQxShAkxBp_YPb14CN0Nw.jpeg',
        img: 'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
        rate: '1000000$',
        address: 'Islamabad ,Pakistan'
    }
]
const WIDTH = Math.round(Dimensions.get('window').width); a = 2;
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarSource: [],
            isVisible: false,
            shopList: [],
            title: '',
            city: '',
            price: '',
            country: '',
            showSearchData:false,
            search:'',
            searchData:''
        }
    }
    componentDidMount() {
        this.fetchProducts()
    }
    fetchProducts = async () => {
        let itemObj = {
            _created: '',
            updated: '',
            _updated: '',
            price: '',
            _price: '',
            pageSize: 7,
            pageNumber: 2,
            keywords: ''
        }
        await new WEBAPI().getProducts().then((response) => {
            console.log('data response is products', response)
            this.setState({
                shopList: response.records
            })
        })
    }
    renderHeader = () => {
        return (
            <View style={styles.headerStyle}>

                <View style={{ flex: .85 }}>
                    {this.props.route.params.loginTypeSeller.toLowerCase() === 'seller'
                        &&
                        <Text style={styles.textStyleHeader}>SELLER</Text>
                    }
                    {this.props.route.params.loginTypeSeller.toLowerCase() === 'buyer'
                        &&
                        <Text style={styles.textStyleHeader}>BUYER</Text>
                    }
                    {this.props.route.params.loginTypeSeller.toLowerCase() === 'admin'
                        &&
                        <Text style={styles.textStyleHeader}>ADMIN</Text>}

                </View>
                {this.props.route.params.loginTypeSeller.toLowerCase() === 'seller'
                    &&
                    <View style={{ flex: .15 }}>
                        <TouchableOpacity style={{
                            alignContent: 'center',
                            alignSelf: 'center',
                            paddingTop: verticalScale(10)
                        }} onPress={() => { this.setState({ isVisible: true }) }}
                        // this.chooseImagePickerOptions.bind(this)} 
                        >
                            <Icon1 name='plus' size={22} style={{}} color={constants.mainColor} />
                        </TouchableOpacity>
                    </View>
                }
            </View>
        );
    }
    chooseImagePickerOptions = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response, 'state', this.state.avatarSource);
            if (response.didCancel) {
                console.log('User cancelled image picker', ' avatar ', this.state.avatarSource);
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                this.setState({ avatarSource: response.uri }, () => {
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
                        <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/1200px-Pierre-Person.jpg' }} style={styles.thumbnailStyle} />
                    </View>
                    <View style={{
                        // justifyContent: 'space-around',
                        // flexDirection: 'column'
                    }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: constants.whiteColor
                        }}>Donald Trump</Text>
                        <Text style={{
                            fontSize: 10, color: constants.whiteColor
                        }}>United States</Text>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{
                                fontSize: 10, color: constants.whiteColor, fontWeight: 'bold'
                            }}>52M$</Text>
                            <Text style={{
                                fontSize: 10, color: constants.whiteColor, textDecorationLine: 'line-through', color: 'gray', marginLeft: 5
                            }}>54M$</Text>
                        </View>
                    </View>
                </CardSection>
                <CardSection >
                    <Image source={image.item.uri} style={{
                        height: 300,
                        flex: 1,
                        width: null,
                        marginLeft: 2,
                        marginRight: 2,
                        marginBottom: 2,
                        borderRadius: 5
                    }} />
                </CardSection>

            </Card>
        )
    }
    renderModal = () => {
        return (
            <Overlay
                isVisible={this.state.isVisible}
            >
                {this.props.route.params.loginTypeSeller
                    ?
                    <View style={{
                        // height: verticalScale(300),
                        width: scale(200)
                    }}>
                        <View style={{ flexDirection: 'row-reverse' }}>
                            <Icon
                                style={{}}
                                name='close'
                                type='font-awesome'
                                color='black'
                                onPress={() => {
                                    this.setState({ isVisible: false })
                                }}
                            />
                        </View>
                        <Input
                            placeholder='Add Title'
                            value={this.state.title}
                            onChange={(text) => {
                                this.setState({ title: text })
                            }}
                        />
                        <Input
                            placeholder='Add City'
                            value={this.state.city}
                            onChange={(text) => {
                                this.setState({ city: text })
                            }}
                        />
                        <Input
                            placeholder='Add Country'
                            value={this.state.country}
                            onChange={(text) => {
                                this.setState({ country: text })
                            }}
                        />
                        <Input
                            placeholder='Add Price'
                            value={this.state.price}
                            onChange={(text) => {
                                this.setState({ price: text })
                            }}
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Button
                                title="Upload Image and Posts"
                                buttonStyle={{ backgroundColor: 'black' }}
                                onPress={
                                    this.chooseImagePickerOptions.bind(this)
                                }
                            />
                        </View>

                    </View>
                    :
                    <View style={{ width: scale(150) }}>
                        <Input
                            placeholder='Enter Your Bid'
                        />
                        <Button
                            title="Bid"
                            buttonStyle={{ backgroundColor: 'black' }}
                            onPress={
                                () => {
                                    this.setState({ isVisible: false })
                                }
                            }
                        />
                    </View>
                }
            </Overlay>
        )
    }
    renderBuyer = (item) => {
        console.log('iteteteteetteetettete',)
        let name = item.item.title
        let price = JSON.parse(item.item.price).price
        let image = JSON.parse(item.item.featured_image).url
        let address = JSON.parse(item.item.address).city
        return (
            <Card style={{ margin: 10 }}>

                <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ flex: 1.5 }}>
                            <Avatar.Image size={50} source={{ uri: item.item.ownerImg }} style={{ backgroundColor: '#74C5D5' }} />
                        </View>
                        <View style={{ flex: 6.5, padding: 5 }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: constants.whiteColor }}>
                                {name}
                            </Text>
                            <Text style={{ fontSize: 13, color: 'black' }}>
                                {address}
                            </Text>
                        </View>
                        <View style={{ flex: 2, padding: 5 }}>
                            <Text style={{ fontSize: 12, color: 'black', fontWeight: 'bold' }}>
                                Price: {price}
                            </Text>
                        </View>
                    </View>
                </View>
                <Card.Cover source={{ uri: image }} />
                {this.props.route.params.loginTypeSeller.toLowerCase() !== 'seller'
                    &&
                    < Card.Actions >
                        <Button
                            title="Bid This"
                            buttonStyle={{ backgroundColor: 'black' }}
                            onPress={
                                () => { alert('You have bid sucessfully') }
                            }
                        />
                    </Card.Actions>
                }
            </Card>
        )
    }
    handleUploadPhoto = async (data) => {
        alert(data)
        this.setState({ updateAppointmentSettingsSpinner: true })
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
            console.log('The post datat', response)
            alert(response.message)
        })
    };
    onChangeSearch = search => {
        if (search == "") {
            console.log("ok")
            this.setState({ showSearchData: false })
        }
        else {
            console.log("ok no")
            this.setState({ showSearchData: true })
        }
        this.setState({ search, searchData: this.state.shopList.filter(item => item.title.toLowerCase().includes(search.toLowerCase())) });
    }
    renderSearchBar = () => {
        return (
            <View style={{ marginTop: verticalScale(5) }}>
                <Searchbar
                    placeholder={"Search by name"}
                    value={this.state.search}
                    onChangeText={this.onChangeSearch}
                />
            </View>
        )
    }
    render() {
        console.log('The params arararararaar', this.state.shopList)
        return (
            <View style={styles.MainContainer}>
                {this.renderModal()}

                <View style={{ flex: 1 }}>
                    <View>
                        {this.renderHeader()}
                    </View>
                    {this.props.route.params.loginTypeSeller.toLowerCase() === 'seller'
                        &&
                        <FlatList
                            data={this.state.shopList}
                            renderItem={this.renderBuyer}
                            ListEmptyComponent={
                                <Text style={{ color: 'grey', textAlign: 'center', color: constants.whiteColor }}>Click Camera Icon to Add Posts</Text>
                            }
                        />
                    }
                    {this.props.route.params.loginTypeSeller.toLowerCase() === 'buyer'
                        &&
                        <View>
                            {this.renderSearchBar()}
                            {this.state.showSearchData
                                ?
                                <FlatList
                                    data={this.state.searchData}
                                    renderItem={this.renderBuyer}
                                    ListEmptyComponent={
                                        <Text style={{ color: 'grey', textAlign: 'center', color: constants.whiteColor }}>Click Camera Icon to Add Posts</Text>
                                    }
                                />
                                :
                                <FlatList
                                    data={this.state.shopList}
                                    renderItem={this.renderBuyer}
                                    ListEmptyComponent={
                                        <Text style={{ color: 'grey', textAlign: 'center', color: constants.whiteColor }}>Click Camera Icon to Add Posts</Text>
                                    }
                                />
                            }
                        </View>
                    }
                    {this.props.route.params.loginTypeSeller.toLowerCase() === 'admin'
                        &&
                        <WebView source={{ uri: 'https://buybidre.com/admin/login.php' }} />
                    }
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
        shadowOffset: { width: 0, height: 2 },
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
export default Home