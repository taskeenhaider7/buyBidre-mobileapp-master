import React from 'react';
import {View}  from 'react-native';

const Card = (props) =>{
    return(
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};
const styles = {
    containerStyle:{
        // borderWidth:.5,
        // borderColor:'#dddd',
        // borderRadius:5,
        // borderBottomWidth:1,
        // shadowColor:'#0000',
        // shadowOpacity:3,
        // shadowRadius:5,
        opacity:3,
        elevation:1,
        marginTop:5,
        marginRight:0,
        marginLeft:0
    }
      
};
export {Card};
