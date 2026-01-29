"use client"
import { signIn, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { setAuthToken } from "@/lib/storage"

export default function Component() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [tokenLoading, setTokenLoading] = useState(false)

  const generateAndStoreToken = async () => {
    if (!session?.user?.email) return
    
    setTokenLoading(true)
    try {
      const response = await fetch('/api/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: session.user.email })
      })

      if (response.ok) {
        const data = await response.json()
        // Store token in localStorage with Bearer prefix
        setAuthToken(`Bearer ${data.token}`)
        console.log('JWT token stored in localStorage')
        
        // Wait a moment to ensure localStorage is updated
        await new Promise(resolve => setTimeout(resolve, 100))
        
        // Verify token is stored before redirecting
        const storedToken = localStorage.getItem('authToken')
        if (storedToken) {
          console.log('Token verified in localStorage, redirecting to dashboard')
          router.push('/dashboard')
        } else {
          console.error('Token was not stored in localStorage')
          // Still redirect to dashboard even if token verification fails
          router.push('/dashboard')
        }
      } else {
        console.error('Failed to generate token')
        // Still redirect to dashboard even if token generation fails
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error generating token:', error)
      // Still redirect to dashboard even if token generation fails
      router.push('/dashboard')
    } finally {
      setTokenLoading(false)
    }
  }

  useEffect(() => {
    // If user is already authenticated, generate token and redirect to dashboard
    if (status === "authenticated") {
      generateAndStoreToken()
      return
    }
    
    // If user is not authenticated, redirect to NextAuth sign-in
    if (status === "unauthenticated") {
      signIn()
    }
  }, [status, session])

  // Show minimal loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">
          {tokenLoading ? 'Setting up your session...' : 'Redirecting to sign in...'}
        </p>
      </div>
    </div>
  )
}