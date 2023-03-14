// import React, { useRef, useState } from 'react';
// import * as faceapi from 'face-api.js';

// const FaceRecognition = () => {
//     const [image, setImage] = useState('');
//     const imageRef = useRef(null);

//     const handleImageUpload = (event) => {
//         const file = event.target.files[0];
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => {
//             setImage(reader.result);
//             detectFaces(reader.result);
//         };
//     };

//     const detectFaces = async (imageURL) => {
//         await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
//         await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
//         await faceapi.nets.faceRecognitionNet.loadFromUri('/models');

//         const image = await faceapi.fetchImage(imageURL);
//         const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();

//         const canvas = document.createElement('canvas');
//         const displaySize = { width: image.width, height: image.height };
//         faceapi.matchDimensions(canvas, displaySize);
//         const resizedDetections = faceapi.resizeResults(detections, displaySize);
//         canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
//         faceapi.draw.drawDetections(canvas, resizedDetections);
//         faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//         const dataURL = canvas.toDataURL();
//         setImage(dataURL);
//     };

//     return (
//         <div>
//             <input type="file" onChange={handleImageUpload} />
//             {image && <img src={image} ref={imageRef} alt="uploaded" />}
//         </div>
//     );
// };

// export default FaceRecognition;

import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

const FaceRecognition = () => {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      setLoaded(true);
    };
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (loaded && videoRef.current) {
      startVideo();
    }
  }, [loaded, videoRef]);

  const handlePlay = async () => {
    const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    document.body.append(canvas);

    const displaySize = {
      width: videoRef.current.offsetWidth,
      height: videoRef.current.offsetHeight,
    };

    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    }, 100);
  };

  return (
    <div>
      <h1>Face Recognition</h1>
      {loaded && (
        <video
          ref={videoRef}
          onPlay={handlePlay}
          autoPlay
          muted
          style={{ width: "100%", height: "auto" }}
        />
      )}
    </div>
  );
};

export default FaceRecognition;
