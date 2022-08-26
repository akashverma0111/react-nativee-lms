import { View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../modules/Home';
import { Login } from '../modules/Login';
import { LeftHeaderBar, RightHeaderBar } from './Header';
import { SignUp } from '../modules/SignUp';
import { ContactUs } from '../modules/ContactUs';
import { AboutUs } from '../modules/AboutUs';
import { JoinCourse } from '../modules/JoinCourse';
import { MyProfile } from '../auth/MyProfile';

export const Routing = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    const TabScreen = () => {
        return (
          <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false, tabBarStyle: {backgroundColor: '#00042b'}}}>
            <Tab.Group>
              <Tab.Screen name="Home" component={Home} options={{title: 'Home', tabBarIcon: ({ focused }) => <HomeIcon />,}} />
              <Tab.Screen name="About" component={AboutUs} options={{title: 'About-Us', tabBarIcon: ({ focused }) => <AboutIcon />,}} />
              <Tab.Screen name="Contact" component={ContactUs} options={{title: 'Contact-Us', tabBarIcon: ({ focused }) => <ContactIcon />,}}  />
            </Tab.Group>

            <Tab.Group screenOptions={{tabBarItemStyle: {display: 'none'}}}>
              <Tab.Screen name="Signup" component={SignUp} />
              <Tab.Screen name="Login" component={Login} />
              <Tab.Screen name="JoinCourse" component={JoinCourse} />
              <Tab.Screen name="MyProfile" component={MyProfile} />
            </Tab.Group>
          </Tab.Navigator>
        );
      }

    return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="TabScreen" screenOptions={{headerLeft: () => <LeftHeaderBar />, headerRight: () => <RightHeaderBar />}}>
                    <Stack.Screen name="TabScreen" component={TabScreen} options={{title: ''}} />
                </Stack.Navigator>
            </NavigationContainer>
    )
}

export const HomeIcon = () => {
  return (
    <View>
      <Image source={require(`../../assets/images/home.png`)} resizeMode="contain" style={{ width: 25, tintColor: '#f15829', }} />
    </View>
  )
}

export const AboutIcon = () => {
  return (
    <View>
      <Image source={require(`../../assets/images/about.png`)} resizeMode="contain" style={{ width: 25, tintColor: '#f15829', }} />
    </View>
  )
}

export const ContactIcon = () => {
  return (
    <View>
      <Image source={require(`../../assets/images/contacts.png`)} resizeMode="contain" style={{ width: 25, tintColor: '#f15829', }} />
    </View>
  )
}