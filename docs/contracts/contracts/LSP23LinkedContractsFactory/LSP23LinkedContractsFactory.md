<!-- This file is auto-generated. Do not edit! -->
<!-- Check `@lukso-network/lsp-smart-contracts/CONTRIBUTING.md#solidity-code-comments` for more information. -->

# LSP23LinkedContractsFactory

:::info Standard Specifications

[`LSP-23-LinkedContractsFactory`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-23-LinkedContractsFactory.md)

:::
:::info Solidity implementation

[`LSP23LinkedContractsFactory.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp23-contracts/contracts/LSP23LinkedContractsFactory.sol)

:::

## Public Methods

Public methods are accessible externally from users, allowing interaction with this function from dApps or other smart contracts.
When marked as 'public', a method can be called both externally and internally, on the other hand, when marked as 'external', a method can only be called externally.

### computeAddresses

:::note References

- Specification details: [**LSP-23-LinkedContractsFactory**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-23-LinkedContractsFactory.md#computeaddresses)
- Solidity implementation: [`LSP23LinkedContractsFactory.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp23-contracts/contracts/LSP23LinkedContractsFactory.sol)
- Function signature: `computeAddresses(ILSP23LinkedContractsFactory.PrimaryContractDeployment,ILSP23LinkedContractsFactory.SecondaryContractDeployment,address,bytes)`
- Function selector: `0xdecfb0b9`

:::

```solidity
function computeAddresses(
  ILSP23LinkedContractsFactory.PrimaryContractDeployment primaryContractDeployment,
  ILSP23LinkedContractsFactory.SecondaryContractDeployment secondaryContractDeployment,
  address postDeploymentModule,
  bytes postDeploymentModuleCalldata
)
  external
  view
  returns (address primaryContractAddress, address secondaryContractAddress);
```

Computes the addresses of a primary contract and a secondary linked contract

#### Parameters

| Name                           |                            Type                            | Description                                                                                                                                                  |
| ------------------------------ | :--------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `primaryContractDeployment`    |  `ILSP23LinkedContractsFactory.PrimaryContractDeployment`  | Contains the needed parameter to deploy the primary contract. (`salt`, `fundingAmount`, `creationBytecode`)                                                  |
| `secondaryContractDeployment`  | `ILSP23LinkedContractsFactory.SecondaryContractDeployment` | Contains the needed parameter to deploy the secondary contract. (`fundingAmount`, `creationBytecode`, `addPrimaryContractAddress`, `extraConstructorParams`) |
| `postDeploymentModule`         |                         `address`                          | The optional module to be executed after deployment                                                                                                          |
| `postDeploymentModuleCalldata` |                          `bytes`                           | The data to be passed to the post deployment module                                                                                                          |

#### Returns

| Name                       |   Type    | Description                                     |
| -------------------------- | :-------: | ----------------------------------------------- |
| `primaryContractAddress`   | `address` | The address of the deployed primary contract.   |
| `secondaryContractAddress` | `address` | The address of the deployed secondary contract. |

<br/>

### computeERC1167Addresses

:::note References

