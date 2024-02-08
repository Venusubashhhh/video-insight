import React from 'react'
import ModalComponent from '../../components/photouploadmodal/PhotoModalComponent'
import './HomePage.css'
import VideoUploadModal from '../../components/videouploadmodal/VideoUploadModal'
import { useRecoilState } from 'recoil';
import { useState,useEffect,useRef } from 'react';
import { comment } from '../../atom/CommentAtom';
import Chatbot from '../../components/chatbot/Chatbot';

function HomePage() {
  const ws = useRef(null);
  const [frames, setFrames] = useState([]);

  useEffect(() => {
    // Define the WebSocket URL
    const url = 'ws://localhost:8765';

    // Create a WebSocket instance
    ws.current = new WebSocket(url);

    // WebSocket event listeners
    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
      console.log('Message from server:', event.data);
      handleFrameData(event.data); // Handle the received binary data
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Clean up function to close the WebSocket connection
    return () => {
      ws.current.close();
    };
  }, []);

  const handleFrameData = (data) => {
    // Convert the binary data into a Blob object
    const blob = new Blob([data], { type: 'image/jpeg' });

    // Create a URL for the Blob object
    const imageUrl = URL.createObjectURL(blob);

    // Update the frames state with the new image URL
    setFrames( imageUrl);
  };

  const handleStart = () => {
    // Send the "start" message to the server
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send('start');
    }
  };

//   const [videoFrame, setVideoFrame] = useState();
//   function socket_init(){
//     const ws = new WebSocket("ws://192.168.1.133:8004/ws");
//     return ws
//   }
//   const [socket, setSocket] = useState()
//   const [value, setValue] = useState("")
//   useEffect(()=>{
//     setSocket(socket_init())
//   },[])
// if(socket)
//   socket.onmessage = function (event) {
//     console.log(event.data)
//     setValue(event.data)
//   };
//   function sendMessage(event) {
//     if(socket)
//     socket?.send(document.getElementById("input").value);
//   }
      const {commentHistory,setcommentHistory}=useRecoilState(comment)
  return (
    <div className='wrapper'>
 <div className="app-container">
  
  <div className="left-side">
  <nav>
  <img src="https://i.postimg.cc/Sx0ZGtQJ/logo.png" className="logo" />
  <ul>
    <li>
     <VideoUploadModal/>
    </li>
    <li>
      <img src="https://i.postimg.cc/k4DZH604/users.png" />
    </li>
    <li>
      <img src="https://i.postimg.cc/v84Fqkyz/setting.png" />
    </li>
    <li>
      <img src="../../../public/assets/media-playback-start-symbolic.svg" onClick={handleStart}/>
    </li>
  </ul>
</nav>

  </div>
  <div className="app-main">
    <div className="video-wrapper">
    <img  src={frames} alt={`Frame`} />      
    </div>
    <div className='comment-wrapper'>
    <section className="msger">
      <div className='live-wrapper'>
<p className='live-text'>  <span className="dot"></span>Live updates</p>
</div>
  <main className="msger-chat">
    <div className="msg left-msg">
    
      <div className="msg-bubble">
    <div className='logo-container'>
        <img src="https://i.postimg.cc/Sx0ZGtQJ/logo.png" alt="" />
    </div>
        <div className="msg-text">
          Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
        </div>
      </div>
    </div>
    <div className="msg left-msg">
    
    <div className="msg-bubble">
  <div className='logo-container'>
      <img src="https://i.postimg.cc/Sx0ZGtQJ/logo.png" alt="" />
  </div>
      <div className="msg-text">
        Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
      </div>
    </div>
  </div>
  <div className="msg left-msg">
    
    <div className="msg-bubble">
  <div className='logo-container'>
      <img src="https://i.postimg.cc/Sx0ZGtQJ/logo.png" alt="" />
  </div>
      <div className="msg-text">
        Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
      </div>
    </div>
  </div>
  <div className="msg left-msg">
    
    <div className="msg-bubble">
  <div className='logo-container'>
      <img src="https://i.postimg.cc/Sx0ZGtQJ/logo.png" alt="" />
  </div>
      <div className="msg-text">
        Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
      </div>
    </div>
  </div>
   
  </main>
</section>
</div>
  
  </div>
 <Chatbot/>
</div>

    </div>
  )
}

export default HomePage