import React from 'react'
import { Colors, Drawer } from 'react-native-paper';
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NavProps } from '../../@types/nav-types';
import { useSideBar } from '../../hooks/sidebar';



export function Sidebar() {
  const {routeName, onChangeRouteName} = useSideBar()


  const {navigate } = useNavigation<NavProps>()

  function handleNavigateHome(){
    onChangeRouteName('Home')
    navigate('Home')
  }

  function handleNavigateCat(){
    onChangeRouteName('Cat')
    navigate('Cat')
  }

  function handleNavigateForm(){
    onChangeRouteName('Form')
    navigate('Form')
  }

  
  return (
    <SafeAreaView  style={{ backgroundColor: Colors.blue900, flex: 1}}>
    <Drawer.Section theme={{colors: { text: Colors.white }}} style={styles.container} title="Menu">
      <Drawer.Item
        icon="home"
        label="Home"
        active={routeName === 'Home'}
        onPress={handleNavigateHome}
        theme={{colors: { primary: Colors.white, text: Colors.blue900 }}}
        style={styles.item}
      />
      <Drawer.Item
        icon="cat"
        label="Gato"
        active={routeName === 'Cat'}
        onPress={handleNavigateCat}
        theme={{colors: { primary: Colors.white, text: Colors.blue900 }}}
        style={styles.item}
      />
      <Drawer.Item
        icon="format-list-bulleted-square"
        label="Fomulário"
        active={routeName === 'Form'}
        onPress={handleNavigateForm}
        theme={{colors: { primary: Colors.white, text: Colors.blue900 }}}
        style={styles.item}
      />
    </Drawer.Section>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
  },
  item: {
    marginVertical: 8,
    backgroundColor: Colors.lightBlue200,
  },
})