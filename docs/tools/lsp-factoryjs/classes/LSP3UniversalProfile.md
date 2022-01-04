---
sidebar_position: 1.2
---
## deploy

**deploy**(`profileDeploymentOptions`, `contractDeploymentOptions?`): `Promise`<`DeployedContracts`>

Deploys a [UniversalProfile](../../../standards/universal-profile/introduction) to the blockchain and uploads LSP3 Profile data to IPFS

Asyncronous version of `deployReactive`.

### Parameters

| Name | Type |
| :------ | :------ |
| `profileDeploymentOptions` | `ProfileDeploymentOptions` |
| `contractDeploymentOptions?` | `ContractDeploymentOptions` |

### Returns

Promise with object containing deployed contract details

`Promise`<`DeployedContracts`\>

### Example
```javascript
await lspFactory.LSP3UniversalProfile.deploy({
   controllingAccounts: ['0xb74a88C43BCf691bd7A851f6603cb1868f6fc147'],
   lsp3Profile: {
      name: 'My Universal Profile',
      description: 'My cool Universal Profile',
      tags: ['Fashion', 'Design'],
      links: [{ title: 'My Website', url: 'www.my-website.com' }],
   }
});


/**
{
  ERC725Account: {
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
  UniversalReceiverDelegate: {
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
  KeyManager: {
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

___

## deployReactive

**deployReactive**(`profileDeploymentOptions`, `contractDeploymentOptions?`): `Observable`<`LSP3AccountDeploymentEvent` \| `DeploymentEventTransaction`\>

Deploys a [UniversalProfile](../../../standards/universal-profile/introduction) and uploads LSP3 Profile data to IPFS.

### Parameters

| Name | Type |
| :------ | :------ |
| `profileDeploymentOptions` | `ProfileDeploymentOptions` |
| `contractDeploymentOptions?` | `ContractDeploymentOptions` |

### Returns

[RxJS](https://rxjs.dev/) Observable which emits events as UniversalProfile contracts are deployed.

`Observable`<`LSP3AccountDeploymentEvent` \| `DeploymentEventTransaction`\>

### Example 
```javascript
await lspFactory.LSP3UniversalProfile.deployReactive({
  controllingAccounts: ["0x9Fba07e245B415cC9580BD6c890a9fd7D22e20db"],
}).subscribe({
  next: (deploymentEvent) => {
    console.log(deploymentEvent);
  },
  complete: () => {
    console.log("Deployment Complete");
  },
});

/**
{
  type: 'PROXY',
  contractName: 'ERC725Account',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'PROXY',
  contractName: 'ERC725Account',
  status: 'PENDING',
  receipt: {
    ...
  }
}
{
  type: 'PROXY',
  contractName: 'ERC725Account',
  functionName: 'initialize',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'PROXY',
  contractName: 'ERC725Account',
  functionName: 'initialize',
  status: 'COMPLETE',
  receipt: {
    ...
  }
}
{
  type: 'CONTRACT',
  status: 'PENDING',
  contractName: 'KeyManager',
  transaction: {
    ...
  }
}
{
  type: 'PROXY',
  contractName: 'UniversalReceiverDelegate',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'CONTRACT',
  contractName: 'KeyManager',
  status: 'COMPLETE',
  receipt: {
    ...
  }
}
{
  type: 'PROXY',
  contractName: 'UniversalReceiverDelegate',
  status: 'PENDING',
  receipt: {
    ...
  }
}
{
  type: 'PROXY',
  contractName: 'UniversalReceiverDelegate',
  functionName: 'initialize',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'PROXY',
  contractName: 'UniversalReceiverDelegate',
  functionName: 'initialize',
  status: 'COMPLETE',
  receipt: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'ERC725Account',
  functionName: 'setData',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'ERC725Account',
  functionName: 'setData',
  status: 'COMPLETE',
  receipt: {
    ...
  }
}
{
  type: 'TRANSACTION',
  status: 'PENDING',
  contractName: 'ERC725Account',
  functionName: 'transferOwnership',
  transaction: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'ERC725Account',
  functionName: 'transferOwnership',
  status: 'COMPLETE',
  receipt: {
    ...
  }
}
Deployment Complete
*/
```
___

## deployBaseContracts

**deployBaseContracts**(): `Promise`<`DeployedContracts`\>

Deploys [UniversalProfile](../../../standards/universal-profile/introduction) base contracts.
### Returns

Promise with object containing base contract details.

`Promise`<`DeployedContracts`\>

### Example

```javascript
await lspFactory.LSP3UniversalProfile.deployBaseContracts();

