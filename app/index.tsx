import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import { Session } from '@supabase/supabase-js'
import { router } from 'expo-router'

export default function SignIn() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    // change route depending on auth status
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace({pathname: "/(app)", params: {'user_id': session.user.id} })
        setSession(session)
      }else {
        router.replace("/(auth)")
        setSession(null)
      }
    })
  }, [])
}