import React from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Background } from '../components/Background'
import { WhiteLogo } from '../components/WhiteLogo'
import { loginStyles } from './../theme/LoginTheme';
import { useForm } from './../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({ navigation }: Props) => {

  const { email, password, onChange } = useForm({
    email: '',
    password: ''
  });

  const onLogin = () => {
      console.log({ email, password })
      Keyboard.dismiss();
  }

  return (
    <>
      { /** Background */}
      <Background />
      <KeyboardAvoidingView
        style={{
          flex: 1,
          flexDirection: 'column'
        }}
        behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
      >
        <ScrollView>
          <View style={loginStyles.formContainer}>
            <WhiteLogo />
            <Text style={loginStyles.title}>Login</Text>
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
              onSubmitEditing={onLogin}
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
              onSubmitEditing={onLogin}
            />
            <View style={loginStyles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={loginStyles.button}
                onPress={onLogin}
              >
                <Text style={loginStyles.buttonText}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
            <View style={loginStyles.newUserContainer}>
              <TouchableOpacity activeOpacity={0.8}
                onPress={() => navigation.replace('RegisterScreen')}>
                <Text style={loginStyles.buttonTextCreateAccount}>
                  Create account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}
