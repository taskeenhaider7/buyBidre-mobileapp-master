import React from 'react'
import {Card, Avatar,Paragraph, DataTable, Searchbar} from 'react-native-paper'


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
    SafeAreaView
} from 'react-native'
import constants from "../Constants";
import {Button} from "react-native-elements";

class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data:null
        }
    }

    componentDidMount() {
        const data = this.props.route.params.item;
        this.setState({ data:data})
        console.log(data.title)

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
                                textAlign: "center", fontSize: 28, margin: 15
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
                                    <Button >add</Button>
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
                                    <DataTable.Cell >fill form</DataTable.Cell>
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
                                alert("will go to term and conditions")
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
