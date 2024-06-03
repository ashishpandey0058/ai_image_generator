import React, { useRef, useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { ImageContext } from "../context/ImageState";

const ImageEditor = () => {
  const { url, image, resetUrl } = useContext(ImageContext);
  const [src, setSrc] = useState(image);
  const canvasRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [maskOpacity, setMaskOpacity] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        const image = new Image();
        image.src = src;
        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;
          drawImage(context, image);
        };
      }
    }
  }, [src]);

  const drawImage = (context, image) => {
    const { width, height } = context.canvas;
    context.clearRect(0, 0, width, height);

    context.save();

    context.translate(width / 2 + translateX, height / 2 + translateY);
    context.rotate((rotation * Math.PI) / 180);
    context.scale(scale, scale);
    context.filter = `brightness(${brightness}%)`;
    context.drawImage(image, -image.width / 2, -image.height / 2);

    context.restore();

    if (maskOpacity > 0) {
      context.fillStyle = `rgba(0, 0, 0, ${maskOpacity})`;
      context.fillRect(0, 0, width, height);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        const image = new Image();
        image.src = src;
        image.onload = () => {
          drawImage(context, image);
        };
      }
    }
  }, [rotation, scale, maskOpacity, brightness, translateX, translateY, src]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL("image/jpeg");
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = "edited_image.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <canvas
        ref={canvasRef}
        className="border rounded-xl h-[30vh] sm:h-[60vh]"
      ></canvas>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="flex justify-between items-center gap-4">
            Rotation:
            <input
              type="range"
              min="0"
              max="360"
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label className="flex justify-between items-center gap-4">
            Scale:
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label className="flex justify-between items-center gap-4">
            Mask Opacity:
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={maskOpacity}
              onChange={(e) => setMaskOpacity(Number(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label className="flex justify-between items-center gap-4">
            Brightness:
            <input
              type="range"
              min="0"
              max="200"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label className="flex justify-between items-center gap-4">
            Translate X:
            <input
              type="range"
              min="-200"
              max="200"
              value={translateX}
              onChange={(e) => setTranslateX(Number(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label className="flex justify-between items-center gap-4">
            Translate Y:
            <input
              type="range"
              min="-200"
              max="200"
              value={translateY}
              onChange={(e) => setTranslateY(Number(e.target.value))}
            />
          </label>
        </div>
      </div>
      <div className="w-full flex flex-col sm:flex-row  justify-center items-center gap-4">
        <Link
          to="/"
          onClick={resetUrl}
          className="text-center px-3 w-2/4 py-3 uppercase font-semibold hover:bg-sky-500  duration-500 border-sky-500 border rounded-lg"
        >
          Generate New
        </Link>
        <button
          onClick={handleDownload}
          className="px-3 w-2/4 py-3 uppercase font-semibold hover:bg-white hover:text-black duration-500 border-white border rounded-lg"
        >
          Download
        </button>
      </div>
      {url == "" && <Navigate to="/" />}
    </div>
  );
};

export default ImageEditor;
