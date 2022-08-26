import { useCallback, useEffect, useState } from 'react';
import { Text, View, Button, ImageBackground, ScrollView, Image, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import { fetchData } from '../common/Helper';

export const MyProfile = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [courses, setCourses] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const isFocused = useIsFocused()

      const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);
        
    useEffect(() => {
      if(isFocused){
        
      }
  }, [isFocused])
      
    return (
        <View style={{ flex: 1}}>
            <View style={{backgroundColor: '#20bcef'}}>
                <ImageBackground source={require('../../assets/images/courses-bg.png')} style={{height: 50}}>
                    <Text style={{color: '#f15829', marginTop: 10, marginLeft: 25, fontWeight: 'bold', fontSize: 20}}>My Profile</Text>
                </ImageBackground >
            </View>

            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#20bcef', marginTop: 20}}>Welcome to My Account</Text>
        </ScrollView >
    </View>
    )
}