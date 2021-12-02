---
sidebar_position: 1.1
title: Universal Profile
---

# Deploying Universal Profile

## Constructing LSP3 Metadata

When deploying a Universal Profile you can specify your Universal Profile metadata using the `lsp3Profile` key.

This object contains your UP metadata.

```javascript
const myUniversalProfileData = {
  name: 'My Universal Profile',
  description: 'My cool Universal Profile',
  profileImage: [
    {
      width: 500,
      height: 500,
      hashFunction: 'keccak256(bytes)',
      // bytes32 hex string of the image hash
      hash: '0xfdafad027ecfe57eb4ad047b938805d1dec209d6e9f960fc320d7b9b11cbed14',
      url: 'ipfs://QmPLqMFHxiUgYAom3Zg4SiwoxDaFcZpHXpCmiDzxrtjSGp',
    },
  ],
  backgroundImage: [
    {
      width: 500,
      height: 500,
      hashFunction: 'keccak256(bytes)',
      // bytes32 hex string of the image hash
      hash: '0xfdafad027ecfe57eb4ad047b938805d1dec209d6e9f960fc320d7b9b11cbed14',
      url: 'ipfs://QmPLqMFHxiUgYAom3Zg4SiwoxDaFcZpHXpCmiDzxrtjSGp',
    },
  ],
  tags: ['Fashion', 'Design'],
  links: [{ title: 'My Website', url: 'www.my-website.com' }],
};
```

`File` objects can also be passed to `profileImage` and `backgroundImage` fields to allow easy drag and drop of images from a user interface:

```javascript
<input type="file" id="input">

<script>
    const myLocalFile = document.getElementById('input').files[0];

    const myUniversalProfileData = {
        name: "My Universal Profile",
        description: "My cool Universal Profile",
        profileImage: myLocalFile,
        backgroundImage: myLocalFile,
        tags: ['Fashion', 'Design'],
        links: [{ title: "My Website", url: "www.my-website.com" }],
    };
<script/>
```

If a `File` object is passed it will will automatically be uploaded to IPFS.

## Uploading LSP3 metadata to IPFS

If you wish to upload your LSP3 metadata before deploying you can do so using the static `uploadProfileData` method. This uses the same `lsp3Profile` object schema defined above for `myUniversalProfileData`:

```javascript
const uploadResult = await lspFactory.LSP3UniversalProfile.uploadProfileData({
  ...myUniversalProfileData,
});

const myUniversalProfileIPFSUrl = uploadResult.url; // 'https://ipfs.lukso.network/ipfs/QmPzUfdKhY6vfcTNDnitwKnnpm5GqjYSmw9todNVmi4bqy'
```

## Deploy your UniversalProfile

```javascript
const myContracts = await lspFactory.LSP3UniversalProfile.deploy({
    controllingAccounts: ['0x...'],
    lsp3Profile: myUniversalProfileIPFSUrl | myUniversalProfileData // LSP3 Metadata object or IPFS URL
  });
};
```
