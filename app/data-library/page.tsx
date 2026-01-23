"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Image, FileImage, Upload } from "lucide-react"

export default function DataLibraryPage() {
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
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold tracking-tight">Data Library</h1>
                  <p className="text-muted-foreground mt-2">
                    Here you will see all the images shared to you so far through issue chats.
                  </p>
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-800">
                      <Upload className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        This feature is yet to be implemented. Images shared in issue chats will appear here once the feature is complete.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Grid of placeholder images */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {Array.from({ length: 18 }).map((_, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-neutral-300 rounded-lg flex items-center justify-center hover:bg-neutral-400 transition-colors cursor-pointer group"
                    >
                      <div className="text-center p-4">
                        <FileImage 
                          className="h-8 w-8 mx-auto mb-2 text-white/70 group-hover:text-white/90 transition-colors" 
                        />
                        <div className="text-xs text-white/60 group-hover:text-white/80 transition-colors">
                          Image {index + 1}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty state message */}
                <div className="mt-8 text-center py-12">
                  <Image className="h-16 w-16 mx-auto text-neutral-400 mb-4" />
                  <h3 className="text-lg font-medium text-neutral-600 mb-2">
                    No Images Yet
                  </h3>
                  <p className="text-neutral-500 max-w-md mx-auto">
                    Once team members share images in issue chats, they will appear here in your personal data library.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}