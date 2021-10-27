import React, { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, View, Text, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import * as Yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'

import { Header } from '../../components/Header'
import { ActivityIndicator, Button, Colors, TextInput, Title } from 'react-native-paper'
import { maskPhone } from '../../utils/phoneMask'

interface IFormData {
  name: string
  phone: string
  email: string
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email('É necessário um e-mail válido.')
    .required('E-mail é obrigatório.'),
  name: Yup.string().required('Nome obrigatório.'),
  phone: Yup.string().required('Telefone é obrigatória.').max(14, 'Telefone inválido.'),
})


export function Form() {
  const [loading, setLoading] = useState(false)
  const [maskedPhone, setMaskedPhone] = useState('')
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange'
  })

  const handleSignIn = useCallback(
    async (data: IFormData) => {
      try {
        setLoading(true)
        setTimeout(() => {
          Alert.alert('Cadastro feito com sucesso.', '',
            [
              { text: "OK", onPress: () => setLoading(false) }
            ]
          )
          const { email, name } = data
          console.log({
            email,
            name,
            maskedPhone
          })
        }, 2000)
      } catch (err) {
        Alert.alert('Erro no login.', 'E-mail/senha estão errados')
        setLoading(false)
      }
    },
    []
  )

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header title='Formulário' subTitle="Envie seu formulário" />
        <LinearGradient
          colors={[Colors.blue800, Colors.blue900, Colors.indigo900]}
          start={{ x: 0, y: 0.8 }}
          end={{ x: 0.9, y: 1 }}
          style={styles.container}
        >
        <View style={styles.content}>
        <LinearGradient colors={[Colors.blue900, Colors.indigo800]} style={styles.form}>
        <Title style={{ color: '#fff', fontWeight: 'bold' }}>
        Form
        </Title>

        <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
        <TextInput
        mode="outlined"
        label="Nome"
        placeholder="João da Silva"
        autoCorrect={false}
        error={errors.name}
        onChangeText={onChange}
        value={value}
        dense
        outlineColor={Colors.white}
        theme={{ colors: { primary: Colors.orange900, text: "#fff", placeholder: "#fff" } }}
        style={styles.input}
        />
      )}
        />
      {
        errors.name && <Text style={styles.error}>{errors.name.message}</Text>
      }
        <Controller
        control={control}
        name="phone"
        rules={{
        onChange: (value) => {
        const masked = maskPhone(value.target.value)
        setMaskedPhone(masked)
        return masked;
      },
      }}
        render={({ field: { onChange, value } }) => (
        <TextInput
        mode="outlined"
        label="Telefone"
        placeholder="(xx)xxxxx-xxxx"
        keyboardType="number-pad"
        error={errors.phone}
        dense
        onChangeText={onChange}
        value={maskedPhone}
        outlineColor={Colors.white}
        theme={{ colors: { primary: Colors.orange900, text: "#fff", placeholder: "#fff" } }}
        style={styles.input}
        />
      )}
        />
      {
        errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>
      }
        <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
        <TextInput
        mode="outlined"
        label="E-mail"
        placeholder="xxx@xxxx.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        error={errors.email}
        dense
        onChangeText={onChange}
        value={value}
        outlineColor={Colors.white}
        theme={{ colors: { primary: Colors.orange900, text: "#fff", placeholder: "#fff" } }}
        style={styles.input}
        />
      )}
        />
      {
        errors.email && <Text style={styles.error}>{errors.email.message}</Text>
      }

      {
        loading?
        <ActivityIndicator animating={true} color={Colors.orange900} size={32} style={{ marginTop: 16 }} />
        :
        <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleSubmit(handleSignIn)} style={styles.button}>
        <Text>Cadastrar</Text>
        </Button>
        </View>
      }

        </LinearGradient>

        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    maxHeight: 300,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  form: {
    width: '80%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
  },
  input: {
    height: 48,
    backgroundColor: Colors.blue900,
    fontWeight: 'bold',
    marginTop: 16,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 180,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    backgroundColor: Colors.orange900
  },
  error: {
    color: Colors.red500,
    fontSize: 12,
    marginTop: 4
  }
})