- Specification details: [**LSP-23-LinkedContractsFactory**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-23-LinkedContractsFactory.md#computeerc1167addresses)
- Solidity implementation: [`LSP23LinkedContractsFactory.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp23-contracts/contracts/LSP23LinkedContractsFactory.sol)
- Function signature: `computeERC1167Addresses(ILSP23LinkedContractsFactory.PrimaryContractDeploymentInit,ILSP23LinkedContractsFactory.SecondaryContractDeploymentInit,address,bytes)`
- Function selector: `0x8da85898`

:::

```solidity
function computeERC1167Addresses(
  ILSP23LinkedContractsFactory.PrimaryContractDeploymentInit primaryContractDeploymentInit,
  ILSP23LinkedContractsFactory.SecondaryContractDeploymentInit secondaryContractDeploymentInit,
  address postDeploymentModule,
  bytes postDeploymentModuleCalldata
)
  external
  view
  returns (address primaryContractAddress, address secondaryContractAddress);
```

Computes the addresses of a primary and a secondary linked contracts ERC1167 proxies to be created

#### Parameters

| Name                              |                              Type                              | Description                                                                                                                                                                                            |
| --------------------------------- | :------------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `primaryContractDeploymentInit`   |  `ILSP23LinkedContractsFactory.PrimaryContractDeploymentInit`  | Contains the needed parameters to deploy a primary proxy contract. (`salt`, `fundingAmount`, `implementationContract`, `initializationCalldata`)                                                       |
| `secondaryContractDeploymentInit` | `ILSP23LinkedContractsFactory.SecondaryContractDeploymentInit` | Contains the needed parameters to deploy the secondary proxy contract. (`fundingAmount`, `implementationContract`, `initializationCalldata`, `addPrimaryContractAddress`, `extraInitializationParams`) |
| `postDeploymentModule`            |                           `address`                            | The optional module to be executed after deployment.                                                                                                                                                   |
| `postDeploymentModuleCalldata`    |                            `bytes`                             | The data to be passed to the post deployment module.                                                                                                                                                   |

#### Returns

| Name                       |   Type    | Description                                          |
| -------------------------- | :-------: | ---------------------------------------------------- |
| `primaryContractAddress`   | `address` | The address of the deployed primary contract proxy   |
| `secondaryContractAddress` | `address` | The address of the deployed secondary contract proxy |

<br/>

### deployContracts

:::note References

- Specification details: [**LSP-23-LinkedContractsFactory**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-23-LinkedContractsFactory.md#deploycontracts)
- Solidity implementation: [`LSP23LinkedContractsFactory.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp23-contracts/contracts/LSP23LinkedContractsFactory.sol)
- Function signature: `deployContracts(ILSP23LinkedContractsFactory.PrimaryContractDeployment,ILSP23LinkedContractsFactory.SecondaryContractDeployment,address,bytes)`
- Function selector: `0xf830c0ab`

:::

```solidity
function deployContracts(
  ILSP23LinkedContractsFactory.PrimaryContractDeployment primaryContractDeployment,
  ILSP23LinkedContractsFactory.SecondaryContractDeployment secondaryContractDeployment,
  address postDeploymentModule,
  bytes postDeploymentModuleCalldata
)
  external
  payable
  returns (address primaryContractAddress, address secondaryContractAddress);
```

_Contracts deployed. Contract Address: `primaryContractAddress`. Primary Contract Address: `primaryContractAddress`_

Deploys a primary and a secondary linked contract.

#### Parameters

| Name                           |                            Type                            | Description                                                                                                                                                  |
| ------------------------------ | :--------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `primaryContractDeployment`    |  `ILSP23LinkedContractsFactory.PrimaryContractDeployment`  | Contains the needed parameter to deploy a contract. (`salt`, `fundingAmount`, `creationBytecode`)                                                            |
| `secondaryContractDeployment`  | `ILSP23LinkedContractsFactory.SecondaryContractDeployment` | Contains the needed parameter to deploy the secondary contract. (`fundingAmount`, `creationBytecode`, `addPrimaryContractAddress`, `extraConstructorParams`) |
| `postDeploymentModule`         |                         `address`                          | The optional module to be executed after deployment                                                                                                          |
| `postDeploymentModuleCalldata` |                          `bytes`                           | The data to be passed to the post deployment module                                                                                                          |

#### Returns

| Name                       |   Type    | Description                            |
| -------------------------- | :-------: | -------------------------------------- |
| `primaryContractAddress`   | `address` | The address of the primary contract.   |
| `secondaryContractAddress` | `address` | The address of the secondary contract. |

<br/>

### deployERC1167Proxies

:::note References

- Specification details: [**LSP-23-LinkedContractsFactory**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-23-LinkedContractsFactory.md#deployerc1167proxies)
- Solidity implementation: [`LSP23LinkedContractsFactory.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp23-contracts/contracts/LSP23LinkedContractsFactory.sol)
- Function signature: `deployERC1167Proxies(ILSP23LinkedContractsFactory.PrimaryContractDeploymentInit,ILSP23LinkedContractsFactory.SecondaryContractDeploymentInit,address,bytes)`
- Function selector: `0x17c042c4`

:::

```solidity
function deployERC1167Proxies(
  ILSP23LinkedContractsFactory.PrimaryContractDeploymentInit primaryContractDeploymentInit,
  ILSP23LinkedContractsFactory.SecondaryContractDeploymentInit secondaryContractDeploymentInit,
  address postDeploymentModule,
  bytes postDeploymentModuleCalldata
)
  external
  payable
  returns (address primaryContractAddress, address secondaryContractAddress);
```

_Contract proxies deployed. Primary Proxy Address: `primaryContractAddress`. Secondary Contract Proxy Address: `secondaryContractAddress`_

Deploys ERC1167 proxies of a primary contract and a secondary linked contract

#### Parameters

| Name                              |                              Type                              | Description                                                                                                                                                                                            |
| --------------------------------- | :------------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `primaryContractDeploymentInit`   |  `ILSP23LinkedContractsFactory.PrimaryContractDeploymentInit`  | Contains the needed parameters to deploy a proxy contract. (`salt`, `fundingAmount`, `implementationContract`, `initializationCalldata`)                                                               |
| `secondaryContractDeploymentInit` | `ILSP23LinkedContractsFactory.SecondaryContractDeploymentInit` | Contains the needed parameters to deploy the secondary proxy contract. (`fundingAmount`, `implementationContract`, `initializationCalldata`, `addPrimaryContractAddress`, `extraInitializationParams`) |
| `postDeploymentModule`            |                           `address`                            | The optional module to be executed after deployment.                                                                                                                                                   |
| `postDeploymentModuleCalldata`    |                            `bytes`                             | The data to be passed to the post deployment module.                                                                                                                                                   |

#### Returns

| Name                       |   Type    | Description                                          |
| -------------------------- | :-------: | ---------------------------------------------------- |
| `primaryContractAddress`   | `address` | The address of the deployed primary contract proxy   |
| `secondaryContractAddress` | `address` | The address of the deployed secondary contract proxy |

<br/>

## Internal Methods

Any method labeled as `internal` serves as utility function within the contract. They can be used when writing solidity contracts that inherit from this contract. These methods can be extended or modified by overriding their internal behavior to suit specific needs.

Internal functions cannot be called externally, whether from other smart contracts, dApp interfaces, or backend services. Their restricted accessibility ensures that they remain exclusively available within the context of the current contract, promoting controlled and encapsulated usage of these internal utilities.

### \_deployPrimaryContract

```solidity
function _deployPrimaryContract(struct ILSP23LinkedContractsFactory.PrimaryContractDeployment primaryContractDeployment, struct ILSP23LinkedContractsFactory.SecondaryContractDeployment secondaryContractDeployment, address postDeploymentModule, bytes postDeploymentModuleCalldata) internal nonpayable returns (address primaryContractAddress);
```

<br/>

### \_deploySecondaryContract

```solidity
function _deploySecondaryContract(struct ILSP23LinkedContractsFactory.SecondaryContractDeployment secondaryContractDeployment, address primaryContractAddress) internal nonpayable returns (address secondaryContractAddress);
```

<br/>

### \_deployAndInitializePrimaryContractProxy

```solidity
function _deployAndInitializePrimaryContractProxy(struct ILSP23LinkedContractsFactory.PrimaryContractDeploymentInit primaryContractDeploymentInit, struct ILSP23LinkedContractsFactory.SecondaryContractDeploymentInit secondaryContractDeploymentInit, address postDeploymentModule, bytes postDeploymentModuleCalldata) internal nonpayable returns (address primaryContractAddress);
```

<br/>

### \_deployAndInitializeSecondaryContractProxy

```solidity
function _deployAndInitializeSecondaryContractProxy(struct ILSP23LinkedContractsFactory.SecondaryContractDeploymentInit secondaryContractDeploymentInit, address primaryContractAddress) internal nonpayable returns (address secondaryContractAddress);
```

<br/>

### \_generatePrimaryContractSalt

```solidity
function _generatePrimaryContractSalt(struct ILSP23LinkedContractsFactory.PrimaryContractDeployment primaryContractDeployment, struct ILSP23LinkedContractsFactory.SecondaryContractDeployment secondaryContractDeployment, address postDeploymentModule, bytes postDeploymentModuleCalldata) internal pure returns (bytes32 primaryContractGeneratedSalt);
```

<br/>

### \_generatePrimaryContractProxySalt

```solidity
function _generatePrimaryContractProxySalt(struct ILSP23LinkedContractsFactory.PrimaryContractDeploymentInit primaryContractDeploymentInit, struct ILSP23LinkedContractsFactory.SecondaryContractDeploymentInit secondaryContractDeploymentInit, address postDeploymentModule, bytes postDeploymentModuleCalldata) internal pure returns (bytes32 primaryContractProxyGeneratedSalt);
```

<br/>

## Events

### DeployedContracts

:::note References

- Specification details: [**LSP-23-LinkedContractsFactory**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-23-LinkedContractsFactory.md#deployedcontracts)
- Solidity implementation: [`LSP23LinkedContractsFactory.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp23-contracts/contracts/LSP23LinkedContractsFactory.sol)
- Event signature: `DeployedContracts(address,address,ILSP23LinkedContractsFactory.PrimaryContractDeployment,ILSP23LinkedContractsFactory.SecondaryContractDeployment,address,bytes)`
- Event topic hash: `0x1ea27dabd8fd1508e844ab51c2fd3d9081f2684346857f9187da6d4a1aa7d3e6`

:::

```solidity
event DeployedContracts(
  address indexed primaryContract,
  address indexed secondaryContract,
  ILSP23LinkedContractsFactory.PrimaryContractDeployment primaryContractDeployment,
  ILSP23LinkedContractsFactory.SecondaryContractDeployment secondaryContractDeployment,
  address postDeploymentModule,
  bytes postDeploymentModuleCalldata
);
```

Emitted when a primary and secondary contract are deployed.

#### Parameters

| Name                              |                            Type                            | Description                                            |
| --------------------------------- | :--------------------------------------------------------: | ------------------------------------------------------ |
| `primaryContract` **`indexed`**   |                         `address`                          | Address of the deployed primary contract.              |
| `secondaryContract` **`indexed`** |                         `address`                          | Address of the deployed secondary contract.            |
| `primaryContractDeployment`       |  `ILSP23LinkedContractsFactory.PrimaryContractDeployment`  | Parameters used for the primary contract deployment.   |
| `secondaryContractDeployment`     | `ILSP23LinkedContractsFactory.SecondaryContractDeployment` | Parameters used for the secondary contract deployment. |
| `postDeploymentModule`            |                         `address`                          | Address of the post-deployment module.                 |
| `postDeploymentModuleCalldata`    |                          `bytes`                           | Calldata passed to the post-deployment module.         |

<br/>

### DeployedERC1167Proxies

:::note References

- Specification details: [**LSP-23-LinkedContractsFactory**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-23-LinkedContractsFactory.md#deployederc1167proxies)
- Solidity implementation: [`LSP23LinkedContractsFactory.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp23-contracts/contracts/LSP23LinkedContractsFactory.sol)
- Event signature: `DeployedERC1167Proxies(address,address,ILSP23LinkedContractsFactory.PrimaryContractDeploymentInit,ILSP23LinkedContractsFactory.SecondaryContractDeploymentInit,address,bytes)`
- Event topic hash: `0xb03dbe7a02c063899f863d542410b5b038c8f537045be3a26e7144e0074e1c7b`

:::

```solidity
event DeployedERC1167Proxies(
  address indexed primaryContract,
  address indexed secondaryContract,
  ILSP23LinkedContractsFactory.PrimaryContractDeploymentInit primaryContractDeploymentInit,
  ILSP23LinkedContractsFactory.SecondaryContractDeploymentInit secondaryContractDeploymentInit,
  address postDeploymentModule,
  bytes postDeploymentModuleCalldata
);
```

Emitted when proxies of a primary and secondary contract are deployed.

#### Parameters

| Name                              |                              Type                              | Description                                                  |
| --------------------------------- | :------------------------------------------------------------: | ------------------------------------------------------------ |
| `primaryContract` **`indexed`**   |                           `address`                            | Address of the deployed primary contract proxy.              |
| `secondaryContract` **`indexed`** |                           `address`                            | Address of the deployed secondary contract proxy.            |
| `primaryContractDeploymentInit`   |  `ILSP23LinkedContractsFactory.PrimaryContractDeploymentInit`  | Parameters used for the primary contract proxy deployment.   |
| `secondaryContractDeploymentInit` | `ILSP23LinkedContractsFactory.SecondaryContractDeploymentInit` | Parameters used for the secondary contract proxy deployment. |
| `postDeploymentModule`            |                           `address`                            | Address of the post-deployment module.                       |
| `postDeploymentModuleCalldata`    |                            `bytes`                             | Calldata passed to the post-deployment module.               |

<br/>

## Errors

### InvalidValueSum

:::note References

- Specification details: [**LSP-23-LinkedContractsFactory**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-23-LinkedContractsFactory.md#invalidvaluesum)
- Solidity implementation: [`LSP23LinkedContractsFactory.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp23-contracts/contracts/LSP23LinkedContractsFactory.sol)
- Error signature: `InvalidValueSum()`
- Error hash: `0x2fd9ca91`

:::

```solidity
error InvalidValueSum();
```

_Invalid value sent._

Reverts when the `msg.value` sent is not equal to the sum of value used for the deployment of the contract & its owner contract.

<br/>

### PrimaryContractProxyInitFailureError

:::note References

- Specification details: [**LSP-23-LinkedContractsFactory**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-23-LinkedContractsFactory.md#primarycontractproxyinitfailureerror)
- Solidity implementation: [`LSP23LinkedContractsFactory.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp23-contracts/contracts/LSP23LinkedContractsFactory.sol)
- Error signature: `PrimaryContractProxyInitFailureError(bytes)`
- Error hash: `0x4364b6ee`

:::

```solidity
error PrimaryContractProxyInitFailureError(bytes errorData);
```

_Failed to deploy & initialize the Primary Contract Proxy. Error: `errorData`._

Reverts when the deployment & initialization of the contract has failed.

#### Parameters

| Name        |  Type   | Description                                                                   |
| ----------- | :-----: | ----------------------------------------------------------------------------- |
| `errorData` | `bytes` | Potentially information about why the deployment & initialization have failed. |

<br/>

### SecondaryContractProxyInitFailureError

:::note References

- Specification details: [**LSP-23-LinkedContractsFactory**](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-23-LinkedContractsFactory.md#secondarycontractproxyinitfailureerror)
- Solidity implementation: [`LSP23LinkedContractsFactory.sol`](https://github.com/lukso-network/lsp-smart-contracts/tree/develop/packages/lsp23-contracts/contracts/LSP23LinkedContractsFactory.sol)
- Error signature: `SecondaryContractProxyInitFailureError(bytes)`
- Error hash: `0x9654a854`

:::

```solidity
error SecondaryContractProxyInitFailureError(bytes errorData);
```

_Failed to deploy & initialize the Secondary Contract Proxy. Error: `errorData`._

Reverts when the deployment & initialization of the secondary contract has failed.

#### Parameters

| Name        |  Type   | Description                                                                   |
| ----------- | :-----: | ----------------------------------------------------------------------------- |
| `errorData` | `bytes` | Potentially information about why the deployment & initialization have failed. |

<br/>
<!-- GLOBAL LINKS -->

<!-- prettier-ignore-start -->

<!-- SPECS -->

[ERC-165]: https://eips.ethereum.org/EIPS/eip-165
[EIP-165]: https://eips.ethereum.org/EIPS/eip-165
[ERC-173]: https://eips.ethereum.org/EIPS/eip-173
[EIP-173]: https://eips.ethereum.org/EIPS/eip-173
[ERC-191]: https://eips.ethereum.org/EIPS/eip-191
[EIP-191]: https://eips.ethereum.org/EIPS/eip-191
[ERC-725X]: https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md#ERC725X
[ERC-725Y]: https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md#ERC725Y
[ERC-725]: https://github.com/ERC725Alliance/ERC725/blob/main/docs/ERC-725.md
[ERC-1271]: https://eips.ethereum.org/EIPS/eip-1271
[EIP-1271]: https://eips.ethereum.org/EIPS/eip-1271
[LSP-0-ERC725Account]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-0-ERC725Account.md
[LSP-1-UniversalReceiver]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-1-UniversalReceiver.md
[LSP-2-ERC725YJSONSchema]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-2-ERC725YJSONSchema.md
[LSP-3-UniversalProfile-Metadata]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-3-UniversalProfile-Metadata.md
[LSP-4-DigitalAsset-Metadata]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-4-DigitalAsset-Metadata.md
[LSP-5-ReceivedAssets]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-5-ReceivedAssets.md
[LSP-6-KeyManager]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-6-KeyManager.md
[LSP-7-DigitalAsset]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-7-DigitalAsset.md
[LSP-8-IdentifiableDigitalAsset]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-8-IdentifiableDigitalAsset.md
[LSP-9-Vault.md]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-9-Vault.md.md
[LSP-10-ReceivedVaults]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-10-ReceivedVaults.md
[LSP-11-BasicSocialRecovery]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-11-BasicSocialRecovery.md
[LSP-12-IssuedAssets]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-12-IssuedAssets.md
[LSP-14-Ownable2Step]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-14-Ownable2Step.md
[LSP-15-TransactionRelayServiceAPI]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-15-TransactionRelayServiceAPI.md
[LSP-16-UniversalFactory]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-16-UniversalFactory.md
[LSP-17-ContractExtension]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-17-ContractExtension.md
[LSP-20-CallVerification]: https://github.com/lukso-network/LIPs/tree/main/LSPs/LSP-20-CallVerification.md

<!-- DOCS -->

[ERC725]: https://docs.lukso.tech/standards/erc725
[UniversalProfile]: https://docs.lukso.tech/standards/accounts/introduction
[LSP0ERC725Account]: https://docs.lukso.tech/standards/accounts/lsp0-erc725account
[LSP1UniversalReceiver]: https://docs.lukso.tech/standards/accounts/lsp1-universal-receiver
[LSP1UniversalReceiverDelegate]: https://docs.lukso.tech/standards/accounts/lsp1-universal-receiver-delegate
[LSP2ERC725YJSONSchema]: https://docs.lukso.tech/standards/metadata/lsp2-json-schema
[LSP4DigitalAssetMetadata]: https://docs.lukso.tech/standards/tokens/LSP4-Digital-Asset-Metadata
[LSP5ReceivedVaults]: https://docs.lukso.tech/standards/metadata/lsp5-received-assets
[LSP6KeyManager]: https://docs.lukso.tech/standards/access-control/lsp6-key-manager
[LSP7DigitalAsset]: https://docs.lukso.tech/standards/tokens/LSP7-Digital-Asset
[LSP8IdentifiableDigitalAsset]: https://docs.lukso.tech/standards/tokens/LSP8-Identifiable-Digital-Asset
[LSP10ReceivedVaults]: https://docs.lukso.tech/standards/metadata/lsp10-received-vaults
[LSP14Ownable2Step]: https://docs.lukso.tech/standards/access-control/lsp14-ownable-2-step
[LSP17ContractExtension]: https://docs.lukso.tech/standards/accounts/lsp17-contract-extension
[LSP20CallVerification]: https://docs.lukso.tech/standards/accounts/lsp20-call-verification

<!-- DATA KEYS -->

[_LSP17_EXTENSION_PREFIX]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-17-ContractExtension.md#lsp17extendable-specification
[_LSP1_UNIVERSAL_RECEIVER_DELEGATE_KEY]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md#specification-1
[_LSP1_UNIVERSAL_RECEIVER_DELEGATE_PREFIX]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md#specification-1

<!-- LSP1 TYPE IDS -->

[LSP0OwnershipTransferStarted]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#transferownership
[LSP0OwnershipTransferred_SenderNotification]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#acceptownership
[LSP0OwnershipTransferred_RecipientNotification]: https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-0-ERC725Account.md#acceptownership

<!-- ERC725 LIBRARY -->

[`ERC725.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725.sol
[`ERC725Init.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725Init.sol
[`ERC725InitAbstract.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725InitAbstract
[`IERC725X.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/interfaces/IERC725X.sol
[`ERC725X.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725X.sol
[`ERC725XCore.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725XCore.sol
[`ERC725XInit.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725XInit.sol
[`ERC725XInitAbstract.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725XInitAbstract.sol
[`IERC725Y.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/interfaces/IERC725Y.sol
[`ERC725Y.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725Y.sol
[`ERC725YCore.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725YCore.sol
[`ERC725YInit.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725YInit.sol
[`ERC725YInitAbstract.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/ERC725YInitAbstract.soll
[`OwnableUnset.sol`]: https://github.com/ERC725Alliance/ERC725/blob/v5.1.0/implementations/contracts/custom/OwnableUnset.sol

<!-- EXTERNAL LIBRARIES -->

[`Create2.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/Create2.sol
[`ECDSA.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/cryptography/ECDSA.sol
[`ERC165Checker.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/introspection/ERC165Checker.sol
[`Address.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/Address.sol
[`ERC165.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/introspection/ERC165.sol
[`EnumerableSet.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.2/contracts/utils/structs/EnumerableSet.so
[`Initializable.sol`]: https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/v4.9.2/contracts/proxy/utils/Initializable.sol
[`BytesLib.sol`]: https://github.com/GNSPS/solidity-bytes-utils/blob/v0.8.0/contracts/BytesLib.sol

<!-- SOLIDITY IMPLEMENTATION -->

[`LSP0ERC725AccountCore.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP0ERC725Account/LSP0ERC725AccountCore.sol
[`LSP0Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP0ERC725Account/LSP0Utils.sol
[`LSP0ERC725AccountInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP0ERC725Account/LSP0ERC725AccountInitAbstract.sol
[`ILSP0ERC725Account.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP0ERC725Account/ILSP0ERC725Account.sol
[`LSP0ERC725Account.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP0ERC725Account/LSP0ERC725Account.sol
[`LSP0ERC725AccountInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP0ERC725Account/LSP0ERC725AccountInit.sol
[`LSP0Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP0ERC725Account/LSP0Constants.sol
[`UniversalProfileInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/UniversalProfileInitAbstract.sol
[`UniversalProfile.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/UniversalProfile.sol
[`UniversalProfileInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/UniversalProfileInit.sol
[`LSP1UniversalReceiverDelegateUP.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateUP/LSP1UniversalReceiverDelegateUP.sol
[`LSP1Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP1UniversalReceiver/LSP1Utils.sol
[`LSP1UniversalReceiverDelegateVault.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP1UniversalReceiver/LSP1UniversalReceiverDelegateVault/LSP1UniversalReceiverDelegateVault.sol
[`ILSP1UniversalReceiver.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP1UniversalReceiver/ILSP1UniversalReceiver.sol
[`LSP1Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP1UniversalReceiver/LSP1Constants.sol
[`LSP1Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP1UniversalReceiver/LSP1Errors.sol
[`LSP4DigitalAssetMetadataInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP4DigitalAssetMetadata/LSP4DigitalAssetMetadataInitAbstract.sol
[`LSP4DigitalAssetMetadata.sol`]: chttps://github.com/code-423n4/2023-06-lukso/tree/main/ontracts/LSP4DigitalAssetMetadata/LSP4DigitalAssetMetadata.sol
[`LSP4Compatibility.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP4DigitalAssetMetadata/LSP4Compatibility.sol
[`LSP4Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP4DigitalAssetMetadata/LSP4Constants.sol
[`ILSP4Compatibility.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP4DigitalAssetMetadata/ILSP4Compatibility.sol
[`LSP4Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP4DigitalAssetMetadata/LSP4Errors.sol
[`LSP6SetDataModule.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6Modules/LSP6SetDataModule.sol
[`LSP6KeyManagerCore.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6KeyManagerCore.sol
[`LSP6ExecuteModule.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6Modules/LSP6ExecuteModule.sol
[`LSP6Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6Utils.sol
[`LSP6Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6Constants.sol
[`ILSP6KeyManager.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/ILSP6KeyManager.sol
[`LSP6Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6Errors.sol
[`LSP6OwnershipModule.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6Modules/LSP6OwnershipModule.sol
[`LSP6KeyManagerInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6KeyManagerInitAbstract.sol
[`LSP6KeyManager.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6KeyManager.sol
[`LSP6KeyManagerInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP6KeyManager/LSP6KeyManagerInit.sol
[`LSP7DigitalAssetCore.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/LSP7DigitalAssetCore.sol
[`LSP7CompatibleERC20InitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7CompatibleERC20InitAbstract.sol
[`LSP7CompatibleERC20.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7CompatibleERC20.sol
[`ILSP7DigitalAsset.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/ILSP7DigitalAsset.sol
[`LSP7DigitalAssetInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/LSP7DigitalAssetInitAbstract.sol
[`LSP7CappedSupply.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7CappedSupply.sol
[`LSP7CappedSupplyInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7CappedSupplyInitAbstract.sol
[`LSP7DigitalAsset.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/LSP7DigitalAsset.sol
[`LSP7MintableInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/presets/LSP7MintableInitAbstract.sol
[`LSP7CompatibleERC20MintableInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20MintableInitAbstract.sol
[`LSP7Mintable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/presets/LSP7Mintable.sol
[`LSP7CompatibleERC20Mintable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20Mintable.sol
[`LSP7Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/LSP7Errors.sol
[`LSP7CompatibleERC20MintableInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/presets/LSP7CompatibleERC20MintableInit.sol
[`LSP7MintableInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/presets/LSP7MintableInit.sol
[`ILSP7CompatibleERC20.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/extensions/ILSP7CompatibleERC20.sol
[`ILSP7Mintable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/presets/ILSP7Mintable.sol
[`LSP7Burnable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7Burnable.sol
[`LSP7BurnableInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/extensions/LSP7BurnableInitAbstract.sol
[`LSP7Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP7DigitalAsset/LSP7Constants.sol
[`LSP8IdentifiableDigitalAssetCore.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetCore.sol
[`LSP8CompatibleERC721InitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721InitAbstract.sol
[`LSP8CompatibleERC721.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CompatibleERC721.sol
[`ILSP8IdentifiableDigitalAsset.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/ILSP8IdentifiableDigitalAsset.sol
[`LSP8EnumerableInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8EnumerableInitAbstract.sol
[`LSP8Enumerable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Enumerable.sol
[`LSP8CappedSupplyInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CappedSupplyInitAbstract.sol
[`LSP8CappedSupply.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8CappedSupply.sol
[`LSP8IdentifiableDigitalAssetInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAssetInitAbstract.sol
[`LSP8MintableInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8MintableInitAbstract.sol
[`ILSP8CompatibleERC721.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/ILSP8CompatibleERC721.sol
[`LSP8IdentifiableDigitalAsset.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/LSP8IdentifiableDigitalAsset.sol
[`LSP8CompatibleERC721MintableInitAbstract.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721MintableInitAbstract.s
[`LSP8Mintable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8Mintable.sol
[`LSP8CompatibleERC721Mintable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721Mintable.sol
[`LSP8CompatibleERC721MintableInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8CompatibleERC721MintableInit.sol
[`LSP8Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/LSP8Errors.sol
[`LSP8MintableInit.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/LSP8MintableInit.sol
[`LSP8Burnable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/extensions/LSP8Burnable.sol
[`ILSP8Mintable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/presets/ILSP8Mintable.sol
[`LSP8Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP8IdentifiableDigitalAsset/LSP8Constants.s
[`LSP14Ownable2Step.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP14Ownable2Step/LSP14Ownable2Step.sol
[`ILSP14Ownable2Step.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP14Ownable2Step/ILSP14Ownable2Step.sol
[`LSP14Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP14Ownable2Step/LSP14Constants.sol
[`LSP14Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP14Ownable2Step/LSP14Errors.sol
[`LSP17Extendable.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP17ContractExtension/LSP17Extendable.sol
[`LSP17Extension.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP17ContractExtension/LSP17Extension.sol
[`LSP17Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP17ContractExtension/LSP17Constants.sol
[`LSP17Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP17ContractExtension/LSP17Errors.sol
[`LSP17Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP17ContractExtension/LSP17Utils.sol
[`LSP20CallVerification.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP20CallVerification/LSP20CallVerification.sol
[`ILSP20CallVerifier.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP20CallVerification/ILSP20CallVerifier.sol
[`LSP20Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP20CallVerification/LSP20Constants.sol
[`LSP20Errors.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP20CallVerification/LSP20Errors.sol
[`LSP2Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP2ERC725YJSONSchema/LSP2Utils.sol
[`LSP5Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP5ReceivedAssets/LSP5Utils.sol
[`LSP5Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP5ReceivedAssets/LSP5Constants.sol
[`LSP10Utils.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP10ReceivedVaults/LSP10Utils.sol
[`LSP10Constants.sol`]: https://github.com/lukso-network/lsp-smart-contracts/tree/main/contracts/LSP10ReceivedVaults/LSP10Constants.sol

<!-- prettier-ignore-end -->
