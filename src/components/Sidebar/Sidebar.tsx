import React, { useState } from 'react'
import { Colors, Drawer } from 'react-native-paper';
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavProps } from '../../@types/nav-types';
import { useSideBar } from '../../hooks/sidebar';



export function Sidebar() {
  const {routeName, onChangeRouteName} = useSideBar()


  const {navigate } = useNavigation<NavProps>()

  function handleNavigateCat(){
    onChangeRouteName('Cat')
    navigate('Cat')
  }

  function handleNavigateForm(){
    onChangeRouteName('Form')
    navigate('Form')
  }

  
  return (
    <SafeAreaView>
    <Drawer.Section style={ styles.container} title="Menu">
      <Drawer.Item
        icon="cat"
        label="Gato"
        active={routeName === 'Cat'}
        onPress={handleNavigateCat}
        theme={{colors: { primary: Colors.orange700 }}}
      />
      <Drawer.Item
        icon="format-list-bulleted-square"
        label="Fomulário"
        active={routeName === 'Form'}
        onPress={handleNavigateForm}
        theme={{colors: { primary: Colors.orange700 }}}
      />
    </Drawer.Section>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
  },
})