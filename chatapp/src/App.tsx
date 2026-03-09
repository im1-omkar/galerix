import { useEffect, useState } from 'react'
import './App.css'

async function fetchC(){
  await new Promise(resolve => setTimeout(()=>{resolve(null)},5000))
  return ["name1","name2","name3","name4","name5"]
}

function App() {

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string[]>([])

  useEffect(() => {
    
    const loadData = async () => {
      setLoading(true)
      const data = await fetchC()
      setResult(data)
      setLoading(false)
    }

    loadData()
  }, [])

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div>
      {result.map(name => <h1 key={name}>{name}</h1>)}
    </div>
  )
}

export default App