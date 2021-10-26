import React, { useEffect, useState } from 'react'
import api from '../../services/api'

import { Image, View, StyleSheet } from 'react-native'
import { ActivityIndicator, Colors, Button } from 'react-native-paper';
import { Header } from '../../components/Header';
import { LinearGradient } from 'expo-linear-gradient';

interface ResponseData {
  url: string;
}
export function Cat() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');

  async function fetchCat() {
    setLoading(true);
    try {
      const { data } = await api.get<ResponseData[]>('/v1/images/search');
      setImage(data[0].url);
    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCat();
  }, [])

  return (
    <LinearGradient
      colors={[Colors.blue900, Colors.indigo800, Colors.indigo900]}
      start={{ x: 0, y: 0.8 }}
      end={{ x: 0.9, y: 1 }}
      style={styles.container}
    >
      <Header title='Gato' subTitle="Encontre um gatinho"/>
      <View style={styles.content}>
        {loading ? <ActivityIndicator animating={true} size="large" color={Colors.orange700} style={{ marginBottom: 272}} /> :
          <Image source={{ uri: image || ' ' }} style={styles.img} />
        }
        <Button mode="contained" style={styles.button} onPress={fetchCat}>
          Mais um!
        </Button>
      </View>

    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  button: {
    width: 180,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    backgroundColor: Colors.orange900, 
  }
})
