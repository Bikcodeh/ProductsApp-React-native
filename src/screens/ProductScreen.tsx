import React from 'react'
import { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Picker } from '@react-native-picker/picker';

import { ProductsStackParams } from '../navigation/ProductsNavigator';
import { Subheading, TextInput, Button } from 'react-native-paper';
import { useCategories } from './../hooks/useCategories';
import { Categoria } from '../interfaces/AppInterfaces';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { }

export const ProductScreen = ({ route, navigation }: Props) => {

  const { id = '', name = '' } = route.params;
  const [data, setData] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Categoria>();
  const {categories, isLoading} = useCategories();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: name ? name : 'Add Product'
    })
    setData(name)
  }, []);


  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          label="Product name"
          mode='outlined'
          value={data}
          onChangeText={text => setData(text)}
        />
        <Subheading style={{ marginTop: 16 }}>
          Category:
        </Subheading>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCategory(itemValue)
          }>
            {
              categories.map(category => (<Picker.Item key={category._id} label={category.nombre} value={category._id} />))
            }
        </Picker>
        <Button mode="contained" onPress={() => console.log('Pressed')}>
          Save
        </Button>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 16, alignItems: 'center' }}>
          <Button style={{ marginEnd: 8 }} mode="contained" onPress={() => console.log('Pressed')}>
            Save
          </Button>
          <Button style={{ marginStart: 8 }} mode="contained" onPress={() => console.log('Pressed')}>
            Save
          </Button>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 16
  },
  label: {
    fontSize: 20
  }
})