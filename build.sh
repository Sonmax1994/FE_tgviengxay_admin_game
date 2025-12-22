#!/bin/bash

echo "Step 1: Creating a Git tag with a timestamp..."
git tag v$(date +%Y%m%d%H%M%S)

echo "Step 2: Pulling the latest changes from the dev branch..."
git pull

echo "Step 3: Installing npm packages..."
npm install

echo "Step 4: Building the Angular project..."
ng build --configuration production

echo "Step 5: Copying build files to the destination directory..."
cp -r dist/coreui-free-angular-admin-template/* .

echo "All steps completed successfully!"