/**
{
  UniversalReceiverDelegate: {
    address: '0xd87F7B3B115dd23e8226d8394996Ba4341D602dB',
    receipt: {
      to: null,
      from: '0x9Fba07e245B415cC9580BD6c890a9fd7D22e20db',
      contractAddress: '0xd87F7B3B115dd23e8226d8394996Ba4341D602dB',
      transactionIndex: 1,
      gasUsed: [BigNumber],
      logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      blockHash: '0x80b0811c3d57039ca6626a195ea3610de05b13ca0d639e9eed25dda984bd82b3',
      transactionHash: '0xadbbd68ff72846c5331475ce8b1f114a8f418e7ab0922bc3b76fed0b966f7c81',
      logs: [],
      blockNumber: 12028282,
      confirmations: 1,
      cumulativeGasUsed: [BigNumber],
      status: 1,
      type: 0,
      byzantium: true,
      events: []
    }
  },
  ERC725Account: {
    address: '0xA59C5b8Dd18063C977d8B060FC689dd637142DCf',
    receipt: {
      to: null,
      from: '0x9Fba07e245B415cC9580BD6c890a9fd7D22e20db',
      contractAddress: '0xA59C5b8Dd18063C977d8B060FC689dd637142DCf',
      transactionIndex: 0,
      gasUsed: [BigNumber],
      logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      blockHash: '0x80b0811c3d57039ca6626a195ea3610de05b13ca0d639e9eed25dda984bd82b3',
      transactionHash: '0xc1b6b6b71e051ed43d25c5237d873bae11149f49dc926c55cd2741279c16833a',
      logs: [],
      blockNumber: 12028282,
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

___

## getDeployedByteCode

**getDeployedByteCode**(`contractAddress`): `Promise`<`string`\>

Fetches bytecode deployed at provided contract address.

### Parameters

| Name | Type |
| :------ | :------ |
| `contractAddress` | `string` |

### Returns

Bytecode deployed at provided contract address

`Promise`<`string`\>

### Example

```javascript
await lspFactory.LSP3UniversalProfile.getDeployedByteCode(
  "0xd92C7cA9c493aFC0DF51cE480ec7bB7DC8394549"
);

// 0x363d3d373d3d3d363d736533158b042775e2fdfef3ca1a782efdbb8eb9b15af43d82803e903d91602b57fd5bf3
```

___

## uploadProfileData

`Static` **uploadProfileData**(`profileData`, `uploadOptions?`): `Promise`<`LSP3ProfileDataForEncoding`\>

Uploads the [LSP3Profile](../../../standards/universal-profile/lsp3-universal-profile) data to the desired endpoint. This can be an `https` URL either pointing to
a public, centralized storage endpoint or an IPFS Node / Cluster.

Will upload and process passed images.

### Parameters

| Name | Type |
| :------ | :------ |
| `profileData` | `ProfileDataBeforeUpload` |
| `uploadOptions?` | `ProfileUploadOptions` |

### Returns

Processed [LSP3](../../../standards/universal-profile/lsp3-universal-profile) Data and upload url.

`Promise`<`LSP3ProfileDataForEncoding`\>

### Example
```javascript
await LSP3UniversalProfile.uploadProfileData({
  name: "My Universal Profile",
  description: "My cool Universal Profile",
  tags: ["Fashion", "Design"],
  links: [{ title: "My Website", url: "www.my-website.com" }],
  profileImage: [
    {
      width: 500,
      height: 500,
      hashFunction: 'keccak256(bytes)',
      hash: '0xfdafad027ecfe57eb4ad047b938805d1dec209d6e9f960fc320d7b9b11cbed14',
      url: 'ipfs://QmPLqMFHxiUgYAom3Zg4SiwoxDaFcZpHXpCmiDzxrtjSGp',
    },
  ],
  backgroundImage: [
    {
      width: 500,
      height: 500,
      hashFunction: 'keccak256(bytes)',
      hash: '0xfdafad027ecfe57eb4ad047b938805d1dec209d6e9f960fc320d7b9b11cbed14',
      url: 'ipfs://QmPLqMFHxiUgYAom3Zg4SiwoxDaFcZpHXpCmiDzxrtjSGp',
    },
  ],
})

/**
{
  profile: {
    LSP3Profile: {
      name: 'My Universal Profile',
      description: 'My cool Universal Profile',
      tags: [Array],
      links: [Array],
      profileImage: [Array],
      backgroundImage: [Array]
    }
  },
  url: 'ipfs://QmS7NCnoXub7ju13HZuDzJpWqWq15Nev4CC18821qBNbkx'
}
*/
```