import React, { useContext } from 'react'
import { Button } from '@react-native-material/core';
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native';
import { AuthContext } from './../context/AuthContext';

export const ProtectedScreen = () => {

  const { user, token, logOut } = useContext(AuthContext);

  return (
    <View style={ styles.container}>
        <Text style={styles.title}>
            <Button
              title='Logout'
              color="#5856D6"
              onPress={ logOut }
             />
        </Text>
        <Text>
            { JSON.stringify( user, null, 5)}
        </Text>
        <Text>
            { JSON.stringify( token, null, 5)}
        </Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginBottom: 20
  }
})