import { useCallback, useEffect, useState } from 'react';
import { Text, View, Button, ImageBackground, Image, ScrollView, RefreshControl } from 'react-native';
import { ButtomAuthPage, InputField } from '../common/Component';
import { fetchData, ShowAlert, storeData } from '../common/Helper';
import { useIsFocused } from '@react-navigation/native'

export const Login = ({navigation}) => {
    const isFocused = useIsFocused()
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [refreshing, setRefreshing] = useState(false);
    
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
        setTimeout(() => {
            setEmailError('')
            setPasswordError('')
        }, 10000);
    }, []);
    
    useEffect(() => {
        if(isFocused){
            setEmail('')
            setPassword('')
            onRefresh()
        }
    }, [isFocused])

    
    const login = () => {
        setRefreshing(true);
        fetchData('login', 'POST', {email: email, password: password}, false, false, (res) => {
            onRefresh();
            if(res.message){
                ShowAlert(res.message)
            }
            if(res.errors){
                setEmailError(res.errors.email ? res.errors.email[0] : '')
                setPasswordError(res.errors.password ? res.errors.password[0] : '')
            }else if(res.status && res.data){
                storeData('auth', JSON.stringify(res.data))
                navigation.navigate('MyProfile')
            }
        }, (err) => {})
    }
    
    return (
        <View style={{ flex: 1}}>
            <View style={{backgroundColor: '#20bcef'}}>
                <ImageBackground source={require('../../assets/images/courses-bg.png')} style={{height: 50}}>
                    <Text style={{color: '#f15829', marginTop: 10, marginLeft: 25, fontWeight: 'bold', fontSize: 20}}>Login</Text>
                </ImageBackground >
            </View>

            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                <Image source={require(`../../assets/images/login.png`)} resizeMode="contain" style={{width: '100%'}} />
                <View style={{borderTopWidth: 2, margin: 10, paddingHorizontal: 20}}>
                    <InputField name="email" value={email} onChange={(v) => {setEmail(v); setEmailError('')}} error={emailError} />
                    <InputField name="password" password="password" value={password} onChange={(v) => {setPassword(v); setPasswordError('')}} error={passwordError} />
                    <Text></Text>
                    <Button title='Login' onPress={login} />
                    <ButtomAuthPage rightText="Sign Up" navRight={() => navigation.navigate('Signup')} />
                </View>
            </ScrollView> 
        </View>
    )
}