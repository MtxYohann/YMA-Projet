import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { StyleSheet, View, Alert,Pressable,Text } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { Session } from '@supabase/supabase-js'
import Avatar from './Avatar'
import { Link } from 'expo-router'

export default function Account({ session }: { session: Session }) {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('')
    const [website, setWebsite] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
  
    useEffect(() => {
      if (session) getProfile()
    }, [session])
  
    async function getProfile() {
      try {
        setLoading(true)
        if (!session?.user) throw new Error('No user on the session!')
  
        const { data, error, status } = await supabase
          .from('profiles')
          .select(`username, website, avatar_url`)
          .eq('id', session?.user.id)
          .single()
        if (error && status !== 406) {
          throw error
        }
  
        if (data) {
          setUsername(data.username)
          setWebsite(data.website)
          setAvatarUrl(data.avatar_url)
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message)
        }
      } finally {
        setLoading(false)
      }
    }
  
    async function updateProfile({
      username,
      website,
      avatar_url,
    }: {
      username: string
      website: string
      avatar_url: string
    }) {
      try {
        setLoading(true)
        if (!session?.user) throw new Error('No user on the session!')
  
        const updates = {
          id: session?.user.id,
          username,
          website,
          avatar_url,
          updated_at: new Date(),
        }
  
        const { error } = await supabase.from('profiles').upsert(updates)
  
        if (error) {
          throw error
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message)
        }
      } finally {
        setLoading(false)
      }
    }
  
    return (
      <View style={styles.container}>
       <View>
            <Avatar
                size={200}
                url={avatarUrl}
                onUpload={(url: string) => {
                setAvatarUrl(url)
                updateProfile({ username, website, avatar_url: url })
                }}
            />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input label="Email" value={session?.user?.email} disabled />
        </View>
        <View style={styles.verticallySpaced}>
          <Input label="Username" value={username || ''} onChangeText={(text) => setUsername(text)} />
        </View> 
        <View>
        <Link href="/home" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Page d'accueil</Text>
          </Pressable>
        </Link>
        </View>     
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button
            title={loading ? 'Loading ...' : 'Update'}
            onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
            disabled={loading}
          />
        </View>
        
        <View style={styles.verticallySpaced}>
          <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
        </View>
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
    buttonText: {
      color: '#000',
      fontSize: 18,
      fontWeight: 'bold',
    },
  
  })
  