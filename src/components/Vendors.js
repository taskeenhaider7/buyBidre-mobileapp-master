import React from 'react';
import {CardSection} from "./CardSection";
import {View, Text, Image, ScrollView} from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import {Paragraph} from "react-native-paper";


const Vendors = () => {
    return(
        <ScrollView>
            <Text style={{alignSelf:"center", fontSize:22,fontWeight:"bold"}}>BROWSE VENDORS</Text>

                <Card>
                    <Card.Title style={{color:"red"}}>Frank Sofocleous Attorney at Law</Card.Title>
                    <Card.Divider/>
                    <Card.Image source={require('../../appIcon.jpeg')}/>

                        <Button

                            buttonStyle={{borderRadius: 10,marginTop:10, marginLeft: 0,backgroundColor:"skyblue", marginRight: 0, marginBottom: 0}}
                            title='Settlement Company' />
                </Card>
            <Card>
                <Card.Title style={{color:"red"}}>DMV3D</Card.Title>
                <Card.Divider/>
                <Card.Image source={require('../../appIcon.jpeg')}/>

                <Button

                    buttonStyle={{borderRadius: 10,marginTop:10, marginLeft: 0,backgroundColor:"skyblue", marginRight: 0, marginBottom: 0}}
                    title='Home Inspection' />
            </Card>
            <Card>
                <Card.Title style={{color:"red"}}>Call us! 888.USINSPECT</Card.Title>
                <Card.Divider/>
                <Card.Image source={require('../../appIcon.jpeg')}/>

                <Button

                    buttonStyle={{borderRadius: 10,marginTop:10, marginLeft: 0,backgroundColor:"skyblue", marginRight: 0, marginBottom: 0}}
                    title='Photography' />
            </Card>

        </ScrollView>
    )
};

const styles={
    conatinerStyle:{
       // borderBottomWidth:1,
       // borderColor:'#ddd',
       // backgroundColor:'1111',
        padding:1,
        justifyContent:'flex-start',
        marginTop:2,
        flexDirection:'row',
        position:'relative'
    }
};

export default Vendors;