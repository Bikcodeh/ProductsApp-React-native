import React from 'react'
import { Dimensions, View } from 'react-native'

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

export const Background = () => {
  return (
    <View style={{
      position: 'absolute',
      backgroundColor: '#5856D6',
      top: -1 * Math.round((heightScreen * 2) * 0.36),
      width: widthScreen * 2,
      height: heightScreen * 2,
      transform: [
        {
          rotate: '-70deg'
        }
      ]
    }}>
    </View>
  )
}