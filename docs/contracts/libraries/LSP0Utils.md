# LSP0Utils

:::info Solidity contract

[`LSP0Utils.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/undefined)

:::


> Utility functions to query the storage of an LSP0ERC725Account.





---

## Internal Methods


### getLSP1DelegateValue








```solidity
function getLSP1DelegateValue(mapping(bytes32 =&gt; bytes) erc725YStorage) internal view returns (bytes);
```




Query internally the ERC725Y storage of a `ERC725Y` smart contract to retrieve
 the value set under the `LSP1UniversalReceiverDelegate` data key.





#### Parameters

| Name | Type | Description |
|---|:-:|---|
| `erc725YStorage` | `mapping(bytes32 =&gt; bytes)` | A reference to the ERC725Y storage mapping of the contract. |


#### Returns

| Name | Type | Description |
|---|:-:|---|
| `0` | `bytes` | @return The bytes value stored under the `LSP1UniversalReceiverDelegate` data key. |


### getLSP1DelegateValueForTypeId








```solidity
function getLSP1DelegateValueForTypeId(mapping(bytes32 =&gt; bytes) erc725YStorage, bytes32 typeId) internal view returns (bytes);
```




Query internally the ERC725Y storage of a `ERC725Y` smart contract to retrieve
 the value set under the `LSP1UniversalReceiverDelegate:<bytes32>` data key for a specific LSP1 `typeId`.





#### Parameters

| Name | Type | Description |
|---|:-:|---|
| `erc725YStorage` | `mapping(bytes32 =&gt; bytes)` | A reference to the ERC725Y storage mapping of the contract. |
| `typeId` | `bytes32` | A bytes32 LSP1 `typeId`; |


#### Returns

| Name | Type | Description |
|---|:-:|---|
| `0` | `bytes` | @return The bytes value stored under the `LSP1UniversalReceiverDelegate:&lt;bytes32&gt;` data key. |




---

---

