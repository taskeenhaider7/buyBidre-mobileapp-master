import React from 'react';
import {Text, View,TouchableOpacity,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
const Header =(props)=>{
    return(
         <View style={styles.viewStyle}>
             
             <TouchableOpacity onPress={props.onPress} >
             <Icon name={props.iconName} size={22} style={{marginTop:2,marginleft:-10}}  />
             </TouchableOpacity>
           <Text style={styles.textStyle}>{props.headerText}</Text>
           {/* <TouchableOpacity>
               <Icon name={props.iconNameLeft} type='Feather' size={22}   />
           </TouchableOpacity> */}
           
         </View>
    );  
};
const styles =StyleSheet.create({
    viewStyle: {
        backgroundColor:'#F8F8F8',
        justifyContent:'center',
        alignItems:'center',
        height:45,
        paddingTop:10,
        shadowColor:'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:1.9,
        elevation: 2,
        position:'relative',
        flexDirection:'row'
        // borderBottomWidth:3,
        // borderColor:'11111',
        // borderWidth:2,
       
    },
    textStyle: {
        fontSize:23,
        marginLeft:10,
        fontWeight:'bold'
    }  
});
export {Header};