---
sidebar_label: '🤝 Accept & Reject Assets'
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Accept & Reject Assets

:::caution

This article is a WIP

:::

Each user can create its own **custom Universal Receiver Delegate** contract that holds its own logic to be executed once the **[`universalReceiver(..)`](../../contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.md#universalreceiver)** function on his profile is called.

![LSP1UniversalReceiverDelegate-Guide](/img/guides/lsp1/UniversalReceiverDelegate-Guide.jpeg)

## Rejecting all Assets

In order to **reject all the assets** that are being transferred to the profile, we need to create a Universal Receiver Delegate contract that reverts when it's the case of asset transfer (LSP7 & LSP8). The [`typeId`](../../contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.md#universalreceiver) is the parameter that will give us more context on the call being made.

_e.g._

- If `typeId` is **`0x429ac7a06903dbc9c13dfcb3c9d11df8194581fa047c96d7a4171fc7402958ea` \_TYPEID_LSP7_TOKENSRECIPIENT**, then we know that we are receiving a LSP7 Token.

- If `typeId` is **`0x20804611b3e2ea21c480dc465142210acf4a2485947541770ec1fb87dee4a55c` \_TYPEID_LSP8_TOKENSRECIPIENT**, then we know that we are receiving a LSP8 Token.

### Deploy contract through Remix

The first step is to navigate to **[Remix's website](https://remix.ethereum.org/)** and create a new solidity file under the **contracts** folder.

![Creating Universal Receiver Delegate in Remix](/img/guides/lsp1/remix-creating-file.jpeg)

After creating the **UniversalReceiverDelegate.sol** file, copy the code snippet below inside the file created. This code snippet will be responsible for rejecting all LSP7 & LSP8 assets being transferred to your profile.

```sol title="UniversalReceiverDelegate.sol - Solidity Code snippet of the URD that reject all assets"
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// This code is only used for guides puprose, it is working but not verified nor audited.

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

After copying the code, navigate to the **Solidity Compiler** tab and press the Compile UniversalReceiverDelegate.sol button. Then navigate to the **Deploy & Run Transactions** tab and choose _Injected Provider_ as the environment.

![Compiling contract in Remix](/img/guides/lsp1/remix-compiling-contract.jpeg)

You should be connected to LUKSO Testnet in MetaMask and Remix and have enough LYXt in the EOA used to deploy the URD.

![Connect to LUKSO Testnet in Remix](/img/guides/lsp1/remix-connect-testnet.jpg)

After choosing the **CustomUniversalReceiverDelegate** contract in the _CONTRACT_ section and deploying, you'll confirm the transaction and wait until the transaction is confirmed and the contract is deployed on the network. Once deployed, you can copy the contract address to be used later when setting the address inside the storage.

![Deploy and Copy the address in Remix](/img/guides/lsp1/remix-deploy-copy-address.jpeg)

### Set the address of the URD in the UP's storage

After deploying the contract, we need to set its address under the **[LSP1-UniversalReceiverDelegate Data Key](../../standards/generic-standards/lsp1-universal-receiver.md#extension)** inside the UP's storage.

### Install dependencies

Make sure you have the following dependencies installed before beginning this tutorial:

- Either [`web3.js`](https://github.com/web3/web3.js) or [`ethers.js`](https://github.com/ethers-io/ethers.js/)
- [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```shell title="Install the dependencies"
npm install web3 @lukso/lsp-smart-contracts
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```shell title="Install the dependencies"
npm install ethers @lukso/lsp-smart-contracts
```

  </TabItem>

</Tabs>

### Imports, constants and EOA

First, we need to get the _ABI_ for the Universal Profile contract.
After that we need to store the address of our Universal Profile and the new URD address.  
Then we will initialize the controller address.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Imports, Constants & EOA"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts/constants.js';
import Web3 from 'web3';

// constants
const web3 = new Web3('https://rpc.testnet.lukso.network');
const URD_DATA_KEY = ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegate;
const universalProfileAddress = '0x...';
const universalProfileURDAddress = '0x...';

// setup your EOA
const privateKey = '0x...';
const EOA = web3.eth.accounts.wallet.add(privateKey);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Imports, Constants & EOA"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts/constants.js';
import { ethers } from 'ethers';

// constants
const provider = new ethers.providers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);
const URD_DATA_KEY = ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegate;
const universalProfileAddress = '0x...';
const universalProfileURDAddress = '0x...';

// setup your EOA
const privateKey = '0x...'; // your EOA private key (controller address)
const EOA = new ethers.Wallet(privateKey).connect(provider);
```

  </TabItem>

</Tabs>

### Create UP contract instance

At this point we need to create an instance of the [**Universal Profile**](../../standards/universal-profile/lsp0-erc725account.md) contract:

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Contract instance for the Universal Profile"
// create an instance of the Universal Profile
const universalProfile = new web3.eth.Contract(
  UniversalProfile.abi,
  universalProfileAddress,
);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Contract instance for the Universal Profile"
// create an instance of the Universal Profile
const universalProfile = new ethers.Contract(
  universalProfileAddress,
  UniversalProfile.abi,
);
```

  </TabItem>

</Tabs>

### Setup the LSP1 Universal Receiver Delegate

Finally, we need to send the transaction that will update the URD of the Universal Profile.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Update the Universal Profile data"
// Update the profile data
await universalProfile.methods
  .setData(URD_DATA_KEY, universalProfileURDAddress)
  .send({
    from: EOA.address,
    gasLimit: 600_000,
  });
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Update the Universal Profile data"
// Update the profile data
await universalProfile
  .connect(EOA)
  .setData(URD_DATA_KEY, universalProfileURDAddress);
```

  </TabItem>

</Tabs>

### Final code

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Update the Universal Profile URD"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts/constants.js';
import Web3 from 'web3';

// constants
const web3 = new Web3('https://rpc.testnet.lukso.network');
const URD_DATA_KEY = ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegate;
const universalProfileAddress = '0x...';
const universalProfileURDAddress = '0x...';

// setup your EOA
const privateKey = '0x...';
const EOA = web3.eth.accounts.wallet.add(privateKey);

// create an instance of the Universal Profile
const universalProfile = new web3.eth.Contract(
  UniversalProfile.abi,
  universalProfileAddress,
);

// execute the executeCalldata on the Key Manager
await universalProfile.methods
  .setData(URD_DATA_KEY, universalProfileURDAddress)
  .send({
    from: EOA.address,
    gasLimit: 600_000,
  });
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Update the Universal Profile URD"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts/constants.js';
import { ethers } from 'ethers';

// constants
const provider = new ethers.providers.JsonRpcProvider(
  'https://rpc.testnet.lukso.network',
);
const URD_DATA_KEY = ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegate;
const universalProfileAddress = '0x...';
const universalProfileURDAddress = '0x...';

// setup your EOA
const privateKey = '0x...'; // your EOA private key (controller address)
const EOA = new ethers.Wallet(privateKey).connect(provider);

// create an instance of the Universal Profile
const universalProfile = new ethers.Contract(
  universalProfileAddress,
  UniversalProfile.abi,
);

// execute the executeCalldata on the Key Manager
await universalProfile
  .connect(EOA)
  .setData(URD_DATA_KEY, universalProfileURDAddress);
```

  </TabItem>

</Tabs>

## Accepting specific Assets

To accept specific assets, you should differentiate between the different assets being transferred to you. One way to do it is to have a mapping inside the URD contract that states if the asset being transferred **is allowed to be received or not**. Only the owner should be allowed to add these asset addresses. For simplicity, the owner could be the EOA address deploying the contract.

Repeat the deployment steps in **[Rejecting all Assets](#rejecting-all-assets)** section and replace the solidity code with the one written below.

```sol title="Solidity Code snippet of the Custom URD that accept specific assets"
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// This code is only used for guides puprose, it is working but not verified nor audited.

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
    * the LSP5-ReceivedAssers standard.
    *
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

The code above will register the address of the assets allowed and remove them when the UP's balance for this asset is equal to 0. It will also reject assets that are not allowed. Since this code will need **[SUPER_SETDATA Permission](../../standards/universal-profile/lsp6-key-manager.md#super-permissions)**, after deploying you will set the address of the URD in the storage using the code from the **[Set the address of the URD in the storage](./set-default-implementation.md#set-the-address-of-the-urd-in-the-storage)** section.
