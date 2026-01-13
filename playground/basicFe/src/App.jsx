import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios" //import the axios

function App() {
  const [text, setText] = useState("")
  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")

  const [token,setToken] = useState("")

  function handleSpecial(){

    axios.get("http://localhost:3000/special",{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => res.data)
    .then(data => setText(data.message))

  }

  function signUp(){
    axios.post("http://localhost:3000/signup",{
      "username":username,
      "password":pass
    }).then(res => res.data)
    .then(data => setText(JSON.stringify(data)))
    .catch(err => setText(err.message))
  }

  function logIn(){
    axios.post("http://localhost:3000/signin",{
      "username":username,
      "password":pass
    })
    .then(res => res.data)
    .then((data) => {
      localStorage.setItem("token", data.token)
      setToken(data.token)
      setText(JSON.stringify(data))
    })
    .catch(err => setText(err.message))
  }


  return (
    <>
      <input placeholder="username" type="text" onChange={e => setUsername(e.target.value)}/><br/><br/>
      <input placeholder="password" type="password" onChange={e => setPass(e.target.value)}/><br/><br/>
      <button onClick={signUp}>SignUp</button>
      <button onClick={logIn}>LogIn</button><br/>

      <h1>output is :{text}</h1><br/>
      <br/>
      <br/>
      <button onClick={handleSpecial}>Access the special function</button>
      <br/>
      <>
        <h3>username is :{username}</h3>
        <h3>pass is :{pass}</h3><br/>
      </>
      
    </>
  )
}

export default App
