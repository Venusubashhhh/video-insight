import React, { useEffect, useRef, useState } from 'react';

const WebSocketComponent = () => {
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
    setFrames((prevFrames) => [...prevFrames, imageUrl]);
  };

  const handleStart = () => {
    // Send the "start" message to the server
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send('start');
    }
  };

  return (
    <div>
      <h1>WebSocket Example</h1>
      <button onClick={handleStart}>Start</button>
      <div>
        {frames.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Frame ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default WebSocketComponent;
