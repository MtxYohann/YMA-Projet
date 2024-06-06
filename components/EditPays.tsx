import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { StyleSheet, View, Alert } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { useNavigation, useRoute } from '@react-navigation/native'

export default function EditPays() {
  const navigation = useNavigation()
  const route = useRoute()
  const { country } = route.params

  const [name, setName] = useState(country.name)
  const [capital, setCapital] = useState(country.capital)
  const [nbr_habitant, setNbrHabitant] = useState(country.nbr_habitant)
  const [loading, setLoading] = useState(false)

  async function updatePays() {
    setLoading(true)

    const { error } = await supabase
      .from('pays')
      .update({
        name: name,
        capital: capital,
        nbr_habitant: nbr_habitant,
      })
      .eq('id', country.id)

    setLoading(false)

    if (error) {
      Alert.alert(error.message)
    } else {
      Alert.alert("Le pays a été mis à jour avec succès")
      navigation.goBack()
    }
  }

  return (
    <View style={styles.container}>
      <Input
        label="Nom du pays"
        leftIcon={{ type: 'font-awesome', name: 'map-pin' }}
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <Input
        label="Capital"
        leftIcon={{ type: 'font-awesome', name: 'star' }}
        onChangeText={(text) => setCapital(text)}
        value={capital}
      />
      <Input
        label="Nombre d'habitants"
        leftIcon={{ type: 'font-awesome', name: 'users' }}
        onChangeText={(text) => setNbrHabitant(text)}
        value={nbr_habitant}
      />
      <Button title="Modifier" loading={loading} onPress={updatePays} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fcf6ea'
  },
})
