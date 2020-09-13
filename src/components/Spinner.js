import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import Constants from '../Constants';

const Spinner=({size}) =>{
return(
    <View style={{styles}}>
        <ActivityIndicator size={size} color={Constants.whiteColor}/>
    </View>
   );
};
const styles={
    spinnerStyle:{
        height:50,
        alignItems:'center',
        justifyContent:'center',
        flex:1
    }
};

export {Spinner};
