import { useEffect, useState,useCallback } from 'react'
import { supabase } from '../lib/supabase'
import {  StyleSheet, Text,FlatList,TouchableOpacity,View } from 'react-native'
import DeletePays from './DeletePays'
import { useFocusEffect } from '@react-navigation/native'

export default function Pays() {
    const [countryList,setCountryList] = useState([])
      
        const fetchPays = async () => {
          const { data, error } = await supabase
            .from('pays')
            .select('*');
     
          if (error) {
            console.error(error);
            return;
          }
     
          setCountryList(data);
        };
        
        useFocusEffect(
          useCallback(() => {
            fetchPays()
          }, [])
        )
      const handleDelete = (countryId) => {
        setCountryList(countryList.filter(country => country.id !== countryId))
      }

        return (
            <View style={styles.container}>
                <FlatList
                    data={countryList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={styles.itemContainer} >
                        <Text>Nom du pays :{item.name}</Text>
                        <Text>Capital du pays :{item.capital}</Text>
                        <Text>Nombre d'habitant :{item.nbr_habitant}</Text>
                        <DeletePays countryId={item.id} onDelete={handleDelete} />
                  </TouchableOpacity>
      )}
      ListFooterComponent={<View style={{ height: 20 }} />}
    />
            </View>
      )   
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 5,
      padding: 12,
    },
    verticallySpaced: {
      paddingTop: 4,
      paddingBottom: 4,
      alignSelf: 'stretch',
    },
    mt20: {
      marginTop: 20,
    },
    itemContainer:{
      width: 300, 
    padding: 20, 
    margin: 20, 
    borderWidth: 2, 
    borderColor: '#333', 
    borderRadius: 10, 
    backgroundColor: '#77c7dc',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 8, 
    elevation: 6, 
    },
    deleteButton: {
      marginTop: 10,
      backgroundColor: 'red',
  },
})