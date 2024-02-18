import "./HomePage.css";
import React from "react";
import VideoUploadModal from "../../components/videouploadmodal/VideoUploadModal";
// import { useRecoilState } from "recoil";
import { useState, useEffect, useRef } from "react";
// import { comment } from "../../atom/CommentAtom";
import Chatbot from "../../components/chatbot/Chatbot";
import { useNavigate } from "react-router-dom";
import { Filename } from "../../atom/FilenameAtom";
import { useRecoilState } from "recoil";
import VideoPlay from "../../services/playvideo/playvideo";
import GetVideos from "../../services/playvideo/playvideo";
import { comment } from "../../atom/CommentAtom";
import VcBaground from "../../../public/assets/VcBg.png";
import PlayIcon from "../../../public/assets/playicon.png";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import Loader from "../../components/loading/Loader";
import CircleLoad from "../../components/loader/CircleLoad";
import { Tooltip} from "@nextui-org/react";
import CommentSkeleton from "../../components/comment skeleton/CommentSkeleton";

function HomePage() {
  const ws = useRef(null);
  const containerRef = useRef(null);
  const [frames, setFrames] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [displayChat, setDisplayChat] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [file, setfile] = useRecoilState(Filename);
  const [isDark, setIsDark] = useState(false);
  const [commentHistory, setcommentHistory] = useRecoilState(comment);
  const [flag, setflag] = useState(true);
  const [loadFlag, setLoadFlag] = useState(false);
  const [commentFlag, setCommentFlag] = useState(false);
  const [recommend, setRecommend] = useState([]);
  const navigate = useNavigate();
  const [frameflag,setframeflag]=useState(false);
  const videoWrapperRef = useRef(null);
  const [videoWrapperWidth, setVideoWrapperWidth] = useState(0);
  const [videoFrameFlag,setVideoFrameFlag]=useState(true);

  useEffect(() => {
    setRec();
  }, []);

  async function setRec() {
    const val = await GetVideos.getVideo();
    setRecommend(val);
    // console.log("hh");
    // console.log(val, "vvvv");
  }

  // useEffect(()=>{
  // console.log("Recommend : ",recommend)
  // },[recommend])
  // const { commentHistory, setcommentHistory } = useRecoilState(comment);
  // const messages = [
  //   "Hi, welcome to SimpleChat! Go ahead and send me a message.😄",
  //   "Another message here.",
  //   "Yet another message!",
  //   "And one more message for good measure.",
  // ];

  const handleDisplayChat = () => {
    setSlideOut(true);
    setTimeout(() => {
      setDisplayChat(false);
      setSlideOut(false);
    }, 300);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 840) {
        setShowChatbot(true);
      } else {
        setShowChatbot(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => setCommentFlag(true), [commentHistory]);


   function socket_init() {
    const ws = new WebSocket("ws://192.168.1.133:8000/ws");
    return ws;
  }
  // async function socket_call()
  // {
  //   const val=await socket_init();
  //   val.send('initial');
  //   setSocket(val)
  // }
  const [socket, setSocket] = useState();
  const [value, setValue] = useState({});
  useEffect(()=>{
    console.log(value,'value')
  },[value])
  useEffect(() => {
    setSocket(socket_init());
  }, []);
  // useEffect(()=>{
  //   socket.send("initial")
  // },[socket])
  if (socket)
    socket.onmessage = function (event) {
  if(frameflag)
  {
  socket.send('start');
  }

      console.log(event.data);
      const val = JSON.parse(event.data);
      setLoadFlag(false);
      if(frameflag)
      {
      setValue(val);
      }
      else if(videoFrameFlag)
      {
        setValue(val)
      }
      console.log(val.status);
      if (val?.frameNumber)
        setcommentHistory((prev) => [...prev, val.frameNumber]);
      console.log(commentHistory, "comment");
      handleScrollToBottom();
    };
  useEffect(() => {
    console.log(value.image);
  }, [value]);

  const handleScrollToBottom = () => {
    const dashboardContainer = document.querySelector(".msger-chat");
    if (dashboardContainer) {
      dashboardContainer.scrollTop = 15 * dashboardContainer.scrollHeight;
    }
  };
  useEffect(() => {
    const updateVideoWrapperWidth = () => {
      if (videoWrapperRef.current) {
        const width = videoWrapperRef.current.clientWidth;
        setVideoWrapperWidth(width);
      }
    };
    updateVideoWrapperWidth();
    window.addEventListener("resize", updateVideoWrapperWidth);
    return () => {
      window.removeEventListener("resize", updateVideoWrapperWidth);
    };
  }, []);

  const {isOpen, onOpen, onClose} = useDisclosure();
  const [size, setSize] = React.useState('md')

  const sizes = ["full"];


  const handleOpen = (size) => {
    setSize(size)
    onOpen();
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
            <Tooltip 
      content="Upload Video"
      placement="right"
      delay={0}
      closeDelay={0}
      motionProps={{
        variants: {
          exit: {
            opacity: 0,
            transition: {
              duration: 0.1,
              ease: "easeIn",
            }
          },
          enter: {
            opacity: 1,
            transition: {
              duration: 0.15,
              ease: "easeOut",
            }
          },
        },
      }}
    >
                <li>
                  <VideoUploadModal />
                </li>
              </Tooltip>
              <Tooltip 
      content="Known Face"
      delay={0}
      placement="right"
      closeDelay={0}
      motionProps={{
        variants: {
          exit: {
            opacity: 0,
            transition: {
              duration: 0.1,
              ease: "easeIn",
            }
          },
          enter: {
            opacity: 1,
            transition: {
              duration: 0.15,
              ease: "easeOut",
            }
          },
        },
      }}
    >
               <li>
                  <img
                    src="https://i.postimg.cc/k4DZH604/users.png"
                    onClick={() => navigate("/knownface")}
                  />
                </li>
              </Tooltip>
              {/* <li onClick={() => setIsDark(!isDark)}>
                <img src="https://i.postimg.cc/v84Fqkyz/setting.png" />
              </li> */}
            <Tooltip 
      content="Start Live Camera"
      delay={0}
      placement="right"
      closeDelay={0}
      motionProps={{
        variants: {
          exit: {
            opacity: 0,
            transition: {
              duration: 0.1,
              ease: "easeIn",
            }
          },
          enter: {
            opacity: 1,
            transition: {
              duration: 0.15,
              ease: "easeOut",
            }
          },
        },
      }}
    >
                <li
                  onClick={() => {
                    setframeflag(true);
                    socket.send('start')
                    setcommentHistory([]);
                    setflag(false);
                    setLoadFlag(true);
                  }}
                >
                  <img src="https://i.postimg.cc/JnggC78Q/video.png" />
                </li>
              </Tooltip>
              <Tooltip 
      content="Play Video"
      delay={0}
      placement="right"
      closeDelay={0}
      motionProps={{
        variants: {
          exit: {
            opacity: 0,
            transition: {
              duration: 0.1,
              ease: "easeIn",
            }
          },
          enter: {
            opacity: 1,
            transition: {
              duration: 0.15,
              ease: "easeOut",
            }
          },
        },
      }}
    >
                <li>
                  <img
                    src="../../../public/assets/media-playback-start-symbolic.svg"
                    onClick={() => {
                      setcommentHistory([]);
                      setVideoFrameFlag(true);
                      VideoPlay.play(file);
                    }}
                  />
                </li>
              </Tooltip>
              <Tooltip 
      content="Stop Video"
      delay={0}
      closeDelay={0}
      placement="right"
      motionProps={{
        variants: {
          exit: {
            opacity: 0,
            transition: {
              duration: 0.1,
              ease: "easeIn",
            }
          },
          enter: {
            opacity: 1,
            transition: {
              duration: 0.15,
              ease: "easeOut",
            }
          },
        },
      }}
    >
                <li
                  onClick={() => {
                    setframeflag(false);
                       socket.send("stop")
                       setVideoFrameFlag(false);
                       setValue({"image":`/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCAF+Aq4DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD8s6KKK+sOcKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9k=`})
                  }}
                >
                  <img src="../../../public/assets/pauseIcon.png" alt="" />
                </li>
              </Tooltip>
            </ul>
          </nav>
        </div>
        <div className="app-main" onClick={handleDisplayChat}>
          <div className="video-wrapper" ref={videoWrapperRef}>
            {loadFlag ? (
              <div className="load-wrapper" style={{height:'100%'}}>
                <CircleLoad />
              </div>
            ) : null}
            {flag ? (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  width: "100%",
                  color: "white",
                  fontSize: "35px",
                }}
              >
                Welcome to our Visage
                <p style={{ fontSize: "16px" }}>play your video</p>
                <div className="red-play">
                  <img src="../../../public/assets/icons8-play-100.png"></img>
                </div>
                {/* <div>
                    <img src={PlayIcon} alt=""  style={{width:"30px",height:"30px"}}/>
                </div> */}
              </div>
            ) : (
              <>
              <img
                src={
                  value?.image
                    ? `data:image/jpeg;base64,${value?.image}`
                    : VcBaground
                }
                alt="test"
              ></img>
                 <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
            <div className="fullscreen-icon">
          <img src="../../../public/assets/interface_13536405.png" key={size} onClick={() => handleOpen(size)}></img>
          </div>
        ))}  
      </div>
              </>
            )}
            {/* <div className='play-button-wrap'>
                    {value!=''?<img src='../../../public/assets/118620_play_icon.png'></img>:null}
               </div> */}
            {flag ? (
              <div className="recommendedVedios">
                {videoWrapperWidth > 600
                  ? recommend.slice(0, 4).map((item, index) => (
                      <div
                        className={`recommend box${index + 1}`}
                        key={item?.name}
                      >
                        <img
                          src={`data:image/jpeg;base64,${item?.first_frame}`}
                          alt="test"
                          onClick={() => {
                            VideoPlay.play(item?.name);
                            setflag(false);
                            setLoadFlag(true);
                            setcommentHistory([]);
                          }}
                        ></img>
                      </div>
                    ))
                  : recommend.slice(0, 3).map((item, index) => (
                      <div
                        className={`recommend alignbox${index + 1}`}
                        key={item?.name}
                      >
                        <img
                          src={`data:image/jpeg;base64,${item?.first_frame}`}
                          alt="test"
                          onClick={() => {
                            setVideoFrameFlag(true);
                            VideoPlay.play(item?.name);                      
                            setflag(false);
                            setLoadFlag(true);
                            setcommentHistory([]);
                          }}
                        ></img>
                      </div>
                    ))}
              </div>
            ) : null}
          </div>
       
      <Modal 
        size={size} 
        isOpen={isOpen} 
        onClose={onClose} 
      >
        <ModalContent>
          {(onClose) => (
            <>
           
              <ModalBody>
               
                <img
                src={
                  value?.image
                    ? `data:image/jpeg;base64,${value?.image}`
                    : VcBaground
                }
                alt="test"
              ></img>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
          <div className="comment-wrapper">
            <section className="msger">
              <div className="live-wrapper">
              <div className="liveupdates">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            style={{ fill: "white", marginRight: "3px" }}
          >
            <path d="M8 12c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zm0-6c1.178 0 2 .822 2 2s-.822 2-2 2-2-.822-2-2 .822-2 2-2zm1 7H7c-2.757 0-5 2.243-5 5v1h2v-1c0-1.654 1.346-3 3-3h2c1.654 0 3 1.346 3 3v1h2v-1c0-2.757-2.243-5-5-5zm9.364-10.364L16.95 4.05C18.271 5.373 19 7.131 19 9s-.729 3.627-2.05 4.95l1.414 1.414C20.064 13.663 21 11.403 21 9s-.936-4.663-2.636-6.364z" />
            <path d="M15.535 5.464 14.121 6.88C14.688 7.445 15 8.198 15 9s-.312 1.555-.879 2.12l1.414 1.416C16.479 11.592 17 10.337 17 9s-.521-2.592-1.465-3.536z" />
          </svg>
          Live Updates
        </div>
              </div>
              {commentHistory.length != 0 ? (
                <main className="msger-chat">
                  {commentHistory.map((message, index) => {
                    return (
                      <div
                        className="msg left-msg"
                        key={index}
                        ref={containerRef}
                      >
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
                    );
                  })}
                </main>
              ) : (
                <CommentSkeleton />
              )}
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
