import React, { useRef, useEffect } from 'react';
import tracking from 'tracking';



const IngresoConfaObj = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);
    tracking.track(video, tracker);

    tracker.on('track', (event) => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      event.data.forEach((rect) => {
        context.strokeStyle = '#a64ceb';
        context.lineWidth = 4;
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      });
    });
  }, []);

  const handleStartClick = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(error => {
        console.error('Error accessing webcam', error);
      });
  };

  return (
    <div>
      <video ref={videoRef} width="640" height="480" style={{ display: 'none' }}></video>
      <canvas ref={canvasRef} width="640" height="480" />
      <button onClick={handleStartClick}>Start Webcam</button>
    </div>
  );
};

export default IngresoConfaObj;
