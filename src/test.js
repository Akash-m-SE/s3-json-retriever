import { handler } from "./index.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file
dotenv.config({ path: join(__dirname, "../.env") });

async function testLambda() {
  console.log("Environment Check:", {
    region: process.env.AWS_S3_REGION,
    bucket: process.env.AWS_S3_BUCKETNAME,
    hasAccessKey: !!process.env.AWS_S3_ACCESS_KEY_ID,
    hasSecretKey: !!process.env.AWS_S3_SECRET_ACCESS_KEY,
  });

  try {
    const response = await handler({});
    console.log("Lambda Response:", JSON.stringify(response, null, 2));
  } catch (error) {
    console.error("Test failed:", error);
  }
}

testLambda();
