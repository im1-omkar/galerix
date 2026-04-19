import { useEffect, useRef } from 'react'
import './App.css'

function App() {

  const video = useRef(null)

  async function playVideoFromCamera() {
      try {
          const constraints = {'video': true, 'audio': true};
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          const videoElement:any = video.current;
          videoElement.srcObject = stream;
      } catch(error) {
          console.error('Error opening video camera.', error);
      }
  }

  useEffect(()=>{
    playVideoFromCamera()
  },[])

  return (
    <div >
      
      <div style={{width:"full", background:"red"}}>Hello there</div>
      <video ref={video} id="localVideo" autoPlay playsInline controls={false}/>

    </div>
  )
}

export default App
