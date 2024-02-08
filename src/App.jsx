import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/home/HomePage'
import Knownface from './pages/knownface/KnownFace'
import RecoilContextProvider from './atom/RecoilContextProvider'
import Test from './pages/Test'
import Loader from './components/loading/Loader'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <RecoilContextProvider>
  <HomePage/>
{/* <Knownface/> */}
{/* <Test/> */}
  </RecoilContextProvider>
    </>
  )
}

export default App
