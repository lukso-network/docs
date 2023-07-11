# !/bin/bash

# Pull lsp-smart-contracts repo
mkdir tmpDocsSync 
cd tmpDocsSync
git clone --depth 1  --branch test-docs-sync https://github.com/lukso-network/lsp-smart-contracts.git

# Copy Docs
rsync -av --progress lsp-smart-contracts/docs/. ../docs/contracts/

cd ..
rm -rf tmpDocsSync

# Add Specs Links to the end of each file
for FILE in docs/contracts/contracts/**/*.md; do cat $FILE docs/contracts/_links.md > $FILE.copy; done 
for FILE in docs/contracts/contracts/**/*.md.copy; do cp $FILE `echo $FILE | sed 's/.copy//g'` && rm $FILE; done
