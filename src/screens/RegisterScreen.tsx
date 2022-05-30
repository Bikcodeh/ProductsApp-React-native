import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { WhiteLogo } from '../components/WhiteLogo'
import { useForm } from '../hooks/useForm'
import { loginStyles } from '../theme/LoginTheme'
import { AuthContext } from './../context/AuthContext';
import { useEffect } from 'react';

interface Props extends StackScreenProps<any, any> {}


export const RegisterScreen = ({ navigation }: Props) => {

  const { signUp, errorMessage, removeError } = useContext(AuthContext);

  const { email, password, name, onChange } = useForm({
    name: '',
    email: '',
    password: ''
  });

  const onRegister = () => {
      console.log({ email, password })
      signUp({
        correo: email,
        password,
        nombre: name
      })
      Keyboard.dismiss();
  }

  useEffect(() => {
    if(errorMessage.length == 0) return;

    Alert.alert("Error", errorMessage, [
      {
        text: "OK",
        onPress: removeError
      }
    ])
  }, [errorMessage])
  

  return (
    <>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: '#5856D6'
        }}
        behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
      >
        <ScrollView>
          <View style={loginStyles.formContainer}>
            <WhiteLogo />
            <Text style={loginStyles.title}>Register</Text>
            <Text style={loginStyles.label}>Name</Text>
            <TextInput
              placeholder='Enter your name'
              placeholderTextColor='rgba(255, 255, 255, 0.4)'
              underlineColorAndroid='white'
              style={[
                loginStyles.inputField,
                (Platform.OS === 'ios') && loginStyles.inputFieldIOS
              ]}
              selectionColor="white"
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={(value) => onChange(value, 'name')}
              value={name}
              onSubmitEditing={onRegister}
            />
            <Text style={loginStyles.label}>Email</Text>
            <TextInput
              placeholder='Enter your email'
              placeholderTextColor='rgba(255, 255, 255, 0.4)'
              keyboardType='email-address'
              underlineColorAndroid='white'
              style={[
                loginStyles.inputField,
                (Platform.OS === 'ios') && loginStyles.inputFieldIOS
              ]}
              selectionColor="white"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(value) => onChange(value, 'email')}
              value={email}
              onSubmitEditing={onRegister}
            />
            <Text style={loginStyles.label}>Password</Text>
            <TextInput
              placeholder='Enter your password'
              placeholderTextColor='rgba(255, 255, 255, 0.4)'
              underlineColorAndroid='white'
              secureTextEntry
              style={[
                loginStyles.inputField,
                (Platform.OS === 'ios') && loginStyles.inputFieldIOS
              ]}
              selectionColor="white"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(value) => onChange(value, 'password')}
              value={password}
              onSubmitEditing={onRegister}
            />
            <View style={loginStyles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={loginStyles.button}
                onPress={onRegister}
              >
                <Text style={loginStyles.buttonText}>
                  Create account
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={ () => navigation.replace('LoginScreen')}
              activeOpacity={0.8}
              style={ loginStyles.buttonReturn}
            >
              <Text style={ loginStyles.buttonText}>
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}
