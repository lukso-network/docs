---
sidebar_position: 1
title: Universal Profile
---

# Deploying a Universal Profile

LSPFactory allows you to quickly deploy and configure a Universal Profile consisting of an [LSP0 ERC725 Account](../../../standards/universal-profile/lsp0-erc725account), an [LSP6 Key Manager](../../../standards/universal-profile/lsp6-key-manager), and an [LSP1-UniversalReceiver](../../../standards/generic-standards/lsp1-universal-receiver.md) smart contract:

```javascript
await lspFactory.UniversalProfile.deploy(profileProperties [, options]);
```

This will deploy the following contracts:

- [LSP0 ERC725 Account](../../../standards/universal-profile/lsp0-erc725account)
- [LSP6 Key Manager](../../../standards/universal-profile/lsp6-key-manager)
- And link to a pre-deployed [LSP1 Universal Receiver](../../../standards/generic-standards/lsp1-universal-receiver.md)

After, it will:

- upload metadata to IPFS and set the [LSP3 Universal Profile](../../../standards/universal-profile/lsp3-universal-profile-metadata) metadata,
- attach the Universal Receiver Delegate to the ERC725 Account,
- set the Key Manager as the owner of the ERC725 Account, and
- set all [permissions](../../../standards/universal-profile/lsp6-key-manager#-types-of-permissions) for the `controllerAddresses` except `DELEGATECALL`.

These smart contracts linked with some [LSP3 Universal Profile Metadata](../../../standards/universal-profile/lsp3-universal-profile-metadata) form a Universal Profile. The metadata is the 'face' of your profile and contains information such as your name, description, and profile image.

:::caution
The deployment key passed to LSPFactory will be given `CHANGEOWNER` and `CHANGEPERMISSIONS` [LSP6 permissions](../../../standards/universal-profile/lsp6-key-manager#-types-of-permissions) in order to carry out the Universal Profile deployment.

These permisisons are revoked as the final step of deployment. It is important this step is completed correctly to avoid security risks.

:::

## Profile Properties

Inside the `profileProperties` object, you can set profile configuration options such as the controller addresses and LSP3 metadata.

### Controller Addresses

You can set the addresses which should be able to control your Universal Profile initially by passing in the `controllerAddresses`. The addresses that were passed here will be given all LSP6 KeyManager permissions except `DELEGATECALL` to [prevent accidental misuse](https://solidity-by-example.org/hacks/delegatecall/). If your controller keys require `DELEGATECALL`, you can [change the permission after deployment](../../../guides/key-manager/give-permissions.md).

The property `controllerAddresses` can be filled with addresses of externally owned accounts (EOAs) or another smart contract that can call the `execute(calldata)` function on the KeyManager.

```javascript
await lspFactory.UniversalProfile.deploy({
  controllerAddresses: [
    '0x7Ab53a0C861fb955050A8DA109eEeA5E61fd8Aa4',
    '0x56fE4E7dc2bc0b6397E4609B07b4293482E3F72B',
  ],
});
```

### Adding LSP3 Metadata

When deploying a Universal Profile with LSPFactory, you can specify your Universal Profile metadata using the `lsp3Profile` key in the `profileProperties` object:

```javascript
await lspFactory.UniversalProfile.deploy({
  controllerAddresses: ['0x...'],
  lsp3Profile: myUniversalProfileData,
});
```

:::info Info
Profile Metadata can be passed as either a JSON object containing the [LSP3Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#lsp3profile) you want to upload or a URL of your previously uploaded metadata.
:::

If an LSP3MetaData object is passed, LSPFactory will process and upload your metadata to IPFS.

:::info
See [Upload Options](././universal-profile#ipfs-upload-options) for details on how to specify a custom IPFS gateway.
:::

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

LSP3 Metadata can also be passed with the `LSP3Profile` key:

```javascript title='Uploading an LSP3 metadata automatically'
await lspFactory.UniversalProfile.deploy({
    controllerAddresses: ['0x...'],
    lsp3Profile: {
      LSP3Profile: {
        name: 'My-Cool-Profile',
        description: 'My cool Universal Profile',
        tags: ['public-profile'],
        links: [{
          title: 'My Website',
          url: 'www.my-website.com'
        }],
        ...
      }
    }
  });
};
```

The following two examples will download the JSON file before hashing it and generating the proper [JSONURL](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#JSONURL) value.

```javascript title='Providing a previously uploaded LSP3 metadata IPFS URL'
await lspFactory.UniversalProfile.deploy({
    controllerAddresses: ['0x...'],
    lsp3Profile: 'ipfs://QmQ7Wq4y2gWiuzB4a4Wd6UiidKNpzCJRpgzFqQwzyq6SsV'
  });
};
```

```javascript title='Providing a previously uploaded LSP3 metadata URL'
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
    url: 'https://mycoolserver.com/myProfile.json',
  },
});
```

Or you can provide the hash value and then uploaded file URL:

```javascript title='Providing an already uploaded LSP3 metadata  url and hash values'
await lspFactory.UniversalProfile.deploy({
  controllerAddresses: ['0x...'],
  lsp3Profile: {
    hash: '0xfdafad027ecfe57eb4ad047b938805d1dec209d6e9f960fc320d7b9b11cbed14',
    hashFunction: 'keccak256(utf8)',
    url: 'https://mycoolserver.com/file.json',
  },
});
```

### Setting Images in LSP3MetaData

The properies `profileImage` and `backgroundImage` can be passed inside the `lsp3Profile` object. These can be given as an object containing previously uploaded image Metadata, a Javascript `File` object if used client-side.

#### Pre-uploaded Images

An LSP3 Profile requires the properties `profileImage` and `backgroundImage` to be uploaded in multiple sizes so that interfaces can choose which one to load for better loading performance.

If you already have an image uploaded to IPFS in multiple sizes, you can pass image metadata inside the `lsp3Profile` object when deploying a Profile.

:::info
Both `profileImage` and `backgroundImage` take an array, where each element is the metadata of different image size.
:::

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
    controllerAddresses: ['0x...'],
    lsp3Profile: myUniversalProfileData
  });
};
```

### Setting an Avatar in LSP3MetaData

An avatar can be set by passing the `avatar` property to the `lsp3Profile` object.

An avatar can be passed as an array where each element is a different file format of the same avatar. Each file format can be passed as a `File` object, or asset metadata object according to the [LSP2 ERC725Y JSON Schema standard](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#Array).

If an avatar file is passed as a `File` object, the file will uploaded to IPFS, converted to the correct asset metadata format and added to the [LSP3 Profile Metadata](https://docs.lukso.tech/standards/universal-profile/lsp3-universal-profile-metadata) Json.

Avatar files passed as a metadata objects will be set directly on the [LSP3 Profile Metadata](https://docs.lukso.tech/standards/universal-profile/lsp3-universal-profile-metadata) Json.

```javascript title='Setting LSP3 metadata to be uploaded with an avatar with two formats'
<input type="file" id="avatar">

<script>
  const myLocalAvatar = document.getElementById('avatar').files[0];

  const myUniversalProfileData = {
    name: 'My Universal Profile',
    description: 'My cool Universal Profile',
    asset: [
        myLocalAvatar,
        {
          hashFunction: 'keccak256(bytes)',
          hash: '0x5f3dbd89cde4dde36241c501203b67a93b89908063f5516535136bc25f712e11',
          url: 'ipfs://QmWkAki4mLq2c9hsbKs4HFCaZdpUX1jLKKBb5y8YMATkak',
          fileType: 'image/obj',
        },
      ]
  };

  await lspFactory.UniversalProfile.deploy({
    controllerAddresses: ['0x...'],
    lsp3Profile: myUniversalProfileData
  });

<script/>
```

#### Using the Javascript File object

Javascript offers a `File` object for easy handling of files inside a browser. Developers can pass these to `profileImage` and `backgroundImage` fields to allow easy drag and drop of images from a user interface.

:::caution
Javascript's `File` object is only available when using javascript in the browser. If using LSPFactory in a Node environment, image metadata should be passed.
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
      controllerAddresses: ['0x...'],
      lsp3Profile: myUniversalProfileData
    });
};
<script/>
```

LSPFactory will create five resized versions of the passed image, with max sizes of `1800x1800`, `1024x1024`, `640x640`, `320x320`, `180x180`. These resized images will be set inside the `LSP3Metadata` and attached to the `ERC725Account` contract.

<!-- #### Using Image Buffers

If using LSPFactory in a Node environment where Javascript `File` object is unavailable, `profileImage` and `backgroundImage` can be uploaded by passing a File Buffer directly.

Developers must also pass the image's mime type to reconstruct and resize the image. Supported mimetypes can be easily accessed using the `SupportedImageBufferFormats` enum exported by LSPFactory.

:::info

Supported mime types are: `image/png`, `image/bmp`, `image/jpeg`, and `image/gif`.

:::

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
  controllerAddresses: ['0x...'],
  lsp3Profile: myUniversalProfileData,
});
``` -->

### Uploading LSP3 metadata to IPFS

You can upload your LSP3 metadata before deploying a Universal Profile using the `uploadMetaData()` method. The function uses the same [`lsp3Profile` object schema](./universal-profile#adding-lsp3-metadata) defined above when deploying a Universal Profile. Returns an object containing the IPFS upload location of your metadata and your `lsp3Metdata` as a javascript object.

```javascript
await myLSPFactory.UniversalProfile.uploadMetaData(lsp3Profile [, options]);
```

To upload using a custom IPFS gateway, pass the `options` object. The field is the same `options` object used when deploying a Universal Profile. [Read more](./universal-profile#ipfs-upload-options).

The `uploadMetaData()` function is available as a static or non-static method to be called without instantiating an `LSPFactory` object.

```javascript title="Calling uploadMetaData on an LSPFactory instance"
await myLSPFactory.UniversalProfile.uploadMetaData(myLSP3MetaData);

/**
{
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
*/
```

```javascript title="Calling uploadMetaData on the uninstantiated class"
await UniversalProfile.uploadMetaData(myLSP3MetaData);

> // same as above
```

## Deployment Configuration

A Universal Profile is composed of three smart contracts. [LSP0 ERC725 Account](../../../standards/universal-profile/lsp0-erc725account), [LSP6 Key Manager](../../../standards/universal-profile/lsp6-key-manager), and [LSP1-UniversalReceiver](../../../standards/generic-standards/lsp1-universal-receiver.md).
When deploying a Universal Profile, you can configure how these contracts should be deployed inside the `options` object.

Under the [`version`](./options.md#version) key, developers can pass a [version number](./options.md#version), [custom bytecode](./options.md#deploying-custom-bytecode) or a [base contract address](./options.md#custom-base-contract-address) to be used during deployment. By setting the [`deployProxy`](./options.md#deploy-proxy) parameter developers can specify whether the contract should be deployed using proxy deployment.

:::info
`deployProxy` defaults to true for `ERC725Account` and `KeyManager` and false for `UniversalReceiverDelegate`.
Read more about configuring proxy deployment and contract versioning [here](../deployment/options.md)

:::

```javascript
await lspFactory.UniversalProfile.deploy({...}, {
  LSP0ERC725Account: {
    version: '0.4.1', // Version number
    deployProxy: true
  },
  LSP1UniversalReceiverDelegate: {
    version: '0x...', // Custom bytecode
    deployProxy: false
  },
  LSP6KeyManager: {
    version: '0x6c1F3Ed2F99054C88897e2f32187ef15c62dC560', // Base contract address
    deployProxy: true
  }
})
```

#### Universal Receiver Delegate Proxy Deployment

The `UniversalReceiverDelegate` is a logic contract that writes to the Universal Profile when it receives some asset. This operation is not specific to any particular Universal Profile, so developers can use the same `UniversalReceiverDelegate` contract for multiple different Universal Profile deployments.

By default, no Universal Receiver Delegate contract will be deployed. Instead LSPFactory will use the latest available version of the `UniversalReceiverDelegate` version stored in the [version file](https://github.com/lukso-network/tools-lsp-factory/blob/main/src/versions.json). This address is used directly on the Universal Profile and is given the [`SETDATA` LSP6 permission](https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager#permissions).

Reusing the `UniversalReceiverDelegate` address means that no `UniversalReceiverDelegate` contract needs to be deployed when deploying a Universal Profile which further reduces the gas cost of Universal Profile deployment.

To specify that your `UniversalReceiverDelegate` contract should use proxy deployment, set the property `deployProxy` to `true`. If no base contract address is specified in the `version` parameter a new `UniversalReceiverDelegate` base contract will be deployed.

```javascript
lspFactory.UniversalProfile.deploy({...}, {
    LSP1UniversalReceiverDelegate: {
        deployProxy: true,
        version: '0x00b1d454Eb5d917253FD6cb4D5560dEC30b0960c',
    },
})
```

:::info
The `UniversalReceiverDelegate` contract does not use proxy deployment by default. If an address is passed to the `LSP1UniversalReceiverDelegate` `version` parameter and `deployProxy` is not set to `true`, LSPFactory will set the provided address directly on the ERC725Account as the [LSP1UniversalReceiverDelegate key](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#lsp1universalreceiverdelegate) and the [`SETDATA` LSP6 permission](https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager#permissions).
:::

```javascript title="Using a custom UniversalReceiverDelegate address"
lspFactory.UniversalProfile.deploy({...}, {
    LSP1UniversalReceiverDelegate: {
        version: '0x00b1d454Eb5d917253FD6cb4D5560dEC30b0960c',
        deployProxy: false
    },
})
```

### Contract Versions

LSPFactory stores the addresses of different base contract versions [internally](https://github.com/lukso-network/tools-lsp-factory/blob/main/src/versions.json). By specifying a `version` number, developers can specify which base contract implementation should be used during deployment.

The `version` of all three contracts can be set at once by passing the global version parameter. The version can also be set per contract, which will take precedence over the global parameter.

```javascript title="Deploying a Universal Profile with all contracts set to version 0.5.0"
await lspFactory.UniversalProfile.deploy({...}, {
    version: '0.5.0'
});
```

```javascript title="Deploying a Universal Profile at version 0.5.0, with a KeyManager set to version to 0.4.0"
await lspFactory.UniversalProfile.deploy({...}, {
    version: '0.5.0',
    LSP6KeyManager: {
      version: '0.4.0'
    }
});
```

### Deploying Custom Bytecode

When deploying a Universal Profile, you can use your custom contract implementation by passing the compiled creation bytecode of a contract you have written as the `version` parameter. The `bytecode` parameter can be the instantiation bytecode of a custom contract implementation you have written according to your use case. The implementation must meet the relevant LSP standard requirements.

:::note
The custom bytecode will be deployed and used as part of the Universal Profile. Contracts deployed from custom bytecode will not use any proxy contract deployment.
:::

```javascript title="Deploying a Universal Profile with a custom KeyManager implementation"
lspFactory.UniversalProfile.deploy({...}, {
    LSP6KeyManager: {
      version: '0x...'
    }
});
```

### IPFS Upload Options

You can specify how you want your profile metadata to be uploaded while passing the options object. Here you can set the IPFS gateway where you want the profile's metadata to be uploaded.

:::note
The procedure takes a URL string or an object as defined by the [IPFS-HTTP Client](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client#createoptions) library which is used internally to interact with the specified IPFS node.
:::

If a URL is passed and no port is specified, the standard 5001 port will be used.

```javascript title="Passing ipfsGateway URL"
lspFactory.UniversalProfile.deploy({...}, {
  ipfsGateway: 'https://ipfs.infura.io:5001'
})
```

```javascript title="Passing ipfsGateway URL string with port set"
lspFactory.UniversalProfile.deploy({...}, {
  ipfsGateway: 'https://ipfs.infura.io' // No port set. Port 5001 will be used
})
```

```javascript title="Passing ipfsGateway options as an object"
lspFactory.UniversalProfile.deploy({...}, {
  ipfsGateway: {
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
  }
})
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

```typescript title="Reactive deployment of a Universal Profile"
const contracts = await lspFactory.UniversalProfile.deploy({...}, {
  onDeployEvents: {
    next: (deploymentEvent) => {
      console.log(deploymentEvent);
    },
    error: (error) => {
      console.error(error);
    },
    complete: (contracts) => {
      console.log('Universal Profile deployment completed');
      console.log(contracts);
    },
  }
});

/**
{
  type: 'PROXY_DEPLOYMENT',
  contractName: 'LSP0ERC725Account',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'PROXY_DEPLOYMENT',
  contractName: 'LSP0ERC725Account',
  status: 'COMPLETE',
  contractAddress: '0xa7b2ab323cD2504689637A0b503262A337ab87d6',
  receipt: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP0ERC725Account',
  functionName: 'initialize(address)',
  status: 'PENDING',
  transaction: {
    ...
  }
}
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
}
{
  type: 'PROXY_DEPLOYMENT',
  contractName: 'LSP6KeyManager',
  status: 'COMPLETE',
  contractAddress: '0x8fE3f0fd1bc2aCDA6cf3712Cd9C7858B8195DC8E',
  receipt: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP6KeyManager',
  functionName: 'initialize(address)',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP6KeyManager',
  functionName: 'initialize(address)',
  status: 'COMPLETE',
  receipt: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP0ERC725Account',
  functionName: 'setData(bytes32[],bytes[])',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP0ERC725Account',
  functionName: 'setData(bytes32[],bytes[])',
  status: 'COMPLETE',
  receipt: {
    ...
  }
}
{
  type: 'TRANSACTION',
  status: 'PENDING',
  contractName: 'LSP0ERC725Account',
  functionName: 'transferOwnership(address)',
  transaction: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP0ERC725Account',
  functionName: 'transferOwnership(address)',
  status: 'COMPLETE',
  receipt: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP0ERC725Account',
  functionName: 'acceptOwnership()',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP0ERC725Account',
  functionName: 'acceptOwnership()',
  status: 'COMPLETE',
  receipt: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP0ERC725Account',
  functionName: 'setData(bytes32,bytes)',
  status: 'PENDING',
  transaction: {
    ...
  }
}
{
  type: 'TRANSACTION',
  contractName: 'LSP0ERC725Account',
  functionName: 'setData(bytes32,bytes)',
  status: 'COMPLETE',
  receipt: {
    ...
  }
}
Universal Profile deployment completed
{
  LSP0ERC725Account: {
    address: '0xa7b2ab323cD2504689637A0b503262A337ab87d6',
    receipt: {
      ...
    }
  },
  LSP6KeyManager: {
    address: '0x8fE3f0fd1bc2aCDA6cf3712Cd9C7858B8195DC8E',
    receipt: {
      ...
    }
  }
}
*/

```
