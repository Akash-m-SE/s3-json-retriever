
# Overview

The `retrieveJson` Lambda function is designed to retrieve and compile JSON data from all stored files in an Amazon S3 bucket. This function is integrated with AWS API Gateway to handle HTTP GET requests, making it a scalable and serverless solution for fetching stored JSON data.
## Features

**Fetch JSON Data:** Retrieves JSON data from all files in the specified S3 bucket.

**API Integration:** Integrated with AWS API Gateway to enable HTTP GET requests.

**Scalable:** Utilizes AWS Lambda, allowing for automatic scaling based on request volume.
## Workflow

- The retrieveJson Lambda function is triggered by a GET request via API Gateway.

- The function retrieves all JSON files stored in the designated S3 bucket.

- Each file's content is parsed and added to an array.

- A response is returned to the user, containing a JSON array of all retrieved JSON data.
## Example Response

A sample GET request returns the combined JSON data:

```
[
  { "name": "John", "age": 30 },
  { "name": "Jane", "age": 25 },
  ...
]
```
## Error Handling

- Handles S3 access issues.

- Manages empty bucket cases with a “No files found” message.

- Catches and logs unexpected errors, responding with an error message.
## Environment Setup

To run this project, you will need to create an AWS S3 bucket, setup these policies inside the S3 bucket:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowAccessToS3Bucket",
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket",
        "s3:PutObject"
      ],
      "Resource": [
        "arn:aws:s3:::your-bucket-name",
        "arn:aws:s3:::your-bucket-name/*"
      ]
    }
  ]
}
```
Then create an IAM user with proper access to the S3 bucket and get your access keys.

Add the following environment variables to your lambda function's configuration


`AWS_S3_REGION` `AWS_S3_BUCKET_NAME` `AWS_S3_ACCESS_KEY_ID` `AWS_S3_SECRET_ACCESS_KEY`

## Installation/Setup

- Set up a public S3 bucket with proper policies to store JSON files.

- Create the `retrieveJson` Lambda function in AWS Lambda for which you can get the source code from the repository's src/index.js file.

- Set Up API Gateway:
    - Create a new API in API Gateway.
    - Set up a GET endpoint and link it to the `retrieveJson` Lambda function.

## Tech Stack

**RunTime:** Node.js 18.x

**AWS Services:** Lambda, S3, API Gateway

