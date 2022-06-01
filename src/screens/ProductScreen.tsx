import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { Text, View } from 'react-native'
import { ProductsStackParams } from '../navigation/ProductsNavigator';
import { useEffect } from 'react';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'>{}

export const ProductScreen = ({ route, navigation }: Props) => {

  const { id = '', name = '' } = route.params;

  useEffect(() => {
      navigation.setOptions({
        headerTitle: name ? name : 'Add Product'
      })
  }, []);
  

  return (
    <View>
        <Text>Data: {id} {name }</Text>
    </View>
  )
}
