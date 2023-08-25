# !/bin/bash

# Pull lsp-smart-contracts repo
mkdir tmpDocsSync 
cd tmpDocsSync
git clone --depth 1  --branch develop https://github.com/lukso-network/lsp-smart-contracts.git

# Copy Docs
rsync -av --progress lsp-smart-contracts/docs/. ../docs/contracts/

cd ..
rm -rf tmpDocsSync

# Move libraries from own folders to 'docs/contracts/libraries/*.md'
for FILE in docs/contracts/libraries/**/*.md;
do
read filename <<< "${FILE##*/}";
read filepath <<< "${FILE%/*}/"
if [ "$FILE" != "docs/contracts/libraries/$filename" ];
then
cp $FILE "docs/contracts/libraries/$filename";
rm -r $filepath;
fi;
done

# Add Global Links to the end of each file from `docs/contracts/_links.md`
linksFile="$(awk '$0 == "<!-- GLOBAL LINKS -->" {i=1;next};i' docs/contracts/_links.md)"
for FILE in docs/contracts/contracts/**/*.md;
do
fileToAddLinks="$(awk '$0 == "<!-- GLOBAL LINKS -->" {i=1;next};i' $FILE)"
if [ "$linksFile" != "$fileToAddLinks" ];
then 
printf '%s\n' '/<!-- GLOBAL LINKS -->/,$d' w | ed -s $FILE
cat $FILE docs/contracts/_links.md > $FILE.copy
cp $FILE.copy $FILE && rm $FILE.copy;
else echo "up to date"
fi; 
done
