import { useNavigation } from '@react-navigation/core'
import React from 'react'

import { View, StyleSheet, Text} from 'react-native'
import { Button, Title, Colors } from 'react-native-paper'
import { NavProps } from '../../@types/nav-types'

export function Home() {
  const { navigate } = useNavigation<NavProps>()

  function handleNavigateForm(){
    navigate('Form')
  }


  return (
    <View style={styles.container}>
      <Title style={styles.title}>Bem-Vindo ao {'\n'}desafio futuro</Title>
      <Button style={styles.button} mode="contained" onPress={handleNavigateForm} color={Colors.indigo800}>
        <Text>Entrar</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#e0e0e0',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 48
  },
  button: {
    width: '70%',
    height: 40,
    justifyContent: 'center',
  }
})