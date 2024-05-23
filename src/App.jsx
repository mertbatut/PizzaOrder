import { useState } from 'react'
import './index.css'
import OrderPizza from './Pages/OrderPizza'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <OrderPizza/>
    </>
  )
}

export default App
