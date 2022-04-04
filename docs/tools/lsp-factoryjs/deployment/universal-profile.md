---
sidebar_position: 1.1
title: Universal Profile
---

# Deploying a Universal Profile

LSPFactory allows you to easy deploy and configure a Universal Profile consisting of a [LSP0 ERC725 Account](../../../standards/universal-profile/lsp0-erc725account), - [LSP6 Key Manager](../../../standards/universal-profile/lsp6-key-manager) and - [LSP1-UniversalReceiver](../../../standards/generic-standards/02-lsp1-universal-receiver.md) smart contract:

```javascript
await lspFactory.UniversalProfile.deploy(profileProperties [, options]);
```

This will deploy the following contracts:

- [LSP0 ERC725 Account](../../../standards/universal-profile/lsp0-erc725account)
- [LSP6 Key Manager](../../../standards/universal-profile/lsp6-key-manager)
- And link to a pre-deployed [LSP1-UniversalReceiver](../../../standards/generic-standards/02-lsp1-universal-receiver.md)

Then, it will:

- upload metadata to IPFS and set the [LSP3 Universal Profile](../../../standards/universal-profile/lsp3-universal-profile-metadata) metadata.
- attach the Universal Receiver Delegate to the ERC725 Account.
- set the Key Manager as the owner of the ERC725 Account.
- sets all [permissions](../../../standards/universal-profile/lsp6-key-manager#-types-of-permissions) for the `controllerAddresses` except `DELEGATECALL`.

These smart contracts linked with some [LSP3 Universal Profile Metadata](../../../standards/universal-profile/lsp3-universal-profile-metadata) forms a Universal Profile. The metadata is the 'face' of your profile and contains information such as your name, description and profile image.

## Profile Options

Inside the `profileProperties` object you can set profile configuration options such as controller addresses and LSP3 metadata.

### Controller Addresses

By passing `controllerAddresses` you can set the addresses which should be able to control your Universal Profile initially. Addresses passed here will be given all LSP6 KeyManager permissions except `DELEGATECALL` to prevent accidental misuse [prevent accidental misuse](https://solidity-by-example.org/hacks/delegatecall/). If your controller keys require `DELEGATECALL`, you can [change the permission after deployment](../../../guides/key-manager/01-give-permissions.md).

`controllerAddresses` can be addresses of externally owned accounts (EOAs) or another smart contract that can call the `execute(calldata)` function on the KeyManager.

```javascript
await lspFactory.UniversalProfile.deploy({
  controllerAddresses: [
    '0x7Ab53a0C861fb955050A8DA109eEeA5E61fd8Aa4',
    '0x56fE4E7dc2bc0b6397E4609B07b4293482E3F72B',
  ]
})
```

### Adding LSP3 Metadata

When deploying a Universal Profile with LSPFactory you can specify your Universal Profile metadata using the `lsp3Profile` key in the `profileProperties` object:

```javascript
await lspFactory.UniversalProfile.deploy({
  controllerAddresses: ['0x...'],
  lsp3Profile: myUniversalProfileData,
});
```

:::info Info
Profile Metadata can be passed as either a JSON object containing the [LSP3Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#lsp3profile) you want to upload, or an IPFS url of your previously uploaded metadata.
:::

If an LSP3MetaData object is passed, LSPFactory will process and upload your metadata to IPFS. See [Upload Options](././universal-profile#ipfs-upload-options) for details on how to specify a custom IPFS gateway.

```javascript title='Uploading an LSP3 metadata automatically'
await lspFactory.UniversalProfile.deploy({
    controllerAddresses: ['0x...'],
    lsp3Profile: {
      name: 'My-Cool-Profile',
      description: 'My cool Universal Profile',
      tags: ['public-profile'],
      links: [{
        title: 'My Website',
        url: 'www.my-website.com'
      }],
      ...
    }
  });
};
```
The following two will download the JSON file before, to hash it and generate the proper [JSONURL value](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#JSONURL).
```javascript title='Providing an already uploaded LSP3 metadata IPFS url'
await lspFactory.UniversalProfile.deploy({
    controllerAddresses: ['0x...'],
    lsp3Profile: 'ipfs://QmQ7Wq4y2gWiuzB4a4Wd6UiidKNpzCJRpgzFqQwzyq6SsV'
  });
};
```

```javascript title='Providing an already uploaded LSP3 metadata  url'
await lspFactory.UniversalProfile.deploy({
    controllerAddresses: ['0x...'],
    lsp3Profile: 'https://mycoolserver.com/myProfile.json'
  });
};
```

You can also provide the JSON file yourself to generate the hash value:
```javascript title='Providing an already uploaded LSP3 metadata  url and JSON file itself'
await lspFactory.UniversalProfile.deploy({
    controllerAddresses: ['0x...'],
    lsp3Profile: {
      json: lsp3ProfileJson,
      urlf: 'https://mycoolserver.com/myProfile.json'
    }
  });
};
```

Or provide the hash value and then uploaded file  URL:
```javascript title='Providing an already uploaded LSP3 metadata  url and hash values'
await lspFactory.UniversalProfile.deploy({
    controllerAddresses: ['0x...'],
    lsp3Profile: {
      hash: '0xfdafad027ecfe57eb4ad047b938805d1dec209d6e9f960fc320d7b9b11cbed14',
      hashFunction: 'keccak256(utf8)',
      url: 'https://mycoolserver.com/file.json'
    }
  });
};
```

### Setting Images in LSP3MetaData

`profileImage` and `backgroundImage` can be passed inside the `lsp3Profile` object . These can be passed as an object containing previously uploaded image Metadata, a Javascript `File` object if being used client-side or `ImageBuffer` if the library is being used in a Node environment.

#### Pre-uploaded Images

An LSP3 Profile requires `profileImage` and `backgroundImage` to be uploaded in multiple sizes so that interfaces can choose which one to load for better loading performance.

If you already have an image uploaded to IPFS in multiple sizes, you can pass image metadata inside the `lsp3Profile` object when deploying a Profile.

Both `profileImage` and `backgroundImage` take an Array, where each element is the metadata of a different image size.

```javascript title='Setting LSP3 metadata to be uploaded with profile and background images'
const myUniversalProfileData = {
  name: 'My Universal Profile',
  description: 'My cool Universal Profile',
  profileImage: [
    {
      width: 500,
      height: 500,
      hashFunction: 'keccak256(bytes)',
      hash: '0xfdafad027ecfe57eb4ad044b938805d1dec209d6e9f960fc320d7b9b11cced14', // bytes32 hex string of the image hash
      url: 'ipfs://QmPLqMFDxiUgYAom3Zg4SiwoxDaFcZpHXpCmiDzxrajSGp',
    },
    ... // Multiple image sizes should be included
  ],
  backgroundImage: [
    {
      width: 500,
      height: 500,
      hashFunction: 'keccak256(bytes)',
      hash: '0xfdafad027ecfe57eb4ad047b938805d1dec209d6e9f960fc320d7b9b11cbed14', // bytes32 hex string of the image hash
      url: 'ipfs://QmPLqMFHxiUDYAom3Zg4SiwoxDaFcZpHXpAmiDzxrtjSGp',
    },
    ... // Multiple image sizes should be included
  ],
};

await lspFactory.UniversalProfile.deploy({
    controllingAccounts: ['0x...'],
    lsp3Profile: myUniversalProfileData
  });
};
```

#### Using Javascript File object

Javascript offers a `File` object for easy handling of files inside a browser. These can be passed to `profileImage` and `backgroundImage` fields to allow easy drag and drop of images from a user interface.

:::caution
Javascript's `File` object is only available when using javascript in the browser. If using LSPFactory in a Node environment Images should be uploaded as an [ImageBuffer](./universal-profile#using-image-buffer)
:::

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
        links: [{
          title: "My Website",
          url: "www.my-website.com"
        }],
    };

    await lspFactory.UniversalProfile.deploy({
      controllingAccounts: ['0x...'],
      lsp3Profile: myUniversalProfileData
    });
};
<script/>
```

LSPFactory will create 5 resized versions of the passed image, with max sizes of `1800x1800`, `1024x1024`, `640x640`, `320x320`, `180x180`. These resized images will be set inside the LSP3 metadata and attached to the `ERC725Account`.

#### Using Image Buffers

If using LSPFactory in a Node environment where Javascript `File` object is not available, `profileImage` and `backgroundImage` can be uploaded by passing a File Buffer directly.

The image mimetype must also be passed so that the image can be reconstructed and resized. Supported mimetypes can be easily accessed by using the `SupportedImageBufferFormats` enum exported by LSPFactory. Supported mime types are `image/png`, `image/bmp`, `image/jpeg` and `image/gif`.

```javascript
const profileImageBuffer = fs.readFileSync('./my-profile-image.png');
const backgroundImageBuffer = fs.readFileSync('./my-background-image.png');

const myUniversalProfileData = {
  name: 'My Universal Profile',
  description: 'My cool Universal Profile',
  profileImage: {
    buffer: profileImageBuffer,
    mimeType: SupportedImageBufferFormats.png,
  },
  backgroundImage: {
    buffer: backgroundImageBuffer,
    mimeType: SupportedImageBufferFormats.png,
  },
};

await lspFactory.UniversalProfile.deploy({
  controllingAccounts: ['0x...'],
  lsp3Profile: myUniversalProfileData,
});
```

### Uploading LSP3 metadata to IPFS

You can upload your LSP3 metadata before deploying a Universal Profile by using the `uploadMetaData()` method. This uses the same [`lsp3Profile` object schema](./universal-profile#adding-lsp3-metadata) defined above when deploying a Universal Profile.

Returns an object containing the IPFS upload location of your metadata, and your lsp3metdata as a javascript object.

```javascript
await myLSPFactory.UniversalProfile.uploadMetaData(lsp3Profile [, options]);
```

To upload using a custom IPFS gateway pass the `options` object. This is the same `options` object used when deploying a Universal Profile. [Read more](./universal-profile#ipfs-upload-options).

`uploadMetaData()` is available as both a static or non-static method so can be called without instantiating an LSPFactory object.

```javascript title="calling uploadMetaData on an LSPFactory instance"
await myLSPFactory.UniversalProfile.uploadMetaData(myLSP3MetaData);

> {
  hash: '0x1234...',
  hashFunction: 'keccak256(utf8)',
  url: 'https://ipfs.lukso.network/ipfs/QmPzUfdKhY6vfcLNDnitwKanpm5GqjYSmw9todNVmi4bqy',
  json: {
    LSP3Profile: {
      name: "My Universal Profile",
      description: "My Cool Universal Profile",
      ...
    }
  }
}
```

```javascript title="calling uploadMetaData on the uninstantiated class"
await UniversalProfile.uploadMetaData(myLSP3MetaData);

> // same as above
```

## Deployment Configuration

A Universal Profile is composed of three smart contracts. [LSP0 ERC725 Account](../../../standards/universal-profile/lsp0-erc725account), [LSP6 Key Manager](../../../standards/universal-profile/lsp6-key-manager) and [LSP1-UniversalReceiver](../../../standards/generic-standards/02-lsp1-universal-receiver.md). You can configure how these contracts should be deployed inside the `contractDeploymentOptions` object when deploying a Universal Profile. Each contract can be configured separately, the available options are the same for all contracts.

```javascript
await lspFactory.UniversalProfile.deploy({...}, {
  ERC725Account: {
    version: '0.4.1',
  },
  UniversalReceiverDelegate: {
    baseContract: '0x...'
  },
  KeyManager: {
    libAddress: '0x6c1F3Ed2F99054C88897e2f32187ef15c62dC560'
  }
})
```

### Proxy Deployment

Allows you to determine whether your contract should be deployed as a **minimal proxy contract** based on [EIP1167](https://eips.ethereum.org/EIPS/eip-1167) or a full contract with a constructor.

```javascript
lspFactory.UniversalProfile.deploy({...}, {
  ERC725Account: {
    deployProxy: false,
  },
})
```

A proxy contract is a lightweight contract which inherits its logic by referencing the address of a contract already deployed on the blockchain. This allows cheaper deployment of Universal Profiles because only the proxy contract needs to be deployed.

LSPFactory stores base contract addresses inside the [version file](https://github.com/lukso-network/tools-lsp-factory/blob/main/src/versions.json). If no version is specified in the `version` parameter, the latest available base contract version will be used.

:::info Info
LSPFactory stores base contract addresses for different versions [internally](https://github.com/lukso-network/tools-lsp-factory/blob/main/src/versions.json) and uses the latest available version if no version is specified.
:::

If you do not want your contract to use proxy deployment you can set `deployProxy` to `false`. This will deploy a 'full' contract with a constructor rather than using a proxy deployment with initializer. When set to `false`, the latest available contract version will be deployed.

`deployProxy` defaults to `true` for `ERC725Account` and `LSP6KeyManager` and `false` for `UniversalReceiverDelegate`.

When using proxy deployment, LSPFactory will check that there is bytecode deployed at the base contract address before deploying. If there is none, a new base contract will be deployed and referenced in the proxy contract. This is useful when using LSPFactory on a local development network like Hardhat where there will be no pre-deployed base contracts.

#### Universal Receiver Delegate proxy deployment

The `UniversalReceiverDelegate` is a logic contract which writes to the Universal Profile when it receives some asset. This is not specific to any particular Universal Profile so the same `UniversalReceiverDelegate` contract can be used for multiple different Universal Profile deployments.

By default LSPFactory will use the latest available version of `UniversalReceiverDelegate` version stored in the [version file](https://github.com/lukso-network/tools-lsp-factory/blob/main/src/versions.json). This address is used directly on the Universal Profile and is given the `SETDATA` LSP6 permission. This means that no `UniversalReceiverDelegate` contract needs to be deployed when deploying a Universal Profile which further saves on the gas cost of Universal Profile deployment.

To specify that your Universal Profile should use proxy deployment when deploying the `UniversalReceiverDelegate` contract, set `deployProxy` to `true`.

```javascript
lspFactory.UniversalProfile.deploy({...}, {
    UniversalReceiverDelegate: {
        deployProxy: true,
    },
})
```

### Using a Custom Address

You can specify the base contract address of a contract by passing the `libAddress` parameter. This allows you to use a custom implementation of a contract standard by using a custom base contract you have previously deployed. A custom base contract passed here must adhere to the relevant LSP contract standard it is being used for.

```javascript title="Deploying a Universal Profile with a custom base contract implementation of ERC725Account"
lspFactory.UniversalProfile.deploy({...}, {
    ERC725Account: {
        libAddress: '0x00b1d454Eb5d917253FD6cb4D5560dEC30b0960c',
    },
})
```

:::info Info
`UniversalReceiverDelegate` does not use proxy deployment by default. When setting the `UniversalReceiverDelegate` `libAddress`, if `deployProxy` is not set to `true` LSPFactory will use the provided address directly. The provided address will be given the `SETDATA` LSP6 permission and set as the [LSP1UniversalReceiverDelegate key](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#lsp1universalreceiverdelegate) on the ERC725Account. [Read more](./universal-profile#universal-receiver-delegate-proxy-deployment)
:::

```javascript title="Using a custom UniversalReceiverDelegate address"
lspFactory.UniversalProfile.deploy({...}, {
    UniversalReceiverDelegate: {
        libAddress: '0x00b1d454Eb5d917253FD6cb4D5560dEC30b0960c',
        deployProxy: false
    },
})
```

### Contract Versions

The version of all three contracts can be set at once by passing the global `version` parameter. This will set all contracts to use the same base contract version. Version can also be set per contract which will take precedence over the global version.

```javascript title="Deploying a Universal Profile with all contracts set to version 0.5.0"
await lspFactory.UniversalProfile.deploy({...}, {
    version: '0.5.0'
});
```

```javascript title="Deploying a Universal Profile at version 0.5.0, with a KeyManager set to version to 0.4.0"
await lspFactory.UniversalProfile.deploy({...}, {
    version: '0.5.0',
    KeyManager: {
      version: '0.4.0'
    }
});
```

### Deploying Custom Bytecode

When deploying a Universal Profile, you can use your own custom implementation of a contract by passing the compiled creation bytecode of a contract you have written as the `bytecode` parameter. This can be the creation byte code of a custom contract implementation you have written according to your use case. The implementation must meet the relevant LSP standard requirements.

The custom bytecode will be deployed and used as part of the Universal Profile. Contracts deployed from custom bytecode will not use any proxy contract deployment.

```javascript title="Deploying a Universal Profile with a custom KeyManager implementation"
lspFactory.UniversalProfile.deploy({...}, {
    KeyManager: {
      bytecode: '0x...'
    }
});
```

### IPFS Upload Options

You can specify how you want your profile metadata to be uploaded by passing the `options` object. Here you can set the IPFS gateway where you want the profile metadata to be uploaded.

This takes an `ipfsClientOptions` object as defined by the [ipfs-http-client library](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client#createoptions) which is used internally to interact with IPFS.

```javascript
lspFactory.UniversalProfile.deploy({...}, {
  ipfsClientOptions: {
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
  }
})
```

If `options` object is provided it will override the `options` object passed at the instantiation of the LSPFactory.
### Reactive Deployment

LSPFactory uses [RxJS](https://rxjs.dev/) to deploy contracts. This can be leveraged to achieve reactive deployment of Universal Profiles.

When deploying a Universal Profile pass the `deployReactive` flag inside the `contractDeploymentOptions` object to receive an [RxJS](https://rxjs.dev/) Observable which will emit events as your contract is deployed.

```typescript
const universalProfileDeploymentObservable = lspFactory.UniversalProfile.deploy({...}, {
    deployReactive: true
  }
);

universalProfileDeploymentObservable.subscribe({
  next: (deploymentEvent) => {
    console.log(deploymentEvent);
  },
  complete: () => {
    console.log('Universal Profile deployment completed');
  },
});

/**
  { type: 'PROXY',        contractName: 'ERC725Account',                                              status: 'PENDING',  transaction:  {} },
  { type: "PROXY",        contractName: 'ERC725Account',                                              status: 'PENDING',  receipt:      {} },
  { type: "PROXY",        contractName: 'ERC725Account',           functionName: 'initialize',        status: 'PENDING',  transaction:  {} },
  { type: "PROXY",        contractName: 'ERC725Account',           functionName: 'initialize',        status: 'COMPLETE', receipt:      {} },

  { type: 'CONTRACT',     contractName: 'KeyManager',                                                 status: 'PENDING',  transaction:  {} },
  { type: "PROXY",        contractName: 'UniversalReceiver...',                                       status: 'PENDING',  transaction:  {} },
  { type: 'CONTRACT',     contractName: 'KeyManager',                                                 status: 'COMPLETE', receipt:      {} },
  { type: "PROXY",        contractName: 'UniversalReceiver...',                                       status: 'PENDING',  receipt:      {} },
  { type: "PROXY",        contractName: 'UniversalReceiver...',    functionName: 'initialize',        status: 'PENDING',  transaction:  {} },
  { type: "PROXY",        contractName: 'UniversalReceiver...',    functionName: 'initialize',        status: 'COMPLETE', receipt:      {} },

  { type: 'TRANSACTION',  contractName: 'ERC725Account',           functionName: 'setData',           status: 'PENDING',  transaction:  {} },
  { type: 'TRANSACTION',  contractName: 'ERC725Account',           functionName: 'setData',           status: 'COMPLETE', receipt:      {} },

  { type: 'TRANSACTION',  contractName: 'ERC725Account',           functionName: 'transferOwnership', status: 'PENDING',  transaction:  {} },
  { type: 'TRANSACTION',  contractName: 'ERC725Account',           functionName: 'transferOwnership', status: 'COMPLETE', receipt:      {} },
  Universal Profile deployment completed
 */

```

The function defined in `next` will be called whenever a new deployment event is created. The function defined in `complete` will be called once after deployment is finished.

Reactive Deployment may be useful for certain front end behaviours to give better feedback to users when they trigger a Universal Profile deployment from a user interface. For example you may want to implement a loading bar to tell users how deployment is progressing, or display details and addresses of the contracts as they are deployed
