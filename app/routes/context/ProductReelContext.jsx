import React, { createContext, useContext, useState, useEffect } from "react";

const ProductReelContext = createContext();

export const ProductReelProvider = ({ children }) => {
  const [attachedReels, setAttachedReels] = useState([]);
  const [loading, setLoading] = useState(false);
  // loading on add button adding product reel in db 
  const [ addLoading, setAddLoading ] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductReels = async () => {
      setLoading(true); 
      try {
        const response = await fetch(`/productReels?productId=${product?.id}`);
        const result = await response.json();

        if (result.success) {
          setAttachedReels(result.productReels);
        } else {
          console.error("Failed to fetch product reels:", result.error);
        }
      } catch (error) {
        console.error("Error fetching product reels:", error);
      } finally {
        setLoading(false); 
      }
    };

    if (product?.id) {
      fetchProductReels();
    }
  }, [product?.id]);

  const saveProductReel = async ({ product_id, reel_id, title }) => {
    try {
      const response = await fetch("/productReels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          actionType: "add",
          product_id,
          reel_id,
          title,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to save product reel");
      }

      return result.productReel;
    } catch (error) {
      console.error("Error saving product reel:", error);
      throw error;
    }
  };

  const handleAddProductReel = async (selectedVideo, reelName) => {
    if (!selectedVideo || !reelName) {
      alert("Please select a video and provide a title!");
      return;
    }

    setAddLoading(true);

    try {
      const newReel = {
        product_id: product.id,
        reel_id: selectedVideo.id,
        title: reelName,
      };

      const savedReel = await saveProductReel(newReel);

      setAttachedReels((prev) => [
        ...prev,
        {
          ...savedReel,
          video: selectedVideo,
        },
      ]);
    } catch (error) {
      console.error("Failed to add reel:", error);
    } finally {
        setAddLoading(false);
    }
  };

  const handleDeleteProductReel = async (reelId) => {
    try {
      const response = await fetch(`/productReels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          actionType: "delete",
          id: reelId,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to delete reel");
      }

      setAttachedReels((prev) => prev.filter((reel) => reel.id !== reelId));
    } catch (error) {
      console.error("Failed to delete reel:", error);
    }
  };

  return (
    <ProductReelContext.Provider
      value={{
        attachedReels,
        loading, 
        addLoading,
        setAttachedReels,
        handleAddProductReel,
        handleDeleteProductReel,
        setProduct,
      }}
    >
      {children}
    </ProductReelContext.Provider>
  );
};

export const useProductReel = () => useContext(ProductReelContext);