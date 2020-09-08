import React from 'react';
import {TouchableOpacity,Text, ToastAndroid} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';


const DropDown=(props) => {
    return(
        <DropDownPicker
            items={[
                {label: 'UK', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" />},
                {label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" />},
            ]}
            defaultValue={this.state.country}
            containerStyle={{height: 40}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={item => this.setState({
                country: item.value
            })}
        />
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