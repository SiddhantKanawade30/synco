"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { MailList, MailViewer, emails } from "@/components/mail-components"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function InboxPage() {
  const [selectedEmail, setSelectedEmail] = React.useState<typeof emails[0] | null>(null)

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
        <div className="flex flex-1">
          <div className="flex h-full">
            {/* Email List - Left Column */}
            <div className="w-96 border-r flex-shrink-0 h-full">
              <MailList 
                selectedEmail={selectedEmail} 
                onSelectEmail={setSelectedEmail} 
              />
            </div>
            
            {/* Email Viewer - Right Column */}
            <div className="flex-1 h-full">
              <MailViewer 
                email={selectedEmail} 
                onClose={() => setSelectedEmail(null)} 
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
