import React, { useContext } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { ProductsContexts } from './../context/ProductsContexts';
import { StyleSheet } from 'react-native';
import { capitalizeFirstLetter } from '../helpers/strings';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigation/ProductsNavigator';
import { useEffect } from 'react';
import { Button, Card, Paragraph, Title } from 'react-native-paper';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> { }

export const ProductsScreen = ({ navigation }: Props) => {

  const { products } = useContext(ProductsContexts);


  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ marginRight: 16 }}
          onPress={() => navigation.navigate('ProductScreen', {})}
        >
          <Text>Add</Text>
        </TouchableOpacity>
      )
    })
  }, []);

  return (
    <View style={{ flex: 1, marginHorizontal: 16 }}>
      <FlatList
        data={products}
        keyExtractor={(p) => p._id}
        renderItem={({ item }) => (
          <Card
            mode='elevated'
            elevation={4}
            style={{
              margin: 4
            }}
            onPress={() => navigation.navigate('ProductScreen', {
              id: item._id,
              name: item.nombre
            })}
          >
            <Card.Content>
              <Title>{capitalizeFirstLetter(item.nombre.toLowerCase())}</Title>
            </Card.Content>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          </Card>
        )}
      />
    </View>
  )
}

/* <TouchableOpacity
                activeOpacity={0.4}
                onPress={() => navigation.navigate('ProductScreen', {
                  id: item._id,
                  name: item.nombre
                })}
              >
                <Text style={styles.productName}> {capitalizeFirstLetter(item.nombre.toLowerCase())}</Text>
              </TouchableOpacity> */

const styles = StyleSheet.create({
  productName: {
    fontSize: 18,
  }
});