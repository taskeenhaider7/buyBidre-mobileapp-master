import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-community/async-storage";
import {AuthContext} from "./components/context";

export function DrawerContent(props) {
    const [response, setResponse] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [type, setType] = useState();
    const {signOut} = useContext(AuthContext);

    const getUserInfo = async () => {
        await AsyncStorage.getItem('response').then(value => {
            if (value !== null) {
                const responseObj = JSON.parse(value)
                setResponse(responseObj);
            }
        });
    }

    useEffect(() => {
        if (!response) {
            getUserInfo().done();
        }
    });

    useEffect(() => {
        if (response) {
            const name = JSON.parse(response.name).fname + " " + JSON.parse(response.name).lname;
            setName(name)
            setEmail(response.email);
            setType(response.type);
        }

    }, [response]);

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft: 15, flexDirection: 'column'}}>
                                <Title style={styles.title}>{name}</Title>
                                <Caption style={styles.caption}>{email}</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>

                        {
                            type === 'seller' && (
                                <>
                                    <DrawerItem
                                        icon={({color, size}) => (
                                            <Icon
                                                name="home-outline"
                                                color={color}
                                                size={size}
                                            />
                                        )}
                                        label="My Properties"
                                        onPress={() => {
                                            props.navigation.navigate('MyProperties', {screen: 'MyProperties'})
                                        }}
                                    />
                                    <DrawerItem
                                        icon={({color, size}) => (
                                            <Icon
                                                name="account-outline"
                                                color={color}
                                                size={size}
                                            />
                                        )}
                                        label="Venders"
                                        onPress={() => {
                                            props.navigation.navigate('Vendors', {screen: 'Vendors'})
                                        }}
                                    />
                                    <DrawerItem
                                        icon={({color, size}) => (
                                            <Icon
                                                name="bookmark-outline"
                                                color={color}
                                                size={size}
                                            />
                                        )}
                                        label="Contact Us"
                                        onPress={() => {
                                            props.navigation.navigate('Contact', {screen: 'contact'})
                                        }}
                                    />
                                </>
                            )
                        }
                        {/*<DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="settings-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => {props.navigation.navigate('SettingsScreen')}}
                        />*/}
                        {/*<DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                    name="account-check-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Support"
                        />*/}
                    </Drawer.Section>
                    {/*<Drawer.Section title="Preferences">
                        <TouchableRipple>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>*/}
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {
                        props.navigation.closeDrawer();
                        signOut()
                    }}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
