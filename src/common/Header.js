import { Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { removeData, retriveData, ShowAlert } from './Helper';

export const LeftHeaderBar = () => {
    return (
        <Image source={require('../../assets/images/logo.png')}  />
    );
}

export const RightHeaderBar = () => {
    const [auth, setAuth] = useState(false)
    const navigation = useNavigation();
    const route = useRoute()

    const checkAuth = () => {
        if(auth){
            setAuth(false)
            ShowAlert('Logout Successful.')
            removeData('auth');
        }
        navigation.navigate('Login')
    }

    useEffect(() => {
        retriveData('auth', (err, res) => setAuth(JSON.parse(res)))
    }, [route])

    const myAccountPress = () => {
        navigation.navigate('MyProfile')
    }

    return (
        <View>
            <View style={{flex: 1, flexDirection: 'row'}}>
                {
                auth ?                 
                <TouchableOpacity  style={{flexDirection: 'row', marginRight: 10, borderRadius: 30, backgroundColor: '#f15829'}} onPress={myAccountPress}>
                    <Image source={require('../../assets/images/person.png')} resizeMode="cover" style={{height: 35, width: 35, borderRadius: 30, borderWidth: 2, borderColor: '#f15829'}} />
                    <Text style={{color: 'white', marginHorizontal: 10, marginTop: 5}}>My Account</Text>
                </TouchableOpacity>
                :
                <View style={{marginRight: 10}}>
                    <Button color='#f15829' onPress={() => navigation.navigate('Signup')} title="Sign Up" />
                </View>
                }
                
                <View>
                    <Button onPress={checkAuth} title={auth ? 'Logout' : 'Log In'} />
                </View>
            </View>
        </View>
    );
}