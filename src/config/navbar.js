import React, { useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/notification"
import LoginScreen from '../screens/loginscreen';
import Register from '../screens/register';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Map from '../screens/map';
import { onAuthStateChanged, auth, doc, getDoc, db } from './firebase';
import { GlobalContext } from '../context/context';
import Form from '../screens/form';



const Tab = createBottomTabNavigator();
export default function Nav() {
  const { state, dispatch } = useContext(GlobalContext)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfo(user.uid);
      }
      else {
        console.log('user not found');
      }
    })
  }, []);

  const fetchUserInfo = async (uid) => {
    let userRef = doc(db, 'signup users', uid);
    let userInfo = await getDoc(userRef);
    userInfo = userInfo.data();
    console.log(userInfo);
    dispatch({ type: "AUTH_USER", payload: userInfo });
  }
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Login"

        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Login') {
              iconName = focused
                ? "log-in"
                :
                'log-in'
                ;
            }
            else if (route.name === 'Register') {
              iconName = focused ?
                'add'
                :
                'add';
            }
            else if (route.name === 'Home') {
              iconName = focused ?
                'home'
                :
                'home';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#0976BC',
          tabBarInactiveTintColor: 'grey',
        })}
      >
        {
          state.authUser ?
            <>
              {
                state.authUser.userrole == 'branch manager' ?
                <Tab.Screen name="Home" component={HomeScreen} />
                  :<>
                  <Tab.Screen name="Public User" component={Map} style={{color:"white"}}/>
                  <Tab.Screen name="Form" component={Form} style={{color:"white"}}/>
                  </>
              }
            </>
            :
            <>
              <Tab.Screen name="Login" component={LoginScreen} />
              <Tab.Screen name="Register" component={Register} />

            </>
        }
      </Tab.Navigator>
    </NavigationContainer >
  );
}