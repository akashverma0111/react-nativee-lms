import React, { useCallback, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native'
import { Text, View, Button, ScrollView, ImageBackground, Image, RefreshControl } from 'react-native';
import { InputField } from '../common/Component';
import { fetchData, ShowAlert } from '../common/Helper';

export const ContactUs = () => {
    const isFocused = useIsFocused()
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = useState({
        name: '', name_error: '',
        email: '', email_error: '',
        phone: '', phone: '',
        message: '', message_error: '',
    })

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
        setTimeout(() => {
            clearData()
        }, 5000);
    }, []);
    
    const clearData = () => {
        setData({
            name: '', name_error: '',
            email: '', email_error: '',
            phone: '', phone_error: '',
            message: '', message_error: '',
        })
    }
    useEffect(() => {
        if(isFocused){
            onRefresh()
        }
    }, [isFocused])

    const contact = () => {
        setRefreshing(true);
        fetchData('contact-add', 'POST', data, false, false, (res) => {
            console.log(res);
            setTimeout(() => setRefreshing(false), 1000);
            if(res.message){
                ShowAlert(res.message)
            }
            if(res.status){
                clearData()
            }
            if(res.errors){
                setData({
                    ...data,
                    name_error: res.errors.name ? res.errors.name[0] : '',
                    email_error: res.errors.email ? res.errors.email[0] : '',
                    phone_error: res.errors.phone ? res.errors.phone[0] : '',
                    message_error: res.errors.message ? res.errors.message[0] : '',
                })
            }
        }, (err) => {})
    }
    return (
        <View style={{ flex: 1}}>
            <View style={{backgroundColor: '#20bcef'}}>
                <ImageBackground source={require('../../assets/images/courses-bg.png')} style={{height: 50}}>
                    <Text style={{color: '#f15829', marginTop: 10, marginLeft: 25, fontWeight: 'bold', fontSize: 20}}>Contact Us</Text>
                </ImageBackground >
            </View>

            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                <Image source={require(`../../assets/images/contact-us.png`)} resizeMode="contain" style={{width: '100%'}} />
                <View style={{borderTopWidth: 2, margin: 10, paddingHorizontal: 20}}>
                    <InputField name="name" value={data.name} error={data.name_error} onChange={(v) => {setData({...data, name: v, name_error: ''})}} />
                    <InputField name="email" value={data.email} error={data.email_error} onChange={(v) => {setData({...data, email: v, email_error: ''})}} />
                    <InputField name="phone" value={data.phone} error={data.phone_error} onChange={(v) => {setData({...data, phone: v, phone_error: ''})}} />
                    <InputField name="message" value={data.message} error={data.message_error} onChange={(v) => {setData({...data, message: v, message_error: ''})}} textarea={true} line={4} />
                    <Text></Text>
                    <Button title='Submit' onPress={contact} />

                </View>
            </ScrollView>

            
    </View>
    )
}