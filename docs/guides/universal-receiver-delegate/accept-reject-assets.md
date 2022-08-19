---
sidebar_label: 'Accept & Reject Assets'
sidebar_position: 2
---

# Accept & Reject Assets

Each user can create its own **custom Universal Receiver Delegate** contract that holds its own logic to be executed once the **[`universalReceiver(..)`](../../standards/smart-contracts/lsp0-erc725-account.md#universalreceiver)** function on his profile is called. 

![LSP1UniversalReceiverDelegate-Guide](/img/guides/UniversalReceiverDelegate-Guide.jpeg)

## Rejecting all Assets

In order to **reject all the assets** that are being transferred to the profile, we need to create a Universal Receiver Delegate contract that reverts when it's the case of asset transfer (LSP7 & LSP8). The [`typeId`](../../standards//smart-contracts/lsp0-erc725-account.md#universalreceiver) is the parameter that will give us more context on the call being made.


*e.g.*
- If `typeId` is **[`0xdbe2c314e1aee2970c72666f2ebe8933a8575263ea71e5ff6a9178e95d47a26f` _TYPEID_LSP7_TOKENSRECIPIENT](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP7DigitalAsset/LSP7Constants.sol#L13)**, then we know that we are receiving an LSP7 Token.

- If `typeId` is **[`0xc7a120a42b6057a0cbed111fbbfbd52fcd96748c04394f77fc2c3adbe0391e01` _TYPEID_LSP8_TOKENSRECIPIENT](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP8IdentifiableDigitalAsset/LSP8Constants.sol#L21)**, then we know that we are receiving an LSP8 Token.



### Step1 - Deploy contract through Remix

The first step is to navigate to **[Remix's website](https://remix.ethereum.org/)** and create a new solidity file under the **contracts** folder.

![Creating Universal Receiver Delegate in Remix](/img/guides/remix-creating-file.jpeg)

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

If you want the Universal Receiver Delegate to **reject Vaults**, you can add the LSP9 import statement and modify the if block to include the LSP9 typeId.


```sol 
// constants
// [..] other imports
import {_TYPEID_LSP9_VAULTRECIPIENT} from "https://github.com/lukso-network/lsp-smart-contracts/blob/v0.6.2/contracts/LSP9Vault/LSP9Constants.sol";

// ...

if(typeId == _TYPEID_LSP9_VAULTRECIPIENT || typeId == _TYPEID_LSP7_TOKENSRECIPIENT || typeId == _TYPEID_LSP8_TOKENSRECIPIENT){
  revert ReceivingAssetsAndVaultsNotAllowed(caller, msg.sender); // also needs to be changed in the error reference
}
```

:::note

Please make sure to unlock MetaMask and disable Browser Extension while doing this step.
![Turning off Browser extension to use Remix Injected Provider](/img/guides/turn-off-browser-extension.jpeg)

:::

After copying the code, navigate to the **Solidity Compiler** tab and press the Compile UniversalReceiverDelegate.sol button. Then navigate to the **Deploy & Run Transactions** tab and choose _Injected Provider_ as the environment.


![Compiling contract in Remix](/img/guides/remix-compiling-contract.jpeg)

You should be connected to L16 in MetaMask and Remix and have enough LYXt in the EOA used to deploy the URD.

![Connect to LUKSO L16 in Remix](/img/guides/remox-connect-l16.jpeg)

After choosing the **CustomUniversalReceiverDelegate** contract in the *CONTRACT* section and deploying, you'll confirm the transaction and wait until the transaction is confirmed and the contract is deployed on the network. Once deployed, you can copy the contract address to be used later when setting the address inside the storage.

![Deploy and Copy the address in Remix](/img/guides/remix-deploy-copy-address.jpeg)


### Step2 - Set the address of the URD in the storage

After deploying the contract, we need to set its address under the **[LSP1-UniversalReceiverDelegate Data Key](../../standards/generic-standards/lsp1-universal-receiver.md#extension)**.

```typescript title="Setting address of the URD in the storage"
import Web3 from 'web3';
import constants from "@lukso/lsp-smart-contracts/constants.js";
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';

const web3 = new Web3('https://rpc.l16.lukso.network');

const PRIVATE_KEY = '0x...'; // your EOA private key
const myEOA = web3.eth.accounts.wallet.add(PRIVATE_KEY);

const URD_DATA_KEY = constants.ERC725YKeys.LSP0.LSP1UniversalReceiverDelegate;
const myURDAddress = "0x.." // address of the URD Deployed in Step 1
const myUniversalProfileAddress = "0x.." // address of the UP

// create an instance of the UP
const myUP = new web3.eth.Contract(UniversalProfile.abi, myUniversalProfileAddress);

// encode setData Payload on the Vault
const setDataPayload = await myUP.methods[
    "setData(bytes32,bytes)"
  ](URD_DATA_KEY, myURDAddress).encodeABI(); 

// getting the Key Manager address from UP
const myKeyManagerAddress = await myUP.methods.owner().call();

// create an instance of the KeyManager
let myKM = new web3.eth.Contract(LSP6KeyManager.abi, myKeyManagerAddress);

// execute the executePayload on the KM
await myKM.methods.execute(executePayload).send({
    from: myEOA.address,
    gasLimit: 600_000,
});
```

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

The code above will register the address of the assets allowed and remove them when the UP's balance for this asset is equal to 0. It will also reject assets that are not allowed. Since this code will need **[SETDATA Permission](../../standards/universal-profile/lsp6-key-manager.md#permissions)**, after deploying you will set the address of the URD in the storage using the code from the **[Set the address of the URD in the storage](./set-default-implementation.md#set-the-address-of-the-urd-in-the-storage)** section.
