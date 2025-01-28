import React, { useState, useCallback, useEffect } from "react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import {
  Card,
  EmptyState,
  DropZone,
  Modal,
  BlockStack,
  PageActions,
  Thumbnail,
  Frame,
  Toast,
  Spinner,
  Link,
  Text,
  IndexTable,
  IndexFilters,
  SkeletonPage,
  SkeletonBodyText,
  useSetIndexFiltersMode,
  useIndexResourceState,
} from "@shopify/polaris";
import { NoteIcon } from "@shopify/polaris-icons";
import styles from '../CommonStyles/CommonStyles.module.css';
import { format } from "date-fns";
import { useUpload } from "../../routes/context/UploadProvider";

const ReelsListComp = ({ actionUrl, shopURL }) => {
  const fetcher = useFetcher();
  const { videos } = useLoaderData(); 
  const [isTableLoading, setIsTableLoading] = useState(true);

  const { files,
    setFiles,
    handleUpload,
    loading,
    setLoading,
    validVideoTypes,
    toast,
    setToast,
    modalActive,
    setModalActive  } = useUpload();
  
  const tabs = [
    {
      content: "All",
      index: 0,
      onAction: () => {},
      id: "All-0",
      isLocked: true,
      actions: [],
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsTableLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
 
  // Process videos fetched from the database
  const processVideos = (videos) =>
    videos.map((video) => ({
      id: video.id,
      key: video.reel_id,
      reelTitle: video.file_name || "Uploaded video",
      date: video.created_at
        ? format(new Date(video.created_at), "MM/dd/yyyy, hh:mm:ss a")
        : "Unknown date",
      format: video.reel_url.split(".").pop() || "Unknown format",
      reelSize: video.reel_size,
      videoUrl: video.reel_url || "",
    }));

    // Process videos fetched from the database
    const reelsList = processVideos(videos);
    const [reels, setReels] = useState(reelsList);

    useEffect(() => {
      if (videos && videos.length > 0) {
        setReels(processVideos(videos));
      }
    }, [videos, files, toast]);


  const sortOptions = [
    { label: "File Name", value: "filename asc", directionLabel: "A-Z" },
    { label: "File Name", value: "filename desc", directionLabel: "Z-A" },
    { label: "Date", value: "date asc", directionLabel: "A-Z" },
    { label: "Date", value: "date desc", directionLabel: "Z-A" },
    { label: "Size", value: "size asc", directionLabel: "Ascending" },
    { label: "Size", value: "size desc", directionLabel: "Descending" },
  ];

  const [sortSelected, setSortSelected] = useState(["order asc"]);
  const { mode, setMode } = useSetIndexFiltersMode();

  const handleClear = () => {
    setQueryValue("");
    setReels(reelsList);
  };

  const [queryValue, setQueryValue] = useState("");

  const handleFiltersQueryChange = useCallback(
    (value) => {
      setQueryValue(value);
      const filteredReels = reelsList.filter((reel) => {
        const title = reel.reelTitle?.toLowerCase() || "";
        return title.includes(value.toLowerCase());
      });
      setReels(filteredReels);
    },
    [reelsList],
  );

  const resourceName = {
    singular: "reel",
    plural: "reels",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(reels);

  const rowMarkup = reels.map(
    ({ id, key, reelTitle, date, reelSize, format, videoUrl }, index) => (
      <IndexTable.Row
        id={`${id}___${key}`}
        key={`${id}___${key}`}
        selected={selectedResources.includes(`${id}___${key}`)}
        position={index}
      >
        <IndexTable.Cell verticalAlign="middle" className={styles.tableTD}>
          <div className={styles.videoElement}>
            {/* <Link
              url={videoUrl}
              onClick={() => console.log(`Clicked ${videoUrl}`)}
            > */}
              <video className={styles.videoElement}>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            {/* </Link> */}
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {reelTitle}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{date}</IndexTable.Cell>
        <IndexTable.Cell>
          {reelSize ? `${(reelSize / (1024 * 1024)).toFixed(2)} MB` : null}
        </IndexTable.Cell>
        <IndexTable.Cell>{format}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFiles([acceptedFiles[0]]);
      }
    },
    [setFiles]
  );  

  const handleToastDismiss = () => {
    setToast({ content: "", active: false, error: false });
  };  

  const modal = (
    <div className={styles.modalContainer}>
      <Modal
        open={modalActive}
        onClose={() => setModalActive(false)}
        title="Upload your video"
        primaryAction={{
          content: "Upload Video",
          onAction: handleUpload,
          disabled: loading,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => {
              setFiles([]);
              setModalActive(false);
            },
            disabled: loading,
          },
        ]}
      >
        <Modal.Section>
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <Spinner accessibilityLabel="Uploading file" size="large" />
              <p>This will take a few minutes...</p>
            </div>
          ) : (
            <DropZone onDrop={handleDropZoneDrop} accept="video/*" type="file">
              {files.length > 0 ? (
                files.map((file, index) => (
                  <BlockStack alignment="center" key={index}>
                    <div className={styles.uploadFileContent}>
                      <Thumbnail
                        size="small"
                        alt={file.name}
                        source={
                          validVideoTypes.includes(file.type)
                            ? window.URL.createObjectURL(file)
                            : NoteIcon
                        }
                      />
                      <Text>{file.name}</Text>
                      <Text variant="bodySm" as="p">
                        {file.size} bytes
                      </Text>
                    </div>
                  </BlockStack>
                ))
              ) : (
                <DropZone.FileUpload />
              )}
            </DropZone>
          )}
        </Modal.Section>
      </Modal>
    </div>
  );

  const emptyStateMarkup =
    reels.length === 0 ? (
      <Card>
        <EmptyState
          heading="Upload Videos Here"
          action={{
            content: "Upload files",
            onAction: () => setModalActive(true),
          }}
          image="https://cdn.shopify.com/s/files/1/0684/2505/6356/files/Social_02.svg?v=1736856256"
          fullWidth
        >
          <p>MP4 videos are supported only.</p>
        </EmptyState>
      </Card>
    ) : null;
    console.log(videos)

    const handleDelete = async () => {
      try {
        if (selectedResources.length === 0) {
          setToast({
            content: "No reels selected for deletion",
            active: true,
            error: true,
          });
          return;
        }
    
        // Submit delete request
        fetcher.submit(
          {
            actionType: "delete",
            reelIds: JSON.stringify(selectedResources),
            shopURL,
          },
          { method: "post", action: actionUrl }
        );
    
        // Optimistically update the UI
        const updatedReels = reels.filter(
          (reel) => !selectedResources.includes(`${reel.id}___${reel.key}`)
        );
        setReels(updatedReels);
    
        setToast({
          content: "Reels deleted successfully",
          active: true,
          error: false,
        });
      } catch (error) {
        console.error("Error deleting reels:", error);
        setToast({
          content: "Failed to delete reels",
          active: true,
          error: true,
        });
      }
    };
    
  
  return (
    <>
      {isTableLoading ? (
        <SkeletonPage>
          <Card>
            <SkeletonBodyText lines={5} />
          </Card>
        </SkeletonPage>
      ) : (
        <>
          {modal}
          <PageActions
            primaryAction={{
              content: "Upload files",
              onAction: () => setModalActive(true),
            }}
          />
          <Frame>
            {toast.active && (
              <Toast
                content={toast.content}
                onDismiss={handleToastDismiss}
                error={toast.error}
              />
            )}
            <div className={styles.reelsListContainer}>
              <Card>
                <IndexFilters
                  sortOptions={sortOptions}
                  sortSelected={sortSelected}
                  queryValue={queryValue}
                  queryPlaceholder="Search videos"
                  onQueryChange={handleFiltersQueryChange}
                  onQueryClear={handleClear}
                  onSort={setSortSelected}
                  cancelAction={{
                    onAction: handleClear,
                    disabled: false,
                    loading: false,
                  }}
                  tabs={tabs}
                  canCreateNewView={false}
                  filters={[]}
                  appliedFilters={[]}
                  onClearAll={() => {}}
                  mode={mode}
                  setMode={setMode}
                  hideFilters
                  filteringAccessibilityTooltip="Search (F)"
                />
                <IndexTable
                  resourceName={resourceName}
                  itemCount={reels.length}
                  selectedItemsCount={
                    allResourcesSelected ? "All" : selectedResources.length
                  }
                  onSelectionChange={handleSelectionChange}
                  headings={[
                    { title: "" },
                    { title: "File name" },
                    { title: "Date added" },
                    { title: "Size" },
                    { title: "Format" },
                  ]}
                  emptyState={emptyStateMarkup}
                  promotedBulkActions={[
                    {
                      content: "Delete",
                      onAction: handleDelete,
                      destructive: true,
                    },
                  ]}
                >
                  {rowMarkup}
                </IndexTable>
              </Card>
            </div>
          </Frame>
        </>
      )}
    </>
  );
};

export default ReelsListComp;