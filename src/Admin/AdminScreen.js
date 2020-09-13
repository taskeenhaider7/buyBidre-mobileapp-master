import React from 'react';
import {Button, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

const AdminScreen = ({navigation}) => {
    return (
        <View>
            <WebView source={{uri: 'https://buybidre.com/admin/login.php'}}/>
        </View>

    );
};

export default AdminScreen;
