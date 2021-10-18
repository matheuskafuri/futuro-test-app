import React, { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, View, Text, Alert } from 'react-native'
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
          const {email,name} = data
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
    <View style={styles.container}>
      <Header title='Formulário' subTitle="Envie seu formulário"/>
      <View style={styles.content}>
        <View style={styles.form}>
          <Title>
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
                outlineColor={Colors.indigo800}
                theme={{colors: { primary: Colors.orange700 }}}
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
                outlineColor={Colors.indigo800  }
                theme={{colors: { primary: Colors.orange700 }}}
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
                outlineColor={Colors.indigo800}
                theme={{colors: { primary: Colors.orange700 }}}
              />
            )}
          />
          {
            errors.email && <Text style={styles.error}>{errors.email.message}</Text>
          }

          {
            loading ?
              <ActivityIndicator animating={true} color={Colors.orange700} size={32} style={{ marginTop: 16 }} />
              :
              <Button mode="contained" onPress={handleSubmit(handleSignIn)} style={{ marginTop: 16, backgroundColor: Colors.indigo800 }}>
                <Text>Cadastrar</Text>
              </Button>
          }

        </View>

      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  form: {
    width: '90%',
    justifyContent: 'space-between'
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4
  }
})

