import { supabase } from '../lib/supabase'
import {  StyleSheet,Alert } from 'react-native'
import { Button } from '@rneui/themed'

const DeletePays = ({ countryId, onDelete}) => {

    const deleteCountry = async () => {
        const { error } = await supabase
            .from('pays')
            .delete()
            .eq('id', countryId);

        if (error) {
            console.error(error);
            Alert.alert("Erreur", "Impossible de supprimer le pays");
            return;
        }
        onDelete(countryId)
    }

        return (                
                <Button
                    title="Supprimer"
                    onPress={deleteCountry}
                    buttonStyle={styles.deleteButton}
                />        
    )   
}

const styles = StyleSheet.create({

deleteButton: {
  marginTop: 10,
  backgroundColor: 'red',
},
})

export default DeletePays