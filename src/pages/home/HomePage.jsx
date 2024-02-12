
import "./HomePage.css";
import VideoUploadModal from "../../components/videouploadmodal/VideoUploadModal";
// import { useRecoilState } from "recoil";
import { useState, useEffect, useRef } from "react";
// import { comment } from "../../atom/CommentAtom";
import Chatbot from "../../components/chatbot/Chatbot";
import { useNavigate } from "react-router-dom";
import { Filename } from "../../atom/FilenameAtom";
import { useRecoilState } from "recoil";
import VideoPlay from "../../services/playvideo/playvideo";
import GetVideos from "../../services/getvideos/getvideos";

function HomePage() {
  const ws = useRef(null);
  const [frames, setFrames] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [displayChat, setDisplayChat] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [file, setfile] = useRecoilState(Filename);
  const [isDark,setIsDark]=useState(false);
  const [flag,setflag]=useState(true)
  const[recommend,setRecommend]=useState([])
useEffect(()=>{
 setRec()
},[])
async function setRec()
{
  const val=await GetVideos.get()
  setRecommend(val);
  console.log('hh')
  console.log(val,'vvvv')
}
useEffect(()=>{
  console.log(recommend)
},[recommend])
  // const { commentHistory, setcommentHistory } = useRecoilState(comment);
  const navigate=useNavigate();
  const messages = [
    "Hi, welcome to SimpleChat! Go ahead and send me a message. 😄",
    "Another message here.",
    "Yet another message!",
    "And one more message for good measure.",
  ];

  const handleDisplayChat = () => {
    setSlideOut(true);
    setTimeout(() => {
      setDisplayChat(false);
      setSlideOut(false);
    }, 300);
  };

  useEffect(() => {
    // Function to handle window resize
    const handleResize = () => {
      if (window.innerWidth > 840) {
        setShowChatbot(true);
      } else {
        setShowChatbot(false);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check for window width
    handleResize();

    // Clean up function to remove event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   // Define the WebSocket URL
  //   const url = "ws://localhost:8765";

  //   // Create a WebSocket instance
  //   ws.current = new WebSocket(url);

  //   // WebSocket event listeners
  //   ws.current.onopen = () => {
  //     console.log("WebSocket connected");
  //   };

  //   ws.current.onmessage = (event) => {
  //     console.log("Message from server:", event.data);
  //     handleFrameData(event.data); // Handle the received binary data
  //   };

  //   ws.current.onclose = () => {
  //     console.log("WebSocket connection closed");
  //   };

  //   // Clean up function to close the WebSocket connection
  //   return () => {
  //     ws.current.close();
  //   };
  // }, []);

  // const handleFrameData = (data) => {
  //   // Convert the binary data into a Blob object
  //   const blob = new Blob([data], { type: "image/jpeg" });

  //   // Create a URL for the Blob object
  //   const imageUrl = URL.createObjectURL(blob);

  //   // Update the frames state with the new image URL
  //   setFrames(imageUrl);
  // };

  // const handleStart =async () => {
  //   // Send the "start" message to the server
  //   console.log('start')
  //   if (ws.current && ws.current.readyState === WebSocket.OPEN) {
  //     console.log('mid')
  //     ws.current.send(file);
  //   }
  //   console.log('end')
  // };

  function socket_init(){
    const ws = new WebSocket("ws://192.168.1.124:8000/ws");
    return ws
  }
  const [socket, setSocket] = useState()
  const [value, setValue] = useState("")
  useEffect(()=>{
    setSocket(socket_init())
  },[])
if(socket)
  socket.onmessage = function (event) {
    console.log(event.data)
    setValue(event.data)
  };
  function sendMessage(event) {
    if(socket)
    socket?.send(document.getElementById("input").value);
  }

  return (
    <div className={`wrapper  ${isDark ? "dark" : "light"}`}>
      <div className="app-container"> 
        <div className="left-side" onClick={handleDisplayChat}>
          <nav className="nav">
            <img
              src="https://i.postimg.cc/Sx0ZGtQJ/logo.png"
              className="logo"
            />
            <ul>
              <li>
                <VideoUploadModal />
              </li>
              <li>
                <img src="https://i.postimg.cc/k4DZH604/users.png" onClick={()=>navigate('/knownface')}/>
              </li>
              <li onClick={()=>setIsDark(!isDark)}>
                <img src="https://i.postimg.cc/v84Fqkyz/setting.png" />
              </li>
              <li>
                <img
                  src="../../../public/assets/media-playback-start-symbolic.svg"
                onClick={()=>{
             VideoPlay.play(file)
                }}
                />
              </li>
            </ul>
          </nav>
        </div>
        <div className="app-main" onClick={handleDisplayChat}>
        <div className="video-wrapper">
    {<img src={`data:image/jpeg;base64,${value}`} alt="test"></img>}      
    </div>
    {/* <div className='play-button-wrap'>
    {value!=''?<img src='../../../public/assets/118620_play_icon.png'></img>:null}
    </div> */}
    {flag?
    <div>

    {recommend[0]?<div className="recommend one">
    <img src={`data:image/jpeg;base64,${recommend[0]?.first_frame}`} key={recommend[0]?.name} alt="test" onClick={()=>{VideoPlay.play(recommend[0]?.name)
    setflag(false)
    }}></img>
    </div>:null}
    {recommend[2]?<div className="recommend two">
    <img src={`data:image/jpeg;base64,${recommend[2]?.first_frame}`} key={recommend[2]?.name} alt="test"  onClick={()=>{VideoPlay.play(recommend[2]?.name)
        setflag(false)
    }}></img>
    </div>:null}
    {recommend[4]?<div className="recommend three">
<img src={`data:image/jpeg;base64,${recommend[4]?.first_frame}`} key={recommend[4]?.name} alt="test"  onClick={()=>{VideoPlay.play(recommend[4]?.name)
setflag(false)
}}></img>
</div>:null}

{recommend[1]?<div className="recommend four">
<img src={`data:image/jpeg;base64,${recommend[1]?.first_frame}`} key={recommend[1]?.name} alt="test"  onClick={()=>{VideoPlay.play(recommend[1]?.name)
setflag(false)
}}></img>
</div>:null}
{recommend[3]?<div className="recommend five">
<img src={`data:image/jpeg;base64,${recommend[3]?.first_frame}`} key={recommend[3]?.name} alt="test"  onClick={()=>{VideoPlay.play(recommend[3]?.name)
setflag(false);
}}></img>
</div>:null}
{recommend[5]?
<div className="recommend six">
<img src={`data:image/jpeg;base64,${recommend[5]?.first_frame}`} key={recommend[5]?.name} alt="test"  onClick={()=>{VideoPlay.play(recommend[5]?.name)
setflag(false)
}}></img>
</div>:null}
</div>
:null}
          <div className="comment-wrapper">
            <section className="msger">
              <div className="live-wrapper">
                <p className="live-text">
                  {" "}
                  <span className="dot"></span>Live updates
                </p>
              </div>
              <main className="msger-chat">
                {messages.map((message, index) => (
                  <div className="msg left-msg" key={index}>
                    <div className="msg-bubble">
                      <div className="logo-container">
                        <img
                          src="https://i.postimg.cc/Sx0ZGtQJ/logo.png"
                          alt=""
                        />
                      </div>
                      <div className="msg-text">{message}</div>
                    </div>
                  </div>
                ))}
              </main>
            </section>
          </div>
        </div>
        <div>
          <div>
            {showChatbot ? (
              <Chatbot />
            ) : displayChat ? (
              <div>
                <Chatbot displayChat={displayChat} slideOut={slideOut} />
              </div>
            ) : (
              <button
                className="chatIcon"
                onClick={(event) => {
                  event.stopPropagation();
                  setDisplayChat(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  style={{ fill: "rgba(0, 0, 0, 1)" }}
                >
                  <path d="M20 2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3v3.767L13.277 18H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14h-7.277L9 18.233V16H4V4h16v12z"></path>
                  <path d="M7 7h10v2H7zm0 4h7v2H7z"></path>{" "}
                </svg>
              </button>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default HomePage;
