# LSP10Utils

:::info Solidity contract

[`LSP10Utils.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/undefined)

:::


> LSP10 Utility library.



LSP5Utils is a library of functions that can be used to register and manage vaults received by an ERC725Y smart contract. Based on the LSP10 Received Vaults standard.

---

## Internal Methods


### generateReceivedVaultKeys








```solidity
function generateReceivedVaultKeys(address receiver, address vault, bytes32 vaultMapKey) internal view returns (bytes32[] keys, bytes[] values);
```




Generate an array of data keys/values pairs to be set on the receiver address after receiving vaults.





#### Parameters

| Name | Type | Description |
|---|:-:|---|
| `receiver` | `address` | The address receiving the vault and where the LSP10 data keys should be added. |
| `vault` | `address` | The address of the vault being received. |
| `vaultMapKey` | `bytes32` | The `LSP10VaultMap:&lt;vault&gt;` data key of the vault being received containing the interfaceId of the |


#### Returns

| Name | Type | Description |
|---|:-:|---|
| `keys` | `bytes32[]` | An array of 3 x data keys: `LSP10Vaults[]`, `LSP10Vaults[index]` and `LSP10VaultMap:&lt;asset&gt;`. |
| `values` | `bytes[]` | An array of 3 x data values: the new length of `LSP10Vaults[]`, the address of the asset under `LSP10Vaults[index]` |


### generateSentVaultKeys








```solidity
function generateSentVaultKeys(address sender, bytes32 vaultMapKey, uint128 vaultIndex) internal view returns (bytes32[] keys, bytes[] values);
```




Generate an array of data key/value pairs to be set on the sender address after sending vaults.





#### Parameters

| Name | Type | Description |
|---|:-:|---|
| `sender` | `address` | The address sending the vault and where the LSP10 data keys should be updated. |
| `vaultMapKey` | `bytes32` | The `LSP10VaultMap:&lt;vault&gt;` data key of the vault being sent containing the interfaceId of the |
| `vaultIndex` | `uint128` | The index at which the vault address is stored under `LSP10Vaults[]` Array. |


#### Returns

| Name | Type | Description |
|---|:-:|---|
| `keys` | `bytes32[]` | An array of 3 x data keys: `LSP10Vaults[]`, `LSP10Vaults[index]` and `LSP10VaultsMap:&lt;asset&gt;`. |
| `values` | `bytes[]` | An array of 3 x data values: the new length of `LSP10Vaults[]`, the address of the asset under `LSP10Vaults[index]` |


### getLSP10ReceivedVaultsCount
:::info

This function does not return a number but the raw bytes stored under the `LSP10Vaults[]` Array data key.

:::








```solidity
function getLSP10ReceivedVaultsCount(contract IERC725Y account) internal view returns (bytes);
```




Get the total number of vault addresses stored under the `LSP10Vaults[]` Array data key.





#### Parameters

| Name | Type | Description |
|---|:-:|---|
| `account` | `contract IERC725Y` | The ERC725Y smart contract to read the storage from. |


#### Returns

| Name | Type | Description |
|---|:-:|---|
| `0` | `bytes` | @return The raw bytes stored under the `LSP10Vaults[]` data key. |




---

---

