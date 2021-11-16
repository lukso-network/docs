---
title: Overview
sidebar_position: 1
---

# **Overview**

Implementation of **[LUKSO Standard Proposal](../standards/introduction.md)** where most of the contracts are related directly to **UniversalProfile** and **NFT 2.0** subject. These 2 sections falls into sub-category where:

#### **UniversalProfile**

- **[LSP0-ERC725Account](./erc725-account)** contract implementation which forms the **UniversalProfiles** when **[LSP3-UniversalProfile-Metadata](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md)** is combined with.
- **[LSP6-KeyManager](./key-manager.md)** contract implementation.
- **[LSP1-UniversalReceiverDelegate](./universal-receiver-delegate.md)** contract implementation.

#### **NFT 2.0**

- **[LSP7-DigitalAsset](./digital-asset.md)** contract implementation.
- **[LSP8-IdentifiableDigitalAsset](./identifiable-digital-asset.md)** contract implementation.


-------------------------------------------------------------------------------------------------

### **Installation**

```bash
$ npm install @lukso/universalprofile-smart-contracts 
```

### **Usage**


In **Solidity:**

Once installed, you can use the contracts by importing them:

Create your own **UniversalProfile**:

```solidity
// MyUP.sol 
// SPDX-License-Identifier: MIT

import UniversalProfile from "@lukso/universalprofile-smart-contracts/contracts/UniversalProfile.sol";

pragma solidity ^0.8.0;

contract MyUP is UniversalProfile {

    constructor() UniversalProfile(OwnerAddress) {
        // ..
    }
}

```

Create your own **Fungible token**:

```solidity
// MyToken.sol 
// SPDX-License-Identifier: MIT

import LSP7DigitalAsset from "@lukso/universalprofile-smart-contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.sol";

pragma solidity ^0.8.0;

contract MyToken is LSP7DigitalAsset {
    // 4th argument (FALSE) marks that this contract serves as a Fungible Token and not as a NFT.
    constructor() LSP7("MyToken","MTKN",Owner,FALSE) {
        // ..
    }
}

```

In **Javascript:**

You can use the contracts JSON ABI by importing them as follow:

```js
import UniversalProfile from "@lukso/universalprofile-smart-contracts/artifacts/UniversalProfile.json";

const UniversalProfileContract = new this.web3.eth.Contract(UniversalProfile.abi, "", defaultOptions);
```


## **Learn More**

-------------------------------------------------------------------------------------------------------------

- **[Current Implementation](https://github.com/lukso-network/lsp-universalprofile-smart-contracts)**

- **[LSP0-ERC725Account Standard](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md)** forms the main piece that **UniversalProfiles** are build on.