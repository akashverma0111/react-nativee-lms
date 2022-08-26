import React, { useCallback, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native'

import { Text, View, Button, ScrollView, ImageBackground, Image, RefreshControl } from 'react-native';
import { InputField } from '../common/Component';
import { fetchData, ShowAlert } from '../common/Helper';

export const SignUp = () => {

   
    const isFocused = useIsFocused()
    const [type, setType] = useState('student')
    const [refreshing, setRefreshing] = React.useState(false);
    const [studentData, setStudentData] = useState({
        student_name: '', student_name_error: '',
        student_email: '', student_email_error: '',
        country: 'us', country_error: '',
        student_phone: '', student_phone_error: '',
        student_password: '', student_password_error: '',
        student_confirm_password: '', student_confirm_password_error: '',
    })

    const [parentData, setParentData] = useState({
        parent_name: '', parent_name_error: '',
        parent_email: '', parent_email_error: '',
        parent_country: 'us', parent_country_error: '',
        parent_phone: '', parent_phone_error: '',
        parent_password: '', parent_password_error: '',
        parent_confirm_password: '',
        parent_confirm_password_error: '', 
    })

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
        setTimeout(() => {
            clearError()
        }, 5000);
    }, []);

    const clearError = () => {
        setStudentData({
            ...studentData,
            student_name_error: '',
            student_email_error: '',
            country_error: '',
            student_phone_error: '',
            student_password_error: '',
            student_confirm_password_error: '',
        })

        setParentData({
            ...parentData,
            parent_name_error: '',
            parent_email_error: '',
            parent_country_error: '',
            parent_phone_error: '',
            parent_password_error: '',
            parent_confirm_password_error: '', 
        })
    }
    
    const clearData = () => {
        setStudentData({
            student_name: '', student_name_error: '',
            student_email: '', student_email_error: '',
            country: 'us', country_error: '',
            student_phone: '', student_phone_error: '',
            student_password: '', student_password_error: '',
            student_confirm_password: '', student_confirm_password: '',
        })

        setParentData({
            parent_name: '', parent_name_error: '',
            parent_email: '', parent_email_error: '',
            parent_country: 'us', parent_country_error: '',
            parent_phone: '', parent_phone_error: '',
            parent_password: '', parent_password_error: '',
            parent_confirm_password: '',
            parent_confirm_password_error: '', 
        })
    }
    useEffect(() => {
        if(isFocused){
            onRefresh()
            clearData()
        }
    }, [isFocused])

    const saveStudentData = () => {
        setRefreshing(true);
        let student_data = {...studentData, 'type': type}
        fetchData('student-parent-register', 'POST', student_data, false, false, (res) => {
            console.log(res);
            onRefresh()
            if(res.status){
                setType('parent')
            }else{
                setStudentData({
                    ...studentData,
                    student_name_error: res.errors.student_name ? res.errors.student_name[0] : '',
                    student_email_error: res.errors.student_email ? res.errors.student_email[0] : '',
                    country_error: res.errors.country ? res.errors.country[0] : '',
                    student_phone_error: res.errors.student_phone ? res.errors.student_phone[0] : '',
                    student_password_error: res.errors.student_password ? res.errors.student_password[0] : '',
                    student_confirm_password_error: res.errors.student_confirm_password ? res.errors.student_confirm_password[0] : ''
                })
            }
        }, (err) => {})
    }

    const saveParentData = () => {
        setRefreshing(true);
        let parent_data = {...parentData, type: type}
        fetchData('student-parent-register', 'POST', parent_data, false, false, (res) => {
            onRefresh();
            if(res.message){
                ShowAlert(res.message)
            }
            if(res.status) {     
                clearData()
            }else{
                setParentData({
                    ...parentData,
                    parent_name_error: res.errors.parent_name ? res.errors.parent_name[0] : '',
                    parent_email_error: res.errors.parent_email ? res.errors.parent_email[0] : '',
                    parent_country_error: res.errors.parent_country ? res.errors.parent_country[0] : '',
                    parent_phone_error: res.errors.parent_phone ? res.errors.parent_phone[0] : '',
                    parent_password_error: res.errors.parent_password ? res.errors.parent_password[0] : '',
                    parent_confirm_password_error: res.errors.parent_confirm_password ? res.errors.parent_confirm_password[0] : ''
                })
            }
        }, (err) => {})
    }

    return (
        <View style={{ flex: 1}}>
            <View style={{backgroundColor: '#20bcef'}}>
                <ImageBackground source={require('../../assets/images/courses-bg.png')} style={{height: 50}}>
                    <Text style={{color: '#f15829', marginTop: 10, marginLeft: 25, fontWeight: 'bold', fontSize: 20}}>Sign Up</Text>
                </ImageBackground >
            </View>

            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                <Image source={require(`../../assets/images/sign-up.png`)} resizeMode="contain" style={{width: '100%'}} />
                

                <View style={{borderTopWidth: 2, margin: 10, paddingHorizontal: 20}}>
                    <View style={{padding: 10, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15}}>Student Details</Text>
                    </View>
                    
                    <InputField name="student_name" value={studentData.student_name} error={studentData.student_name_error} onChange={(v) => {setStudentData({...studentData, student_name: v, student_name_error: ''})}} />
                    <InputField name="student_email" value={studentData.student_email} error={studentData.student_email_error} onChange={(v) => {setStudentData({...studentData, student_email: v, student_email_error: ''})}} />
                    <InputField name="country" value={studentData.country} error={studentData.country_error} onChange={(v) => {setStudentData({...studentData, country: v, country_error: ''})}} />
                    <InputField name="student_phone" value={studentData.student_phone} error={studentData.student_phone_error} onChange={(v) => {setStudentData({...studentData, student_phone: v, student_phone_error: ''})}} />
                    <InputField name="student_password" value={studentData.student_password} error={studentData.student_password_error} onChange={(v) => {setStudentData({...studentData, student_password: v, student_password_error: ''})}} />
                    <InputField name="student_confirm_password" value={studentData.student_confirm_password} error={studentData.student_confirm_password_error} onChange={(v) => {setStudentData({...studentData, student_confirm_password: v, student_confirm_password_error: ''})}} />

                    <Text></Text>
                    <Button title='Next Step' onPress={saveStudentData} />

                </View>

            {type === 'parent' &&
                <View style={{margin: 10, paddingHorizontal: 20}}>
                    <View style={{padding: 10, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15}}>Parent Details</Text>
                    </View>

                    <InputField name="parent_name" value={parentData.parent_name} error={parentData.parent_name_error} onChange={(v) => {setParentData({...parentData, parent_name: v, parent_name_error: ''})}} />
                    <InputField name="parent_email" value={parentData.parent_email} error={parentData.parent_email_error} onChange={(v) => {setParentData({...parentData, parent_email: v, parent_email_error: ''})}} />
                    <InputField name="parent_country" value={parentData.parent_country} error={parentData.parent_country_error} onChange={(v) => {setParentData({...parentData, parent_country: v, parent_country_error: ''})}} />
                    <InputField name="parent_phone" value={parentData.parent_phone} error={parentData.parent_phone_error} onChange={(v) => {setParentData({...parentData, parent_phone: v, parent_phone_error: ''})}} />
                    <InputField name="parent_password" value={parentData.parent_password} error={parentData.parent_password_error} onChange={(v) => {setParentData({...parentData, parent_password: v, parent_password_error: ''})}} />
                    <InputField name="parent_confirm_password" value={parentData.parent_confirm_password} error={parentData.parent_confirm_password_error} onChange={(v) => {setParentData({...parentData, parent_confirm_password: v, parent_confirm_password_error: ''})}} />

                    <Text></Text>
                    <Button title='Submit' onPress={saveParentData} />
                </View>
            }


            </ScrollView>

            
    </View>
    )
}