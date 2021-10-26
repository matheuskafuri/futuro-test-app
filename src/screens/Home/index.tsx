import { useNavigation } from '@react-navigation/core'
import React from 'react'

import { StyleSheet, Text } from 'react-native'
import { Button, Title, Colors } from 'react-native-paper'
import { NavProps } from '../../@types/nav-types'
import { LinearGradient } from 'expo-linear-gradient'

export function Home() {
  const { navigate } = useNavigation<NavProps>()

  function handleNavigateForm() {
    navigate('Form')
  }


  return (
    <LinearGradient
      colors={[Colors.blue900, Colors.indigo800, Colors.indigo900]}
      start={{ x: 0, y: 0.8 }}
      end={{ x: 0.9, y: 1 }}
      style={styles.container}
    >
      <Title style={styles.title}>Bem-Vindo ao {'\n'}desafio futuro</Title>
      <Button style={styles.button} mode="contained" onPress={handleNavigateForm}>
        <Text>Entrar</Text>
      </Button>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.indigo700,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 48,
    color: '#fff',
  },
  button: {
    width: 280,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    backgroundColor: Colors.orange900,
  }
})