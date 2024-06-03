import React, { createContext, useState } from "react";

export const ImageContext = createContext();

const ImageState = ({ children }) => {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState("");
  const handleText = (e) => setText(e.target.value);
  const query = async (data) => {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        headers: {
          Authorization: "Bearer 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",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    const output = URL.createObjectURL(result);
    return output;
  };
  const onClickHandler = async () => {
    try {
      setLoader(true);
      setUrl("");
      const input = { inputs: text };
      const result = await query(input);
      setUrl(result);
      setImage(result);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${text}_ai_image.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const resetUrl = () => {
    setUrl("");
  };
  return (
    <ImageContext.Provider
      value={{
        url,
        loader,
        image,
        handleText,
        onClickHandler,
        handleDownload,
        resetUrl,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export default ImageState;
