#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"

function docGen {
    npm run-script docs
}
NODE_VERSION=`node --version`
NODE_VERSION=${NODE_VERSION:1:1}
# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" -o "$NODE_VERSION" != "8" ]; then
    echo "Skipping deploy; just doing a build."
    exit 0
fi

# Save some useful information
REPO="https://${GH_TOKEN}@github.com/shirayukikitsune/iugu2-node"
SHA=`git rev-parse --verify HEAD`

# Clone the existing gh-pages for this repo into out/
# Create a new empty branch if gh-pages doesn't exist yet (should only happen on first deply)
git clone --quiet $REPO out
cd out
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
cd ..

# Clean out existing contents
rm -rf out/* out/.ci out/.nyc_output out/.vscode out/.gitignore out/.npmignore out/.travis.yml

# Run our compile script
docGen

# Now let's go have some fun with the cloned repo
cd out
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

DIFF_CODE=$(git diff --exit-code)

# If there are no changes to the compiled out (e.g. this is a README update) then just bail.
if [ -z "$DIFF_CODE" ]; then
    echo "No changes to the output on this push; exiting."
    exit 0
fi

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
git add .
git commit -m "Deploy to GitHub Pages: ${SHA}"

# Now that we're all set up, we can push.
git push $REPO $TARGET_BRANCH
