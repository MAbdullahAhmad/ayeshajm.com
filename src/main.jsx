import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { BootLoader } from '@/components/loaders/BootLoader'
import { initTheatreStudio } from '@/lib/initTheatreStudio'
import { router } from '@/router'
import '@/styles/global.css'

initTheatreStudio()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider
      router={router}
      fallbackElement={<BootLoader message="Booting the portfolio shell." />}
    />
  </StrictMode>
)
