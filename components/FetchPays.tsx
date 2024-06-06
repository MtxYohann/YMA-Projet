import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import {  StyleSheet, View,Text,FlatList,TouchableOpacity } from 'react-native'

export default function Pays() {
    const [countryList,setCountryList] = useState([])
      
      useEffect(() => {
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
     
        fetchPays();
      }, []);
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
                  </TouchableOpacity>
      )}
    />
            </View>
      )   
}

const styles = StyleSheet.create({
    container: {
      marginTop: 40,
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
})