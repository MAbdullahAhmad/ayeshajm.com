import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { initTheatreStudio } from '@/lib/initTheatreStudio'
import { initializeTheme } from '@/lib/theme'
import { createAppRouter } from '@/router'
import '@/styles/globals.css'

initTheatreStudio()
initializeTheme()

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <main>
      <p>Loading application...</p>
    </main>
  </StrictMode>
)

createAppRouter().then((router) => {
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
})
