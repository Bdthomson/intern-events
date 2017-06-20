#!/bin/bash

# NOTE: The build directory gets wiped every time a new build gets created.

# Build the static bundle.
npm run build

# Copy over the Express server.
cp server.js build/

# Copy over a build specific package.json
cp build.package.json build/package.json

# Git init inside the build directory and add the heroku remote.
cd build && git init

# Set the app in heroku.
heroku git:remote -a app-ibm-intern-events

# Add files to git and commit.
git add . && git commit -m "Build"

# Push to the remote.
git push heroku master -f
