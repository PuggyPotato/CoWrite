import { useState } from 'react'
import './App.css'

function App() {


  return (
    <>
    <div id='container'>
      <div id="tools">
        <button id='dropDown'>
          <img src="./public/dropdown.png" alt='dropdown' id='dropDownImage'/>
        </button>
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
