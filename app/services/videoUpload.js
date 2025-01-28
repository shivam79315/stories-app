import { saveReel } from "./reelService"; 

export async function uploadVideoToShopify(admin, file, shop_url) {
  try {
    // Step 1: Get the file size
    const file_size = file.size.toString();
    const file_name = file.name;

    // Step 2: Create staged upload
    const stagedUploadResponse = await admin.graphql(
      `#graphql
      mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
        stagedUploadsCreate(input: $input) {
          stagedTargets {
            url
            resourceUrl
            parameters {
              name
              value
            }
          }
          userErrors {
            field
            message
          }
        }
      }`,
      {
        variables: {
          input: [
            {
              filename: file_name,
              mimeType: file.type,
              fileSize: file_size,
              httpMethod: "POST",
              resource: "VIDEO",
            },
          ],
        },
      }
    );

    const uploadData = await stagedUploadResponse.json();

    const userErrors = uploadData.data.stagedUploadsCreate.userErrors;
    if (userErrors.length > 0) {
      throw new Error(userErrors.map((error) => error.message).join(", "));
    }

    const { url, parameters, resourceUrl } =
      uploadData.data.stagedUploadsCreate.stagedTargets[0];

    // Step 3: Perform the file upload to the staged URL
    const uploadFormData = new FormData();
    parameters.forEach((param) =>
      uploadFormData.append(param.name, param.value)
    );
    uploadFormData.append("file", file);

    const uploadResponse = await fetch(url, {
      method: "POST",
      body: uploadFormData,
    });

    if (!uploadResponse.ok) {
      throw new Error(`File upload failed: ${uploadResponse.statusText}`);
    }

    // Step 4: Create the file in Shopify using the resource URL
    const fileCreateResponse = await admin.graphql(
      `#graphql
      mutation fileCreate($files: [FileCreateInput!]!) {
        fileCreate(files: $files) {
          files {
            id
            fileStatus
            alt
            createdAt
          }
        }
      }`,
      {
        variables: {
          files: [
            {
              alt: `uploadedFromApp`,
              contentType: "VIDEO",
              originalSource: resourceUrl,
            },
          ],
        },
      }
    );

    const fileCreateData = await fileCreateResponse.json();

    if (fileCreateData.data.fileCreate.files.length === 0) {
      throw new Error("File creation in Shopify failed. No files returned.");
    }

    // Step 5: Fetch the video details and check processing status
    const videoId = fileCreateData.data.fileCreate.files[0].id;

    const videoDetails = await fetchProcessedVideoDetails(admin, videoId);

    // Step 6: Save reel details to database
    const reelData = {
      reel_id: videoDetails.id,
      shop_url,
      file_name,
      reel_url: videoDetails.originalSource.url,
      reel_size: parseFloat(file.size),
      created_at: new Date(videoDetails.createdAt),
    };

    await saveReel(reelData); 

    return { success: true, actionType: "upload", fileInfo: fileCreateData.data.fileCreate.files[0], reel: reelData };
  } catch (error) {
    console.error("Error during file upload:", error);
    return { success: false, error: error.message };
  }
}

  // Retry logic to check if the video is processed
  async function fetchProcessedVideoDetails(admin, videoId, retries = 10, delay = 20000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await admin.graphql(
          `#graphql
          query fetchVideoById($id: ID!) {
              node(id: $id) {
                  ... on Video {
                      id
                      alt
                      createdAt
                      fileStatus
                      originalSource {
                          url
                      }
                  }
              }
          }`,
          { variables: { id: videoId } }
        );
  
        const data = await response.json();
  
        if (data.data.node && data.data.node.originalSource) {
          return data.data.node; // Successfully fetched video details
        }
  
        console.log(`Attempt ${attempt}: Video not fully processed. Retrying in ${delay}ms...`);
      } catch (error) {
        console.error(`Attempt ${attempt}: Error fetching video details:`, error.message);
      }
  
      // Wait before the next retry
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  
    throw new Error("Video processing incomplete after multiple attempts.");
  }
  