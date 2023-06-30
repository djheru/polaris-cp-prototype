#!/bin/bash

# Fail script on any error
set -e

# Input arguments
APP_ID=$1
AWS_REGION=$2

# Get AWS account id
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

# Define the bucket name
BUCKET_NAME="polaris-${APP_ID}-${AWS_ACCOUNT_ID}-tf-state"

# Check if the S3 bucket exists and create if it does not
if ! aws s3api head-bucket --bucket $BUCKET_NAME 2>/dev/null; then
  echo "Bucket does not exist, creating..."
  aws s3api create-bucket --bucket $BUCKET_NAME --region $AWS_REGION --create-bucket-configuration LocationConstraint=$AWS_REGION
else
  echo "Bucket exists"
fi