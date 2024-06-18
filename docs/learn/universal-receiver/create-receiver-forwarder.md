---
sidebar_label: 'Create a LSP1 Forwarder'
sidebar_position: 2
description: This smart contract tutorial guides you on how to create a LSP1 Delegate contract that forwards portion of received tokens automatically to any address.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create a LSP1 Forwarder

This guide will teach you how to create a basic custom [Universal Receiver Delegate](../../standards/generic-standards/lsp1-universal-receiver-delegate.md) contract for the following use-case:

> **"As a Universal Profile (UP) owner, I want to transfer part of the tokens I received to another UP"**.

We will this contract an **LSP1 Forwarder**. Every time our 🆙 will receive a specific [LSP7 token](../../standards/tokens/LSP7-Digital-Asset.md), this contract will automatically transfer a certain percentage to another address we have defined.

An example scenario could be: _"each time I receive USDT, I want to automatically transfer 20% to my wife's UP"_.

## Setup & Requirements

:::success Tips

If you want to follow this guide using not an existing token, but a new token that you want to create and deploy yourself, check our guide [**"Create a Custom LSP7 Token"**](../digital-assets/smart-contract-developers/getting-started.md#create-a-custom-lsp7-token-contract).

:::

:::info

This guide is working with version above 0.14.0 of the [`@lukso/lsp-smart-contracts`] package.

:::

In order to follow this guide, you will need the followings:

1. Download and install the [UP Browser extension](/install-up-browser-extension).
2. Fund the main EOA controller of your 🆙 (See **[Step 1](#step-1---enable-your-controller-to-add-a-universal-receiver) bullet point 3** to retrieve its address) using the [Testnet Faucet](https://faucet.testnet.lukso.network/).
3. The address of the LSP7 token that you want to use to forward of portion of the amount received.
4. The v0.14.0 [`@lukso/lsp-smart-contracts`](../../contracts/introduction.md) library installed.
5. The [_erc725.js_](../../tools/erc725js/getting-started.md) library installed to encode the data key / value to register our LSP1 Forwarder.
6. The [`dotenv`](https://www.npmjs.com/package/dotenv) package to load our main EOA controller private key into our script.

```bash
npm i @lukso/lsp-smart-contracts@v0.14.0 @erc725/erc725.js dotenv
```

## Step 1 - Enable your controller to Add & Edit a Universal Receiver

First, we will need to enable adding a Universal Receiver for the main controller of our UP. To do that:

1. Open the UP Browser Extension in your web browser.
2. Click on the **"Controller"** tab.
3. Select **"UP Extension"** which.

This will bring the controller information page that you see below. From there:

4. Scroll down to the **"Administration & Ownership"** part
5. Toggle ON the **"Add notifications & automation"** + **"Edit notifications & automation"** permission.
6. Confirm the changes and submit the transaction.

![Animation to show how to enable adding and editing Universal Receiver Delegate in UP Browser Extension](/img/learn/enable-add-edit-urd-permissions.gif)

## Step 2 - Create LSP1 Forwarder contract in Solidity

We can make our LSP1 Forwarder contract to perform this action in 2 different ways, via 2 different interaction flows.

### Two Design Options

To re-transfer a portion of the tokens received, we can instruct the LSP1 Forwarder contract to re-call the [`transfer(...)`](../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#transfer) function on the LSP7 Token contract in 2 ways:

- **method 1:** via the [**`execute(...)` function of the 🆙**](../../contracts/contracts/UniversalProfile/UniversalProfile.md#execute).
- **method 2:** directly on the LSP7 contract **after having authorized the LSP1 Forwarder as an operator via [`authorizeOperator(...)`](../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#authorizeoperator)**.

For method 1 to work, the LSP1 Forwarder contract will need the permissions [`SUPER_CALL` + `REENTRANCY`](../../standards/universal-profile/lsp6-key-manager.md#permissions) on the UP.

For method 2 to work, the LSP1 Forwarder contract needs to be authorized as an operator at the LSP7 level (using [`authorizeOperator`](../../../contracts/contracts/LSP7DigitalAsset/#authorizeoperator)) with unlimited amount (`type(uint256).max`).

Both methods have their advantages and disadvantages, as summarized below.

| Design Method                                                        | Advantages 👍🏻                                                                                                                           | Disadvantages 👎🏻                                                                   |
| :------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| **Method 1:** via 🆙 `execute(...)` function                         | Does not requires additional setup (`authorizeOperator` operation) <br/> Can trace the transfer from your UP transactions' activity tab | Cost a bit more gas (+/- 23k) compared to method 2 on the re-transfer transaction. |
| **Method 2:** via `authorizeOperator(...)` on LSP7 Token contract 🪙 | More gas efficient.                                                                                                                     | You have to authorize your URD to spend your LSP7 token for an unlimited amount    |

### Solidity code

Select one of the two tabs below to see the Solidity implementation of each design.

The code is commented enough to be self explanatory, but let's dive a bit more into some interesting bits.

<Tabs>
  <TabItem value="method1" label="via UP `execute(...)`">

```solidity title="LSP1URDForwarder.sol"
// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.11;

// interfaces
import { IERC725X } from "@erc725/smart-contracts/contracts/interfaces/IERC725X.sol";
import { ILSP1UniversalReceiverDelegate } from "@lukso/lsp-smart-contracts/contracts/LSP1UniversalReceiver/ILSP1UniversalReceiverDelegate.sol";
import { ILSP7DigitalAsset } from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/ILSP7DigitalAsset.sol";

// modules
import { ERC165 } from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// constants
import { _TYPEID_LSP7_TOKENSRECIPIENT } from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/LSP7Constants.sol";
import "@lukso/lsp-smart-contracts/contracts/LSP1UniversalReceiver/LSP1Constants.sol";
import "@lukso/lsp-smart-contracts/contracts/LSP0ERC725Account/LSP0Constants.sol";

// errors
import "@lukso/lsp-smart-contracts/contracts/LSP1UniversalReceiver/LSP1Errors.sol";

contract LSP1URDForwarder is
    ERC165,
    ILSP1UniversalReceiverDelegate
{

    // CHECK onlyOwner
    modifier onlyOwner {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    // Owner
    address owner;

    // Set a recipient
    address public recipient;

    // Set a percentage to send to recipient
    uint256 public percentage;

    // Set a mapping of authorized LSP7 tokens
    mapping (address => bool) allowlist;

    // we set the recipient & percentage & allowedAddresses of the deployer in the constructor for simplicity
    constructor(address _recipient, uint256 _percentage, address[] memory tokenAddresses) {
        require(_percentage < 100, "Percentage should be < 100");
        recipient = _recipient;
        percentage = _percentage;
        owner = msg.sender;

        for (uint256 i = 0; i < tokenAddresses.length; i++) {
            allowlist[tokenAddresses[i]] = true;
        }
    }

    function addAddress(address token) public onlyOwner {
        allowlist[token] = true;
    }

    function setRecipient(address _recipient) public onlyOwner {
        recipient = _recipient;
    }

    function setPercentage(uint256 _percentage) public onlyOwner {
        require(_percentage < 100, "Percentage should be < 100");
        percentage = _percentage;
    }

    function removeAddress(address token) public onlyOwner {
        allowlist[token] = false;
    }

    function getAddressStatus(address token) public view returns (bool) {
        return allowlist[token];
    }

    function universalReceiver(
        address notifier,
        uint256 value,
        bytes32 typeId,
        bytes memory data
    ) public virtual returns (bytes memory) {
        // CHECK that the caller is an ERC725Account (e.g: a UniversalProfile)
        // by checking it supports the LSP0 interface
        // by checking its interface support
        if (
            !ERC165Checker.supportsERC165InterfaceUnchecked(
                msg.sender,
                _INTERFACEID_LSP0
            )
        ) {
            return "Caller is not a LSP0";
        }

        // CHECK that notifier is a contract with a `balanceOf` method
        // and that msg.sender (the UP) has a positive balance
        if (notifier.code.length > 0) {
            try ILSP7DigitalAsset(notifier).balanceOf(msg.sender) returns (
                uint256 balance
            ) {
                if (balance == 0) {
                    return "LSP1: balance is zero";
                }
            } catch {
                return "LSP1: `balanceOf(address)` function not found";
            }
        }

        // CHECK that the address of the LSP7 is whitelisted
        if (!allowlist[notifier]) {
            return "Token not in allowlist";
        }

        // extract data (we only need the amount that was transfered / minted)
        (, , , uint256 amount, ) = abi.decode(
            data,
            (address, address, address, uint256, bytes)
        );

        // CHECK that amount is not too low
        if (amount < 100) {
            return "Amount is too low (< 100)";
        } else {
            uint256 tokensToTransfer = (amount * percentage) / 100;

            bytes memory encodedTx = abi.encodeCall(
                ILSP7DigitalAsset.transfer,
                msg.sender,
                recipient,
                tokensToTransfer,
                true,
                ""
            );
            IERC725X(msg.sender).execute(0, notifier, 0, encodedTx);
            return "";
        }
    }

    // --- Overrides

    /**
     * @inheritdoc ERC165
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override returns (bool) {
        return
            interfaceId == _INTERFACEID_LSP1_DELEGATE ||
            super.supportsInterface(interfaceId);
    }
}
```

**Creation of the transaction**

When all the verifications passed in the `universalReceiver` function, we calculate the amount of token to transfer (`tokensToTransfer`) and create the transaction that will be executed:

```solidity title="Create the transaction"
bytes memory encodedTx = abi.encodeCall(
    ILSP7DigitalAsset.transfer,
    msg.sender,
    recipient,
    tokensToTransfer,
    true,
    ""
);
```

The `encodeCall` function takes the function that will be called as 1st parameter, and its parameters as the following ones. Here, we target the `transfer` method of the LSP7 token that we received (e.g., the notifier), and we need 4 additional parameters:

- the `from` (msg.sender => the UP that received tokens)
- the `to` (recipient => the address that will receives part of the tokens)
- the `amount` (tokensToTransfer => a percentage of the total amount received)
- the `allowNonLSP1Recipient` boolean that indicates if we can transfer to any address, or if it has to be a LSP1 enabled one
- the `data` (no additional data)

**Execution of the transaction**

Directly after creating our encoded transaction, we can execute it using the following line:

```solidity title="Execute the transaction"
IERC725X(msg.sender).execute(0, notifier, 0, encodedTx);
```

As we know from the `// CHECK that the caller is a LSP0 (UniversalProfile)` test, the `msg.sender` is a Universal Profile which extends `ERC725XCore`. We can then explicitly convert `msg.sender` as a ERC725X contract, then call the `execute` function on it. This means that we "run the execute function as the Universal Profile". The parameters are:

- the `operationType` (0 = CALL operation)
- the `target` (notifier = our LSP7 contract)
- the `value` (in native token) (0 = nothing is sent)
- the `data` (our encoded transaction)

</TabItem>

  <TabItem value="method2" label="using LSP1 Forwarder as an operator">

```solidity title="LSP1URDForwarder.sol"
// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.11;

// interfaces
import { IERC725X } from "@erc725/smart-contracts/contracts/interfaces/IERC725X.sol";
import { ILSP1UniversalReceiverDelegate } from "@lukso/lsp-smart-contracts/contracts/LSP1UniversalReceiver/ILSP1UniversalReceiverDelegate.sol";
import { ILSP7DigitalAsset } from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/ILSP7DigitalAsset.sol";

// modules
import { ERC165 } from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// constants
import { _TYPEID_LSP7_TOKENSRECIPIENT } from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/LSP7Constants.sol";
import "@lukso/lsp-smart-contracts/contracts/LSP1UniversalReceiver/LSP1Constants.sol";
import "@lukso/lsp-smart-contracts/contracts/LSP0ERC725Account/LSP0Constants.sol";

// errors
import "@lukso/lsp-smart-contracts/contracts/LSP1UniversalReceiver/LSP1Errors.sol";

contract LSP1URDForwarder is
    ERC165,
    ILSP1UniversalReceiverDelegate
{

    // CHECK onlyOwner
    modifier onlyOwner {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    // Owner
    address owner;

    // Set a recipient
    address public recipient;

    // Set a percentage to send to recipient
    uint256 public percentage;

    // Set a mapping of authorized LSP7 tokens
    mapping (address => bool) allowlist;

    // we set the recipient & percentage & allowedAddresses of the deployer in the constructor for simplicity
    constructor(address _recipient, uint256 _percentage, address[] memory tokenAddresses) {
        require(_percentage < 100, "Percentage should be < 100");
        recipient = _recipient;
        percentage = _percentage;
        owner = msg.sender;

        for (uint256 i = 0; i < tokenAddresses.length; i++) {
            allowlist[tokenAddresses[i]] = true;
        }
    }

    function addAddress(address token) public onlyOwner {
        allowlist[token] = true;
    }

    function setRecipient(address _recipient) public onlyOwner {
        recipient = _recipient;
    }

    function setPercentage(uint256 _percentage) public onlyOwner {
        require(_percentage < 100, "Percentage should be < 100");
        percentage = _percentage;
    }

    function removeAddress(address token) public onlyOwner {
        allowlist[token] = false;
    }

    function getAddressStatus(address token) public view returns (bool) {
        return allowlist[token];
    }

    function universalReceiver(
        address notifier,
        uint256 value,
        bytes32 typeId,
        bytes memory data
    ) public virtual returns (bytes memory) {
        // CHECK that the caller is an ERC725Account (e.g: a UniversalProfile)
        // by checking it supports the LSP0 interface
        // by checking its interface support
        if (
            !ERC165Checker.supportsERC165InterfaceUnchecked(
                msg.sender,
                _INTERFACEID_LSP0
            )
        ) {
            return "Caller is not a LSP0";
        }

        // CHECK that notifier is a contract with a `balanceOf` method
        // and that msg.sender (the UP) has a positive balance
        if (notifier.code.length > 0) {
            try ILSP7DigitalAsset(notifier).balanceOf(msg.sender) returns (
                uint256 balance
            ) {
                if (balance == 0) {
                    return "LSP1: balance is zero";
                }
            } catch {
                return "LSP1: `balanceOf(address)` function not found";
            }
        }

        // CHECK that the address of the LSP7 is whitelisted
        if (!allowlist[notifier]) {
            return "Token not in allowlist";
        }

        // extract data (we only need the amount that was transfered / minted)
        (, , , uint256 amount, ) = abi.decode(
            data,
            (address, address, address, uint256, bytes)
        );

        // CHECK if amount is not too low
        if (amount < 100) {
            return "Amount is too low (< 100)";
        } else {
            uint256 tokensToTransfer = (amount * percentage) / 100;

            ILSP7DigitalAsset(notifier).transfer(msg.sender, recipient, tokensToTransfer, true, "");
            return "";
        }
    }

    // --- Overrides

    /**
     * @inheritdoc ERC165
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override returns (bool) {
        return
            interfaceId == _INTERFACEID_LSP1_DELEGATE ||
            super.supportsInterface(interfaceId);
    }
}
```

In this method, we're directly calling the `transfer` method of the notifier (the LSP7 token) as the URD. Of course, in order for this to work, the custom URD needs to be authorized to spend the token of the UP on his behalf (using `authorizeOperator`).

  </TabItem>

</Tabs>

## Step 3 - Deploy our LSP1 Forwarder

Now that we have created our custom LSP1 Delegate Forwarder contract, we will deploy it on LUKSO Testnet.

Let's first compile our contract to generate its ABI and bytecode.

```bash
hardhat compile
```

Setup the [LUKSO Testnet network](../../networks/testnet/parameters.md) in your `hardhat.config.ts`.

```ts title="hardhat.config.ts"
// ...
const config: HardhatUserConfig = {
  // ...
  networks: {
    luksoTestnet: {
      live: true,
      url: 'https://rpc.testnet.lukso.network',
      chainId: 4201,
      saveDeployments: true,
    },
  },
  // ...
};
// ...
export default config;
```

We will use a script in Hardhat to deploy our LSP1 Forwarder contract. We will use our main controller address by exporting its private key from the UP Browser Extension. Create the following `.env` file and add the main controller private key exported from the 🆙 Browser Extension:

```txt title=".env"
PRIVATE_KEY=""
```

Create the following file under the `scripts/` folder in your Hardhat project.

```ts title="scripts/deployLSP1Forwarder.ts"
import hre from 'hardhat';
import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';
import LSP1URDForwarder from "../artifacts/contracts/Tokens/LSP1URDForwarder.sol/LSP1URDForwarder.json';";

// load env vars
dotenv.config();

// setup provider
const provider = new ethers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);

// constants
const UNIVERSAL_PROFILE_ADDRESS = '0x...';
const TOKEN_RECIPIENT = '0x...';
const PERCENTAGE = '0x...';
// You can update the value of the allowed LSP7 token
const MY_USDC_TOKEN = '0x63890ea231c6e966142288d805b9f9de7e0e5927';

// setup signer (the browser extension main controller)
const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);
console.log('Main 🆙 Controller address (EOA 🔑): ', signer.address);

// -----------------------------
// DEPLOY LSP1 Delegate contract
// -----------------------------

const lsp1ForwarderFactory = new ethers.ContractFactory(
  LSP1URDForwarder.abi,
  LSP1URDForwarder.bytecode,
  signer,
);

const lsp1Forwarder = await lsp1ForwarderFactory.deploy(
  TOKEN_RECIPIENT as string,
  PERCENTAGE as string,
  [MY_USDC_TOKEN],
);
console.log(
  '✅ Custom URD successfully deployed at address: ',
  lsp1Forwarder.address,
);
```

Run the command below to deploy our custom LSP1 Forwarder contract on LUKSO Testnet:

```bash
npx hardhat run scripts/deployLSP1Forwarder.ts --network luksoTestnet
```

## Step 4 - Setup our LSP1 Forwarder

Now that we have deployed our custom LSP1 Forwarder contract, we will register it and set it up on our Universal Profile.

### 4.1 - Register on the UP

We will register this LSP1 Forwarder for the LSP1 Type Id [`LSP7Tokens_RecipientNotification`](../../contracts/type-ids.md#lsp7tokens_recipientnotification). This type Id is used to notify the Universal Profile that it received some new tokens.

To do that, use the [`LSP1UniversalReceiverDelegate:<bytes32>`](../../standards/generic-standards/lsp1-universal-receiver-delegate.md#lsp1universalreceiverdelegate-mapping) Mapping data key, where the `<bytes32>` part will be the type Id. The _erc725.js_ library will enable us to do that easily.

```ts
import ethers from 'ethers';
import ERC725 from '@erc725/erc725.js';
import LSP1Schema from '@erc725/erc725js/schemas/LSP1UniversalReceiver.json';
import LSP6Schema from '@erc725/erc725js/schemas/LSP6KeyManager.json';

import { LSP1_TYPE_IDS } from '@lukso/lsp-smart-contracts';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

// code from previous steps here...
// including the instance of the `lsp1Forwarder` contract.

const lsp1Forwarder = await lsp1ForwarderFactory.deploy(
  TOKEN_RECIPIENT as string,
  PERCENTAGE as string,
  [MY_USDC_TOKEN],
);

const erc725 = new ERC725(LSP1Schema);

const { keys, values } = erc725.encodeData([
  {
    keyName: 'LSP1UniversalReceiverDelegate:<bytes32>',
    dynamicKeyPart: LSP1_TYPE_IDS.LSP7Tokens_RecipientNotification,
    value: lsp1Forwarder.address,
  },
]);

// Create an instance of our Universal Profile
const UNIVERSAL_PROFILE_ADDRESS = '0x...';

const universalProfile = new ethers.Contract(
  UNIVERSAL_PROFILE_ADDRESS,
  UniversalProfile.abi,
  signer,
);

// register the LSP1 Forwarder for the notification type when we receive new LSP7 tokens
const setDataTx = await universalProfile.setData(keys[0], values[0]);

await setDataTx.wait();
console.log('✅ Custom LSP1 Delegate has been correctly registered on the UP');
```

### 4.2 - Setup permissions / operator

Depending on the design / method selected in [step 2](#step-2---create-lsp1-forwarder-contract-in-solidity), we will have to setup our LSP1 Forwarder contract differently:

| Method                                                               | Setup Required                                                                                                                                                                                                                                                              |
| :------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Method 1:** via 🆙 `execute(...)` function                         | **Grant the permissions `SUPER_CALL` + `REENTRANCY`** to the LSP1 Forwarder contract so that it can re-call the 🆙.                                                                                                                                                         |
| **Method 2:** via `authorizeOperator(...)` on LSP7 Token contract 🪙 | **Authorize the address of the LSP1 Forwarder contract as an operator**, to spend tokens on behalf of the UP. This using the [`authorizeOperator()`](../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#authorizeoperator) function on the LSP7 token contract. |

<Tabs>
  <TabItem value="method1" label="Method 1 - Set Permissions for LSP1 Forwarder">

With this method, we will set the permission `SUPER_CALL` and `REENTRANCY` on our 🆙 for the LSP1 Forwarder.

```ts
import ERC725 from '@erc725/erc725.js';
import LSP6Schema from '@erc725/erc725js/schemas/LSP6KeyManager.json';

import { PERMISSIONS } from '@lukso/lsp-smart-contracts';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

// code from previous step here...
// including the instance of the `lsp1Forwarder` contract.

const lsp1Forwarder = await lsp1ForwarderFactory.deploy(
  TOKEN_RECIPIENT as string,
  PERCENTAGE as string,
  [MY_USDC_TOKEN],
);

const erc725 = new ERC725(LSP1Schema);

const { keys, values } = erc725.encodeData([
  {
    keyName: 'AddressPermissions:Permissions:<address>',
    value: ERC725.encodePermissions({
      SUPER_CALL: true,
      REENTRANCY: true,
    }),
  },
]);

// Create an instance of our Universal Profile
const UNIVERSAL_PROFILE_ADDRESS = '0x...';

const universalProfile = new ethers.Contract(
  UNIVERSAL_PROFILE_ADDRESS,
  UniversalProfile.abi,
  signer,
);

// Set the permissions of the LSP1 Forwarder on our UP
const setPermissionsTx = await universalProfile.setData(keys[0], values[0]);

await setPermissionsTx.wait();
console.log('✅ Custom LSP1 Forwarder permissions have been set successfully');
```

</TabItem>
  <TabItem value="method2" label="Method 2 - Set LSP1 Forwarder as an operator">

```ts
import ethers from 'ethers';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP7DigitalAsset from '@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json';

// code from previous steps here...
// including the instance of the `lsp1Forwarder` and the address of the LSP7 Token contract.

const MY_USDC_TOKEN = '0x63890ea231c6e966142288d805b9f9de7e0e5927';

const lsp1Forwarder = await lsp1ForwarderFactory.deploy(
  TOKEN_RECIPIENT as string,
  PERCENTAGE as string,
  [MY_USDC_TOKEN],
);

// Create an instance of our Universal Profile
const UNIVERSAL_PROFILE_ADDRESS = '0x...';

const universalProfile = new ethers.Contract(
  UNIVERSAL_PROFILE_ADDRESS,
  UniversalProfile.abi,
  signer,
);

console.log('⏳ Authorizing Custom LSP1 Delegate contract on Custom Token');

const lsp7Interface = new ethers.Interface(LSP7DigitalAsset.abi);

const authorizeOperatorCalldata = const authBytes = lsp7Interface.encodeFunctionData(
  'authorizeOperator',
  [lsp1Forwarder.address, ethers.MaxUint256, '0x'], // we authorize the LSP1 Forwarder to spend an unlimited amount of the UP's USDC Tokens
);

// Execute the function call as the UP
const authTxWithBytes = await universalProfile.execute(
  OPERATION_TYPES.CALL,
  MY_USDC_TOKEN,
  0,
  authBytes,
);
await authTxWithBytes.wait();
console.log(
  '✅ LSP1 Forwarder contract authorized on My USDC Token for UP 🫡',
  UNIVERSAL_PROFILE_ADDRESS,
);
```

</TabItem>

</Tabs>

## 🧪 Testing our LSP1 Forwarder

Now that all the pieces are connected, we can try it out!

The expected behaviour is that **everytime the UP on which the custom LSP1 Forwarder contract has been set receives an allowed token (either through `transfer` or `mint`), it will automatically send a percentage to the specified recipient.**

Here are the test data:

- I set up the custom LSP1 Delegate contract on a test UP (neo: `0xD62940E95A7A4a760c96B1Ec1434092Ac2C4855E`)
- I created a custom LSP7 token named "My USDC" with symbol "MUSDC" (LSP7: `0x63890ea231c6e966142288d805b9f9de7e0e5927` / owner neo / 20k pre-minted to neo)
- The custom LSP1 Delegate contract will send 20% of the received (transfer or mint) MUSDC
- The recipient will be another test UP (karasu: `0xe5B9B2C3f72bA13fF43A6CfC6205b5147F0BEe84`)
- The custom LSP1 Delegate contract is deployed at address `0x4f614ebd07b81b42373b136259915b74565fedf5`

Let's go to [the test dapp](https://up-test-dapp.lukso.tech/) and connect with neo's profile.

<div style={{textAlign: 'center'}}>
<img
    src="/img/guides/lsp1/TestConnectNeo.png"
    alt="TestConnectNeo"
/>
</div>

Click on "Refresh tokens" to see our `MUSDC` balance.

<div style={{textAlign: 'center'}}>
<img
    src="/img/guides/lsp1/TestRefreshTokens.png"
    alt="TestRefreshTokens"
/>
<img
    src="/img/guides/lsp1/TestPreMint.png"
    alt="TestPreMint"
/>
</div>

Use the "Mint" box to mint an additional 10k `MUSDC` to ourself (to neo's UP). This should trigger the custom LSP1 Delegate forwarder and send 20% of 10k (= 2k) to karasu.

<div style={{textAlign: 'center'}}>
<img
    src="/img/guides/lsp1/TestMintTx.png"
    alt="TestMintTx"
/>
</div>

We will then disconnect neo's profile from the test dapp.

:::note

There is a bug currently on the test dapp where the `disconnect` button doesn't work properly. In order to disconnect from the dapp, we need to remove the connection from the "connections" tab by clicking the ❌ icon on the right.

:::

<div style={{textAlign: 'center'}}>
<img
    src="/img/guides/lsp1/TestDisconnectNeo.png"
    alt="TestDisconnectNeo"
/>
</div>

We connect karasu's profile to the test dapp

<div style={{textAlign: 'center'}}>
<img
    src="/img/guides/lsp1/TestConnectKarasu.png"
    alt="TestConnectKarasu"
/>
</div>

... click on "Refresh tokens" and ...

<div style={{textAlign: 'center'}}>
<img
    src="/img/guides/lsp1/TestSuccess.png"
    alt="TestSuccess"
/>
</div>

... Success 🎉 ! Our custom LSP1 Delegate forwarder worked as expected!

## Congratulations 🥳

You now have a fully functional custom LSP1 Delegate contract that will automatically forward a certain amount of the allowed received tokens to another UP!
