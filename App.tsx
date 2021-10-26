import 'react-native-gesture-handler'

import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'

import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

import { RootStackParamList } from './src/@types/nav-types'
import { Sidebar } from './src/components/Sidebar/Sidebar'
import AppProvider from './src/hooks'
import { Cat } from './src/screens/Cat'
import { Form } from './src/screens/Form'
import { Home } from './src/screens/Home'
import { StatusBar } from 'expo-status-bar'

const Drawer = createDrawerNavigator<RootStackParamList>();

export default function App() {
  return (
    <AppProvider>
    <PaperProvider>
      <StatusBar 
          style="light" 
          translucent
          backgroundColor="transparent"
        />
      <NavigationContainer >
      <Drawer.Navigator 
        screenOptions={{ headerShown: false }} 
        drawerContent={() => <Sidebar />}
      >
        <Drawer.Screen  name="Home" component={Home} />
        <Drawer.Screen  name="Form" component={Form} />
        <Drawer.Screen name="Cat" component={Cat} />
     </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
    </AppProvider>

  );
}
