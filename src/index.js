import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

// Use environment variable or hardcode the bucket name
const BUCKET_NAME = process.env.AWS_S3_BUCKETNAME;

// Helper function to convert stream to string
const streamToString = (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    stream.on("error", reject);
  });
};

export const handler = async (event) => {
  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
    });

    const listedObjects = await s3Client.send(listCommand);

    if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
      return {
        statusCode: 200,
        body: JSON.stringify([]),
      };
    }

    const jsonContents = await Promise.all(
      listedObjects.Contents.map(async (file) => {
        const getCommand = new GetObjectCommand({
          Bucket: BUCKET_NAME,
          Key: file.Key,
        });

        const response = await s3Client.send(getCommand);
        const fileContent = await streamToString(response.Body);
        return JSON.parse(fileContent);
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(jsonContents),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error retrieving JSON files" }),
    };
  }
};
