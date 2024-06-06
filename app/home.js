import { View,StyleSheet,Text,Pressable } from "react-native";
import { Link } from "expo-router";
import FetchPays from "../components/FetchPays"

export default function AddPaysScreen () {
    return (
        <View style={styles.container}>
      <Link href="/addPays" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Ajouter un pays</Text>
        </Pressable>
      </Link>
      <FetchPays />
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcf6ea',
      },
      button: {
        width: 300, 
        padding: 20, 
        marginTop: 20, 
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
      buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
      },
    });