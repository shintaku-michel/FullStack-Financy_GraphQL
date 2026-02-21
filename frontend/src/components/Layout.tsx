import { Toaster } from "@/components/ui/sonner"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
        <main>{children}</main>
        <Toaster />
    </div>
  )
}
