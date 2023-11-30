---
sidebar_position: 2
---

# Contracts ABI

You can import the [LUKSO smart contracts](../../contracts/introduction.md) ABIs from the `/artifacts` folder:

<!-- prettier-ignore-start -->

```javascript
import LSP0ERC725Account from '@lukso/lsp-smart-contracts/artifacts/LSP0ERC725Account.json';
import LSP6KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import LSP9Vault from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
// etc.

const accountContract = new web3.contract(LSP0ERC725Account.abi, "<contract-address>")
```

<!-- prettier-ignore-end -->
