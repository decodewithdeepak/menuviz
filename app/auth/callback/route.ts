import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    try {
      const supabase = await createClient()
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('OAuth callback error:', error)
        return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`)
      }
    } catch (err) {
      console.error('OAuth callback exception:', err)
      return NextResponse.redirect(`${origin}/login?error=Authentication failed`)
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${origin}/dashboard`)
}

