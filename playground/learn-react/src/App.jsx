import react, {useState} from "react";
import PostComponent from "./components/PostComponent";

function App() {
 

  return (
      <>
        <Counter></Counter>
      </>
  )
}

function Counter(){
  const [count, setCount] = useState(0)

  return<>
    <h1>count is: {count}</h1>
    <button onClick={()=>{setCount(count + 1)}}>increase</button>
  </>
}
export default App
