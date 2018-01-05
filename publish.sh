#!/usr/bin/env bash

git diff-index --quiet HEAD -- || echo "Commit all the changes first"; exit 1

set -v

GITHUB_PAGES_REPO="git@github.com:nik-garmash/nik-garmash.github.io.git"
TMP_BLOG_DIR=./tmp/blog
BUILD_HASH=$(git rev-parse HEAD)

rm -rf ${TMP_BLOG_DIR}

git clone ${GITHUB_PAGES_REPO} ${TMP_BLOG_DIR}

node generate.js ${TMP_BLOG_DIR}
node generate-rss.js ${TMP_BLOG_DIR}

cd ${TMP_BLOG_DIR}

# Delete everything besides .git
rm -rf *

# Push new version
git add .
git commit -m "build ${BUILD_HASH}"
git push origin master


