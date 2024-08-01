---
title: ⛽️ Relayer access
sidebar_position: 10
---

# Relayer developer access

:::info 🔓 Private Beta access

This feature is currently in private beta. If you are interested, please [contact us](https://forms.gle/rhWA25m3jjuPNPva9).

:::

If you are building on LUKSO, you can request a developer access to our relayer to create Universal Profiles for your users.

## Request access

Please fill out [this form](https://forms.gle/rhWA25m3jjuPNPva9) to request access to our relayer.

## API Documentation

- Testnet: [https://relayer-api.testnet.lukso.network/](https://relayer-api.testnet.lukso.network/docs#/)
- Mainnet: [https://relayer-api.mainnet.lukso.network/](https://relayer-api.mainnet.lukso.network/docs#/)

## Features

### Deploy Universal Profiles

You can deploy Universal Profiles for users by providing either:

- OPTION 1: a list of controller addresses (`lsp6ControllerAddress`) and metadata (`lsp3Profile`)
- OPTION 2: a `salt` and `postDeploymentCallData`

In this process, you might need to use the [`up_import`](../standards/rpc-api#up_import) RPC call from the [Universal Profile Extension](/install-up-browser-extension) in order to add the deployed UP to the browser extension.

<details>
  <summary>OPTION 1: lsp6ControllerAddress & lsp3Profile</summary>

```javascript title="lsp6ControllerAddress: LSP6 controller addresses to set on the deployed Universal Profile with default controller permissions."
lsp6ControllerAddress: ['0x9d9b6B38049263d3bCE80fcA3314d9CbF00C9E9D'];
```

```javascript title="lsp3Profile: LSP3 metadata to set on the deployed universal profile. Needs to be passed as a VerifiableURI-encoded value."
lsp3Profile: '0x6f357c6a3e2e3b435dd1ee4b8a2435722ee5533ea3f6cf6cb44c7fc278ac57ea1480295e697066733a2f2f516d5861714d67646971664b7931384373574768534a4c62626136316f6676666857387175506e6e6a6e76625966';
```

```javascript title="💁‍♀️ How to create a VerifiableURI-encoded value from a JSON:"
// My custom JSON file
const json = JSON.stringify({
    myProperty: 'is a string',
    anotherProperty: {
        sdfsdf: 123456
    }
})

const verfiableUriIdentifier = '0x0000'

// Get the bytes4 representation of the verification method
const verificationMethod = web3.utils.keccak256('keccak256(utf8)').substr(0, 10)
> '0x6f357c6a'

// Get the hash of the JSON file (verification data)
const verificationData = web3.utils.keccak256(json)
> '0x820464ddfac1bec070cc14a8daf04129871d458f2ca94368aae8391311af6361'

// Get the verification data length and padd it as 2 bytes
const verificationDataLength = web3.utils.padLeft(web3.utils.numberToHex((verificationData.substring(2).length) / 2), 4);
> 0x0020

// store the JSON anywhere and encode the URL
const url = web3.utils.utf8ToHex('ifps://QmYr1VJLwerg6pEoscdhVGugo39pa6rycEZLjtRPDfW84UAx')
> '0x696670733a2f2f516d597231564a4c776572673670456f73636468564775676f3339706136727963455a4c6a7452504466573834554178'


// final result (to be stored on chain)
const VerfiableURI =  verfiableUriIdentifier + verificationMethod.substring(2) + verificationDatalength.substring(2) + verificationData.substring(2) + url.substring(2)
                      ^                        ^                                 ^                                     ^                               ^
                      0000                     6f357c6a                          0020                                  820464ddfac1be...               696670733a2f2...

// structure of the VerifiableURI
0x0000 + 6f357c6a +       0020 +                    820464ddfac1bec070cc14a8daf04129871d458f2ca94368aae8391311af6361 + 696670733a2f2f516d597231564a4c776572673670456f73636468564775676f3339706136727963455a4c6a7452504466573834554178
  ^      ^                ^                         ^                                                                  ^
  0000   keccak256(utf8)  verificationDatalength    verificationData                                                   encoded URL

// example value
0x00006f357c6a0020820464ddfac1bec070cc14a8daf04129871d458f2ca94368aae8391311af6361696670733a2f2f516d597231564a4c776572673670456f73636468564775676f3339706136727963455a4c6a7452504466573834554178
```

ℹ️ More info on [VerifiableURI](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#verifiableuri)

</details>

<details>
  <summary>OPTION 2: salt & postDeploymentCallData</summary>

**Why is it useful to deploy UP to pass salt and postDeploymentCallData?**

To be able to deploy a UP on the same address across different chains.

**How to generate each parameter?**

```javascript title="salt: A 32 bytes salt used to compute the deployment address of the contract."
const salt = '0x' + crypto.randomBytes(32).toString('hex');
```

```javascript title="postDeploymentCallData: Call data which will be executed on the ERC725Account contract after deployment. Should contain the encoded setData transaction to set required permission setting and LSP3 Profile Data"

generatePostDeploymentCallData(
    lsp6Controllers: string[],
    lsp3Profile?: string,
  ) {
    const permissionData: {
      keyName: string;
      dynamicKeyParts?: string;
      value: string[] | string;
    }[] = [
      {
        keyName: 'AddressPermissions[]',
        value: lsp6Controllers,
      },
    ];

    for (const controller of lsp6Controllers) {
      permissionData.push({
        keyName: 'AddressPermissions:Permissions:<address>',
        dynamicKeyParts: controller,
        value: ERC725.encodePermissions(DEFAULT_CONTROLLER_PERMISSIONS),
      });
    }

    const erc725js = new ERC725(LSP6Schema as ERC725JSONSchema[]);
    const { keys, values } = erc725js.encodeData(permissionData);

    if (lsp3Profile) {
      keys.push(ERC725YDataKeys.LSP3.LSP3Profile);
      values.push(lsp3Profile);
    }

    const postDeploymentCallData = ethers.utils.defaultAbiCoder.encode(
      ['bytes32[]', 'bytes[]'],
      [keys, values],
    );

    return postDeploymentCallData;
  }
```

</details>

Please refer to the [Swagger](https://relayer-api.testnet.lukso.network/docs#/External%20Api%20Endpoints/UniversalProfileController_deployUniversalProfile) docs for more information.

### Register Users and Universal Profiles

If your project has already created Universal Profiles (UP) for your users, you can register these profiles to our relayer so they can benefit from the gasless transactions experience provided by the LUKSO relayer.

#### How it works

- Developer provides a Universal Profile (UP) address to be registered in the LUKSO relayer.

  - If the UP is not already registered, the relayer creates a new `User` with the new UP attached.
  - New `User` is granted the default gas quota (20m).

- Developer may also provide a `User ID`, to register a Universal Profile for an already created User.
  - For example a Developer may build a platform where enterprise users can deploy Universal Profiles for their organisation, we can attach multiple Universal Profiles per organisation
