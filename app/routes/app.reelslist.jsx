import React, { useState, useEffect } from "react";
import ReelsListComp from "../components/ReelsListPage/ReelsListComp";
import { UploadProvider } from "./context/UploadProvider";
import { loader, action } from "./reelsHandlers/reelHandlers"; 

function ReelsList() {
  const [shopURL, setShopURL] = useState("");

  useEffect(() => {
    const appBridgeConfig = sessionStorage.getItem("app-bridge-config");

    if (appBridgeConfig) {
      try {
        const parsedConfig = JSON.parse(appBridgeConfig);
        setShopURL(parsedConfig.shop || "");
      } catch (error) {
        console.error("Error parsing app-bridge-config:", error);
      }
    }
  }, []);

  return (
    <UploadProvider>
      <ReelsListComp
        actionUrl="/app/reelslist"
        shopURL={shopURL} 
      />
    </UploadProvider>
  );
}

export { loader, action }; 
export default ReelsList;