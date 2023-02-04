---
sidebar_position: 2
title: Digital Asset
---

# Deploying a Digital Asset

LSPFactory enables developers to easily deploy [LSP7] and [LSP8] Digital Asset smart contracts for their [fungible token](./digital-asset.md#fungible-token) or [NFT 2.0](./digital-asset.md#deploying-nft-20) use cases.

To deploy a mintable [LSP7] Digital Asset:

```javascript
await lspFactory.LSP7DigitalAsset.deploy(digitalAssetProperties [, options]);
```

To deploy a mintable LSP8 Identifiable Digital Asset:

```javascript
await lspFactory.LSP8IdentifiableDigitalAsset.deploy(digitalAssetProperties [, options]);
```

:::info
By default LSPFactory deploys the [`Mintable`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/presets/LSP7Mintable.sol) implementation of LSP7 and LSP8 digital assets. To call the `mint` function import the `LSP7Mintable` or `LSP8Mintable` abi from the [lsp-smart-contracts library](https://github.com/lukso-network/lsp-smart-contracts).

:::

## Deploying an NFT 2.0

The [LSP7](./digital-asset.md#lsp7-nft-20) and [LSP8](./digital-asset.md#lsp8-nft-20) Digital Assets standards can both be used for NFT 2.0 contracts.

#### LSP7 NFT 2.0

The [LSP7] standard can be useful for NFT collections where you want all tokens to have the same [metadata](./digital-asset.md#adding-lsp4-metadata). For example a collection of digital clothing items.

[LSP7] is based on the [ERC20] token standard and can be used as an NFT 2.0 contract by setting the `isNFT` constructor value to `true` when deploying. This will set the contract [decimals](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md#decimals) value to 0 so that all tokens are indivisible.

```javascript
await lspFactory.LSP7DigitalAsset.deploy({
    isNFT: true,
    controllerAddress: '0x56fE4E7dc2bc0b6397E4609B07b4293482E3F72B',
    name: 'MYTOKEN'
    symbol: 'DEMO',
});
```

:::info
To deploy an [LSP7] NFT 2.0 smart contract, the `isNFT` parameter must be set to `true` when deploying. If `isNFT` is set to false the token decimals value will be set to 18 meaning they can be fractionalized.
:::

#### LSP8 NFT 2.0

[LSP8] can be useful for cases where all NFTs in a collection are unique and have their own [metadata](./digital-asset.md#adding-lsp4-metadata). For example an avatar collection where all tokens have a different appearance.

[LSP8] is based on the [ERC721](https://eips.ethereum.org/EIPS/eip-721) token standard used for NFT contracts. Each [LSP8] token has its own unique `tokenId` and metadata that describes its uniqueness.

```javascript
await lspFactory.LSP8IdentifiableDigitalAsset.deploy({
    controllerAddress: '0x56fE4E7dc2bc0b6397E4609B07b4293482E3F72B',
    name: 'MYTOKEN'
    symbol: 'DEMO',
});
```

## Deploying a Fungible Token

To deploy a fungible token contract use the [LSP7] standard. [LSP7] is based on the [ERC20] token standard, though is improved by allowing token contracts to have their own metadata via its [ERC725Y] key value store and [LSP4 Digital Asset Metadata](./digital-asset.md#adding-lsp4-metadata).

```javascript
await lspFactory.LSP7DigitalAsset.deploy(digitalAssetProperties [, options]);
```

```javascript
await lspFactory.LSP7DigitalAsset.deploy({
  isNFT: false,
  controllerAddress: '0x56fE4E7dc2bc0b6397E4609B07b4293482E3F72B',
  name: 'MYTOKEN',
  symbol: 'DEMO',
});
```

When deploying, set the `isNFT` value to `false`. This will set the [decimals](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-7-DigitalAsset.md#decimals) value on the token contract to 18, allowing tokens to be fractionalized.

## Digital Asset Properties

Inside the `digitalAssetProperties` object, you can set digital assset configuration options such as the [controller address](./digital-asset.md#controller-address) and [LSP4 metadata](./digital-asset.md#adding-lsp4-metadata).

[LSP7] and [LSP8] share the same constructor parameters, however LSP7 has an additional parameter `isNFT` used to set the decimals value on the contract to 0 or 18.

```javascript
await lspFactory.LSP7DigitalAsset.deploy({
    isNFT: false,
    controllerAddress: '0x56fE4E7dc2bc0b6397E4609B07b4293482E3F72B',
    name: 'MYTOKEN'
    symbol: 'DEMO',
});
```

```javascript
await lspFactory.LSP8IdentifiableDigitalAsset.deploy({
    controllerAddress: '0x56fE4E7dc2bc0b6397E4609B07b4293482E3F72B',
    name: 'MYTOKEN'
    symbol: 'DEMO',
});
```

:::info
use the `isNFT` parameter on [LSP7] to deploy an [NFT 2.0](./digital-asset.md#deploying-an-nft-20) or [token contract](./digital-asset.md#deploying-a-fungible-token).
:::

### Controller Address

Set the address which should own your digital asset contract by passing the `controllerAddress` parameter. LSPFactory will transfer the token contract to the address specified here after setting the [LSP4 metadata](./digital-asset.md#adding-lsp4-metadata) on the smart contract.

### Adding LSP4 Metadata

[LSP7] and [LSP8] both adhere to the [LSP4 Digital Asset Metadata standard](../../../standards/nft-2.0/LSP4-Digital-Asset-Metadata.md). Developers can specify the LSP4Metadata by setting the `name`, `symbol`, `digitalAssetMetadata` and `creators` keys when deploying with LSPFactory.

```javascript
await lspFactory.LSP8IdentifiableDigitalAsset.deploy({
    controllerAddress: '0x56fE4E7dc2bc0b6397E4609B07b4293482E3F72B',
    name: 'MYTOKEN'
    symbol: 'DEMO',
    creators: ['0x7Ab53a0C861fb955050A8DA109eEeA5E61fd8Aa4', '0x6c1F3Ed2F99054C88897e2f32187ef15c62dC560'],
    digitalAssetMetadata: {
      description: 'My NFT 2.0'
      ...
    }
});
```

The `name` and `symbol` keys are passed as deployment constructor parameters. These values will set the [`LSP4TokenName`](../../../standards/nft-2.0/LSP4-Digital-Asset-Metadata.md#lsp4tokenname) and [`LSP4TokenSymbol`](../../../standards/nft-2.0/LSP4-Digital-Asset-Metadata.md#lsp4tokensymbol) [ERC725Y] keys directly on the contract during deployment.

Addresses passed inside the `creators` array will be set under the [LSP4Creators[]](../../../standards/nft-2.0/LSP4-Digital-Asset-Metadata#lsp4creators) [ERC725Y] key.

:::warning
LSPFactory does not set the [LSP3IssuedAssets key](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#lsp3issuedassets) on any Universal Profile when deploying a digital asset. This key will have to be updated seperately.

:::

#### Digital Asset Metadata

Further Digital Asset metadata can be added by passing the `digitalAssetMetadata` parameter. This is metadata stored as JSON on a server and referenced from the contract by the [`LSP4Metadata`](../../../standards/nft-2.0/LSP4-Digital-Asset-Metadata.md#lsp4metadata) [ERC725Y] key.

:::info Info
Digital Asset Metadata can be passed as either a JSON object containing the [LSP4Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md) you want to upload or a URL of your previously uploaded metadata.
:::

If LSP4Metadata is passed as an object, LSPFactory will process and upload your metadata to IPFS.

:::info
See [Upload Options](././universal-profile#ipfs-upload-options) for details on how to specify a custom IPFS gateway.
:::

```javascript title="Deploying an LSP8 Digital Asset with description and links set in the LSP4Metadata JSON"
await lspFactory.LSP8IdentifiableDigitalAsset.deploy({
  digitalAssetMetadata: {
    description: "My Digital Asset",
    links: [{
      title: "LUKSO Docs",
      url: "https://docs.lukso.tech"
    }],
  },
  ...
});
```

LSP4 Metadata can also be passed with the `LSP4Metadata` key:

```javascript title="Passing LSP4Metadata key"
await lspFactory.LSP8IdentifiableDigitalAsset.deploy({
  digitalAssetMetadata: {
    LSP4Metadata: {
      description: "My Digital Asset",
      links: [{
        title: "LUKSO Docs",
        url: "https://docs.lukso.tech"
      }],
    },
  }
  ...
});
```

Alternatively `digitalAssetMetadata` can be passed as a URL where the LSP4Metadata JSON file is stored. LSPFactory will download the JSON file before hashing it and generate the [JSONURL](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#JSONURL) value to be stored on the token contract's `LSP4Metadata` [ERC725Y] key.

```javascript title='Providing a previously uploaded LSP4 metadata IPFS URL'
await lspFactory.LSP8IdentifiableDigitalAsset.deploy({
  digitalAssetMetadata: 'ipfs://QmQ7Wq4y2gWiuzB4a4Wd6UiidKNpzCJRpgzFqQwzyq6SsV',
  ...
});
```

```javascript title='Providing a previously uploaded LSP4 metadata URL'
await lspFactory.LSP8IdentifiableDigitalAsset.deploy({
  digitalAssetMetadata: 'https://mycoolserver.com/myProfile.json',
  ...
});
```

You can also provide the JSON file yourself to generate the hash value:

```javascript title='Providing a previously uploaded LSP4 metadata URL and JSON file itself'
await lspFactory.LSP8IdentifiableDigitalAsset.deploy({
  digitalAssetMetadata: {
    json: lsp3ProfileJson,
    url: 'https://mycoolserver.com/myProfile.json'
  },
  ...
});
```

Or you can provide the hash value and then uploaded file URL:

```javascript title='Providing a previously uploaded LSP4 metadata URL and hash values'
await lspFactory.LSP8IdentifiableDigitalAsset.deploy({
  digitalAssetMetadata: {
    hash: '0xfdafad027ecfe57eb4ad047b938805d1dec209d6e9f960fc320d7b9b11cbed14',
    hashFunction: 'keccak256(utf8)',
    url: 'https://mycoolserver.com/file.json'
  },
  ...
});
```

### Adding Images and Assets

Images and assets can be included in the LSP4 Metadata file by passing them to the `images` and `assets` parameters of the `digitalAssetMetadata` object.

#### Pre-uploaded Images

If you already have images and assets uploaded to IPFS, you can pass the metadata directly inside the `digitalAssetMetadata` object. This metadata will then be set in the LSP4DigitalAsset metadata JSON file and uploaded to IPFS.

Images can be passed inside the `images` parameter. This should contain an array of images related to the Digital Asset in multiple sizes. Image 0 should be the main image.

:::info
Each element in the `images` array should itself be an array where each element is the metadata of different image size.
:::

```javascript
await lspFactory.LSP8IdentifiableDigitalAsset.deploy({
  digitalAssetMetadata: {
    images: [
      [
        {
          width: 500,
          height: 500,
          hashFunction: 'keccak256(bytes)',
          hash: '0xfdafad027ecfe57eb4ad044b938805d1dec209d6e9f960fc320d7b9b11cced14',
          url: 'ipfs://QmPLqMFDxiUgYAom3Zg4SiwoxDaFcZpHXpCmiDzxrajSGp',
        }
        ... // Multiple sizes of the image should be included
      ],
      ... // Multiple images may be included
    ]
  },
  ...
});
```

An icon can also be passed for the Digital Asset. This should be multiple image sizes of the same icon image.

```javascript
await lspFactory.LSP8IdentifiableDigitalAsset.deploy({
  digitalAssetMetadata: {
    icon: [
      {
        width: 256,
        height: 256,
        hashFunction: 'keccak256(bytes)',
        hash: '0xfdafad027ecfe57eb4ad044b938805d1dec209d6e9f960fc320d7b9b11cced14',
        url: 'ipfs://QmPLqMFDxiUgYAom3Zg4SiwoxDaFcZpHXpCmiDzxrajSGp',
      }
      ... // Multiple sizes of the icon image should be included
    ]
  },
  ...
});
```

#### Pre-uploaded Assets

Previously uploaded assets can be included by passing an array of asset metadata in the `assets` parameter.

```javascript
await lspFactory.LSP8IdentifiableDigitalAsset.deploy({
  digitalAssetMetadata: {
    assets: [
        {
          hashFunction: 'keccak256(bytes)',
          hash: '0xfdafad027ecfe57eb4ad044b938805d1dec209d6e9f960fc320d7b9b11cced14',
          url: 'ipfs://QmPLqMFDxiUgYAom3Zg4SiwoxDaFcZpHXpCmiDzxrajSGp',
          fileType: 'fbx'
        }
      ...
    ]
  },
  ...
});
```

#### Passing JavaScript File Object

JavaScript offers a `File` object for easy handling of files inside a browser. Developers can pass this to the `images`, `assets` and `icon` fields to allow easy drag and drop of images from a user interface.

:::caution
JavaScript's `File` object is only available when using JavaScript in the browser. If using LSPFactory in a Node.js environment, image metadata should be passed.
:::

```javascript
<input type="file" id="asset">
<input type="file" id="image">
<input type="file" id="icon">

<script>
  const myLocalAsset = document.getElementById('asset').files[0];
  const myLocalImage = document.getElementById('image').files[0];
  const myLocalIcon = document.getElementById('icon').files[0];

  await lspFactory.LSP8IdentifiableDigitalAsset.deploy({
    digitalAssetMetadata: {
      assets: [
          myLocalAsset
        ...
      ],
      images: [
        myLocalImage
      ],
      ...
      icon: myLocalIcon
    },
    ...
  });
<script/>
```

LSPFactory will create five resized versions of any passed images, with max sizes of `1800x1800`, `1024x1024`, `640x640`, `320x320`, `180x180`, or `256x256` and `32x32` if passed as an `icon`. These resized images will be set inside the LSP4 JSON metadata uploaded to IPFS and attached to the token contract.

## Deployment Configuration

Developers can select a unique deployment configuration for their Digital Asset contract using the `options` parameter. This allows easy deployment of a specific version or implementation of a Digital Asset smart contract by passing the [`version`](./options.md#version) parameter.

Under the [version](./options.md#version) parameter developers can pass a [version number](./options.md#version), [custom bytecode](./options.md#deploying-custom-bytecode) or a [base contract address](./options.md#custom-base-contract-address) to be used during deployment. By setting the [`deployProxy`](./options.md#deploy-proxy) parameter developers can specify whether the contract should be deployed using proxy deployment.

:::info
Read more about configuring proxy deployment and contract versioning [here](../deployment/options.md).

:::

```js title="Passing LSP7DigitalAsset contract options"
await lspFactory.LSP7DigitalAsset.deploy({...}, {
    LSP7DigitalAsset: {
        version: '0x...', // Custom bytecode
        deployProxy: false
    },
})
```

```js title="Passing LSP8IdentifiableDigitalAsset contract options"
await lspFactory.LSP8IdentifiableDigitalAsset.deploy({...}, {
    LSP8IdentifiableDigitalAsset: {
        version: '0x87cd003F9Ac7d6eBcd811f7b427c7dBF6f6ba132', // Custom base contract address
        deployProxy: true
    },
})
```

### Proxy Deployment

By passing the [`deployProxy`](./options.md#deploy-proxy) parameter developers can determine whether their digital asset smart contract should be deployed as a **minimal proxy contract** based on [EIP1167](https://eips.ethereum.org/EIPS/eip-1167) or an entire contract with a constructor.

:::info
`deployProxy` defaults to `true` for both LSP7 and LSP8. If `deployProxy` is set to false, a full contract with a constructor will be deployed at the latest version.
:::

### IPFS Upload Options

You can specify how you want your profile metadata to be uploaded by passing the `ipfsGateway` inside the `options` object. Here you can set the IPFS gateway where you want the metadata to be uploaded.

:::note
The procedure takes a URL string or an object as defined by the [IPFS-HTTP Client](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client#createoptions) library which is used internally to interact with the specified IPFS node.
:::

If a URL is passed and no port is specified, the standard 5001 port will be used.

```javascript title="Passing ipfsGateway URL"
lspFactory.LSP7DigitalAsset.deploy({...}, {
  ipfsGateway: 'https://ipfs.infura.io:5001'
})
```

```javascript title="Passing ipfsGateway URL string with port set"
lspFactory.LSP7DigitalAsset.deploy({...}, {
  ipfsGateway: 'https://ipfs.infura.io' // No port set. Port 5001 will be used
})
```

```javascript
await lspFactory.LSP7DigitalAsset.deploy({...}, {
  ipfsGateway: {
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
  }
});
```

If the `ipfsGateway` parameter is provided, it will override the `ipfsGateway` object passed during the instantiation of the LSPFactory for this function call only.

### Reactive Deployment

LSPFactory emits events for each step of the deployment process. These events can be hooked into by passing the `onDeployEvents` object inside of the `options` object.

The `onDeployEvents` object takes three callback handler parameters:

- `next` will be called once for every deployment event that is fired.
- `complete` will be called once after deployment is finished with the completed contract deployment details.
- `error` will be called once if an error is thrown during deployment.

This enables LSPFactory to be used for certain reactive behaviors. For example, to give better feedback to users during deployment from a user interface such as a loading bar, or display live updates with the details and addresses of contracts as they are deployed.

:::info
The `complete` callback will be called with the same contracts object which is returned when the `deploy` function is resolved.

:::

#### LSP7 Deployment Events

```javascript title="Reactive deployment of an LSP7 Digital Asset"
const contracts = lspFactory.LSP7DigitalAsset.deploy({...}, {
  onDeployEvents: {
    next: (deploymentEvent) => {
      console.log(deploymentEvent);
    },
    error: (error) => {
      console.error(error);
    },
    complete: (contracts) => {
      console.log('Digital Asset deployment completed');
      console.log(contracts.LSP7DigitalAsset);
    },
  }
});

/**
{
  type: 'PROXY_DEPLOYMENT',
  contractName: 'LSP7DigitalAsset',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'PROXY_DEPLOYMENT',
  contractName: 'LSP7DigitalAsset',
  status: 'COMPLETE',
  contractAddress: '0x97053C386eaa49d6eAD7477220ca04EFcD857dde',
  receipt: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP7DigitalAsset',
  functionName: 'initialize(string,string,address,bool)',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP7DigitalAsset',
  functionName: 'initialize(string,string,address,bool)',
  status: 'COMPLETE',
  receipt: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP7DigitalAsset',
  functionName: 'setData(bytes32[],bytes[])',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP7DigitalAsset',
  functionName: 'setData(bytes32[],bytes[])',
  status: 'COMPLETE',
  receipt: {
    ...
  }
}
{
  type: 'TRANSACTION',
  status: 'PENDING',
  contractName: 'LSP7DigitalAsset',
  functionName: 'transferOwnership(address)',
  transaction: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP7DigitalAsset',
  functionName: 'transferOwnership(address)',
  status: 'COMPLETE',
  receipt: {
    ...
  }
}
Digital Asset deployment completed
{
  address: '0x97053C386eaa49d6eAD7477220ca04EFcD857dde',
  receipt: {
    ...
  },
}
*/
```

#### LSP8 Deployment Events

```typescript title="Reactive deployment of an LSP8 Identifiable Digital Asset"
const contracts = lspFactory.LSP8IdentifiableDigitalAsset.deploy({...}, {
  onDeployEvents: {
    next: (deploymentEvent) => {
      console.log(deploymentEvent);
    },
    error: (error) => {
      console.error(error);
    },
    complete: (contracts) => {
      console.log('Digital Asset deployment completed');
      console.log(contracts.LSP8IdentifiableDigitalAsset);
    },
  }
});

/**
{
  type: 'PROXY_DEPLOYMENT',
  contractName: 'LSP8IdentifiableDigitalAsset',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'PROXY_DEPLOYMENT',
  contractName: 'LSP8IdentifiableDigitalAsset',
  status: 'COMPLETE',
  contractAddress: '0x2cA038832c15E61b83d47414Eb53818a45e0E142',
  receipt: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP8IdentifiableDigitalAsset',
  functionName: 'initialize(string,string,address)',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP8IdentifiableDigitalAsset',
  functionName: 'initialize(string,string,address)',
  status: 'COMPLETE',
  receipt: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP8IdentifiableDigitalAsset',
  functionName: 'setData(bytes32[],bytes[])',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP8IdentifiableDigitalAsset',
  functionName: 'setData(bytes32[],bytes[])',
  status: 'COMPLETE',
  receipt: {
    ...
  }
}
{
  type: 'TRANSACTION',
  status: 'PENDING',
  contractName: 'LSP8IdentifiableDigitalAsset',
  functionName: 'transferOwnership(address)',
  transaction: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP8IdentifiableDigitalAsset',
  functionName: 'transferOwnership(address)',
  status: 'COMPLETE',
  receipt: {
    ...
  }
}
Digital Asset deployment completed
{
  address: '0x2cA038832c15E61b83d47414Eb53818a45e0E142',
  receipt: {
    ...
  },
}
*/

```

[lsp7]: ../../../standards/nft-2.0/LSP7-Digital-Asset
[lsp8]: ../../../standards/nft-2.0/LSP8-Identifiable-Digital-Asset
[erc20]: https://eips.ethereum.org/EIPS/eip-20
[erc725y]: ../../../standards/generic-standards/lsp2-json-schema.md
