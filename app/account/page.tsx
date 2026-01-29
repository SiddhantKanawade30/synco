"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Trash2 } from "lucide-react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { removeAuthToken } from "@/lib/storage"

export default function AccountPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return
    }

    setDeleteLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        // Remove auth token and sign out
        removeAuthToken()
        await signOut({ redirect: false })
        router.push('/')
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to delete account')
      }
    } catch (err) {
      setError('An error occurred while deleting your account')
    } finally {
      setDeleteLoading(false)
    }
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">Please sign in to view your account.</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
            <div className="max-w-2xl mx-auto w-full">
              <h1 className="text-3xl font-bold mb-6">Account</h1>
              
              {/* Profile Information */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Your account details and profile information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={session.user.image || ''} alt={session.user.name || ''} />
                      <AvatarFallback className="text-lg">
                        {session.user.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-medium">{session.user.name || 'User'}</h3>
                      <p className="text-sm text-gray-500">{session.user.email}</p>
                      
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Actions */}
              <Card>
                
                <CardContent className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-red-600">Delete Account</h4>
                        <p className="text-sm text-gray-500">
                          Permanently delete your account and all associated data
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteAccount}
                        disabled={deleteLoading}
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        {deleteLoading ? 'Deleting...' : 'Delete Account'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
