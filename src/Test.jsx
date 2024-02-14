import React, { useEffect } from 'react'
import axios from 'axios'
function Test() {
    useEffect(()=>{
        axios.get('http://192.168.1.124:8000/videos').then((v)=>console.log(v)).catch((e)=>console.log(e))
    })
  return (
    <div>Test</div>
  )
}

export default Test