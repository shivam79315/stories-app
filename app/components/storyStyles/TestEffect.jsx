import React, { useState, useEffect } from "react";
import VideoGrid from "./VideoGrid";
import VideoModal from "./VideoModal";
import { useProductReel } from "../../routes/context/ProductReelContext";

const TestEffect = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const {
    attachedReels,
  } = useProductReel();  
console.log("reelVideos are:::",attachedReels)
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <VideoGrid videos={attachedReels} openModal={openModal} isSmallScreen={isSmallScreen} />
        <VideoModal
          videos={attachedReels}
          isOpen={modalIsOpen}
          closeModal={closeModal}
          toggleMute={toggleMute}
          isMuted={isMuted}
        />
    </>
  );
};

export default TestEffect;
