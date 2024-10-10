---
title: Create a Fungible Token
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create a Fungible Token

<Tabs groupId="provider-lib">
  <TabItem value="hardcoded-constructor" label="Hardcoded deployment parameters" default>

```solidity title="MyToken.sol" {8-14} showLineNumbers
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {_LSP4_TOKEN_TYPE_TOKEN} from "@lukso/lsp4-contracts/contracts/LSP4Constants.sol";
import {LSP7DigitalAsset} from "@lukso/lsp7-contracts/contracts/LSP7DigitalAsset.sol";

contract MyToken is
    LSP7DigitalAsset(
        "MyToken", // token name
        "MTKN", // token symbol
        msg.sender, // contract owner
        _LSP4_TOKEN_TYPE_TOKEN, // token type as uint256 (0 for Token, 1 for NFT, 2 for Collection)
        false // make the token non divisible (true = 0 decimals, false = 18 decimals)
    )
{
    // Custom logic for your token...
}
```

  </TabItem>
  <TabItem value="dynamic-constructor" label="Dynamic deployment parameters">

```solidity title="MyToken.sol" {18-24} showLineNumbers
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {_LSP4_TOKEN_TYPE_TOKEN} from "@lukso/lsp4-contracts/contracts/LSP4Constants.sol";
import {LSP7DigitalAsset} from "@lukso/lsp7-contracts/contracts/LSP7DigitalAsset.sol";

contract MyToken is LSP7DigitalAsset {
    /// @dev Available options for 4th parameter token type (uint256)
    /// - 0 for Token
    /// - 1 for NFT
    /// - 2 for Collection
    constructor(
        string memory name_,
        string memory symbol_,
        address contractOwner_,
        bool isNonDivisible_
    )
        LSP7DigitalAsset(
            name_,
            symbol_,
            contractOwner_,
            _LSP4_TOKEN_TYPE_TOKEN,
            isNonDivisible_
        )
    {
        // constructor logic ...
    }

    // Custom logic for your token...
}

```

  </TabItem>
</Tabs>

## LSP7 Tokens extensions

The `@lukso/lsp7-contracts` package includes token extensions (similarly to OpenZeppelin contracts) that enables to include functionalities for building your token through inheritance.

| Extension contract                                                                               | Description                                                                                                                   |
| :----------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| [`LSP7Burnable.sol`](../contracts/contracts/LSP7DigitalAsset/extensions/LSP7Burnable.md)         | Exposes a public `burn(...)` function that allows any token holder or operator to burn any amount of tokens.                  |
| [`LSP7CappedSupply.sol`](../contracts/contracts/LSP7DigitalAsset/extensions/LSP7CappedSupply.md) | Enable to specify a maximum supply on deployment / initialization, which cap the maximum amount of tokens that can be minted. |

If your token contract uses the proxy pattern with initialize functions, use the `InitAbstract` version of these extension contracts (_e.g: `LSP7Burnable` -> `LSP7BurnableInitAbstract`_).

<Tabs groupId="provider-lib">
  <TabItem value="hardcoded-constructor" label="Hardcoded deployment parameters" default>

```solidity title="MyToken.sol" {19-20} showLineNumbers
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import { _LSP4_TOKEN_TYPE_TOKEN } from "@lukso/lsp4-contracts/contracts/LSP4Constants.sol";
import { LSP7DigitalAsset } from "@lukso/lsp7-contracts/contracts/LSP7DigitalAsset.sol";

// extensions
import { LSP7Burnable } from "@lukso/lsp7-contracts/contracts/extensions/LSP7Burnable.sol";
import { LSP7CappedSupply } from "@lukso/lsp7-contracts/contracts/extensions/LSP7CappedSupply.sol";

contract MyToken is
    LSP7DigitalAsset(
        "MyToken", // token name
        "MTKN", // token symbol
        msg.sender, // contract owner
        _LSP4_TOKEN_TYPE_TOKEN, // token type as uint256 (0 for Token, 1 for NFT, 2 for Collection)
        false // make the token non divisible (true = 0 decimals, false = 18 decimals)
    ),
    LSP7Burnable,
    LSP7CappedSupply(42_000_000 * 10 ** super.decimals())
{
    function _mint(
        address to,
        uint256 amount,
        bool force,
        bytes memory data
    )
        internal
        virtual
        override(LSP7CappedSupply, LSP7DigitalAsset)
    {
        LSP7CappedSupply._mint(to, amount, force, data);
    }

    // Custom logic for your token...
}
```

  </TabItem>
  <TabItem value="dynamic-constructor" label="Dynamic deployment parameters">

```solidity title="MyToken.sol" {23-25} showLineNumbers
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import { _LSP4_TOKEN_TYPE_TOKEN } from "@lukso/lsp4-contracts/contracts/LSP4Constants.sol";
import { LSP7DigitalAsset } from "@lukso/lsp7-contracts/contracts/LSP7DigitalAsset.sol";

// extensions
import { LSP7Burnable } from "@lukso/lsp7-contracts/contracts/extensions/LSP7Burnable.sol";
import { LSP7CappedSupply } from "@lukso/lsp7-contracts/contracts/extensions/LSP7CappedSupply.sol";

contract MyToken is LSP7DigitalAsset, LSP7Burnable, LSP7CappedSupply {
    /// @dev Available options for 4th parameter token type (uint256)
    /// - 0 for Token
    /// - 1 for NFT
    /// - 2 for Collection
    constructor(
        string memory name_,
        string memory symbol_,
        address contractOwner_,
        bool isNonDivisible_,
        uint256 maxSupply_
    )
        LSP7DigitalAsset(name_, symbol_, contractOwner_, _LSP4_TOKEN_TYPE_TOKEN, isNonDivisible_)
        LSP7Burnable()
        LSP7CappedSupply(maxSupply_)
    {
        // constructor logic ...
    }

    function _mint(
        address to,
        uint256 amount,
        bool force,
        bytes memory data
    )
        internal
        virtual
        override(LSP7CappedSupply, LSP7DigitalAsset)
    {
        LSP7CappedSupply._mint(to, amount, force, data);
    }

    // Custom logic for your token...
}
```

  </TabItem>
</Tabs>
