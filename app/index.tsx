import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import Auth from '../components/Auth'
import { View, Text } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { router } from 'expo-router'

export default function SignIn() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   if (session) {
    //     console.log('session?', session)
    //     router.replace("/(app)")
    //   }else {
    //     console.log('weoija;we')
    //   }
    // })

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        console.log('se', session.user.id)
        router.replace({pathname: "/(app)", params: {'user_id': session.user.id} })
        setSession(session)
      }else {
        router.replace("/(auth)")
        setSession(null)
      }
    })
  }, [])
}