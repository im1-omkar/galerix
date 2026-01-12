import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState("")
  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")

  function signUp(){
    fetch("https://jsonplaceholder.typicode.com/todos/1").then(res => setText(res))
  }

  function logIn(){

  }


  return (
    <>
      <input placeholder="username" type="text" onChange={e => setUsername(e.target.value)}/><br/><br/>
      <input placeholder="password" type="password" onChange={e => setPass(e.target.value)}/><br/><br/>
      <button onClick={signUp}>SignUp</button>
      <button onClick={logIn}>LogIn</button>

      <h1>{text}</h1>
      
    </>
  )
}

export default App
