import { useLoaderData } from "@remix-run/react";
import React, { useState, useEffect } from "react";
import { fetch_initial_products } from "../loaders/fetchInitialProducts";
import { Layout, SkeletonPage, SkeletonBodyText, Card } from "@shopify/polaris";
import Home from "../components/HomePage/Home";

//loader function to fetch products initially
export const loader = fetch_initial_products;

const HomePage = () => {
  const loaderData = useLoaderData();
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [products, setProducts] = useState(loaderData.nodes);
  const [pageInfo, setPageInfo] = useState(loaderData.pageInfo);
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");

  // Fetch products dynamically
  const fetchProducts = async ({ type, cursor, query }) => {
    try {
      const response = await fetch("/search_n_pagination", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, cursor, query }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data.nodes);
      setPageInfo(data.pageInfo);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = async (query) => {
    setCurrentSearchQuery(query);
    await fetchProducts({ type: "search", query });
  };

  // Handle next page
  const handleNextPage = () => {
    if (pageInfo.hasNextPage) {
      fetchProducts({
        type: "next",
        cursor: pageInfo.endCursor,
        query: currentSearchQuery,
      });
    }
  };

  // Handle previous page
  const handlePreviousPage = () => {
    if (pageInfo.hasPreviousPage) {
      fetchProducts({
        type: "previous",
        cursor: pageInfo.startCursor,
        query: currentSearchQuery,
      });
    }
  };

  const handleClear = async () => {
    fetchInitialProducts();
  };

  const fetchInitialProducts = async () => {
    try {
      setCurrentSearchQuery("");

      const response = await fetch("/fetch_shopify_initial_products", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch initial products");
      }

      const data = await response.json();

      // Update products and pageInfo
      setProducts(data.nodes);
      setPageInfo(data.pageInfo);
    } catch (error) {
      console.error("Error fetching initial products:", error);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) {
    return (
      <SkeletonPage title="Products">
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <SkeletonBodyText />
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    );
  }

  return (
    <>
        <Home
          products={products}
          pageInfo={pageInfo}
          onSearch={handleSearch}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          onClear={handleClear}
        />
    </>
  );
};

export default HomePage;
