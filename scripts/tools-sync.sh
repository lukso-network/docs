#!/bin/bash

# Pull erc725.js repo
mkdir tmpDocsSync 
cd tmpDocsSync
git clone --depth 1  --branch main https://github.com/ERC725Alliance/erc725.js.git
rm erc725.js/docs/README.md

# Copy Docs
rsync -av --progress erc725.js/docs/. ../docs/tools/erc725js --exclude technical-reference
cp erc725.js/docs/technical-reference/classes/ERC725.md ../docs/tools/erc725js/technical-reference/ERC725.md

# Update links in Technical Ref Docs spec
sed -i '' 's,(\.\.,(https://github.com/ERC725Alliance/erc725.js/main/develop/docs/technical-reference,g' ../docs/tools/erc725js/technical-reference/ERC725.md
sed -i '' 1d ../docs/tools/erc725js/technical-reference/ERC725.md

echo '---
sidebar_label: Methods
---

# Class: ERC725'|cat - ../docs/tools/erc725js/technical-reference/ERC725.md > /tmp/out && mv /tmp/out ../docs/tools/erc725js/technical-reference/ERC725.md

rm -rf ../tmpDocsSync
