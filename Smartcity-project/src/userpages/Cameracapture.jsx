import { useRef, useState, useEffect } from "react";

const Cameracapture = ({ setImage }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);


  const startCamera = async () => {
    debugger
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;

      setCameraOn(true); // first render video
    } catch (err) {
      console.log(err);
    }
  };

  
  useEffect(() => {
    debugger
    if (cameraOn && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [cameraOn]);

 
  const capturePhoto = () => {
    debugger
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/png");

    setImage(imageData);

    // stop camera
    streamRef.current.getTracks().forEach(track => track.stop());

    setCameraOn(false);
  };

  return (
    <div>

      {!cameraOn && (
        <button type="button" onClick={startCamera}>
          Open Camera
        </button>
      )}

      {cameraOn && (
        <>
          <video ref={videoRef} autoPlay width="200" />
          <br />
          <button type="button" onClick={capturePhoto}>
            Capture
          </button>
        </>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />

    </div>
  );
};

export default Cameracapture;