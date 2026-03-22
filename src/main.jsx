import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AppBootLoader } from '@/components/loaders/AppBootLoader.jsx'
import { initTheatreStudio } from '@/lib/initTheatreStudio'
import { initializeTheme } from '@/lib/theme'
import { createAppRouter } from '@/routes'
import '@/styles/globals.css'

initTheatreStudio()
initializeTheme()

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <AppBootLoader />
  </StrictMode>
)

createAppRouter().then((router) => {
  root.render(
    <StrictMode>
      <RouterProvider fallbackElement={<AppBootLoader />} router={router} />
    </StrictMode>
  )
})
