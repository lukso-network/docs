---
sidebar_position: 1
title: UniversalProfile
---

# UniversalProfile

## deploy

```javascript
lspFactory.UniversalProfile.deploy(profileProperties [, options]);
```

Deploys and **configures** a [Universal Profile](../../../standards/universal-profile/introduction) to the blockchain. It will deploy the following contracts:

- [LSP0 ERC725 Account](../../../standards/universal-profile/lsp0-erc725account)
- [LSP6 Key Manager](../../../standards/universal-profile/lsp6-key-manager)

After, it will:

- upload metadata to IPFS and set the [LSP3 Universal Profile](../../../standards/universal-profile/lsp3-universal-profile-metadata) metadata,
- attach the Universal Receiver Delegate to the ERC725 Account contract,
- set the Key Manager as the owner of the LSP0 ERC725 Account, and
- set all [LSP6 Permissions](../../../standards/universal-profile/lsp6-key-manager#-types-of-permissions) to the `controllerAddresses` except `DELEGATECALL`.

By default the [LSP1 Universal Receiver Delegate](../../../standards/generic-standards/lsp1-universal-receiver-delegate) contract that is specified in the [versions file](https://github.com/lukso-network/tools-lsp-factory/blob/main/src/versions.json) will be attached to the Universal Profile. A custom Universal Receiver Delegate can be optionally deployed, by passing custom bytecode to the [`options`](../deployment/universal-profile#deployment-configuration) object.

:::caution
The deployment key passed to LSPFactory will be given `CHANGEOWNER` and `CHANGEPERMISSIONS` [LSP6 permissions](../../../standards/universal-profile/lsp6-key-manager#-types-of-permissions) in order to carry out the Universal Profile deployment.

These permisisons are revoked as the final step of deployment. It is important this step is completed correctly to avoid security risks.

:::

:::info
Read more about configuring Universal Profile smart contracts deployment [here](../deployment/universal-profile#deployment-configuration).

:::

### Parameters

#### 1. `profileProperties` - Object

Object containing profile properties set during Universal Profile deployment.

| Name                                                                             | Type             | Description                                                                                                                                                                                              |
| :------------------------------------------------------------------------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`controllerAddresses`](../deployment/universal-profile#controller-addresses)    | Array            | A list of public addresses which will have all [LSP6 permissions](../../../standards/smart-contracts/lsp6-key-manager.md) except `DELEGATECALL` set on the Universal Profile contract during deployment. |
| [`lsp3Profile`](../deployment/universal-profile#adding-lsp3-metadata) (optional) | String \| Object | [LSP3 Profile metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md) which will be uploaded and set during deployment.                                       |

#### 2. `options` - Object (optional)

Object which specifies how the [UniversalProfile](../../../standards/universal-profile/lsp0-erc725account.md), [KeyManager](../../../standards/universal-profile/lsp6-key-manager.md) and [UniversalReceiverDelegate](../../../standards/generic-standards/lsp1-universal-receiver-delegate.md) smart contracts will be deployed.

| Name                                                                               | Type             | Description                                                                                                                                                                                                   |
| :--------------------------------------------------------------------------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`LSP0ERC725Account`](../deployment/options.md) (optional)                         | Object           | Generic contract configuration object. Takes [`version`](../deployment/options.md#version) and [`deployProxy`](../deployment/options.md#deploy-proxy) parameters.                                             |
| [`ERC725Account`](../deployment/options.md) (optional)                             | Object           | Generic contract configuration object. Can be used instead of `LSP0ERC725Account`. Takes [`version`](../deployment/options.md#version) and [`deployProxy`](../deployment/options.md#deploy-proxy) parameters. |
| [`LSP6Keymanager`](../deployment/options.md) (optional)                            | Object           | Generic contract configuration object. Takes [`version`](../deployment/options.md#version) and [`deployProxy`](../deployment/options.md#deploy-proxy) parameters.                                             |
| [`LSP1UniversalReceiverDelegate`](../deployment/options.md) (optional)             | Object           | Generic contract configuration object. Takes [`version`](../deployment/options.md#version) and [`deployProxy`](../deployment/options.md#deploy-proxy) parameters.                                             |
| [`version`](../deployment/universal-profile#contract-versions) (optional)          | String           | Sets the global contract version. All contracts will be deployed with this version if set.                                                                                                                    |
| [`onDeployEvents`](../deployment/universal-profile#reactive-deployment) (optional) | Object           | Pass `next`, `complete` and `error` callback handlers to be executed as deployment events are fired. See [`Reactive Deployment`](../deployment/universal-profile#reactive-deployment)                         |
| [`ipfsGateway`](../deployment/universal-profile#ipfs-upload-options) (optional)    | String \| Object | IPFS gateway url or an object containing IPFS gateway options.                                                                                                                                                |

:::info Contract Deployment Details
See the [configuration specification](../deployment/universal-profile#deployment-configuration) for more information about the `options` property.
:::

### Returns

| Type      | Description                                                 |
| :-------- | :---------------------------------------------------------- |
| `Promise` | Resolves to an object containing deployed contract details. |

### Example

```javascript title="Deploying a Universal Profile"
await lspFactory.UniversalProfile.deploy({
  controllerAddresses: ['0xb74a88C43BCf691bd7A851f6603cb1868f6fc147'],
  lsp3Profile: {
    name: 'My Universal Profile',
    description: 'My cool Universal Profile',
    tags: ['Fashion', 'Design'],
    links: [{ title: 'My Website', url: 'https://www.my-website.com' }],
  },
});

/**
{
  LSP0ERC725Account: {
    address: '0xaEc61B848954e4d69B1283810df8A7fB9bA23BF2',
    receipt: {
      to: null,
      from: '0x9Fba07e245B415cC9580BD6c890a9fd7D22e20db',
      contractAddress: '0xaEc61B848954e4d69B1283810df8A7fB9bA23BF2',
      transactionIndex: 0,
      gasUsed: [BigNumber],
      logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      blockHash: '0x48950fa6dfae12c7c6f172820bb0a7976da1c97ea541d2966bd2a9f39f3eb952',
      transactionHash: '0xfb5d45fda891c47efa1a14748939d51bed58a9406c6ff685e0fdc8655a880d6e',
      logs: [],
      blockNumber: 12028255,
      confirmations: 1,
      cumulativeGasUsed: [BigNumber],
      status: 1,
      type: 0,
      byzantium: true,
      events: []
    }
  },
  LSP1UniversalReceiverDelegate: {
    address: '0xd92C7cA9c493aFC0DF51cE480ec7bB7DC8394549',
    receipt: {
      to: null,
      from: '0x9Fba07e245B415cC9580BD6c890a9fd7D22e20db',
      contractAddress: '0xd92C7cA9c493aFC0DF51cE480ec7bB7DC8394549',
      transactionIndex: 0,
      gasUsed: [BigNumber],
      logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      blockHash: '0x8b793e53ffe5ad6853cc06f0ca8879f8b0f0c32f69791e96d657d7fde8313d35',
      transactionHash: '0x12e38b93709116da42e0c69af65f6096fa7b380ccb02ced4e3e431297c05e704',
      logs: [],
      blockNumber: 12028257,
      confirmations: 1,
      cumulativeGasUsed: [BigNumber],
      status: 1,
      type: 0,
      byzantium: true,
      events: []
    }
  },
  LSP6KeyManager: {
    address: '0xdbD3297B9bD80cA20cA75a644b1Fa903B05A2Fc3',
    receipt: {
      to: null,
      from: '0x9Fba07e245B415cC9580BD6c890a9fd7D22e20db',
      contractAddress: '0xdbD3297B9bD80cA20cA75a644b1Fa903B05A2Fc3',
      transactionIndex: 1,
      gasUsed: [BigNumber],
      logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      blockHash: '0x8b793e53ffe5ad6853cc06f0ca8879f8b0f0c32f69791e96d657d7fde8313d35',
      transactionHash: '0x1183a1c9a64b88bb8e7da67805125d5b8e63c7dc8fab11dce350ee0c0995060b',
      logs: [],
      blockNumber: 12028257,
      confirmations: 1,
      cumulativeGasUsed: [BigNumber],
      status: 1,
      type: 0,
      byzantium: true,
      events: []
    }
  }
}
*/
```

#### Reactive Universal Profile Deployment Example

```javascript title="Reactive Universal Profile Deployment"
await lspFactory.UniversalProfile.deploy(
  {
    controllerAddresses: ['0x9Fba07e245B415cC9580BD6c890a9fd7D22e20db'],
  },
  {
    onDeployEvents: {
      next: (deploymentEvent) => {
        console.log(deploymentEvent);
      },
      error: (error) => {
        console.error(error);
      },
      complete: (contracts) => {
        console.log('Deployment Complete');
        console.log(contracts);
      },
    },
  }
);

/**
{
  type: 'PROXY_DEPLOYMENT',
  contractName: 'LSP0ERC725Account',
  status: 'PENDING',
  transaction: {
    ...
  }
},
{
  type: 'PROXY_DEPLOYMENT',
  contractName: 'LSP0ERC725Account',
  status: 'COMPLETE',
  contractAddress: '0x805761959e7B94090fedD51776C63AB474a76A95',
  receipt: {
   ...
  }
},
{
  type: 'TRANSACTION',
  contractName: 'LSP0ERC725Account',
  functionName: 'initialize(address)',
  status: 'PENDING',
  transaction: {
   ...
  }
},
{
  type: 'TRANSACTION',
  contractName: 'LSP0ERC725Account',
  functionName: 'initialize(address)',
  status: 'COMPLETE',
  receipt: {
   ...
  }
}
{
  type: 'PROXY_DEPLOYMENT',
  contractName: 'LSP6KeyManager',
  status: 'PENDING',
  transaction: {
    ...
  }
},
{
  type: 'PROXY_DEPLOYMENT',
  contractName: 'LSP6KeyManager',
  status: 'COMPLETE',
  contractAddress: '0x04952ED68B5386Ff0a9891A10E2B1F204f98e209',
  receipt: {
    ...
  }
},
{
  type: 'TRANSACTION',
  contractName: 'LSP6KeyManager',
  functionName: 'initialize(address)',
  status: 'PENDING',
  transaction: {
    ...
  }
},
{
  type: 'TRANSACTION',
  contractName: 'LSP6KeyManager',
  functionName: 'initialize(address)',
  status: 'COMPLETE',
  receipt: {
    ...
  }
},
{
  type: 'TRANSACTION',
  contractName: 'LSP0ERC725Account',
  functionName: 'setData(bytes32[],bytes[])',
  status: 'PENDING',
  transaction: {
   ...
  }
},
{
  type: 'TRANSACTION',
  contractName: 'LSP0ERC725Account',
  functionName: 'setData(bytes32[],bytes[])',
  status: 'COMPLETE',
  receipt: {
   ...
  }
},
{
  type: 'TRANSACTION',
  status: 'PENDING',
  contractName: 'LSP0ERC725Account',
  functionName: 'transferOwnership(address)',
  transaction: {
    ...
  }
},
{
  type: 'TRANSACTION',
  contractName: 'LSP0ERC725Account',
  functionName: 'transferOwnership(address)',
  status: 'COMPLETE',
  receipt: {
    ...
  }
},
Deployment Complete
{
  LSP0ERC725Account: {
    address: '0x805761959e7B94090fedD51776C63AB474a76A95',
    receipt: {
     ...
    },
  },
  LSP6KeyManager: {
    address: '0x04952ED68B5386Ff0a9891A10E2B1F204f98e209',
    receipt: {
      ...
    },
  }
}
*/
```

---

## uploadProfileData

```javascript
lspFactory.UniversalProfile.uploadProfileData(profileData [, options]);
```

Processes and uploads the [LSP3Profile Metadata](../../../standards/universal-profile/lsp3-universal-profile-metadata) to IPFS. The IPFS gateway can be set inside the `options` object.

Will resize and upload passed images.

Available as a static or non-static method callable on the LSPFactory library instance.

### Parameters

#### 1. `profileData` - Object

Object containing the [LSP3 Metadata](../../../standards/universal-profile/lsp3-universal-profile-metadata) fields which will be processed and uploaded to IPFS.

:::info
[Read more about how LSP3 Metadata is processed here](../deployment/universal-profile#uploading-lsp3-metadata-to-ipfs).

:::

| Name              | Type          | Description                                                                                                            |
| :---------------- | :------------ | :--------------------------------------------------------------------------------------------------------------------- |
| `name`            | String        | The name of the Universal Profile                                                                                      |
| `description`     | String        | The description of the Universal Profile                                                                               |
| `profileImage`    | File \| Array | Javascript File object or an array of image metadata for different sizes of the same image                             |
| `backgroundImage` | File \| Array | Javascript File object or an Array of image metadata for different sizes of the same image                             |
| `links`           | Array         | An Array of Objects containing `title` and `url` parameters.                                                           |
| `tags`            | Object        | An object containing the profile data to upload.                                                                       |
| `avatar`          | Array         | Array of different file formats of the same avatar asset passed as Javascript File object or an asset metadata object. |

OR

| Name          | Type   | Description                                                                                                              |
| :------------ | :----- | :----------------------------------------------------------------------------------------------------------------------- |
| `LSP3Profile` | Object | Object containing `name`, `description`, `profileImage`, `backgroundImage`, `links`, `tags`, `avatar` as described above |

#### 2. `options` - Object (optional)

Object containing configuration details of how the metadata should be uploaded.

| Name                                                                            | Type             | Description                                                                                                 |
| :------------------------------------------------------------------------------ | :--------------- | :---------------------------------------------------------------------------------------------------------- |
| [`ipfsGateway`](../deployment/universal-profile#ipfs-upload-options) (optional) | String \| Object | ipfsGateway URL string or IPFS Client Options as defined by the [ipfs-http-client library] used internally. |

### Returns

| Type    | Description                                                                |
| :------ | :------------------------------------------------------------------------- |
| Promise | Resolves to an object containing the processed [LSP3] data and upload URL. |

### Examples

```javascript title="Uploading profile data"

const myLocalImage = new File();
const myLocalAvatar = new File();

<script>
  await UniversalProfile.uploadProfileData({
    name: 'My Universal Profile',
    description: 'My cool Universal Profile',
    tags: ['Fashion', 'Design'],
    links: [{ title: 'My Website', url: 'https://www.my-website.com' }],
    profileImage: myLocalImage,
    backgroundImage: myLocalImage,
    avatar: [myLocalAvatar],
  });
<script/>

/**
{
  json: {
    LSP3Profile: {
      name: 'My Universal Profile',
      description: 'My cool Universal Profile',
      tags: ['Fashion', 'Design'],
      links: [{ title: 'My Website', url: 'https://www.my-website.com' }],
      profileImage: [
        {
          "width": 1800,
          "height": 1800,
          "hashFunction": "keccak256(bytes)",
          "hash": "0x5c6125b5a553337b5ad55610c47114bf58d33c7a21aef14b0ed4c214203c9ca7",
          "url": "ipfs://QmPCQwamReJshNiqSSzf4zMVffNiDx44ykTf1zY95vG6rv"
        },
        {
          "width": 1024,
          "height": 1024,
          "hashFunction": "keccak256(bytes)",
          "hash": "0xc4d1d37a8545012be38a8f33f9a53daceab955a17310bcfffe00f34811506938",
          "url": "ipfs://Qme8tedX78TaxVwtvacJyS7bcSwe69F4aNnknUzL3gYdFY"
        },
        {
          "width": 640,
          "height": 640,
          "hashFunction": "keccak256(bytes)",
          "hash": "0xa63ebb82e8c428c9a02f1c0a040199748844dccf62e75fcd85454bce4acd4afd",
          "url": "ipfs://QmdQRdeeGGmWCPs1iCtxiNzHMZemFpvcsdvweCdnufHdqr"
        },
        {
          "width": 320,
          "height": 320,
          "hashFunction": "keccak256(bytes)",
          "hash": "0x2ab638bb61f4cb686c3ca5ca09285e4507ad2328c0b5f6e10378425ed7c75cd9",
          "url": "ipfs://QmfYYafv6ucuKSm3EbcJxho9Cr2g5Pa3yhv7TaANbP8jbg"
        },
        {
          "width": 180,
          "height": 180,
          "hashFunction": "keccak256(bytes)",
          "hash": "0xefb0b36b3bba2338c18b2b55a0cbc52f04eda03e9b58ca8d04a92fc9b1387853",
          "url": "ipfs://QmU5XJfL1V5tBLfm7xYMGYEi7VLiwDCfsCc8KswRgXNQSr"
        }
      ],
      backgroundImage: [
        {
          "width": 1800,
          "height": 1800,
          "hashFunction": "keccak256(bytes)",
          "hash": "0x5c6125b5a553337b5ad55610c47114bf58d33c7a21aef14b0ed4c214203c9ca7",
          "url": "ipfs://QmPCQwamReJshNiqSSzf4zMVffNiDx44ykTf1zY95vG6rv"
        },
        {
          "width": 1024,
          "height": 1024,
          "hashFunction": "keccak256(bytes)",
          "hash": "0xc4d1d37a8545012be38a8f33f9a53daceab955a17310bcfffe00f34811506938",
          "url": "ipfs://Qme8tedX78TaxVwtvacJyS7bcSwe69F4aNnknUzL3gYdFY"
        },
        {
          "width": 640,
          "height": 640,
          "hashFunction": "keccak256(bytes)",
          "hash": "0xa63ebb82e8c428c9a02f1c0a040199748844dccf62e75fcd85454bce4acd4afd",
          "url": "ipfs://QmdQRdeeGGmWCPs1iCtxiNzHMZemFpvcsdvweCdnufHdqr"
        },
        {
          "width": 320,
          "height": 320,
          "hashFunction": "keccak256(bytes)",
          "hash": "0x2ab638bb61f4cb686c3ca5ca09285e4507ad2328c0b5f6e10378425ed7c75cd9",
          "url": "ipfs://QmfYYafv6ucuKSm3EbcJxho9Cr2g5Pa3yhv7TaANbP8jbg"
        },
        {
          "width": 180,
          "height": 180,
          "hashFunction": "keccak256(bytes)",
          "hash": "0xefb0b36b3bba2338c18b2b55a0cbc52f04eda03e9b58ca8d04a92fc9b1387853",
          "url": "ipfs://QmU5XJfL1V5tBLfm7xYMGYEi7VLiwDCfsCc8KswRgXNQSr"
        }
      ],
      avatar: [
        {
          "hashFunction": "keccak256(bytes)",
          "hash": "0x5f3dbd89cde4dde36241c501203b67a93b89908063f5516535136bc25f712e11",
          "url": "ipfs://QmWkAki4mLq2cshpbKs4HFCaZdpUX1jLKKfb5y8YMATkwk",
          "fileType": "image/jpeg"
        }
      ]
    }
  },
  url: 'ipfs://QmS7NCnoXub7ju13HZuDzJpWqWq15Nev4CC18821qBNbkx'
}
*/
```

```javascript title="Uploading profile data"
await UniversalProfile.uploadProfileData({
  LSP3Profile: {
    name: 'My Universal Profile',
    description: 'My cool Universal Profile',
    tags: ['Fashion', 'Design'],
    links: [{ title: 'My Website', url: 'https://www.my-website.com' }],
  },
});

/**
{
  json: {
    LSP3Profile: {
      name: 'My Universal Profile',
      description: 'My cool Universal Profile',
      tags: ['Fashion', 'Design'],
      links: [{ title: 'My Website', url: 'https://www.my-website.com' }],
    }
  },
  url: 'ipfs://QmS7NCnoXub7ju13HZuDzJpWqWq15Nev4CC18821qBNbkx'
}
*/
```

```javascript title="Uploading profile data using a custom IPFS gateway"
await UniversalProfile.uploadProfileData(
  {
    name: 'My Universal Profile',
    description: 'My cool Universal Profile',
    tags: ['Fashion', 'Design'],
    links: [{ title: 'My Website', url: 'https://www.my-website.com' }],
  },
  {
    ipfsGateway: 'https://ipfs.infura.io',
  }
);

/**
{
  json: {
    LSP3Profile: {
      name: 'My Universal Profile',
      description: 'My cool Universal Profile',
      tags: ['Fashion', 'Design'],
      links: [{ title: 'My Website', url: 'https://www.my-website.com' }],
    }
  },
  url: 'ipfs://QmS7NCnoXub7ju13HZuDzJpWqWq15Nev4CC18821qBNbkx'
}
*/
```

```javascript title="Uploading profile data using a custom IPFS options"
await UniversalProfile.uploadProfileData(
  {
    name: 'My Universal Profile',
    description: 'My cool Universal Profile',
    tags: ['Fashion', 'Design'],
    links: [{ title: 'My Website', url: 'https://www.my-website.com' }],
  },
  {
    ipfsGateway: {
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
    },
  }
);

/**
{
  json: {
    LSP3Profile: {
      name: 'My Universal Profile',
      description: 'My cool Universal Profile',
      tags: ['Fashion', 'Design'],
      links: [{ title: 'My Website', url: 'https://www.my-website.com' }],,
    }
  },
  url: 'ipfs://QmS7NCnoXub7ju13HZuDzJpWqWq15Nev4CC18821qBNbkx'
}
*/
```

[all permissions]: ../../../../../standards/universal-profile/lsp6-key-manager#-address-permissions
[lsp3]: ../../../standards/universal-profile/lsp3-universal-profile-metadata
