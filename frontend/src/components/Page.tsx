interface PageProps {
  children: React.ReactNode
}

export function Page({children}: PageProps) {
  return (
    <div className="min-h-[calc(100vh-9rem)] p-4 sm:p-6 md:p-12 max-w-7xl mx-auto w-full">
      {children}
    </div>
  )
}
