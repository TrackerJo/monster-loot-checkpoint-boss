import { useState } from 'react'



import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Local from './Local/local'
import "./Local/local.css"


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Local />
  </StrictMode>,
)


function App() {


  return (
    <>


    </>
  )
}

export default App
