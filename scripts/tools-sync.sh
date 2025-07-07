#!/bin/bash

# Pull erc725.js repo
mkdir tmpDocsSync 
cd tmpDocsSync
git clone --depth 1  --branch main https://github.com/ERC725Alliance/erc725.js.git
rm erc725.js/docs/README.md

# Copy Docs
rsync -av --progress erc725.js/docs/. ../docs/tools/dapps/erc725js --exclude technical-reference

# -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Pull eip191-signer repo

git clone --depth 1 --branch develop https://github.com/lukso-network/tools-eip191-signer

# Copy Docs
rsync -av --progress tools-eip191-signer/docs/. ../docs/tools/dapps/eip191-signerjs


cd ..
rm -rf tmpDocsSync