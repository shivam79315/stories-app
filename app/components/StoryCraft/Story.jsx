import React, { useRef, useState } from "react";
import { Card, EmptyState, Page } from "@shopify/polaris";

const Story = () => {

     const fileUploaderRef = useRef(null);
      const [uploading, setUploading] = useState(false);
      const [uploadedFiles, setUploadedFiles] = useState([]);
      const [errorMessage, setErrorMessage] = useState(null);
    
      const handleUploadClick = () => {
        if (fileUploaderRef.current) {
          fileUploaderRef.current.click();
        }
      };
    
      const handleFileChange = async (event) => {
        const files = Array.from(event.target.files);
        if (!files.length) return;
    
        setUploading(true);
        setErrorMessage(null);
    
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));
    
        try {
          const response = await fetch("/file", {
            method: "POST",
            body: formData,
          });
    
          if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
          }
    
          const result = await response.json();
          if (result.data?.stagedTargets?.length) {
            setUploadedFiles(result.data.stagedTargets);
            alert("Files uploaded successfully!");
          } else {
            const error = result.errors?.[0]?.message || "Unknown error";
            throw new Error(error);
          }
        } catch (error) {
          console.error("Error uploading files:", error);
          setErrorMessage(error.message || "File upload failed");
        } finally {
          setUploading(false);
        }
      };

  return (
    <>
      <Page>
        <Card sectioned>
          <EmptyState
            heading="Create Stories. Add Shoppable Reels."
            action={{
              content: uploading ? "Uploading..." : "Upload Reel",
              onAction: handleUploadClick,
              disabled: uploading,
            }}
            image="https://d3b9ey9olz14up.cloudfront.net/assets/feed-empty-D1V-W8vb.png"
          >
            <p>
              Shoppable Reels make product discovery and purchases easy through
              engaging videos. Click below to create your first Shoppable Reel.
            </p>
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileUploaderRef}
              accept="video/*,image/*"
              multiple
              onChange={handleFileChange}
            />
            {uploading && <p>Uploading your files...</p>}
            {uploadedFiles.length > 0 && (
              <ul>
                {uploadedFiles.map((file, index) => (
                  <li key={index}>
                    <a
                      href={file.resourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {file.resourceUrl}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {errorMessage && (
              <p style={{ color: "red" }}>Error: {errorMessage}</p>
            )}
          </EmptyState>
        </Card>
      </Page>
    </>
  );
};

export default Story;