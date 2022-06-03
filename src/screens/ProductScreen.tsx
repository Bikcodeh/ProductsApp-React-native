import React from 'react'
import { useEffect, useContext, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ActivityIndicator, Image, ScrollView, StyleSheet, View } from 'react-native'
import { Picker } from '@react-native-picker/picker';

import { ProductsStackParams } from '../navigation/ProductsNavigator';
import { Subheading, TextInput, Button } from 'react-native-paper';
import { useCategories } from './../hooks/useCategories';
import { useForm } from './../hooks/useForm';
import { ProductsContexts } from '../context/ProductsContexts';
import { launchCamera } from 'react-native-image-picker';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { }

export const ProductScreen = ({ route, navigation }: Props) => {

  const { id = '', name = '' } = route.params;
  console.log('ID PARAM', id);
  const { _id, categoryId, productName, img, onChange, setFormValue } = useForm({
    _id: id,
    categoryId: '',
    productName: name,
    img: ''
  });
  const [tempUri, setTempUri] = useState<string>();

  const { categories, isLoading } = useCategories();
  const { loadProductById, addProduct, updateProduct, uploadImage } = useContext(ProductsContexts);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: name ? 'Product Detail' : 'Add Product'
    })
  }, []);

  useEffect(() => {
    loadProduct()
  }, [])


  const loadProduct = async () => {
    if (id.length === 0) return;

    const product = await loadProductById(id);

    setFormValue({
      _id: id,
      categoryId: product.categoria._id,
      img: product.img || '',
      productName
    })
  }

  const saveOrUpdate = async () => {
    if (id.length > 0)
      updateProduct(categoryId, productName, id)
    else {
      const category = categoryId || categories[0]._id
      const newProduct = await addProduct(category, productName);
      onChange(newProduct._id, '_id')
    }
  }

  const takePhoto = () => {
    launchCamera({
      mediaType: 'photo',
      quality: 0.5,
    }, (resp) => {
      if (resp.didCancel) return;
      if (!resp.assets) return;
      const tempUri = resp.assets[0].uri || undefined
      setTempUri(tempUri);
      uploadImage(resp, _id);
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          label="Product name"
          mode='outlined'
          value={productName}
          onChangeText={text => onChange(text, "productName")}
        />
        <Subheading style={{ marginTop: 16 }}>
          Category:
        </Subheading>
        {
          (isLoading) ? (<View><ActivityIndicator size={50} color="black" /></View>) : (<Picker
            selectedValue={categoryId}
            onValueChange={(itemValue) => onChange(itemValue, 'categoryId')}>
            {
              categories.map(category => (<Picker.Item key={category._id} label={category.nombre} value={category._id} />))
            }
          </Picker>)
        }
        <Button mode="contained" onPress={saveOrUpdate}>
          Save
        </Button>
        {
          (_id.length > 0) && (
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 16, alignItems: 'center' }}>
              <Button style={{ marginEnd: 8 }} mode="contained" onPress={takePhoto}>
                Camera
              </Button>
              <Button style={{ marginStart: 8 }} mode="contained" onPress={() => console.log('Pressed')}>
                Gallery
              </Button>
            </View>
          )
        }
        {
          (img.length > 0 && !tempUri) && (
            <Image
              source={{
                uri: img
              }}
              style={{ width: '100%', height: 200, marginTop: 16 }}
            />
          )
        }
        {
          (tempUri) && (
            <Image
              source={{
                uri: tempUri
              }}
              style={{ width: '100%', height: 200, marginTop: 16 }}
            />
          )
        }
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