import React, { useCallback, useState, useEffect } from "react";
import {
  Modal,
  DropZone,
  Text,
  Thumbnail,
  BlockStack,
  Box,
  Spinner,
  Frame,
  Layout,
  ResourceList,
  Card,
} from "@shopify/polaris";
import styles from "../CommonStyles/CommonStyles.module.css";
import { useUpload } from "../../routes/context/UploadProvider";
import { useFetcher } from "@remix-run/react";

const VideoSelectionModal = ({ active, onClose, onSelectVideo, actionUrl }) => {
  const {
    files,
    setFiles,
    handleUpload,
    loading,
    setLoading,
    validVideoTypes,
    toast,
    setToast,
    modalActive,
    setModalActive,
  } = useUpload();
  const fetcher = useFetcher();
  const [reels, setReels] = useState([]);

  const fetchReels = useCallback(() => {
    setLoading(true);
    fetcher.load(actionUrl);
  }, [fetcher, actionUrl]);

  useEffect(() => {
    fetchReels();
  }, []);

  useEffect(() => {
    if (fetcher.data?.videos) {
      setReels(fetcher.data.videos);
      setLoading(false);
    }
  }, [fetcher.data]);

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles) => {
      const filteredFiles = acceptedFiles.filter((file) =>
        validVideoTypes.includes(file.type),
      );
      if (filteredFiles.length > 0) {
        setFiles([filteredFiles[0]]);
      }
    },
    [setFiles],
  );

  const handleVideoSelect = (video) => {
    onSelectVideo(video);
    onClose();
  };

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <div style={{ padding: "0" }}>
      <BlockStack>
        {files.map((file) => (
          <BlockStack inlineAlign="center">
            <Thumbnail
              size="small"
              alt={file.name}
              source={
                validVideoTypes.includes(file.type)
                  ? window.URL.createObjectURL(file)
                  : NoteIcon
              }
            />
            <Text breakWord>{file.name.length > 50 ? `${file.name.slice(0, 50)}...` : file.name}</Text>
            <Text variant="bodySm" as="p">
              {file.size} bytes
            </Text>
          </BlockStack>
        ))}
      </BlockStack>
    </div>
  );

  return (
    <Frame>
      <Modal
        open={active}
        onClose={() => {
          onClose();
          setFiles([]);
        }}
        title="Upload and Select Video"
        primaryAction={{
          content: "Upload",
          onAction: handleUpload,
          loading,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => {
              onClose();
              setFiles([]);
            },
            disabled: loading,
          },
        ]}
      >
        <Modal.Section>
          <BlockStack gap="500">
            <Text as="p">
              Here you can upload your video file or select from existing reels.
            </Text>
            <DropZone onDrop={handleDropZoneDrop} accept="video/*" type="file">
              <>
                {uploadedFiles}
                {fileUpload}
              </>
            </DropZone>

            <Box>
              <Layout>
                <Layout.Section variant="oneHalf">
                  <Card>
                    <Text as="h2" variant="headingSm">
                      Uploaded Videos
                    </Text>
                    <BlockStack>
                      {reels.length === 0 ? (
                        <Text>No reels available</Text>
                      ) : (
                        <ResourceList
                          resourceName={{ singular: "reel", plural: "reels" }}
                          items={reels.map((reel) => ({
                            id: reel.id,
                            key: reel.id,
                            url: reel.reel_url,
                            name: reel.file_name,
                            media: (
                              <Thumbnail
                                source={
                                  reel.url ||
                                  "https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
                                }
                                alt={reel.fileName}
                                onClick={() => {
                                  handleVideoSelect(reel);
                                }}
                              />
                            ),
                          }))}
                          renderItem={(item) => {
                            const { id, url, name, media } = item;

                            return (
                              <ResourceList.Item
                                id={id}
                                onClick={() => {
                                  handleVideoSelect({ id, url, name });
                                  onClose();
                                }}
                                media={media}
                                accessibilityLabel={`View details for ${name}`}
                              >
                                <Text
                                  variant="bodyMd"
                                  fontWeight="bold"
                                  as="h3"
                                  alignment="center"
                                  breakWord
                                >
                                  {name}
                                </Text>
                              </ResourceList.Item>
                            );
                          }}
                        />
                      )}
                    </BlockStack>
                  </Card>
                </Layout.Section>
              </Layout>
            </Box>
          </BlockStack>
        </Modal.Section>
      </Modal>
    </Frame>
  );
};

export default VideoSelectionModal;