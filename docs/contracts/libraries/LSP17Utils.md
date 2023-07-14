# LSP17Utils

:::info Solidity contract

[`LSP17Utils.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP17ContractExtension/LSP17Utils.sol)

:::

> LSP17 Utility library to check an extension

---

## Internal Methods

### isExtension

```solidity
function isExtension(uint256 parametersLengthWithOffset, uint256 msgDataLength) internal pure returns (bool);
```

Returns whether the call is a normal call or an extension call by checking if
the `parametersLengthWithOffset` with an additional of 52 bytes supposed msg.sender
and msg.value appended is equal to the msgDataLength
