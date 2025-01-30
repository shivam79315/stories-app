import React, { useState, useCallback, useEffect } from "react";
import {
  Card,
  Page,
  EmptyState,
  Modal,
  FormLayout,
  TextField,
  BlockStack,
  Text,
  Icon,
  Thumbnail,
  Button,
  DataTable,
} from "@shopify/polaris";
import { DeleteIcon } from "@shopify/polaris-icons";
import { useNavigate } from "@remix-run/react";
import VideoSelectionModal from "../modals/videoSelectionModal";
import { useProductReel } from "../../routes/context/ProductReelContext";
import styles from "../CommonStyles/CommonStyles.module.css";
import TestEffect from "../storyStyles/TestEffect";

const Product = ({ product, actionUrl, themeId }) => {
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false);
  const [videoModalActive, setVideoModalActive] = useState(false);
  const [reelName, setReelName] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [shopURL, setShopURL] = useState("");

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

  const storeName = shopURL.split(".")[0];

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

  const rows =
    Array.isArray(attachedReels) && attachedReels.length > 0
      ? attachedReels.map((productReel) => ({
          id: productReel.id,
          key: productReel.id,
          data: [
            <div
              onClick={(e) => e.stopPropagation()}
              key={`${productReel.id}-thumbnail`}
            >
              <Thumbnail
                source="https://cdn.shopify.com/s/files/1/0684/2505/6356/files/video-film-hand-drawn-symbol-svgrepo-com_1.svg?v=1737465652"
                alt="Video thumbnail"
              />
            </div>,
            productReel.title,
            new Date(productReel.created_at).toLocaleString(),
            <div
              className={styles.iconWrapper}
              onClick={() => handleDeleteProductReel(productReel.id)}
              title="Delete Reel"
              key={`${productReel.id}-delete`}
            >
              <Icon source={DeleteIcon} tone="critical" />
            </div>,
          ],
        }))
      : [];

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
  console.log(attachedReels)

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
              const formattedTitle = product.title
                .toLowerCase()
                .replace(/\s+/g, "-");
              const previewPath = `${encodeURIComponent("/products/")}${formattedTitle}`;
              const themeEditorUrl = `https://admin.shopify.com/store/${storeName}/themes/${themeId}/editor?previewPath=${previewPath}`;        
              window.open(themeEditorUrl, "_blank");
            },
            plain: true,
          },
        ]}
        title={product.title}
      />
<TestEffect />
      {/* Data table for reels attached to product  */}
      <Page>
        <Card variant="subdued">
          {Array.isArray(attachedReels) && attachedReels.length > 0 ? (
            <DataTable
              columnContentTypes={["text", "text", "text", "text"]}
              headings={["", "Title", "Created At", ""]}
              hasZebraStripingOnData
              verticalAlign="middle"
              rows={rows.map((row) => row.data)}
            />
          ) : (
            emptyStateMarkup
          )}
        </Card>
      </Page>

      {/* Modal to select reel with product  */}
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
              setSelectedVideo(null);
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
  
      {/* Reel selection modal for product */}
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