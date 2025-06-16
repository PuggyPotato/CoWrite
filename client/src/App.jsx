import { useEffect, useState } from 'react'
import './App.css'
import {io} from "socket.io-client"

const socket = io("http://localhost:3000",{
  transports:["websocket"],
})

function App() {
  const [drop,setDrop] = useState(false)

  useEffect(() =>{
    socket.on("connect",() =>{
      console.log("Connected to the server");
    });

    socket.on("hello", (data) =>{
      console.log("Connected to the server");
    })

    socket.on("reply",(data) =>{
      console.log("Server says:",data)
    })

    return() =>{
      socket.disconnect();
    };
  },[])

  function toggleDrop(){
    if(drop == true){
      setDrop(false);
      console.log("toggle false")
    }
    else{
      setDrop(true)
      console.log("toggle true")
    }

  }
  return (
    <>
    <div id='container'>
      <div id="tools">
        <button id='dropDown' onClick={() =>toggleDrop()}>
          <img src="./dropdown.png" alt='dropdown' id='dropDownImage'/>
        </button>
      </div>
      <div id='droppedDown' style={drop ? {display:"block"} : {display:"none"}}>
            <button className='dropButton'>Save</button><br></br>
            <button className='dropButton'>Exit</button>
      </div>
      <div id='contentContainer'>
        <textarea id='content'>
        </textarea>
      </div>   
    </div>
    </>
  )
}

export default App
