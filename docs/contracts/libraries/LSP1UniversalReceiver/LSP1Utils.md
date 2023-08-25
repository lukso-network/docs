<!-- This file is auto-generated. Do not edit! -->
<!-- Check `@lukso-network/lsp-smart-contracts/CONTRIBUTING.md#solidity-code-comments` for more information. -->

# LSP1Utils

:::info Standard Specifications

[`LSP-1-UniversalReceiver`](https://github.com/lukso-network/lips/tree/main/LSPs/LSP-1-UniversalReceiver.md)

:::
:::info Solidity implementation

[`LSP1Utils.sol`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/contracts/LSP1UniversalReceiver/LSP1Utils.sol)

:::

> LSP1 Utility library.

LSP1Utils is a library of utility functions that can be used to notify the `universalReceiver` function of a contract that implements LSP1 and retrieve informations related to LSP1 `typeId`. Based on LSP1 Universal Receiver standard.

## Internal Methods

Any method labeled as `internal` serves as utility function within the contract. They can be used when writing solidity contracts that inherit from this contract. These methods can be extended or modified by overriding their internal behavior to suit specific needs.

Internal functions cannot be called externally, whether from other smart contracts, dApp interfaces, or backend services. Their restricted accessibility ensures that they remain exclusively available within the context of the current contract, promoting controlled and encapsulated usage of these internal utilities.

### tryNotifyUniversalReceiver

```solidity
function tryNotifyUniversalReceiver(
  address lsp1Implementation,
  bytes32 typeId,
  bytes data
) internal nonpayable;
```

Notify a contract at `lsp1Implementation` address by calling its `universalReceiver` function if this contract
supports the LSP1 interface.

#### Parameters

| Name                 |   Type    | Description                                                                                        |
| -------------------- | :-------: | -------------------------------------------------------------------------------------------------- |
| `lsp1Implementation` | `address` | The address of the contract to notify.                                                             |
| `typeId`             | `bytes32` | A `bytes32` typeId.                                                                                |
| `data`               |  `bytes`  | Any optional data to send to the `universalReceiver` function to the `lsp1Implementation` address. |

<br/>

### callUniversalReceiverWithCallerInfos

```solidity
function callUniversalReceiverWithCallerInfos(
  address universalReceiverDelegate,
  bytes32 typeId,
  bytes receivedData,
  address msgSender,
  uint256 msgValue
) internal nonpayable returns (bytes);
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

| Name |  Type   | Description                                                      |
| ---- | :-----: | ---------------------------------------------------------------- |
| `0`  | `bytes` | The data returned by the LSP1UniversalReceiverDelegate contract. |

<br/>

### getLSP1DelegateValue

```solidity
function getLSP1DelegateValue(
  mapping(bytes32 => bytes) erc725YStorage
) internal view returns (bytes);
```

_Retrieving the value stored under the ERC725Y data key `LSP1UniversalReceiverDelegate`._

Query internally the ERC725Y storage of a `ERC725Y` smart contract to retrieve
the value set under the `LSP1UniversalReceiverDelegate` data key.

#### Parameters

| Name             |            Type             | Description                                                 |
| ---------------- | :-------------------------: | ----------------------------------------------------------- |
| `erc725YStorage` | `mapping(bytes32 => bytes)` | A reference to the ERC725Y storage mapping of the contract. |

#### Returns

| Name |  Type   | Description                                                                |
| ---- | :-----: | -------------------------------------------------------------------------- |
| `0`  | `bytes` | The bytes value stored under the `LSP1UniversalReceiverDelegate` data key. |

<br/>

### getLSP1DelegateValueForTypeId

```solidity
function getLSP1DelegateValueForTypeId(
  mapping(bytes32 => bytes) erc725YStorage,
  bytes32 typeId
) internal view returns (bytes);
```

_Retrieving the value stored under the ERC725Y data key `LSP1UniversalReceiverDelegate:<type-id>` for a specific `typeId`._

Query internally the ERC725Y storage of a `ERC725Y` smart contract to retrieve
the value set under the `LSP1UniversalReceiverDelegate:<bytes32>` data key for a specific LSP1 `typeId`.

#### Parameters

| Name             |            Type             | Description                                                 |
| ---------------- | :-------------------------: | ----------------------------------------------------------- |
| `erc725YStorage` | `mapping(bytes32 => bytes)` | A reference to the ERC725Y storage mapping of the contract. |
| `typeId`         |          `bytes32`          | A bytes32 LSP1 `typeId`;                                    |

#### Returns

| Name |  Type   | Description                                                                          |
| ---- | :-----: | ------------------------------------------------------------------------------------ |
| `0`  | `bytes` | The bytes value stored under the `LSP1UniversalReceiverDelegate:<bytes32>` data key. |

<br/>

### getTransferDetails

```solidity
function getTransferDetails(
  bytes32 typeId
)
  internal
  pure
  returns (
    bool invalid,
    bytes10 mapPrefix,
    bytes4 interfaceId,
    bool isReceiving
  );
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

<br/>
