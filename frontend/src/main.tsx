import { ApolloProvider } from '@apollo/client/react'
import { StrictMode } from 'react'

// Aplica dark antes do React renderizar para evitar flash
const _savedTheme = localStorage.getItem("theme");
if (_savedTheme === "dark" || (!_savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
}
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { apolloClient } from './lib/graphql/apollo.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
)
