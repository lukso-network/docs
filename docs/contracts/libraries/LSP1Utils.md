# LSP1Utils

:::info Solidity contract

[`LSP1Utils.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP1UniversalReceiver/LSP1Utils.sol)

:::

> LSP1 Utility library.

LSP1Utils is a library of utility functions that can be used to notify the `universalReceiver` function of a contract that implements LSP1 and retrieve informations related to LSP1 `typeId`. Based on LSP1 Universal Receiver standard.

---

## Internal Methods

### tryNotifyUniversalReceiver

```solidity
function tryNotifyUniversalReceiver(address lsp1Implementation, bytes32 typeId, bytes data) internal nonpayable;
```

Notify a contract at `lsp1Implementation` address by calling its `universalReceiver` function if this contract
supports the LSP1 interface.

#### Parameters

| Name                 |   Type    | Description                                                                                        |
| -------------------- | :-------: | -------------------------------------------------------------------------------------------------- |
| `lsp1Implementation` | `address` | The address of the contract to notify.                                                             |
| `typeId`             | `bytes32` | A `bytes32` typeId.                                                                                |
| `data`               |  `bytes`  | Any optional data to send to the `universalReceiver` function to the `lsp1Implementation` address. |

### callUniversalReceiverWithCallerInfos

```solidity
function callUniversalReceiverWithCallerInfos(address universalReceiverDelegate, bytes32 typeId, bytes receivedData, address msgSender, uint256 msgValue) internal nonpayable returns (bytes);
```

Call a LSP1UniversalReceiverDelegate contract at `universalReceiverDelegate` address and append `msgSender` and `msgValue`
as additional informations in the calldata.

#### Parameters

| Name                        |   Type    | Description                                                                                       |
| --------------------------- | :-------: | ------------------------------------------------------------------------------------------------- |
| `universalReceiverDelegate` | `address` | The address of the LSP1UniversalReceiverDelegate to delegate the `universalReceiver` function to. |
| `typeId`                    | `bytes32` | A `bytes32` typeId.                                                                               |
| `receivedData`              |  `bytes`  | The data sent initially to the `universalReceiver` function.                                      |
| `msgSender`                 | `address` | The address that initially called the `universalReceiver` function.                               |
| `msgValue`                  | `uint256` | The amount of native token received initially by the `universalReceiver` function.                |

#### Returns

| Name |  Type   | Description                                                              |
| ---- | :-----: | ------------------------------------------------------------------------ |
| `0`  | `bytes` | @return The data returned by the LSP1UniversalReceiverDelegate contract. |

### getTransferDetails

```solidity
function getTransferDetails(bytes32 typeId) internal pure returns (bool invalid, bytes10 mapPrefix, bytes4 interfaceId, bool isReceiving);
```

Gets all the transfer details based on the provided `bytes32 typeId`.

#### Parameters

| Name     |   Type    | Description                                                         |
| -------- | :-------: | ------------------------------------------------------------------- |
| `typeId` | `bytes32` | A `bytes32` unique identifier for a specific action or information. |

#### Returns

| Name          |   Type    | Description                                                                                   |
| ------------- | :-------: | --------------------------------------------------------------------------------------------- |
| `invalid`     |  `bool`   | `true` if the `typeId` was not recognised, `false otherwise.                                  |
| `mapPrefix`   | `bytes10` | The standard 10 bytes defined in a LSP standard associated with the specific `typeId`.        |
| `interfaceId` | `bytes4`  | The bytes4 ERC165 interface ID defined in a LSP standard associated with a specific `typeId`. |
| `isReceiving` |  `bool`   | When the typeId relate to LSP7/8 tokens or LSP9 Vaults, describe if the `typeId` relates      |
