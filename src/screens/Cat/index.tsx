import React, { useEffect, useState } from 'react'
import api from '../../services/api'

import { Image, View, StyleSheet } from 'react-native'
import { ActivityIndicator, Colors, Button } from 'react-native-paper';
import { Header} from '../../components/Header';

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
    <View style={styles.container}>
      <Header title='Gato'/>
      <View style={styles.content}>
        {loading ? <ActivityIndicator animating={true} size="large" color={Colors.orange700} /> :
          <Image source={{ uri: image || ' ' }} style={styles.img} />
        }
        <Button mode="contained" color={Colors.indigo800} onPress={fetchCat}>
          Mais um!
        </Button>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
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
  }
})
