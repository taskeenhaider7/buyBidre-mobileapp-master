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
    SafeAreaView, Linking
} from 'react-native'
import constants from "../Constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Input, Overlay} from "react-native-elements";
import {scale} from "../Services/scalingComponents";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "rn-fetch-blob";
import {WEBAPI} from "../Services/Services";
import PropertyAgreement from "./PropertyAgreement";

class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data:null,
            isVisible: false,
        }
    }

    // renderModal(){
    //     return (
    //         <Overlay
    //             isVisible={this.state.isVisible}>
    //             <View style={{
    //                 width: scale(200)
    //             }}>
    //                 <View style={{flexDirection: 'row-reverse'}}>
    //                     <Icon
    //                         style={{}}
    //                         name='close'
    //                         type='font-awesome'
    //                         color='black'
    //                         onPress={() => {
    //                             this.setState({isVisible: false})
    //                         }}
    //                     />
    //                 </View>
    //                 <View style={{flexDirection: 'row', justifyContent: 'center'}}>
    //                     <Button
    //                         title="Add Image"
    //                         buttonStyle={{backgroundColor: 'black'}}
    //                         onPress={
    //                             this.chooseImagePickerOptions.bind(this)
    //                         }
    //                     />
    //                     <Button
    //                         title="Submit"
    //                         buttonStyle={{backgroundColor: 'black'}}
    //                         onPress={
    //                             this.handleUploadPhoto().done()
    //                         }
    //                     />
    //                 </View>
    //
    //             </View>
    //             }
    //         </Overlay>
    //     )
    // }
    // chooseImagePickerOptions = () => {
    //     ImagePicker.showImagePicker(options, (response) => {
    //         console.log('Response = ', response, 'state', this.state.avatarSource);
    //         if (response.didCancel) {
    //             console.log('User cancel image picker', ' avatar ', this.state.avatarSource);
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else {
    //             this.setState({avatarSource: response.uri}, () => {
    //                 this.setState({...this.state, imageResponse: response})
    //             })
    //         }
    //     });
    // }
    // handleUploadPhoto = async () => {
    //     const data = this.state.imageResponse;
    //     let dataImage =[
    //         {
    //             name: 'avatar',
    //             filename: data.fileName ? data.fileName : '',
    //             type: data.type,
    //             data: RNFetchBlob.wrap(data.path)
    //         },
    //         {
    //             name: 'info',
    //             data: JSON.stringify({
    //                 price: this.state.price,
    //                 title: this.state.title,
    //                 prop_for: 'rent',
    //                 addr1: '',
    //                 city: this.state.city,
    //                 postal: '',
    //                 country: this.state.country,
    //             })
    //         },
    //     ]
    //     await new WEBAPI().postData(dataImage).then(response => {
    //         console.log('The post data', response)
    //         alert(response.message);
    //         this.props.navigation.navigate('seller', {screen: 'seller'})
    //     })
    // };
    componentDidMount() {
        const data = this.props.route.params.item;
        this.setState({ data:data})
    console.log(data.title);

    }
    completeAddress( address ){
        return ( address.addr1 +" "+ address.addr2+" "+address.city+" "+address.state+" "+address.country+" "+address.postal );
    }

    render() {
        const data = this.props.route.params.item;

        let image = JSON.parse(data.featured_image).url
        let Address = JSON.parse(data.address)

        // console.log(this.state.data)
        return (
            <SafeAreaView style={styles.MainContainer}>
                <ScrollView>
                    <View style={styles.MainContainer}>

                        <View>
                            <Text style={{
                                textAlign: "center", fontSize: 28, margin: 7
                            }}>
                                {data.title}
                            </Text>
                        </View>
                        <View>
                            <Card>
                                <Card.Cover source={{ uri: image }}
                                            style={{
                                                height: 300,
                                                flex: 0,
                                                width: WIDTH,
                                                marginLeft: 2,
                                                marginRight: 2,
                                                borderRadius: 5
                                            }}/>
                                <Card.Content>
                                    <Paragraph>Three levels 4 bedroom & 21 street</Paragraph>
                                </Card.Content>
                                <Card.Actions>
                                    <Text>Property filters  </Text>
                                    <Icon
                                        name="plus"
                                        color={'#000'}
                                        style={{fontWeight: 'normal', marginRight:7}}
                                        size={30}
                                        onPress={()=>alert("property can be added soon")
                                        }/>
                                </Card.Actions>
                            </Card>
                        </View>
                        <View style={{marginTop: 10}}>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>Address</DataTable.Title>
                                    <DataTable.Title numeric>Text Id #</DataTable.Title>
                                    <DataTable.Title numeric>Contact</DataTable.Title>
                                </DataTable.Header>

                                <DataTable.Row>
                                    <DataTable.Cell
                                        onPress={
                                            () => {
                                                alert("ashraf town pindorian islamabad")
                                            }
                                        }
                                    >{this.completeAddress(Address)}</DataTable.Cell>
                                    <DataTable.Cell numeric>1</DataTable.Cell>
                                    <DataTable.Cell numeric>0316-5180106</DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>

                        </View>
                        <View style={{margin: 5}}><Text> </Text></View>
                        <View style={{marginTop: 10}}>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>Bedrooms</DataTable.Title>
                                    <DataTable.Title >Bathrooms</DataTable.Title>
                                    <DataTable.Title numeric>Half Bathrooms</DataTable.Title>
                                    <DataTable.Title numeric>Area</DataTable.Title>
                                    <DataTable.Title numeric>Floor</DataTable.Title>

                                </DataTable.Header>

                                <DataTable.Row>

                                    <DataTable.Cell>1</DataTable.Cell>
                                    <DataTable.Cell >2</DataTable.Cell>
                                    <DataTable.Cell >3</DataTable.Cell>
                                    <DataTable.Cell numeric>4000</DataTable.Cell>
                                    <DataTable.Cell numeric>4</DataTable.Cell>

                                </DataTable.Row>
                            </DataTable>

                        </View>
                        <View style={{marginTop: 10}}>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>User</DataTable.Title>
                                    <DataTable.Title >Type</DataTable.Title>
                                    <DataTable.Title >Fill Form</DataTable.Title>
                                </DataTable.Header>

                                <DataTable.Row>
                                    <DataTable.Cell>
                                        view user</DataTable.Cell>
                                    <DataTable.Cell >{data.prop_for}</DataTable.Cell>
                                    <DataTable.Cell onPress={()=>{
                                        this.props.navigation.navigate('PropertyAgreement', {screen:'PropertyAgreement'})
                                    }}>fill form</DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>

                        </View>
                        <View style={{
                            flexDirection: "row",
                            marginLeft: 5,
                            marginTop: 30,
                            justifyContent: "space-between"
                        }}>
                            <Text style={{color: constants.whiteColor, fontSize: 12}}>
                                Copyright Buybidre.com 2020
                            </Text>
                            <TouchableOpacity onPress={()=>{
                                Linking.openURL('https://documentcloud.adobe.com/link/track?uri=urn%3Aaaid%3Ascds%3AUS%3A146cb0f1-c326-47fd-b320-b41922a8d7f3#pageNum=1');
                            }}>
                                <Text style={{color: constants.whiteColor, fontSize: 12}}>
                                    Terms and Condition | privacy & policy
                                </Text>
                            </TouchableOpacity>

                        </View>

                        {/*</View>*/}

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
export default Detail
