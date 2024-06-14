import { useState } from 'react'
import { supabase } from '../lib/supabase'
import {  StyleSheet, View, Alert} from 'react-native'
import { Button, Input } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import Drapeau from './Drapeau'

export default function Pays() {
    const navigation = useNavigation()

    const [name,setName] = useState('')
    const [capital,setCapital] = useState('')
    const [drapeau,setDrapeau] = useState('')
    const [nbr_habitant,setNbr_habitant] = useState('')
    const [loading, setLoading] = useState(false)

    async function AddPays() {
    setLoading(true)
    
    const { error} = await supabase.from('pays').insert({
        name: name,
        capital: capital,
        nbr_habitant: nbr_habitant,
        drapeau: drapeau
    })
    setLoading(false)
    if (error) Alert.alert(error.message)
        else {
        Alert.alert("Votre pays à bien été enregistré")
        navigation.goBack()
        }
    }
    return (
        <View style={styles.container}>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Input
              label="Nom du pays"
              leftIcon={{ type: 'font-awesome', name: 'map-pin' }}
              onChangeText={(text) => setName(text)}
              value={name}
              placeholder="France"
              autoCapitalize={'none'}
            />
          </View>
          <View style={styles.verticallySpaced}>
            <Input
              label="Capital"
              leftIcon={{ type: 'font-awesome', name: 'star' }}
              onChangeText={(text) => setCapital(text)}
              value={capital}
              placeholder="Paris"
              autoCapitalize={'none'}
            />
          </View> 
          <View style={styles.verticallySpaced}>
            <Input
              label="Nombre d'habitants"
              leftIcon={{ type: 'font-awesome', name: 'users' }}
              onChangeText={(text) => setNbr_habitant(text)}
              value={nbr_habitant}
              placeholder="68 373 433"
              autoCapitalize={'none'}
            />
          </View> 
          <Drapeau
                size={200}
                url={drapeau}
                onUpload={(url: string) => {
                setDrapeau(url)
                }}
            />       
          <View style={styles.verticallySpaced}>
            <Button title="Ajouter pays" loading={loading} onPress={() => AddPays()} />
            
          </View>
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
      marginTop: 40,
      padding: 12,
      backgroundColor:'#fcf6ea'
    },
    verticallySpaced: {
      paddingTop: 4,
      paddingBottom: 4,
      alignSelf: 'stretch',
    },
    mt20: {
      marginTop: 20,
    },
    buttonText: {
      color: '#000',
      fontSize: 18,
      fontWeight: 'bold',
    },
    button: {
      width: 300, 
      padding: 20, 
      marginTop: 10, 
      borderWidth: 2, 
      borderColor: '#333', 
      borderRadius: 10, 
      backgroundColor: '#fff',
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 4 }, 
      shadowOpacity: 0.1, 
      shadowRadius: 8, 
      elevation: 6, 
    },
  })
