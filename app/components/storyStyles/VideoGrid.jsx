import React from "react";
import { InlineStack, Card } from "@shopify/polaris";

const VideoGrid = ({ videos, openModal, isSmallScreen }) => {

  const styles = {
    video: {
      width: isSmallScreen ? "80px" : "160px",
      height: isSmallScreen ? "80px" : "170px",
      objectFit: "cover",
      objectPosition: "50% 20%",
      borderRadius: isSmallScreen ? "50%" : "10px",
    },
    gridCell: {
      display: "flex",
      justifyContent: "center",
    },
    outerDiv: {
      display: "flex",
      justifyContent: "center",
      gap: "10px"
    }
  };
  
  return (
    <Card>
      <div style={styles.outerDiv}>
        {videos.map((video, index) => (
          <InlineStack key={index} align="center">
            <div style={styles.gridCell}>
              <video
                onClick={() => openModal()}
                autoPlay
                muted
                playsInline
                loop
                style={styles.video}
                src={video.reel.reel_url}
              />
            </div>
          </InlineStack>
        ))}
      </div>
    </Card>
  );
};

export default VideoGrid;
