#!/usr/bin/env bash

git diff-index --quiet HEAD --

if [ $? -ne 0 ]
then
    echo "Commit all changes first"
    exit 1
fi

set -v
set -e

GITHUB_PAGES_REPO="git@github.com:nik-garmash/nik-garmash.github.io.git"
TMP_BLOG_DIR=./tmp/blog
BUILD_HASH=$(git rev-parse HEAD)

rm -rf ${TMP_BLOG_DIR}

git clone ${GITHUB_PAGES_REPO} ${TMP_BLOG_DIR}

# Delete everything besides .git
# within blog directory
rm -rf ${TMP_BLOG_DIR}/*

ENVIRONMENT=production node generate.js ${TMP_BLOG_DIR}
ENVIRONMENT=production node generate-rss.js ${TMP_BLOG_DIR}

cd ${TMP_BLOG_DIR}

# Push new version
git add .
git commit -m "build ${BUILD_HASH}"
git push origin master


