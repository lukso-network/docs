---
sidebar_label: 'Accept & Reject Assets'
sidebar_position: 7
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Accept & Reject Assets

Each user can create a **Universal Receiver Delegate** contract with some **custom logic**, which can run automatically on calls to the **[`universalReceiver(..)`](../../../contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.md#universalreceiver)** function of the user's Universal Profile based on specific typeIds.

![LSP1UniversalReceiverDelegate-Guide](/img/guides/lsp1/UniversalReceiverDelegate-Guide.jpeg)

## Reject any Assets

To **reject any assets** received by the Universal Profile, we need to create a Universal Receiver Delegate contract that reverts when there is an asset transfer (LSP7 & LSP8). The [`typeId`](../../../contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.md#universalreceiver) parameter will give us more context on the call being made.

| 📢 Type ID to notify when receiving an LSP7 token 🪙                 |
| :------------------------------------------------------------------- |
| `TYPEID_LSP7_TOKENSRECIPIENT`                                        |
| `0x429ac7a06903dbc9c13dfcb3c9d11df8194581fa047c96d7a4171fc7402958ea` |

| 📢 Type ID to notify when receiving an LSP8 NFT 🖼️                   |
| :------------------------------------------------------------------- |
| `TYPEID_LSP8_TOKENSRECIPIENT`                                        |
| `0x20804611b3e2ea21c480dc465142210acf4a2485947541770ec1fb87dee4a55c` |

:::success TypeIds available

A full list of LSP1 TypeIds that can be filtered from the `UniversalReceiver` event can be found under the [**contract > Universal Receiver TypeIds**](../../../contracts/type-ids.md)

:::

### 1 - Deploy contract via Remix

1. First go to the **[Remix's website](https://remix.ethereum.org/)**. Create a new solidity file `UniversalReceiverDelegate.sol` under the **contracts** folder.

![Creating Universal Receiver Delegate in Remix](/img/guides/lsp1/remix-creating-file.jpeg)

2. Copy the code snippet below inside the file. It contains the logic for rejecting any LSP7 & LSP8 assets being transferred to the Universal Profile.

```solidity title="UniversalReceiverDelegate.sol - Solidity Code snippet of the URD that reject any assets"
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// This code is only used for guides purpose, it is working but not verified nor audited.

// modules
import {LSP1UniversalReceiverDelegateUP} from "@lukso/lsp-smart-contracts/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol";

// constants
import {_TYPEID_LSP7_TOKENSRECIPIENT} from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/LSP7Constants.sol";
import {_TYPEID_LSP8_TOKENSRECIPIENT} from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8Constants.sol";

contract CustomUniversalReceiverDelegate is LSP1UniversalReceiverDelegateUP  {

    /**
    * @param asset The address of the asset being transferred to the UniversalProfile.
    * @param asset The address disallowing receiving assets.
    */
    error ReceivingAssetsNotAllowed(address asset, address recipient);

    /**
    * @dev Reverts when the typeId is relative to token receiving (LSP7 & LSP8)
    * @param caller The address of the asset informing the `universalReceiver(..)` function on the UniversalProfile.
    * @param value The amount of native tokens sent by the caller to the universalReceiver function on the UniversalProfile.
    * @param typeId The typeId representing the context of the call to the universalReceiver function on the UniversalProfile.
    * @param typeId The data sent to the universalReceiver function on the UniversalProfile.
    */
    function universalReceiverDelegate(
        address caller,
        uint256 value,
        bytes32 typeId,
        bytes memory data
    ) public override returns (bytes memory result) {
        if (typeId == _TYPEID_LSP7_TOKENSRECIPIENT || typeId == _TYPEID_LSP8_TOKENSRECIPIENT){
            revert ReceivingAssetsNotAllowed(caller, msg.sender);
        }
    }
}

```

:::note

Please make sure to unlock MetaMask and disable Browser Extension while doing this step.
![Turning off Browser extension to use Remix Injected Provider](/img/guides/lsp1/turn-off-browser-extension.jpeg)

:::

3. Go to the **Solidity Compiler** tab and press the **"Compile `UniversalReceiverDelegate.sol`"** button.
4. Then navigate to the **Deploy & Run Transactions** tab and choose _Injected Provider_ as the environment.

![Compiling contract in Remix](/img/guides/lsp1/remix-compiling-contract.jpeg)

You should be connected to LUKSO Testnet in MetaMask and Remix and have enough LYXt in the EOA used to deploy the URD.
If you do not have enough LYXt, request them from the [LUKSO Testnet Faucet](../../../networks/testnet/parameters.md).

![Connect to LUKSO Testnet in Remix](/img/guides/lsp1/remix-connect-testnet.jpg)

5. Select the **`CustomUniversalReceiverDelegate`** in the dropdown list of contracts and click on the **deploy** button.

6. You will have to confirm the transaction and wait until the transaction has been validated on the network.

7. Once the contract deployed, copy and save the contract address. This address will be used in the next section.

![Deploy and Copy the address in Remix](/img/guides/lsp1/remix-deploy-copy-address.jpeg)

You have successfully deployed your **CustomUniversalReceiverDelegate** contract on LUKSO Testnet! 🙌🏻

We now need to set its address under the **[LSP1-UniversalReceiverDelegate Data Key](../../../standards/accounts/lsp1-universal-receiver.md#extension)** inside the UP's storage. We will do that **via a custom script in step 2** using web3.js or ether.js.

### 2 - Install dependencies for script

Make sure you have the following dependencies installed before beginning this tutorial:

- Either [`web3.js`](https://github.com/web3/web3.js) or [`ethers.js`](https://github.com/ethers-io/ethers.js/)
- [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)

<Tabs>

  <TabItem value="ethers" label="ethers">

```shell title="Install the dependencies"
npm install ethers @lukso/lsp-smart-contracts
```

  </TabItem>
  
  <TabItem value="web3" label="web3">

```shell title="Install the dependencies"
npm install web3 @lukso/lsp-smart-contracts
```

  </TabItem>

</Tabs>

### 3 - Create instance of the 🆙

First we need to create an instance of the [`UniversalProfile`](../../../contracts/contracts/UniversalProfile.md) contract. We will need:

- the `UniversalProfile` ABI from the [`@lukso/lsp-smart-contracts`](../../../contracts/introduction.md) package.
- the Universal Profile's address, retrieved by [connecting to the UP Browser Extension](../connect-profile/connect-up.md)

<Tabs>

  <TabItem value="ethers" label="ethers">

```typescript title="Create instance of Universal Profile"
import { ethers } from 'ethers';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

// connect to the UP Browser Extension
const provider = new ethers.BrowserProvider(window.lukso);

// Retrieve address of the Universal Profile
const accounts = await provider.send('eth_requestAccounts', []);

// create an instance of the Universal Profile
const universalProfile = new ethers.Contract(accounts[0], UniversalProfile.abi);
```

  </TabItem>
  
  <TabItem value="web3" label="web3">

```typescript title="Create instance of Universal Profile"
import Web3 from 'web3';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

// connect to the UP Browser Extension
const provider = new Web3(window.lukso);

// Retrieve address of the Universal Profile
const accounts = await provider.eth.requestAccounts();

// create an instance of the Universal Profile
const universalProfile = new web3.eth.Contract(
  UniversalProfile.abi,
  accounts[0], // Universal Profile address
);
```

  </TabItem>

</Tabs>

### 4 - Setup the LSP1 Universal Receiver Delegate

Finally, we need to send the transaction that will update the URD of the Universal Profile.

<Tabs>

  <TabItem value="ethers" label="ethers">

```typescript title="Update the Universal Profile's URD"
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

// code from step 2.2 ...

// Update the profile data
await universalProfile.setData(
  ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegate, // URD Data Key from `@lukso/lsp-smart-contracts` package
  '0x...', // address of the Universal Receiver Delegate contract deployed in step 1
  {
    from: accounts[0],
  },
);
```

  </TabItem>
  
  <TabItem value="web3" label="web3">

```typescript title="Update the Universal Profile's URD"
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

// code from step 2.2 ...

// Update the profile data
await universalProfile.methods
  .setData(
    ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegate, // URD Data Key from `@lukso/lsp-smart-contracts` package
    '0x...', // address of the Universal Receiver Delegate contract deployed in step 1
  )
  .send({
    from: accounts[0],
  });
```

  </TabItem>

</Tabs>

### Final code

<Tabs>

  <TabItem value="ethers" label="ethers">

```typescript title="Update the Universal Profile URD"
import { ethers } from 'ethers';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts/constants.js';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

// connect to the UP Browser Extension
const provider = new ethers.BrowserProvider(window.lukso);

// Retrieve address of the Universal Profile
const accounts = await provider.send('eth_requestAccounts', []);

// create an instance of the Universal Profile
const universalProfile = new ethers.Contract(accounts[0], UniversalProfile.abi);

// Update the profile data
await universalProfile.setData(
  ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegate, // URD Data Key from `@lukso/lsp-smart-contracts` package
  '0x...', // address of the Universal Receiver Delegate contract deployed in step 1
  {
    from: accounts[0],
  },
);
```

  </TabItem>
  
  <TabItem value="web3" label="web3">

```typescript title="Update the Universal Profile URD"
import Web3 from 'web3';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts/constants.js';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

// connect to the UP Browser Extension
const provider = new Web3(window.lukso);

// Retrieve address of the Universal Profile
const accounts = await provider.eth.requestAccounts();

// create an instance of the Universal Profile
const universalProfile = new web3.eth.Contract(
  UniversalProfile.abi,
  accounts[0], // Universal Profile address
);

// Update the profile data
await universalProfile.methods
  .setData(
    ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegate, // URD Data Key from `@lukso/lsp-smart-contracts` package
    '0x...', // address of the Universal Receiver Delegate contract deployed in step 1
  )
  .send({
    from: accounts[0],
  });
```

  </TabItem>

</Tabs>

## Accepting specific Assets

To accept specific assets, you should differentiate between the different assets being transferred to you.

One way to do it is to have a mapping inside the URD contract that states if the asset being transferred **is allowed to be received or not**. Only the owner should be allowed to add these asset addresses. For simplicity, the owner could be the EOA address deploying the contract.

Repeat the deployment steps in **[Rejecting all Assets](#rejecting-all-assets)** section and replace the solidity code with the one written below.

```solidity title="Solidity Code snippet of the Custom URD that accept specific assets"
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// This code is only used for guides and demonstration purpose

// modules
import {LSP1UniversalReceiverDelegateUP} from "@lukso/lsp-smart-contracts/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol";

// constants
import {_TYPEID_LSP7_TOKENSRECIPIENT} from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/LSP7Constants.sol";
import {_TYPEID_LSP8_TOKENSRECIPIENT} from "@lukso/lsp-smart-contracts/contracts/LSP8IdentifiableDigitalAsset/LSP8Constants.sol";

contract CustomUniversalReceiverDelegate is LSP1UniversalReceiverDelegateUP  {

    address immutable public owner;
    mapping (address => bool) public allowedAssets;

    constructor(address _owner){
        owner = _owner;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "CustomUniversalReceiverDelegate : Caller is not the owner");
        _;
    }


    function setAllowedAssets(address assets) public onlyOwner {
        allowedAssets[assets] = true;
    }

    /**
     * @dev Reverts when the asset being transferred is not allowed. If allowed, the address of the asset
     * will be registered inside the storage, and removed when balance of the asset equal 0, according to
     * the LSP5-ReceivedAssets standard.
     *
     * @param caller The address of the asset informing the `universalReceiver(..)` function on the UniversalProfile.
     * @param value The amount of native tokens sent by the caller to the universalReceiver function on the UniversalProfile.
     * @param typeId The typeId representing the context of the call to the universalReceiver function on the UniversalProfile.
     * @param typeId The data sent to the universalReceiver function on  the UniversalProfile.
     */
    function universalReceiverDelegate(
        address caller,
        uint256 value,
        bytes32 typeId,
        bytes memory data
    ) public override returns (bytes memory result){
        // checking if the asset being transferred is allowed or not.
        if(typeId == _TYPEID_LSP8_TOKENSRECIPIENT || typeId == _TYPEID_LSP7_TOKENSRECIPIENT){
            require(allowedAssets[caller], "Asset being transferred is not allowed to be received");
        }
        // using the default implementation code to register the address of assets received
        result = super.universalReceiverDelegate(caller, value, typeId, data);
    }
}
```

The code above will register the address of the assets allowed and remove them when the UP's balance for this asset is 0. It will also reject assets that are not allowed.

Since this code will need **[SUPER_SETDATA Permission](../../../standards/access-control/lsp6-key-manager.md#super-permissions)**, after deploying it, you will set the address of the URD in the storage using the code from the **[Set the address of the URD in the storage](./deploy-universal-receiver.md#set-the-address-of-the-urd-in-the-storage)** section.

:::info

A similar mapping example that list allowed assets can be found in the guide [**Create an LSP1 Forwarder**](./create-receiver-forwarder.md)

:::
