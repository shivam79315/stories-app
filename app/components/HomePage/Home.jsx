import React, { useState, useEffect, useCallback } from "react";
import {
  Page,
  Layout,
  Card,
  IndexTable,
  IndexFilters,
  Text,
  useSetIndexFiltersMode,
  useIndexResourceState,
  Thumbnail,
  Spinner,
  InlineStack,
  BlockStack,
} from "@shopify/polaris";
import styles from "../CommonStyles/CommonStyles.module.css";
import { useNavigate } from "@remix-run/react";

const Home = ({
  products,
  onSearch,
  pageInfo,
  onClear,
  onNextPage,
  onPreviousPage,
}) => {
  const [queryValue, setQueryValue] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [sortSelected, setSortSelected] = useState(["order asc"]);
  const [loading, setLoading] = useState(false);

  const hasProducts = displayedProducts && displayedProducts.length > 0;
  const navigate = useNavigate();

  const sortOptions = [
    { label: "Product Name", value: "productName asc", directionLabel: "A-Z" },
    { label: "Product Name", value: "productName desc", directionLabel: "Z-A" },
    { label: "Category", value: "category asc", directionLabel: "Ascending" },
    { label: "Category", value: "category desc", directionLabel: "Descending" },
  ];

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

  const { mode, setMode } = useSetIndexFiltersMode();

  // Update displayed products when the `products` prop changes
  useEffect(() => {
    setDisplayedProducts(products);
  }, [products]);

  // Handle server-side search
  const handleFiltersQueryChange = useCallback(
    async (value) => {
      setQueryValue(value);

      if (value.trim()) {
        setLoading(true);
        const result = await onSearch(value);
        setDisplayedProducts(result || []);
        setLoading(false);
      } else {
        setQueryValue("");
        await onClear();
      }
    },
    [onSearch, onClear],
  );

  const handleNextPage = async () => {
    setLoading(true);
    await onNextPage();
    setLoading(false);
  };

  const handlePreviousPage = async () => {
    setLoading(true);
    await onPreviousPage();
    setLoading(false);
  };

  const handleClear = () => {
    setQueryValue("");
    onClear();
  };

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(displayedProducts);

  const rowMarkup = loading ? (
    <>
      <IndexTable.Cell colSpan={5}>
        <BlockStack inlineAlign="center">
          <Spinner size="large" accessibilityLabel="Loading products" />
        </BlockStack>
      </IndexTable.Cell>
    </>
  ) : (
    displayedProducts.map(
      ({ id, title, status, totalInventory, images }, index) => {
        const image =
          images.edges?.[0]?.node?.src ||
          "https://cdn.shopify.com/s/files/1/0684/2505/6356/files/image-01-svgrepo-com_e0674124-4db9-4285-9169-326bcd5cee41.svg?v=1736926875";

        return (
          <IndexTable.Row
            id={id}
            key={id}
            position={index}
            selected={selectedResources.includes(id)}
            onClick={() => {
              const numericId = id.split("/").pop();
              navigate(`/product/${numericId}`);
            }}
            style={{ cursor: "pointer" }}
          >
            <IndexTable.Cell verticalAlign="middle" className={styles.tableTD}>
              <Thumbnail source={image} size="small" alt="Small document" />
            </IndexTable.Cell>
            <IndexTable.Cell>
              <Text variant="bodyMd" fontWeight="bold">
                {title}
              </Text>
            </IndexTable.Cell>
            <IndexTable.Cell>{status}</IndexTable.Cell>
            <IndexTable.Cell>{totalInventory}</IndexTable.Cell>
          </IndexTable.Row>
        );
      },
    )
  );

  return (
    <Page title="Products" fullWidth>
      <Layout>
        <Layout.Section>
          <Card>
            <IndexFilters
              sortOptions={sortOptions}
              sortSelected={sortSelected}
              queryValue={queryValue}
              onQueryChange={handleFiltersQueryChange}
              onQueryClear={handleClear}
              onSort={setSortSelected}
              queryPlaceholder="Search products"
              tabs={tabs}
              filters={[]}
              appliedFilters={[]}
              mode={mode}
              setMode={setMode}
            />
            <IndexTable
              resourceName={resourceName}
              itemCount={displayedProducts.length}
              selectedItemsCount={
                allResourcesSelected ? "All" : selectedResources.length
              }
              onSelectionChange={handleSelectionChange}
              headings={[
                { title: "" },
                { title: "Product Name" },
                { title: "Status" },
                { title: "Inventory" },
              ]}
              pagination={{
                hasNext: pageInfo.hasNextPage,
                hasPrevious: pageInfo.hasPreviousPage,
                onNext: handleNextPage,
                onPrevious: handlePreviousPage,
              }}
            >
              {rowMarkup}
            </IndexTable>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Home;
