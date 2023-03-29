---
sidebar_position: 3
---

# Solidity Contracts

The solidity sources of the [LUKSO smart contracts](../../standards/smart-contracts/introduction.md) are available in the `/contracts` folder.

```solidity
import "@lukso/lsp-smart-contracts/contracts/LSP0ERC725Account/LSP0ERC725Account.sol";

contract MyAccount is LSP0ERC725Account {
  constructor(address _newOwner) LSP0ERC725Account(_newOwner) {

  }
}
```
