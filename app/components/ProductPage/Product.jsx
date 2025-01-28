import React, { useState, useCallback, useEffect } from "react";
import {
  Card,
  Page,
  EmptyState,
  Modal,
  FormLayout,
  TextField,
  Box,
  BlockStack,
  Text,
  IndexTable,
  Icon,
  Thumbnail,
  Button,
} from "@shopify/polaris";
import { DeleteIcon } from "@shopify/polaris-icons";
import { useNavigate } from "@remix-run/react";
import VideoSelectionModal from "../modals/videoSelectionModal";
import { useProductReel } from "../../routes/context/ProductReelContext";
import styles from "../CommonStyles/CommonStyles.module.css";

const Product = ({ product, actionUrl, themeId }) => {
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false);
  const [videoModalActive, setVideoModalActive] = useState(false);
  const [reelName, setReelName] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const {
    attachedReels,
    handleAddProductReel,
    handleDeleteProductReel,
    setProduct,
    addLoading,
  } = useProductReel();

  useEffect(() => {
    if (product?.id) {
      setProduct({ id: product.id });
    }
  }, [product?.id]);

  const handleReelNameChange = useCallback(
    (newValue) => setReelName(newValue),
    [],
  );

  const toggleVideoModal = useCallback(
    () => setVideoModalActive((prev) => !prev),
    [],
  );

  const handleSelectVideo = (video) => {
    setSelectedVideo(video);
    setVideoModalActive(false);
  };

  const handleClose = () => {
    setModalActive(false);
    setSelectedVideo(null);
    setReelName("");
  };

  
  const rowMarkup =
    Array.isArray(attachedReels) && attachedReels.length > 0
      ? attachedReels.map((productReel) => (
          <IndexTable.Row id={productReel.id}>
            <IndexTable.Cell verticalAlign="middle" className={styles.tableTD}>
              <div
                className={styles.videoElement}
                onClick={(e) => e.stopPropagation()}
              >
                {/* <video className={styles.videoElement}>
                  <source src={productReel.reel.reelURL} type="video/mp4" />
                  Your browser does not support the video tag.
                </video> */}
                <Thumbnail
                  source="https://cdn.shopify.com/s/files/1/0684/2505/6356/files/video-film-hand-drawn-symbol-svgrepo-com_1.svg?v=1737465652"
                  alt="Black choker necklace"
                />
              </div>
            </IndexTable.Cell>
            <IndexTable.Cell>
              <Text variant="bodyMd" fontWeight="bold" as="span">
                {productReel.title}
              </Text>
            </IndexTable.Cell>
            <IndexTable.Cell>
              {new Date(productReel.created_at).toLocaleString()}
            </IndexTable.Cell>
            <IndexTable.Cell>
              <div
                className={styles.iconWrapper}
                onClick={() => handleDeleteProductReel(productReel.id)}
                title="Delete Reel"
              >
                <Icon source={DeleteIcon} tone="critical" />
              </div>
            </IndexTable.Cell>
          </IndexTable.Row>
        ))
      : null;

  const emptyStateMarkup = (
    <EmptyState
      heading="Time to attach your first reel!"
      action={{
        content: "Attach Reel",
        onAction: () => setModalActive(true),
      }}
      image="https://cdn.shopify.com/s/files/1/0684/2505/6356/files/Digital_Ads.svg?v=1737123796"
    >
      <p>
        Showcase your product in action by attaching a shoppable reel. Engage
        your audience and bring your product to life with a visual story that
        stands out.
      </p>
    </EmptyState>
  );

  return (
    <div className={styles.productContainer}>
      <Page
        backAction={{
          content: "Back to Home",
          onAction: () => navigate("/app"),
        }}
        primaryAction={{
          content: "Attach Reel",
          onAction: () => setModalActive(true),
        }}
        secondaryActions={[
          {
            content: "Preview to Add Story",
            onAction: () => {
              const shopOrigin = new URLSearchParams(window.location.search).get("shop");
              const storeName = shopOrigin.split(".")[0];
              const formattedTitle = product.title.toLowerCase().replace(/\s+/g, '-');
              const previewPath = `${encodeURIComponent('/products/')}${formattedTitle}`;
              const themeEditorUrl = `https://admin.shopify.com/store/${storeName}/themes/${themeId}/editor?previewPath=${previewPath}`;
              window.open(themeEditorUrl, "_blank");
            },
          }          
        ]}  
        title={product.title}
      />
      <Page>
      <Card variant="subdued">
          <IndexTable
            hasZebraStriping  
            showCheckboxes={false}
            selectable={false}
            resourceName={{ singular: "productReel", plural: "productReels" }}
            itemCount={attachedReels.length}
            headings={[
              { title: "" },
              { title: "Title" },
              { title: "Created At" },
              { title: "" },
            ]}
            emptyState={
              attachedReels.length === 0 ? emptyStateMarkup : undefined
            }
          >
            {rowMarkup}
          </IndexTable>
        </Card>
      </Page>

      <Modal
        open={modalActive}
        onClose={() => handleClose()}
        title="Create Reel"
        primaryAction={{
          content: "Add",
          onAction: () => {
            handleAddProductReel(selectedVideo, reelName),
              setModalActive(false),
              setReelName(""),
              setSelectedVideo(null)
          },
          loading: addLoading,
          disabled: addLoading,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => handleClose(),
            disabled: addLoading,
          },
        ]}
      >
        <Modal.Section>
          <BlockStack gap="500">
            <FormLayout>
              <Text as="label" variant="headingMd" alignment="center">
                Title
              </Text>
              <TextField
                value={reelName}
                onChange={handleReelNameChange}
                placeholder="Enter Title here"
                autoComplete="off"
              />
            </FormLayout>
            {selectedVideo ? (
              <>
                <Text alignment="center" variant="headingXs" tone="subdued">
                  {selectedVideo.name} has been selected.
                </Text>
              </>
            ) : (
              <>
                <Button onClick={toggleVideoModal}>Select Video</Button>
              </>
            )}
          </BlockStack>
        </Modal.Section>
      </Modal>

      <VideoSelectionModal
        active={videoModalActive}
        onClose={toggleVideoModal}
        onSelectVideo={handleSelectVideo}
        actionUrl={actionUrl}
      />
    </div>
  );
};

export default Product;
