#!/bin/bash

# Pull erc725.js repo
mkdir tmpDocsSync 
cd tmpDocsSync
git clone --depth 1  --branch develop https://github.com/ERC725Alliance/erc725.js.git
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

# Pull lsp-factory repo

git clone --depth 1 --branch main https://github.com/lukso-network/tools-lsp-factory.git

# Copy Docs
rsync -av --progress tools-lsp-factory/docs/. ../docs/tools/lsp-factoryjs --exclude=technical-reference

# make technical-reference/methods docs
mkdir ../docs/tools/lsp-factoryjs/technical-reference && touch methods.md
echo '---
sidebar_label: Methods
sidebar_position: 1.1
---
' > ../docs/tools/lsp-factoryjs/technical-reference/methods.md

#  Add LSPFactory Spec
echo '
## Class: LSPFactory
' >> ../docs/tools/lsp-factoryjs/technical-reference/methods.md
sed -i '' 's,(\.\.,(https://github.com/lukso-network/tools-lsp-factory/tree/main/docs/technical-reference,g' tools-lsp-factory/docs/technical-reference/classes/LSPFactory.md
sed -i '' /\#\#/s/^/\#/ tools-lsp-factory/docs/technical-reference/classes/LSPFactory.md
sed -i '' '/#\#\#\# Constructors/d' tools-lsp-factory/docs/technical-reference/classes/LSPFactory.md
awk '/### Constructors/{flag=1} /## Properties/{flag=0} flag' tools-lsp-factory/docs/technical-reference/classes/LSPFactory.md >> ../docs/tools/lsp-factoryjs/technical-reference/methods.md

#  Add LSP3UniversalProfile Spec
echo '
## Class: LSP3UniversalProfile
' >> ../docs/tools/lsp-factoryjs/technical-reference/methods.md
sed -i '' 's,(\.\.,(https://github.com/lukso-network/tools-lsp-factory/tree/main/docs/technical-reference,g' tools-lsp-factory/docs/technical-reference/classes/LSP3UniversalProfile.md
sed -i '' /\#\#/s/^/\#/ tools-lsp-factory/docs/technical-reference/classes/LSP3UniversalProfile.md
sed -i '' '/#\#\#\# Constructors/d' tools-lsp-factory/docs/technical-reference/classes/LSP3UniversalProfile.md
awk '/### Constructors/{flag=1} /asd/{flag=0} flag' tools-lsp-factory/docs/technical-reference/classes/LSP3UniversalProfile.md >> ../docs/tools/lsp-factoryjs/technical-reference/methods.md

#  Add DigitalAsset Spec
echo '
## Class: DigitalAsset
' >> ../docs/tools/lsp-factoryjs/technical-reference/methods.md
sed -i '' 's,(\.\.,(https://github.com/lukso-network/tools-lsp-factory/tree/main/docs/technical-reference,g' tools-lsp-factory/docs/technical-reference/classes/DigitalAsset.md
sed -i '' /\#\#/s/^/\#/ tools-lsp-factory/docs/technical-reference/classes/DigitalAsset.md
sed -i '' '/#\#\#\# Constructors/d' tools-lsp-factory/docs/technical-reference/classes/DigitalAsset.md
awk '/### Constructors/{flag=1} /asd/{flag=0} flag' tools-lsp-factory/docs/technical-reference/classes/DigitalAsset.md >> ../docs/tools/lsp-factoryjs/technical-reference/methods.md

# Embedded links break inside chevrons so add a space
sed -i '' 's,\\>, \\>,g' ../docs/tools/lsp-factoryjs/technical-reference/methods.md

cd ..
rm -rf tmpDocsSync