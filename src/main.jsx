import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { initTheatreStudio } from '@/lib/initTheatreStudio'
import { initializeTheme } from '@/lib/theme'
import { router } from '@/router'
import '@/styles/globals.css'

initTheatreStudio()
initializeTheme()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
