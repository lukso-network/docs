# !/bin/bash

# Pull lsp-smart-contracts repo
mkdir tmpDocsSync 
cd tmpDocsSync
git clone --depth 1  --branch test-docs-sync https://github.com/lukso-network/lsp-smart-contracts.git

# Copy Docs
rsync -av --progress lsp-smart-contracts/docs/. ../docs/contracts/