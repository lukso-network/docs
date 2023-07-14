# LSP5Utils

:::info Solidity contract

[`LSP5Utils.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/undefined)

:::


> LSP5 Utility library.



LSP5Utils is a library of functions that can be used to register and manage assets under an ERC725Y smart contract. Based on the LSP5 Received Assets standard.

---

## Internal Methods


### generateReceivedAssetKeys








```solidity
function generateReceivedAssetKeys(address receiver, address asset, bytes32 assetMapKey, bytes4 interfaceID) internal view returns (bytes32[] keys, bytes[] values);
```




Generate an array of data key/value pairs to be set on the receiver address after receiving assets.





#### Parameters

| Name | Type | Description |
|---|:-:|---|
| `receiver` | `address` | The address receiving the asset and where the LSP5 data keys should be added. |
| `asset` | `address` | The address of the asset being received (_e.g: an LSP7 or LSP8 token_). |
| `assetMapKey` | `bytes32` | The `LSP5ReceivedAssetMap:&lt;asset&gt;` data key of the asset being received containing the interfaceId of the |
| `interfaceID` | `bytes4` | The interfaceID of the asset being received. |


#### Returns

| Name | Type | Description |
|---|:-:|---|
| `keys` | `bytes32[]` | An array of 3 x data keys: `LSP5ReceivedAssets[]`, `LSP5ReceivedAssets[index]` and `LSP5ReceivedAssetsMap:&lt;asset&gt;`. |
| `values` | `bytes[]` | An array of 3 x data values: the new length of `LSP5ReceivedAssets[]`, the address of the asset under `LSP5ReceivedAssets[index]` |


### generateSentAssetKeys








```solidity
function generateSentAssetKeys(address sender, bytes32 assetMapKey, uint128 assetIndex) internal view returns (bytes32[] keys, bytes[] values);
```




Generate an array of data key/value pairs to be set on the sender address after sending assets.





#### Parameters

| Name | Type | Description |
|---|:-:|---|
| `sender` | `address` | The address sending the asset and where the LSP5 data keys should be updated. |
| `assetMapKey` | `bytes32` | The `LSP5ReceivedAssetMap:&lt;asset&gt;` data key of the asset being sent containing the interfaceId of the |
| `assetIndex` | `uint128` | The index at which the asset is stored under the `LSP5ReceivedAssets[]` Array. |


#### Returns

| Name | Type | Description |
|---|:-:|---|
| `keys` | `bytes32[]` | An array of 3 x data keys: `LSP5ReceivedAssets[]`, `LSP5ReceivedAssets[index]` and `LSP5ReceivedAssetsMap:&lt;asset&gt;`. |
| `values` | `bytes[]` | An array of 3 x data values: the new length of `LSP5ReceivedAssets[]`, the address of the asset under `LSP5ReceivedAssets[index]` |


### getLSP5ReceivedAssetsCount
:::info

This function does not return a number but the raw bytes stored under the `LSP5ReceivedAssets[]` Array data key.

:::








```solidity
function getLSP5ReceivedAssetsCount(contract IERC725Y account) internal view returns (bytes);
```




Get the total number of asset addresses stored under the `LSP5ReceivedAssets[]` Array data key.





#### Parameters

| Name | Type | Description |
|---|:-:|---|
| `account` | `contract IERC725Y` | The ERC725Y smart contract to read the storage from. |


#### Returns

| Name | Type | Description |
|---|:-:|---|
| `0` | `bytes` | @return The raw bytes stored under the `LSP5ReceivedAssets[]` data key. |




---

---

