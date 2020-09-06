import React from 'react';
import {TouchableOpacity,Text,} from 'react-native';


const ButtonNew=(props) => {
    console.log('Hi',props);
    
    return(
        <TouchableOpacity onPress={props.onPress} style={[styles.buttonStyle,props.customStyle ]} >
            <Text style={styles.textStyle} >{props.children}</Text>
        </TouchableOpacity>
    );
};
const styles={
    textStyle:{
        alignSelf:'center',
        color:'black',
        paddingTop:10,
        paddingBottom:10,
        fontSize: 15,
       // fontWeight:'bold'
    },
    buttonStyle:{
        marginTop:10,
        flex:1,
        alignSelf:'stretch',
       // borderBottomColor:'#007aff',
       // backgroundColor:'#008aff',
       // borderBottomWidth:1,
        //marginLeft:25,
        borderRadius:5,
       
    
    }
}

export default ButtonNew;