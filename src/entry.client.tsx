import { createRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/react-start/client'

// Bypass TanStack Start's document-level hydration and mount to a div instead
// This makes the app behave like a standard SPA on static hosts
const rootElement = document.getElementById('root')

if (rootElement) {
  const root = createRoot(rootElement)
  root.render(<StartClient />)
}
