import React, { useRef } from "react";
import Webcam from "react-webcam";

function Webcam() {
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Do something with the imageSrc, like save it to state or send it to a server
  };

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture photo</button>
    </>
  );
}

export default Webcam;
