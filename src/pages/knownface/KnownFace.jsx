// import React from 'react'
import "./KnownFace.scss";
import VideoUploadModal from "../../components/videouploadmodal/VideoUploadModal";
// import { useState } from 'react';
import ModalComponent from "../../components/photouploadmodal/PhotoModalComponent";
import VideoPlay from "../../services/playvideo/playvideo";
import { useEffect, useState } from "react";
import CircleLoad from "../../components/loader/CircleLoad";
import Skeleton from "../../components/skeleton/SkeletonComponent";
import SkeletonComponent from "../../components/skeleton/SkeletonComponent";
import { Tooltip, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
function Knownface() {
  const [faces,setfaces]=useState([]);
  const[loadFlag,setLoadFlag]=useState(true)
  const navigate=useNavigate();
  useEffect(()=>{
   getFaces();
  },[])
  async function getFaces()
  {
    console.log('hi')
    const val=await VideoPlay.getface();
    console.log(val.data.photos)
    setLoadFlag(false)
    setfaces(val.data.photos);
    console.log(faces)
  }
  return (
    <div className="knownface">
      <div className="navbar">
      <nav className="nav">
            <img
              src="https://i.postimg.cc/Sx0ZGtQJ/logo.png"
              className="logo"
            />
            <ul>
            <Tooltip 
      content="Upload Video"
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
                  <VideoUploadModal />
                </li>
              </Tooltip>
              <Tooltip 
      content="Home Page"
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
                    src="../../../public/assets/home-icon-white-png-14.jpg"
                    onClick={() => {
                      navigate('/')
                    }}
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
navigate('/')
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
                      navigate('/')
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
                    navigate('/')
                     }}
                >
                  <img src="../../../public/assets/pauseIcon.png" alt="" />
                </li>
              </Tooltip>
            </ul>
          </nav>
      </div>
      <div className="topbar">
        <h1 className="h1">Known Faces</h1>

        <div style={{ position: "absolute", top: "20px", right: "30px" }}>
          <ModalComponent />
        </div>
      </div>
      { loadFlag? <div className="skeleton-wrap">
<SkeletonComponent/>
      </div>:
      <div className="face-wrapper">
        {
          faces.map((value)=>{
            return(
<div className="card-wrap">
          <div className="card-header four">
          <img src={`data:image/jpeg;base64,${value.base64_encoded}`} alt="test"></img>
          </div>
          <div className="card-content">
            <h1 className="card-title">{value.name}</h1>
          </div>
        </div>)
          })
        
}
      
      </div>}
    </div>
  );
}

export default Knownface;
