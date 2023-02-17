---
sidebar_label: 'Accept & Reject Assets'
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Accept & Reject Assets

Each user can create its own **custom Universal Receiver Delegate** contract that holds its own logic to be executed once the **[`universalReceiver(..)`](../../standards/smart-contracts/lsp0-erc725-account.md#universalreceiver)** function on his profile is called.

![LSP1UniversalReceiverDelegate-Guide](/img/guides/lsp1/UniversalReceiverDelegate-Guide.jpeg)

## Rejecting all Assets

In order to **reject all the assets** that are being transferred to the profile, we need to create a Universal Receiver Delegate contract that reverts when it's the case of asset transfer (LSP7 & LSP8). The [`typeId`](../../standards//smart-contracts/lsp0-erc725-account.md#universalreceiver) is the parameter that will give us more context on the call being made.

_e.g._

- If `typeId` is **[`0x429ac7a06903dbc9c13dfcb3c9d11df8194581fa047c96d7a4171fc7402958ea` \_TYPEID_LSP7_TOKENSRECIPIENT](https://github.com/lukso-network/lsp-smart-contracts/blob/v0.8.0/contracts/LSP7DigitalAsset/LSP7Constants.sol#L13)**, then we know that we are receiving a LSP7 Token.

- If `typeId` is **[`0x20804611b3e2ea21c480dc465142210acf4a2485947541770ec1fb87dee4a55c` \_TYPEID_LSP8_TOKENSRECIPIENT](https://github.com/lukso-network/lsp-smart-contracts/blob/v0.8.0/contracts/LSP8IdentifiableDigitalAsset/LSP8Constants.sol#L21)**, then we know that we are receiving a LSP8 Token.

### Step 1 - Deploy contract through Remix

The first step is to navigate to **[Remix's website](https://remix.ethereum.org/)** and create a new solidity file under the **contracts** folder.

![Creating Universal Receiver Delegate in Remix](/img/guides/lsp1/remix-creating-file.jpeg)

After creating the **UniversalReceiverDelegate.sol** file, copy the code snippet below inside the file created. This code snippet will be responsible for rejecting all LSP7 & LSP8 assets being transferred to your profile.

```sol title="UniversalReceiverDelegate.sol - Solidity Code snippet of the URD that reject all assets"
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// This code is only used for guides puprose, it is working but not verified nor audited.

// interfaces
import {LSP1UniversalReceiverDelegateUP} from "https://github.com/lukso-network/lsp-smart-contracts/blob/v0.6.2/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol";

// constants
import {_TYPEID_LSP7_TOKENSRECIPIENT} from "https://github.com/lukso-network/lsp-smart-contracts/blob/v0.6.2/contracts/LSP7DigitalAsset/LSP7Constants.sol";
import {_TYPEID_LSP8_TOKENSRECIPIENT} from "https://github.com/lukso-network/lsp-smart-contracts/blob/v0.6.2/contracts/LSP8IdentifiableDigitalAsset/LSP8Constants.sol";

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

You should be connected to L16 in MetaMask and Remix and have enough LYXt in the EOA used to deploy the URD.

![Connect to LUKSO L16 in Remix](/img/guides/lsp1/remix-connect-l16.jpeg)

After choosing the **CustomUniversalReceiverDelegate** contract in the _CONTRACT_ section and deploying, you'll confirm the transaction and wait until the transaction is confirmed and the contract is deployed on the network. Once deployed, you can copy the contract address to be used later when setting the address inside the storage.

![Deploy and Copy the address in Remix](/img/guides/lsp1/remix-deploy-copy-address.jpeg)

### Step 2 - Set the address of the URD in the UP's storage

After deploying the contract, we need to set its address under the **[LSP1-UniversalReceiverDelegate Data Key](../../standards/generic-standards/lsp1-universal-receiver.md#extension)** inside the UP's storage.

### Step 2.1 Setup

Make sure you have the following dependencies installed before beginning this tutorial.

- You can use either [`web3.js`](https://github.com/web3/web3.js) or [`ethers.js`](https://github.com/ethers-io/ethers.js/)
- You MUST install [`@lukso/lsp-smart-contracts`](https://github.com/lukso-network/lsp-smart-contracts/)

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

### Step 2.2 Imports, Contants and EOA

First, we need to get the _ABIs_ for the contracts that we will use later.
After that we need to store the address of our Universal Profile and the new URD address.  
Then we will initialize the controller address that will be used later.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Imports, Constants & EOA"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts/constants.js';
import Web3 from 'web3';

// constants
const web3 = new Web3('https://rpc.l16.lukso.network');
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
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts/constants.js';
import { ethers } from 'ethers';

// constants
const provider = new ethers.JsonRpcProvider('https://rpc.l16.lukso.network');
const URD_DATA_KEY = ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegate;
const universalProfileAddress = '0x...';
const universalProfileURDAddress = '0x...';

// setup your EOA
const privateKey = '0x...'; // your EOA private key (controller address)
const EOA = new ethers.Wallet(privateKey).connect(provider);
```

  </TabItem>

</Tabs>

### Step 2.3 Create contract instances

At this point we need to create instances of the following contracts:

- [**Universal Profile**](../../standards/universal-profile/lsp0-erc725account.md)
- [**Key Manager**](../../standards/universal-profile/lsp6-key-manager.md)

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Contract instances for the Universal Profile & Key Manager"
// create an instance of the Universal Profile
const universalProfile = new web3.eth.Contract(
  UniversalProfile.abi,
  universalProfileAddress,
);
// get the owner of the Universal Profile
// in our case it should be the address of the Key Manager
const keyManagerAddress = await universalProfile.methods.owner().call();
// create an instance of the LSP6KeyManager
const keyManager = new web3.eth.Contract(LSP6KeyManager.abi, keyManagerAddress);
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Contract instances for the Universal Profile & Key Manager"
// create an instance of the Universal Profile
const universalProfile = new ethers.Contract(
  universalProfileAddress,
  UniversalProfile.abi,
);
// get the owner of the Universal Profile
// in our case it should be the address of the Key Manager
const keyManagerAddress = await universalProfile.methods.owner().call();
// create an instance of the LSP6KeyManager
const keyManager = new ethers.Contract(keyManagerAddress, LSP6KeyManager.abi);
```

  </TabItem>

</Tabs>

### Step 2.4 Encode `setData(...)` calldata

Encode a calldata for `setData(bytes32,bytes)` that will update the URD of the Universal Profile.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Encode a calldata that will update the URD and its permissions"
// encode setData Calldata on the Universal Profile
const setDataCalldata = await universalProfile.methods[
  'setData(bytes32,bytes)'
](URD_DATA_KEY, universalProfileURDAddress).encodeABI();
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Encode a calldata that will update the URD and its permissions"
// encode setData Calldata on the Universal Profile
const setDataCalldata = await universalProfile.interface.encodeFunctionData(
  'setData(bytes32,bytes)',
  [URD_DATA_KEY, universalProfileURDAddress],
);
```

  </TabItem>

</Tabs>

### Step 2.5 Execute via the Key Manager

Finally, we need to send the transaction that will update the URD of the Universal Profile via the Key Manager.

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Execute the calldata on the Universal Profile via the Key Manager"
// execute the `setDataCalldata` on the Key Manager
await keyManager.methods['execute(bytes)'](setDataCalldata).send({
  from: EOA.address,
  gasLimit: 600_000,
});
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Execute the calldata on the Universal Profile via the Key Manager"
// execute the `setDataCalldata` on the Key Manager
await keyManager.connect(EOA)['execute(bytes)'](setDataCalldata);
```

  </TabItem>

</Tabs>

### Final code

<Tabs>
  
  <TabItem value="web3js" label="web3.js">

```typescript title="Imports, Constants & EOA"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts/constants.js';
import Web3 from 'web3';

// constants
const web3 = new Web3('https://rpc.l16.lukso.network');
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
// get the owner of the Universal Profile
// in our case it should be the address of the Key Manager
const keyManagerAddress = await universalProfile.methods.owner().call();
// create an instance of the Key Manager
const keyManager = new web3.eth.Contract(LSP6KeyManager.abi, keyManagerAddress);

// encode setData Calldata on the Vault
const setDataCalldata = await universalProfile.methods[
  'setData(bytes32,bytes)'
](URD_DATA_KEY, universalProfileURDAddress).encodeABI();

// execute the executeCalldata on the Key Manager
await keyManager.methods['execute(bytes)'](executeCalldata).send({
  from: EOA.address,
  gasLimit: 600_000,
});
```

  </TabItem>

  <TabItem value="ethersjs" label="ethers.js">

```typescript title="Imports, Constants & EOA"
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts/constants.js';
import { ethers } from 'ethers';

// constants
const provider = new ethers.JsonRpcProvider('https://rpc.l16.lukso.network');
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
// get the owner of the Universal Profile
// in our case it should be the address of the Key Manager
const keyManagerAddress = await universalProfile.methods.owner().call();
// create an instance of the Key Manager
const keyManager = new ethers.Contract(keyManagerAddress, LSP6KeyManager.abi);

// encode setData Calldata on the Vault
const setDataCalldata = await universalProfile.interface.encodeFunctionData(
  'setData(bytes32,bytes)',
  [URD_DATA_KEY, universalProfileURDAddress],
);

// execute the executeCalldata on the Key Manager
await keyManager.connect(EOA)['execute(bytes)'](executeCalldata);
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
import {LSP1UniversalReceiverDelegateUP} from "https://github.com/lukso-network/lsp-smart-contracts/blob/v0.6.2/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol";

// constants
import {_TYPEID_LSP7_TOKENSRECIPIENT} from "https://github.com/lukso-network/lsp-smart-contracts/blob/v0.6.2/contracts/LSP7DigitalAsset/LSP7Constants.sol";
import {_TYPEID_LSP8_TOKENSRECIPIENT} from "https://github.com/lukso-network/lsp-smart-contracts/blob/v0.6.2/contracts/LSP8IdentifiableDigitalAsset/LSP8Constants.sol";

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
