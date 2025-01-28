delete globalThis["use strict"];

import React, { useState, useEffect } from "react";
import VideoGrid from "./VideoGrid";
import VideoModal from "./VideoModal";

const TestEffect = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const videos = [
    {
      src: "https://marketplace.canva.com/EAGBfD2okv0/1/0/450w/canva-brown-coffee-good-morning-instagram-reel-7YrP1-1ccZw.mp4",
      type: "video",
    },
    {
      src: "https://marketplace.canva.com/EAGDx_6KYaU/1/0/450w/canva-green-and-white-nature-mobile-video-nROjWUjFoig.mp4",
      type: "video",
    },
  ];

  const openModal = () => {
    document.body.style.overflow = "hidden";
    setIsOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = "";
    setIsOpen(false);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <>
      <VideoGrid videos={videos} openModal={openModal} isSmallScreen={isSmallScreen} />
        <VideoModal
          videos={videos}
          isOpen={modalIsOpen}
          closeModal={closeModal}
          toggleMute={toggleMute}
          isMuted={isMuted}
        />
    </>
  );
};

export default TestEffect;
