#!/bin/bash

# Configure the aws sync command
aws_command="aws s3 sync . s3://gangverk.is"
aws_command+=" --region=us-east-1"
aws_command+=" --acl=public-read"
aws_command+=" --delete"
aws_command+=" --exclude \".git/*\""
aws_command+=" --exclude \"deploy.sh\""
aws_command+=" --exclude \".DS_Store\""
aws_command+=" --exclude \"*/.DS_Store\""
aws_command+=" --exclude \"README.md\""

# Create dry run commands
aws_command_dry="$aws_command --dryrun"

# Perform the dry run
echo "The following will happen as part of the deployment..."
eval $aws_command_dry

# Ask for confirmation to proceed
while true; do
  read -p "Do you wish to proceed? " yn
  case $yn in
    [Yy]* ) break;;
    [Nn]* ) exit;;
    * ) echo "Please answer yes or no.";;
  esac
done

# Run the deployment for real
echo "Deploying the Gangverk website..."
eval $aws_command
