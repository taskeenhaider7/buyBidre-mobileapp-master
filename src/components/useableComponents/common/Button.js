import React from 'react';
import {TouchableOpacity,Text, ToastAndroid} from 'react-native';


const Button=(props) => {
    return(
        <TouchableOpacity onPress={props.onPress} style={styles.buttonStyle} >
            <Text style={styles.textStyle}>{props.children}</Text>
        </TouchableOpacity>
    );
};
const styles={
    textStyle:{
        alignSelf:'center',
        color:'white',
        paddingTop:10,
        paddingBottom:10,
        fontSize: 15,
        fontWeight:'bold'
    },
    buttonStyle:{
        marginTop:10,
        flex:1,
        alignSelf:'stretch',
        borderColor:'#007aff',
        backgroundColor:'#008aff',
        borderWidth:1,
        marginLeft:25,
        marginRight:25,
        borderRadius:5,
       
    
    }
}

export {Button};