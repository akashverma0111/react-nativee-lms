import { useCallback, useEffect, useState } from 'react';
import { Text, View, Button, ImageBackground, Image, ScrollView, RefreshControl, TouchableOpacity, ActivityIndicator, FlatList, Modal, Pressable, Alert, StyleSheet } from 'react-native';
import { fetchData, retriveData, ShowAlert, storeData } from '../common/Helper';
import { useIsFocused } from '@react-navigation/native'
import _ from 'lodash';


export const JoinCourse = ({route}) => {
    const isFocused = useIsFocused()
    const [data, setData] = useState('')
    const [auth, setAuth] = useState('')
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [join, setJoin] = useState(false);
    
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);
    
    useEffect(() => {
        if(isFocused){
            onRefresh()
            retriveData('auth', (err, res) => setAuth(JSON.parse(res)))
            fetchData(`courses-details/${route.params.id}?student_id=${auth ? auth.id : 0}`, 'GET', '', false, false, (res) => {
                setData(res.data)
                setJoin(res.data.join)
            }, (err) => {})
        }
    }, [isFocused])


    
    const joinThisCourse = (join_type) => {
            let formData = {
                student_id : auth && auth.id,
                course_id  : data.id,
                join_type  : join_type,
                course_name: data && data.name,
                level_name : data && data.level_name,
                teacher_name: data && data.teacher_name,
            }
            fetchData(`join-courses`, 'POST',formData, true, false, (res) => {
                if (res.status && res.data) {
                    setModalVisible(false)
                    setJoin(true)
                }
            }, (err) => { })
    }

    const checkUser = () => {
        if(auth && auth.role_id !== 6){
            let msg = 'Please register as a student to join the course.'
            ShowAlert(msg)
        }else{
            setModalVisible(true)
        }
    }

    return (
        <View style={{ flex: 1}}>
            <View style={{backgroundColor: '#20bcef'}}>
                <ImageBackground source={require('../../assets/images/courses-bg.png')} style={{height: 50}}>
                    <Text style={{color: '#f15829', marginTop: 10, marginLeft: 25, fontWeight: 'bold', fontSize: 20}}>Join Course</Text>
                </ImageBackground >
            </View>

            <View style={{backgroundColor : '#feefea', borderRadius: 20, borderColor: "#20bcef", borderWidth: 2, flex: 1, marginHorizontal: 20, marginVertical: 10, paddingVertical: 10}}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                <Text style={{color: '#20bcef', marginTop: 10, marginLeft: 25, fontWeight: 'bold', fontSize: 20}}>Join Course</Text>

                <View style={{flex: 1, flexDirection: 'row', color: '#20bcef', borderColor: '#f15829', borderRadius: 20, marginTop: 10, marginHorizontal: 15, paddingVertical: 5, paddingHorizontal: 15, fontWeight: 'bold', borderWidth: 1}}>
                    <Image source={{uri: data.teacher_image}} resizeMode="cover" style={{height: 300, width: '100%', marginVertical: 10, borderRadius: 20}} />
                </View>

                <View style={{flex: 1, flexDirection: 'row', color: '#20bcef', borderColor: '#f15829', borderRadius: 20, marginTop: 10, marginHorizontal: 15, paddingVertical: 5, paddingHorizontal: 15, fontWeight: 'bold', borderWidth: 1}}>
                    <Image source={require('../../assets/images/docu.png')} style={{flex: 1, justifyContent: 'center', textAlign: 'center',}} resizeMode="contain"/>
                    <View style={{flex: 7, justifyContent: 'center', textAlign: 'center', marginLeft: 10}}>
                    <Text style={{color: '#f15829', fontWeight: 'bold'}}>Description:</Text>
                    <Text>{data && data.description}</Text>
                    </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row', color: '#20bcef', borderColor: '#f15829', borderRadius: 20, marginTop: 10, marginHorizontal: 15, paddingVertical: 5, paddingHorizontal: 15, fontWeight: 'bold', borderWidth: 1}}>
                    <Image source={require('../../assets/images/tutor.png')} style={{flex: 1, justifyContent: 'center', textAlign: 'center',}} resizeMode="contain"/>
                    <View style={{flex: 7, justifyContent: 'center', textAlign: 'center', marginLeft: 10}}>
                        <Text style={{color: '#f15829', fontWeight: 'bold'}}>Tutor:
                            <Text style={{color: '#20bcef', fontWeight: 'bold'}}>  {data && data.teacher_name}</Text>
                        </Text>
                    </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row', color: '#20bcef', borderColor: '#f15829', borderRadius: 20, marginTop: 10, marginHorizontal: 15, paddingVertical: 5, paddingHorizontal: 15, fontWeight: 'bold', borderWidth: 1}}>
                    <Image source={require('../../assets/images/pdf.png')} style={{flex: 1, justifyContent: 'center', textAlign: 'center',}} resizeMode="contain"/>
                    <View style={{flex: 7, justifyContent: 'center', textAlign: 'center', marginLeft: 10}}>
                        <Text style={{color: '#f15829', fontWeight: 'bold'}}>PDF:
                            <Text style={{color: '#20bcef', fontWeight: 'bold'}}>  Weekly</Text>
                        </Text>
                    </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row', color: '#20bcef', borderColor: '#f15829', borderRadius: 20, marginTop: 10, marginHorizontal: 15, paddingVertical: 5, paddingHorizontal: 15, fontWeight: 'bold', borderWidth: 1}}>
                    <Image source={require('../../assets/images/record.png')} style={{flex: 1, justifyContent: 'center', textAlign: 'center',}} resizeMode="contain"/>
                    <View style={{flex: 7, justifyContent: 'center', textAlign: 'center', marginLeft: 10}}>
                        <Text style={{color: '#f15829', fontWeight: 'bold'}}>PDF:
                            <Text style={{color: '#20bcef', fontWeight: 'bold'}}>  Available</Text>
                        </Text>
                    </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row', color: '#20bcef', borderColor: '#f15829', borderRadius: 20, marginTop: 10, marginHorizontal: 15, paddingVertical: 5, paddingHorizontal: 15, fontWeight: 'bold', borderWidth: 1}}>
                    <Image source={require('../../assets/images/price.png')} style={{flex: 1, justifyContent: 'center', textAlign: 'center',}} resizeMode="contain"/>
                    <View style={{flex: 3, justifyContent: 'center', textAlign: 'center', marginLeft: 10}}>
                        <Text style={{color: '#f15829', fontWeight: 'bold'}}>Course Price:</Text>
                        <Text style={{color: '#20bcef', fontWeight: 'bold'}}>{data && data.course_price}</Text>
                    </View>
                    <View style={{flex: 3, justifyContent: 'center', textAlign: 'center', marginLeft: 10}}>
                        <Text style={{color: '#f15829', fontWeight: 'bold'}}>Class Price:</Text>
                        <Text style={{color: '#20bcef', fontWeight: 'bold'}}>{data && data.class_price}</Text>
                    </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row', color: '#20bcef', borderColor: '#f15829', borderRadius: 20, marginTop: 10, marginHorizontal: 15, paddingVertical: 5, paddingHorizontal: 15, fontWeight: 'bold', borderWidth: 1}}>
                    <Image source={require('../../assets/images/watch.png')} style={{flex: 1, justifyContent: 'center', textAlign: 'center',}} resizeMode="contain"/>
                    <View style={{flex: 7, justifyContent: 'center', textAlign: 'center', marginLeft: 10}}>
                        <Text style={{color: '#f15829', fontWeight: 'bold'}}>Timing (Cairo Local Time):
                            <View>
                                {
                                    data && data.class_day && data.class_day.length > 0 ? data.class_day.map((time, index) => {
                                        return (
                                            index < 4 && <Text key={index} style={{color: '#20bcef', fontWeight: 'bold'}}>{_.capitalize(time.day)}:
                                                <Text>  {time.start_time} to {time.end_time}</Text>
                                            </Text>
                                        )
                                    }) : <Text style={{color: '#20bcef', fontWeight: 'bold'}}>No Timing Avialble</Text>
                                }
                            </View>
                        </Text>
                    </View>
                </View>


                <View style={{flex: 1, color: '#20bcef', borderColor: '#f15829', borderRadius: 20, marginTop: 10, marginBottom: 20, marginHorizontal: 15, paddingVertical: 5, paddingHorizontal: 15, fontWeight: 'bold', borderWidth: 1}}>
                    {join ? <Button title={'You are Joined'} color="#f15829" /> : <Button onPress={checkUser} title={'Join Course'} color="#20bcef" />}
                </View>
                                
            </ScrollView>
            </View>

            <View>
                 <Modal
                 animationType="slide"
                 transparent={true}
                 visible={modalVisible}
               >
                 <View style={styles.centeredView}>
                   <View style={styles.modalView}>
                     <Text style={{marginHorizontal: 50, marginBottom: 10}}>You are join "{data.name}" course tuoght by "{data.teacher_name}".</Text>
                     <View style={{flexDirection: 'row'}}>
                     <Pressable style={[styles.button, styles.buttonClose, {marginEnd: 10}]} onPress={() => joinThisCourse('class')}>
                       <Text style={styles.textStyle}>Join as Class</Text>
                     </Pressable>
                     <Pressable style={[styles.button, styles.buttonClose, {backgroundColor: '#f15829'}]} onPress={() => joinThisCourse('course')}>
                       <Text style={styles.textStyle}>Join as Course</Text>
                     </Pressable>
                     </View>
                     <Pressable style={[styles.button, styles.buttonClose, {backgroundColor: 'red', margin: 10, width: 100}]} onPress={() => setModalVisible(false)}>
                       <Text style={styles.textStyle}>Join Later</Text>
                     </Pressable>
                   </View>
                 </View>
               </Modal>
            </View>
            
    </View>
    )
}



const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10
    },
    modalView: {
      margin: 10,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 15,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 5,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
      checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
      checkbox: {
      alignSelf: "center",
    },
      label: {
      margin: 8,
    },
      
  });
  