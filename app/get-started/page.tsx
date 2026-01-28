"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from "react"
import { setAuthToken, removeAuthToken } from "@/lib/storage"

export default function Component() {
  const { data: session } = useSession()
  const [dbUser, setDbUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tokenLoading, setTokenLoading] = useState(false)

  useEffect(() => {
    if (session?.user?.email) {
      verifyUserInDB()
      generateAndStoreToken()
    }
  }, [session])

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
      } else {
        console.error('Failed to generate token')
      }
    } catch (error) {
      console.error('Error generating token:', error)
    } finally {
      setTokenLoading(false)
    }
  }

  const verifyUserInDB = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // For demo purposes, we'll use the email as a simple token
      // In production, you'd use the actual JWT token from NextAuth
      const response = await fetch('/api/users/me', {
        headers: {
          'Authorization': `Bearer ${session?.user?.email || ''}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setDbUser(data.user)
      } else {
        setError('User not found in database')
      }
    } catch (err) {
      setError('Error verifying user in database')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    // Clear the JWT token from localStorage before signing out
    removeAuthToken()
    await signOut()
  }

  if (session) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Welcome!</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Session Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-3">Session Info</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> {session.user?.email}</p>
              <p><strong>Name:</strong> {session.user?.name}</p>
              <p><strong>User ID:</strong> {session.user?.id}</p>
              {session.user?.image && (
                <div>
                  <strong>Profile:</strong>
                  <img 
                    src={session.user.image} 
                    alt="Profile" 
                    className="w-12 h-12 rounded-full mt-1"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Database Verification */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-3">Database Verification</h2>
            {loading && <p className="text-sm">Verifying...</p>}
            {tokenLoading && <p className="text-sm text-blue-600">Generating JWT token...</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}
            {dbUser && (
              <div className="space-y-2 text-sm">
                <p className="text-green-600 font-semibold">✅ User stored in database!</p>
                <p><strong>DB ID:</strong> {dbUser.id}</p>
                <p><strong>DB Name:</strong> {dbUser.name}</p>
                <p><strong>DB Email:</strong> {dbUser.email}</p>
                <p><strong>Created:</strong> {new Date(dbUser.createdAt).toLocaleDateString()}</p>
                <p className="text-blue-600 font-semibold">🔑 JWT token stored in localStorage</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 space-x-4">
          <button 
            onClick={verifyUserInDB}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Verify in Database'}
          </button>
          <button 
            onClick={generateAndStoreToken}
            disabled={tokenLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {tokenLoading ? 'Generating...' : 'Regenerate Token'}
          </button>
          <button 
            onClick={handleSignOut} 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Sign out
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className="p-8 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Get Started</h1>
      <p className="mb-6 text-gray-600">Sign in to create your account and start using the application.</p>
      <button 
        onClick={() => signIn()} 
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Sign in with GitHub or Google
      </button>
    </div>
  )
}