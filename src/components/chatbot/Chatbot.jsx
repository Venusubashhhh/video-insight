import { useRef, useState, useEffect } from "react";
import './ChatBot.css'
import { chatMessagesState } from "../../atom/ChatBotAtom";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import Loader from "../loading/Loader";

const Chatbot = ({displayChat,slideOut}) => {
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useRecoilState(chatMessagesState);
  const [botMessageTimeout, setBotMessageTimeout] = useState(null);
  const [showVoiceIcon, setShowVoiceIcon] = useState(false); // Toggle state for voice feature
  const markdownRef = useRef(null);
  const [onVoiceIcon, setOnvoiceIcon] = useState("");
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showLoader,setShowLoader]=useState(false);
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.onresult = (event) => {
    const newTranscript = event.results[0][0].transcript;
    console.log(newTranscript, "check");
    setTranscript(newTranscript);
  };

  // useEffect(()=>{
  //   setChatMessages([]);
  // },[])

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening((prevState) => !prevState);
  };

  const handleVoiceClick = (messageId) => {
    // Find the message with the given ID
    const messageToUpdate = chatMessages.find(
      (message) => message.id === messageId
    );
    if (!messageToUpdate) return;

    const utterance = new SpeechSynthesisUtterance(messageToUpdate.text);
    utterance.onend = () => {
      // Reset voice icon state after the speech ends
      setOnvoiceIcon("");
    };

    if (window.speechSynthesis.speaking) {
      setOnvoiceIcon(""); // Reset voice icon state if speech synthesis is already speaking
      window.speechSynthesis.cancel();
    } else {
      setOnvoiceIcon(messageToUpdate.id); // Set voice icon state to the ID of the clicked message
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (transcript) {
      setUserInput(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    handleScrollToBottom();
    const uniqueId = uuidv4();
    console.log("New ID:", uniqueId);
  }, [chatMessages]);

  useEffect(() => {
    if (userInput === "") {
      setShowVoiceIcon(true);
    } else {
      setShowVoiceIcon(false);
    }
  }, [userInput]);

  const handleScrollToBottom = () => {
    const dashboardContainer = document.querySelector(".messages");
    if (dashboardContainer) {
      dashboardContainer.scrollTop = dashboardContainer.scrollHeight;
    }
  };

  const sendMessage = (event) => {
    setShowVoiceIcon(false);
    if (event.type === "submit" || (event.key === "Enter" && !event.shiftKey)) {
      console.log("MSG : ", userInput);
      event.preventDefault();
      if (userInput.trim() === "") return;
      setShowLoader(true)
      const newUserMessage = {
        id: uuidv4(),
        text: userInput,
        sender: "user",
      };
      setChatMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setUserInput("");

      if (botMessageTimeout) {
        clearTimeout(botMessageTimeout);
      }

      const newBotMessageTimeout = setTimeout(() => {
        const defaultBotMessage = {
          id: uuidv4(),
          text: "Thanks for your messages!",
          sender: "bot",
        };
        setChatMessages((prevMessages) => [...prevMessages, defaultBotMessage]);
        setBotMessageTimeout(null); // Clear the timeout
        setShowLoader(false);
      }, 5000);

      setBotMessageTimeout(newBotMessageTimeout);
    }
  };

  const renderMessages = () => {
    return chatMessages.map((message) => (
      <div
        key={message.id}
        id={message.id}
        style={{
          display: "flex",
          alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
          animation:message.sender !== "bot" && "slideInRight",animationDuration:"0.5s"
        }}
      >
        {message.sender !== "user" && (
          <div className="profile"
          // style={{animation:message.sender === "bot" && "slideInLeft",animationDuration:"0.5s"}}
          >
            <img
              alt=""
              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
        )}
        <div className={`message ${message.sender}-message`}
          //  style={{animation:message.sender === "bot" && "slideInLeft",animationDuration:"0.5s"}}
          >
          <div style={{ marginRight: "15px" }}>
            { message.text}
            </div>
          <div
            style={{
              display: "inline-block",
              cursor: "pointer",
              position: "absolute",
              right: "5px",
              bottom: "9.5px",
            }}
            onClick={() => handleVoiceClick(message.id)}
          >
            {onVoiceIcon !== message.id ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                style={{
                  fill: message.sender === "user" ? "white" : "black",
                  transform: "",
                  msFilter: "",
                }}
              >
                <path d="m21.707 20.293-2.023-2.023A9.566 9.566 0 0 0 21.999 12c0-4.091-2.472-7.453-5.999-9v2c2.387 1.386 3.999 4.047 3.999 7a8.113 8.113 0 0 1-1.672 4.913l-1.285-1.285C17.644 14.536 18 13.19 18 12c0-1.771-.775-3.9-2-5v7.586l-2-2V4a1 1 0 0 0-1.554-.832L7.727 6.313l-4.02-4.02-1.414 1.414 18 18 1.414-1.414zM12 5.868v4.718L9.169 7.755 12 5.868zM4 17h2.697l5.748 3.832a1.004 1.004 0 0 0 1.027.05A1 1 0 0 0 14 20v-1.879l-2-2v2.011l-4.445-2.964c-.025-.017-.056-.02-.082-.033a.986.986 0 0 0-.382-.116C7.059 15.016 7.032 15 7 15H4V9h.879L3.102 7.223A1.995 1.995 0 0 0 2 9v6c0 1.103.897 2 2 2z"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                style={{
                  fill: message.sender === "user" ? "white" : "black",
                  transform: "",
                  msFilter: "",
                }}
              >
                <path d="M16 21c3.527-1.547 5.999-4.909 5.999-9S19.527 4.547 16 3v2c2.387 1.386 3.999 4.047 3.999 7S18.387 17.614 16 19v2z"></path>
                <path d="M16 7v10c1.225-1.1 2-3.229 2-5s-.775-3.9-2-5zM4 17h2.697l5.748 3.832a1.004 1.004 0 0 0 1.027.05A1 1 0 0 0 14 20V4a1 1 0 0 0-1.554-.832L6.697 7H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2zm0-8h3c.033 0 .061-.016.093-.019a1.027 1.027 0 0 0 .38-.116c.026-.015.057-.017.082-.033L12 5.868v12.264l-4.445-2.964c-.025-.017-.056-.02-.082-.033a.986.986 0 0 0-.382-.116C7.059 15.016 7.032 15 7 15H4V9z"></path>
              </svg>
            )}
          </div>
        </div>
        {message.sender === "user" && (
          <div className="profile">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className={`chat-container ${displayChat && 'chat-container-slidein' } ${slideOut &&'chat-container-slideOut'}`}>
      {/* <div style={{position:"absolute"}}><img  style={{width:"300px",height:"90vh"}}    alt="" src="https://img.freepik.com/free-vector/white-abstract-background-design_361591-897.jpg?w=826&t=st=1707299343~exp=1707299943~hmac=e8e3c0e0022fb01146c60c98e32f2da18a13a3793651214a7e2933f4a6f8f089"></img></div> */}
      <div className="headerchat">
        <div>
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
          Live Chat
        </div>
      </div>
      <div className="messages" ref={markdownRef}>
        {renderMessages()}
         {showLoader ? (<div style={{display:"flex",
             animation:"slideInLeft",animationDuration:"0.5s"}}>
          <div className="profile">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div><div className="message bot-message "> <Loader/></div>
          </div>) :""}
      </div>
      <div>
        <div className="input-container">
          <form onSubmit={sendMessage} className="input-form">
            <input
              type="text"
              value={userInput}
              style={{width:"88%"}}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
            />
            {showVoiceIcon ? (
              <button
                type="submit"
                onClick={toggleListening}
                className="sendIcon"
                style={{backgroundColor:" #3D42DF"}}
              >
                <svg
                  viewBox="0 0 22 22"
                  height="16"
                  width="16"
                  preserveAspectRatio="xMidYMid meet"
                  className=""
                  version="1.1"
                  x="0px"
                  y="0px"
                  style={{ marginLeft: "6px"}}
                >
                  <path
                    fill="currentColor"
                    d="M11.999,14.942c2.001,0,3.531-1.53,3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531 S8.469,2.35,8.469,4.35v7.061C8.469,13.412,9.999,14.942,11.999,14.942z M18.237,11.412c0,3.531-2.942,6.002-6.237,6.002 s-6.237-2.471-6.237-6.002H3.761c0,4.001,3.178,7.297,7.061,7.885v3.884h2.354v-3.884c3.884-0.588,7.061-3.884,7.061-7.885 L18.237,11.412z"
                  ></path>
                </svg>
              </button>
            ) : (
              <button type="submit" className="sendIcon" style={{backgroundColor:" #3D42DF"}}>
                <svg
                  viewBox="0 0 24 24"
                  height="14"
                  width="14"
                  preserveAspectRatio="xMidYMid meet"
                  className=""
                  version="1.1"
                  x="0px"
                  y="0px"
                  style={{ marginTop: "1px",marginLeft:"9px" }}
                >
                  <title>send</title>
                  <path
                    fill="currentColor"
                    d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
                  ></path>
                </svg>
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
