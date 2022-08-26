import { Text, View, ImageBackground, ScrollView, Image  } from 'react-native';

export const AboutUs = () => {
    return (
        <View style={{ flex: 1}}>
            <View style={{backgroundColor: '#20bcef'}}>
                <ImageBackground source={require('../../assets/images/courses-bg.png')} style={{height: 50}}>
                    <Text style={{color: '#f15829', marginTop: 10, marginLeft: 25, fontWeight: 'bold', fontSize: 20}}>About Us</Text>
                </ImageBackground >
            </View>

            <ScrollView >
            <View>
                <View style={{padding: 25, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>Why Choose Us ?</Text>
                </View>
                <View style={{margin: 15, padding: 25, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fe9e95', borderRadius: 20}}>
                    <Image source={require(`../../assets/images/account.png`)} resizeMode="contain" />
                    <Text style={{fontWeight: 'bold'}}>Teacher</Text>
                    <Text style={{color: 'white'}}>At “We Teach” we have a whole team of experienced teachers of all courses and classes. Our educators would provide full support to students as their expertise exceed their reputation. They develop the latest strategies ensuring that they get good grades without feeling any stress and improving performance throughout the year.</Text>
                </View>

                <View style={{margin: 15, padding: 25, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#52c4b6', borderRadius: 20}}>
                    <Image source={require(`../../assets/images/graduation-cap.png`)} resizeMode="contain" />
                    <Text style={{fontWeight: 'bold'}}>Education</Text>
                    <Text style={{color: 'white'}}>“We Teach” makes the learning experience relaxing, quick and affordable where all the online teaching tools are available for impactful learning. Higher education is provided on this online teaching platform where there is a 24-hour digital learning environment available.</Text>
                </View>

                <View style={{margin: 15, padding: 25, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#5eaff0', borderRadius: 20}}>
                    <Image source={require(`../../assets/images/teaching.png`)} resizeMode="contain" />
                    <Text style={{fontWeight: 'bold'}}>Resources</Text>
                    <Text style={{color: 'white'}}>With our best educational resources; study guides, lecture notes, practice exams, and supplement instructions are available for students who can access them at any time upon their availability.</Text>
                </View>

                <View style={{margin: 15, padding: 25, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#bd73ff', borderRadius: 20}}>
                    <Image source={require(`../../assets/images/diploma.png`)} resizeMode="contain" />
                    <Text style={{fontWeight: 'bold'}}>Trust</Text>
                    <Text style={{color: 'white'}}>We abide by the latest educational standards and to keep up with the system we have introduced our online educational platform; “We Teach" which is a UAE registered company providing high-quality educational services all over the world.</Text>
                </View>
            </View>
        </ScrollView >
    </View>
    )
}