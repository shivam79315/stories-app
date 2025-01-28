import React, { createContext, useContext, useState, useEffect } from "react";
import { useFetcher } from "@remix-run/react";

const UploadContext = createContext();

export const UploadProvider = ({ children }) => {
  const fetcher = useFetcher();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [shopURL, setShopURL] = useState("");
  const [toast, setToast] = useState({ content: "", active: false, error: false });
  const [modalActive, setModalActive] = useState(false);
  const actionUrl = "/app/reelslist";

  // Fetch shopURL from sessionStorage
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

  const validVideoTypes = [
    "video/mp4",
    "video/ogg",
    "video/webm",
    "video/quicktime",
  ];

  // Monitor fetcher state for upload response
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setLoading(false);
      if (fetcher.data.success) {
        const { actionType } = fetcher.data;

        if (actionType === "upload") {
          setFiles([]);
          setModalActive(false);
          setToast({
            content: "Your video has been uploaded successfully",
            active: true,
            error: false,
          });
        } else if (actionType === "delete") {
          setToast({
            content: "Reels deleted successfully",
            active: true,
            error: false,
          });
        }
      } else {
        setToast({
          content: fetcher.data.error || "An error occurred",
          active: true,
          error: true,
        });
      }
    }
  }, [fetcher.state, fetcher.data]);

  const handleUpload = () => {
    if (files.length > 0) {
      setLoading(true);
      const formData = new FormData();

      // Append files
      files.forEach((file) => formData.append("file", file));

      // Append shopURL and other data
      formData.append("shopURL", shopURL || "");
      formData.append("actionType", "upload");

      // Submit form data
      fetcher.submit(formData, {
        method: "post",
        encType: "multipart/form-data",
        action: actionUrl,
      });
    } else {
      setToast({
        content: "Please select files to upload",
        active: true,
        error: true,
      });
    }
  };

  return (
    <UploadContext.Provider
      value={{
        files,
        setFiles,
        handleUpload,
        loading,
        setLoading,
        shopURL,
        validVideoTypes,
        toast,
        setToast,
        modalActive,
        setModalActive,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => useContext(UploadContext);