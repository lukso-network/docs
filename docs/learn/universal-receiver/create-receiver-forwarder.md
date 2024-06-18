---
sidebar_label: 'Create a LSP1 Forwarder'
sidebar_position: 2
description: This smart contract tutorial guides you on how to create a LSP1 Delegate contract that forwards portion of received tokens automatically to any address.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create a LSP1 Forwarder

In this guide, we will create a custom [Universal Receiver Delegate](../../standards/generic-standards/lsp1-universal-receiver-delegate.md) contract. This contract will be called each time the associated UP receives a [LSP7 token](../../standards/tokens/LSP7-Digital-Asset.md), and will forward a certain percentage to another address.

The use-case it answers is:

> **"As a Universal Profile (UP) owner, I want to transfer part of the tokens I received to another UP"**.

An example scenario could be: _"each time I receive USDT, I want to automatically transfer 20% to my wife's UP"_.

## Setup & Requirements

:::success Tips

If you want to follow this guide using not an existing token, but a new token that you want to create and deploy yourself, check our guide [**"Create a Custom LSP7 Token"**](../digital-assets/smart-contract-developers/getting-started.md#create-a-custom-lsp7-token-contract).

:::

:::info

This guide is working with version above 0.14.0 of the [`@lukso/lsp-smart-contracts`] package.

:::

In order to follow this guide, you will need the followings:

1. Downloaded and installed the [UP Browser extension](/install-up-browser-extension).
2. Fund the main EOA controller of your 🆙 (See **[Step 1](#step-1---enable-your-controller-to-add-a-universal-receiver) bullet point 3** to retrieve its address) using the [Testnet Faucet](https://faucet.testnet.lukso.network/).
3. The address of the LSP7 token that you want to use to forward of portion of the amount received.
4. Installed the v0.14.0 [`@lukso/lsp-smart-contracts`](../../contracts/introduction.md) library.

```bash
npm i @lukso/lsp-smart-contracts@v0.14.0
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

The custom LSP1 Delegate contract can be created using 2 methods of interaction flows.

### Two Design Options

In order to transfer a portion of the tokens received to another address, we can instruct the LSP1 Forwarder contract to re-call the LSP7 [`transfer(...)`](../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#transfer) function:

- **method 1:** via the [**`execute(...)` function of the 🆙**](../../contracts/contracts/UniversalProfile/UniversalProfile.md#execute).
- **method 2:** directly on the LSP7 contract **after having authorized the LSP1 Forwarder as an operator via [`authorizeOperator(...)`](../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#authorizeoperator)**.

For method 1 to work, the LSP1 Forwarder contract will need the permissions [`SUPER_CALL` + `REENTRANCY`](../../standards/universal-profile/lsp6-key-manager.md#permissions) on the UP.

For method 2 to work, the LSP1 Forwarder contract needs to be authorized as an operator at the LSP7 level (using [`authorizeOperator`](../../../contracts/contracts/LSP7DigitalAsset/#authorizeoperator)) with unlimited amount (`type(uint256).max`).

Below are some of the advantages and disadvantages of both methods.

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

## Step 3 - Compile & Deploy our LSP1 Forwarder contract

Now that we have created our custom LSP1 Delegate Forwarder contract, we will deploy it on LUKSO Testnet.

We will use a script in Hardhat to deploy our LSP1 Forwarder contract. We will use our main controller address (by exporting its private key from the UP Browser Extension and adding it in a `.env` file).

### 3.1 - Compile the contract

This will generate its artifacts, including its ABI and bytecode.

```bash
hardhat compile
```

### 3.2 - Deploy the contract

Create the following file under the `scripts/` folder in your Hardhat project.

```ts title="scripts/deployLSP1Forwarder.ts"
import hre from 'hardhat';
import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';
import LSP1URDForwarder from "../artifacts/contracts/Tokens/LSP1URDForwarder.sol/LSP1URDForwarder.json';";
import {
  ERC725YDataKeys,
  LSP1_TYPE_IDS,
  PERMISSIONS,
  OPERATION_TYPES,
} from '@lukso/lsp-smart-contracts';

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

```ts
async function main() {
  // -------------------------
  // GRANT LSP1 Delegate contract PERM - METHOD 1
  // -------------------------
  // COMMENT IF YOU USE METHOD 2

  // we need the key to store our custom LSP1 Delegate contract address
  // {_LSP1_UNIVERSAL_RECEIVER_DELEGATE_PREFIX + <bytes32 typeId>}
  console.log('⏳ Registering custom URD on the UP');
  const URDdataKey =
    ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegatePrefix +
    LSP1_TYPE_IDS.LSP7Tokens_RecipientNotification.slice(2).slice(0, 40);

  // we will update the keys for:
  // - the custom LSP1 Delegate with a specific TYPE_ID (with our custom LSP1 Delegate contract address)
  // - the permission of this custom LSP1 Delegate contract (this will create a new controller in the Browser Extension)
  const dataKeys = [
    URDdataKey,
    ERC725YDataKeys.LSP6['AddressPermissions:Permissions'] +
      CustomURDAddress.slice(2),
  ];

  // Calculate the correct permission (SUPER_CALL + REENTRANCY)
  const permInt =
    parseInt(PERMISSIONS.SUPER_CALL, 16) ^ parseInt(PERMISSIONS.REENTRANCY, 16);
  const permHex = '0x' + permInt.toString(16).padStart(64, '0');
  const dataValues = [CustomURDAddress, permHex];

  // execute the tx
  const setDataBatchTx = await UP.connect(signer).setDataBatch(
    dataKeys,
    dataValues,
  );
  await setDataBatchTx.wait();
  console.log('✅ Custom URD has been correctly registered on the UP');

  // ----------------------------------------------------------------
  // REGISTER LSP1 UNIVERSAL RECEIVER + AUTHORIZE OPERATOR - METHOD 2
  // ----------------------------------------------------------------
  // COMMENT IF YOU USE METHOD 1

  // we need the key to store our custom LSP1 Delegate contract address
  // {_LSP1_UNIVERSAL_RECEIVER_DELEGATE_PREFIX + <bytes32 typeId>}
  console.log('⏳ Registering custom LSP1 Delegate on the UP');
  const URDdataKey =
    ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegatePrefix +
    LSP1_TYPE_IDS.LSP7Tokens_RecipientNotification.slice(2).slice(0, 40);

  // execute the tx
  const setDataTx = await UP.connect(signer).setData(
    URDdataKey,
    CustomURDAddress,
  );
  await setDataTx.wait();
  console.log(
    '✅ Custom LSP1 Delegate has been correctly registered on the UP',
  );

  console.log('⏳ Authorizing Custom LSP1 Delegate contract on Custom Token');
  // we only authorize the first contract in the contractsAddr array, but feel free to add a loop :)
  const CustomToken = await ethers.getContractAt(
    'CustomToken',
    contractsAddr[0] as string,
  );

  // Create the function call by encoding the function to be called and the params
  const authBytes = CustomToken.interface.encodeFunctionData(
    'authorizeOperator',
    [CustomURDAddress, ethers.MaxUint256, '0x'], // we authorize CustomURDAddress to spend ethers.MaxUint256
  );
  // Execute the function call as the UP
  const authTxWithBytes = await UP.connect(signer).execute(
    OPERATION_TYPES.CALL,
    await CustomToken.getAddress(),
    0,
    authBytes,
  );
  await authTxWithBytes.wait();
  console.log(
    '✅ LSP1 Delegate contract authorized on Custom Token for UP ',
    await UP.getAddress(),
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

We can now deploy our custom LSP1 Delegate contract by running:

```bash
npx hardhat run scripts/deployLSP1Forwarder.ts --network luksoTestnet
```

## Step 4 - Register our LSP1 Forwarder

Now that you have deployed a custom LSP1 Delegate forwarder contract, we will register it on our Universal Profile for when received LSP7 token transfers.

## Step 5 - Complete the LSP1 Forwarder setup

Depending on the method selected, we will either:

- **Method 1:** grant permission to the custom LSP1 Delegate contract to call the UP (`SUPER_CALL` + `REENTRANCY`)
- **Method 2:** call [`authorizeOperator()`](../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#authorizeoperator) on the LSP7 token to authorize the custom LSP1 Delegate contract to spend token on the UP's behalf
