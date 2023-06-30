#!/bin/bash

application_id=$1
aws_account_id=$2
aws_region=$3

bucket_name="polaris-${application_id}-${aws_account_id}-tf-state"
dynamodb_table_name="polaris-${application_id}-${aws_account_id}-tf-lock"

# Empty the S3 bucket
aws s3 rm s3://$bucket_name --recursive

# Delete the S3 bucket
aws s3api delete-bucket --bucket $bucket_name --region $aws_region

# Delete the DynamoDB table
aws dynamodb delete-table --table-name $dynamodb_table_name --region $aws_region