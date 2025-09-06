import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UserContextProvider } from './contexts/user.context.tsx'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from './pages/SignUp.tsx'
import SignIn from './pages/SignIn.tsx'
import Protected from './Protected/Protected.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route
            element={
              <Protected>
                <App />
              </Protected>
            }
            path="/"
          />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
        <Toaster />
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>
)
