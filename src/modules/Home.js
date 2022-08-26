import { useCallback, useEffect, useState } from 'react';
import { Text, View, ImageBackground, ScrollView, Image, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import { fetchData } from '../common/Helper';

export const Home = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [courses, setCourses] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const isFocused = useIsFocused()

    const DATA = [
      {title: 'first', img: 'http://weteach.xticode.live/images/banner1.jpg'},
      {title: 'second', img: 'http://weteach.xticode.live/images/banner2.jpg'},
      {title: 'third Item', img: 'http://weteach.xticode.live/images/banner3.jpg'},
    ];

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => setRefreshing(false), 1000);
    }, []);

    const renderItem = ({ item }) => (
      <Image source={{uri: item.img}} resizeMode="contain" style={{height: 130, width: 300}} />
    );
        
    useEffect(() => {
      if(isFocused){
        fetchData('courses/yes', 'GET', '', false, false, (res) => {
          setCourses(res.data)
        }, (err) => {})
        fetchData('feedback/yes', 'GET', '', false, false, (res) => {
          setFeedbacks(res.data)
        }, (err) => {})
      }
  }, [isFocused])
      
    return (
        <View style={{ flex: 1}}>
            <View style={{backgroundColor: '#20bcef'}}>
                <ImageBackground source={require('../../assets/images/courses-bg.png')} style={{height: 50}}>
                    <Text style={{color: '#f15829', marginTop: 10, marginLeft: 25, fontWeight: 'bold', fontSize: 20}}>Home</Text>
                </ImageBackground >
            </View>

            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
            <View>
                <FlatList horizontal={true} showsHorizontalScrollIndicator={false} data={DATA} renderItem={renderItem} keyExtractor={item => item.title} />
            </View>

            <View style={{backgroundColor: '#feefea', padding: 15}}>
              <View style={{flex: 1,paddingBottom: 15, alignItems: 'center', justifyContent: 'center'}}>
               <Text style={{fontWeight: 'bold', fontSize: 15}}>Featured Courses</Text>
              </View>
              <FlatList horizontal={true} showsHorizontalScrollIndicator={true} data={courses} renderItem={({item}) => {
                  return (
                      <TouchableOpacity onPress={() => navigation.navigate('JoinCourse', {id: item.id})} style={{margin: 10, padding: 10, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' , borderRadius: 10, width: 120, height: 220}}>
                        <Image source={{uri: item.course_image}} resizeMode="cover" style={{height: 100, width: 100}} />
                        <Text style={{fontWeight: 'bold'}}>{item.name} ({item.class_price})</Text>
                        <Text>{item.teacher_name}</Text>
                        <Text>({item.subject_name})</Text>
                        <Text style={{textAlign: 'center', color: '#20bcef', fontWeight: 'bold', marginTop: 10, padding: 3, borderColor: '#f15829', borderWidth: 2}}>View Details</Text>
                      </TouchableOpacity>
                  )}} keyExtractor={item => item.id} />
            </View>


            <View style={{padding: 15}}>
                <View style={{flex: 1,paddingBottom: 15, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>What Did We Achieve So Far ?</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{marginVertical: 10, marginHorizontal: 20, padding: 15, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fe9e95' , borderRadius: 10}}>
                      <Image source={require(`../../assets/images/home1.png`)} resizeMode="contain" style={{height: 80}} />
                      <Text style={{fontWeight: 'bold'}}>90000+</Text>
                      <Text>Teaching Hours.</Text>
                    </View>
                    <View style={{marginVertical: 10, marginHorizontal: 20, padding: 15, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#52c4b6', borderRadius: 10}}>
                      <Image source={require(`../../assets/images/home2.png`)} resizeMode="contain" style={{height: 80}} />
                      <Text style={{fontWeight: 'bold'}}>90000+</Text>
                      <Text>Teaching Hours.</Text>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{marginVertical: 10, marginHorizontal: 20, padding: 15, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#5eaff0', borderRadius: 10}}>
                      <Image source={require(`../../assets/images/home3.png`)} resizeMode="contain" style={{height: 80}} />
                      <Text style={{fontWeight: 'bold'}}>90000+</Text>
                      <Text>Teaching Hours.</Text>
                    </View>
                    <View style={{marginVertical: 10, marginHorizontal: 20, padding: 15, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#bd73ff', borderRadius: 10}}>
                      <Image source={require(`../../assets/images/home4.png`)} resizeMode="contain" style={{height: 80}} />
                      <Text style={{fontWeight: 'bold'}}>90000+</Text>
                      <Text>Teaching Hours.</Text>
                    </View>
                </View>
            </View>
            

            <View style={{backgroundColor: '#ffefdf', padding: 15}}>
              <View style={{flex: 1,paddingBottom: 15, alignItems: 'center', justifyContent: 'center'}}>
               <Text style={{fontWeight: 'bold', fontSize: 15}}>Our Students And Parents Feedback</Text>
              </View>
              <FlatList horizontal={true} showsHorizontalScrollIndicator={true} data={feedbacks} renderItem={({item}) => {
                  return (
                      <View style={{margin: 10, padding: 10, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' , borderRadius: 10, width: 120, height: 220}}>
                      <Image source={{uri: item.feedback_image}} resizeMode="cover" style={{height: 100, width: 100}} />
                        <Text style={{fontWeight: 'bold'}}>{item.course_name} ({item.teacher_name})</Text>
                        <Text numberOfLines={4}>{item.feedback_description}</Text>
                      </View>
                  )}} keyExtractor={item => item.id} />
            </View>
        </ScrollView >
    </View>
    )
}