'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function CallbackHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  useEffect(() => {
    if (code) {
      const handleCallback = async () => {
        const supabase = createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        
        if (!error) {
          router.push('/dashboard')
        } else {
          console.error('Error exchanging code:', error)
          // Remove code from URL
          router.replace('/login')
        }
      }
      
      handleCallback()
    }
  }, [code, router])

  return null
}

