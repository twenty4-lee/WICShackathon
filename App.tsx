import React, { useState, useEffect } from 'react';
import { StyleSheet, View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,} from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import InitialScreen from './screens/InitialScreen';
import MySplashScreen from './screens/MySplashScreen';
import LoginScreen from './screens/LoginScreen';

import Drawer from 'react-native-drawer';
import SideMenu from './SideMenu';
import AppHeader from './AppHeader';

import { useAccessibilityInfo } from '@react-native-community/hooks';


import { useNavigation } from '@react-navigation/native';


const Stack = createNativeStackNavigator();

const blue = '#ffffff';
const tan = '#D2B48C'; 
const lightBlue = '#C9D3FF'; 
//yellow: #D2B48C

async function loadFonts() {
  await Font.loadAsync({
    Vikendi: require('./assets/fonts/Vikendi.otf'),
    SF: require('./assets/fonts/SF.ttf'),
    SFBold: require('./assets/fonts/SFBold.ttf'),
    ...Ionicons.font,
  });
}

function App(): React.ReactElement{
  const [hideSplashScreen, setHideSplashScreen] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);



  useEffect(() => {
    

    const timer = setTimeout(() => {
      setHideSplashScreen(true);
    }, 1000);

    SplashScreen.preventAutoHideAsync().catch(() => {});

    loadFonts()
      .then(() => {
        setFontsLoaded(true);
        SplashScreen.hideAsync().catch(() => {});
      })
      .catch(console.error);

    return () => clearTimeout(timer);
  }, []);
    if (!fontsLoaded || !hideSplashScreen) {
      return <MySplashScreen />;
    }

    const getScreenOptions = (type: 'internal' | 'external', overrides = {}) => {
      const internalOptions = {
        headerTransparent: false,
        headerTintColor: '#D2B48C',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: '#D2B48C' },
        headerTitle: '',
        headerTitleAlign: 'center',
        header: (props) => (
          <AppHeader
            style
            back={false}
            headerBg="#D2B48C"
            iconColor="#182640"
            tintColor
            title="Home"
            menu
            right="menu"
            onMenuPress={() => setDrawerOpen(true)}
            onLogoutPress={() => console.log('Logout')}
            {...props}
          />
        ),
      };
  
      const externalOptions = {
        headerTransparent: true,
        headerTintColor: 'tan',
        headerTitle: '',
        headerShadowVisible: false,
      };
      
  
      const baseOptions = type === 'internal' ? internalOptions : externalOptions;
  
      return {
        ...baseOptions,
        ...overrides,
      };
    };
  
    
  
  return (
    
   <Drawer
   
    type="overlay"
    content={
      <SideMenu
        onClose={() => setDrawerOpen(false)}
        onLogout={() => console.log('Logout')}
        onHelpCenter={() => console.log('Help Center')}
        onPrivacyPolicy={() => console.log('Privacy Policy')}
        onSettings={() => console.log('Settings')}
      />
    }
    open={drawerOpen}
    tapToClose={true}
    openDrawerOffset={0.2}
    panCloseMask={0.2}
    closedDrawerOffset={-3}
    styles={{ drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 } }}
    tweenHandler={ratio => ({
      main: { opacity: 1 },
      mainOverlay: { opacity: ratio / 2, backgroundColor: 'black' },
    })}
  >
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName='InitialScreen'>
        <Stack.Screen name="MySplashScreen" component={MySplashScreen} options={{headerShown: false}} />
        <Stack.Screen name="InitialScreen" component={InitialScreen}
          options={{headerShown: false}}    
        />
        <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={getScreenOptions('external')}
      />
       
          
      </Stack.Navigator>
 
    </NavigationContainer>
    </Drawer>
    
  );
}



export default App;


