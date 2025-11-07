export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full border-4 border-border border-t-primary animate-spin mx-auto" />
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Loading Inventra</h2>
          <p className="text-sm text-muted-foreground">Please wait while we prepare everything...</p>
        </div>
      </div>
    </div>
  )
}
