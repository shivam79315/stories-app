import React from "react";
import ReactModal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import ReactInstaStories from "react-insta-stories";
import "swiper/css";

const VideoModal = ({ videos, isOpen, closeModal, toggleMute, isMuted }) => {

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: "#303030e6",
          zIndex: "99999",
        },
        content: {
          width: "100vw",
          height: "100vh",
          border: "none",
          backgroundColor: "transparent",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      }}
      ariaHideApp={false}
      contentLabel="Video Modal"
    >
      <button onClick={closeModal}>close</button>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {videos.map((video, index) => (
          <SwiperSlide
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ReactInstaStories
              stories={[
                { url: video.reel.reel_url? video.reel.reel_url: undefined, type: 'video', muted: isMuted },
              ]}
              width={400}
              height={600}
              style={{
                objectFit: "cover",
                borderRadius: "10px"
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        onClick={toggleMute}
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          padding: "10px 20px",
          backgroundColor: "#303030",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: "99999"
        }}
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>
    </ReactModal>
  );
};

export default VideoModal;
