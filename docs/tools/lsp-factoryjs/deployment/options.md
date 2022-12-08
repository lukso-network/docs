---
sidebar_position: 3
title: Options
---

# Contract Options Object

When deploying a Universal Profile or Digital Asset, each smart contract can be individually configured by passing a contract configuration object to the options parameter of the `deploy` function.

## Parameters

| Name                                                  | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                    |
| :---------------------------------------------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`version`](./options.md#version) (optional)          | String  | Sets which version of the smart contract should be deployed. Can be a [version number](./options.md#contract-versions), [base contract address](./options.md#custom-base-contract-address), or [custom bytecode](#deploying-custom-bytecode). Defaults to the latest version available in the [versions file](https://github.com/lukso-network/tools-lsp-factory/blob/main/src/versions.json). |
| [`deployProxy`](./options.md#deploy-proxy) (optional) | Boolean | Determines whether the contract will be deployed as a **minimal proxy contract** based on [EIP1167](https://eips.ethereum.org/EIPS/eip-1167) or an entire contract with a constructor.                                                                                                                                                                                                         |

### Version

Under the `version` parameter developers can specify a [version number](./options#contract-versions), [custom bytecode](./options.md#deploying-custom-bytecode) or a [base contract address](./options.md#custom-base-contract-address) to be used for the deployment of the smart contract.

#### Custom Base Contract Address

When using [proxy deployment](./options.md#deploy-proxy) developers can pass an address to the `version` parameter to specify the base contract address which the proxy contract will inherit its logic from. The base contract can contain some custom logic according to a specific use case.

LSPFactory will then deploy a proxy contract which inherits its logic from the specified base contract address.

:::info
Any base contract address that developers pass here must adhere to the relevant LSP contract standard it is being used for.

:::

Read more about proxy deployment [here](./options#deploy-proxy).

```javascript title="Deploying an LSP7 Digital Asset using a specific base contract address"
await lspFactory.LSP7DigitalAsset.deploy({...}, {
    LSP7DigitalAsset: {
        version: '0x00b1d454Eb5d917253FD6cb4D5560dEC30b0960c',
        deployProxy: true
    }
});
```

#### Contract Versions

LSPFactory stores the addresses of different base contract versions [internally](https://github.com/lukso-network/tools-lsp-factory/blob/main/src/versions.json). By specifying a `version` number, developers can specify which base contract version should be used during deployment. The version number reflects the package version of the [lsp-smart-contracts library](https://github.com/lukso-network/tools-lsp-factory/releases) used to deploy the base contract.

```javascript
await lspFactory.LSP8IdentifiableDigitalAsset.deploy({...}, {
    LSP7DigitalAsset: {
        version: '0.5.0',
        deployProxy: true
    }
});
```

#### Deploying Custom Bytecode

Developers can deploy a custom contract implementation by passing some compiled creation bytecode to the `version` parameter.

This can be the instantiation bytecode of a custom LSP standard implementation written according to a custom use case. The implementation must meet the relevant LSP standard requirements.

:::note
Contracts deployed from custom bytecode will not use any proxy contract deployment.
:::

```javascript title="Deploying an LSP8 digital Asset from custom bytecode"
lspFactory.UniversalProfile.deploy({...}, {
  LSP6KeyManager: {
    version: '0x...',
  },
})
```

### Deploy Proxy

LSPFactory uses proxy deployment of smart contracts to maximise gas efficiency. This can be configured by passing the `deployProxy` parameter to determine whether a contract should be deployed as a **minimal proxy contract** based on [EIP1167](https://eips.ethereum.org/EIPS/eip-1167) or an entire contract with a constructor.

A proxy contract is a lightweight contract that inherits its logic by referencing the address of a base contract already deployed on the blockchain. Inheriting allows cheaper deployment because the smart contract logic has already been deployed in the base contract.

:::info
LSPFactory stores base contract addresses for different versions [internally](https://github.com/lukso-network/tools-lsp-factory/blob/main/src/versions.json) and will use the latest available base contract version if no version is specified.
:::

When using proxy deployment, LSPFactory will check that there is some bytecode deployed at the base contract address before deploying. If none is found, a new base contract will be deployed and referenced in the proxy contract. This process is helpful when using LSPFactory on a local development network like Hardhat, where there will be no pre-deployed base contracts.

When using proxy deployment developers can specify the base contract address by passing the [`version`](./options.md#version) parameter. This allows deploying a specific contract implementation by deploying a proxy contract which inherits its logic from a previously deployed custom base contract.

`deployProxy` defaults to `true` for all contracts except `LSP1UniversalReceiverDelegate` when deploying a Universal Profile ([read more](../deployment/universal-profile.md#universal-receiver-delegate-proxy-deployment)).

:::info
If `deployProxy` is set to `false`, the smart contract will be deployed from the current version of the [lsp-smart-contracts library](https://github.com/lukso-network/lsp-smart-contracts).
:::

```javascript title="Deploying a Universal Profile using a full ERC725Account contract with constructor"
lspFactory.UniversalProfile.deploy({...}, {
  ERC725Account: {
    deployProxy: false,
  },
})
```

## Examples

```js title="Passing Universal Profile contract options"
await lspFactory.UniversalProfile.deploy({...}, {
    ERC725Account: {
        version: '0.5.0',
        deployProxy: true
    },
    LSP6Keymanager: {
        version: '0x...', // Custom bytecode
        deployProxy: false
    },
    LSP1UniversalReceiverDelegate: {
        version: '0x87cd003F9Ac7d6eBcd811f7b427c7dBF6f6ba132', // Custom base contract address
        deployProxy: true
    },
})
```

```js title="Passing LSP7DigitalAsset contract options"
await lspFactory.LSP7DigitalAsset.deploy({...}, {
    LSP7DigitalAsset: {
        version: '0x...', // Custom bytecode
        deployProxy: false
    },
})
```

```js title="Passing LSP8IdentifiableDigitalAsset contract options"
await lspFactory.LSP8IdentifiableDigitalAsset.deploy({...}, {
    LSP8IdentifiableDigitalAsset: {
        version: '0x87cd003F9Ac7d6eBcd811f7b427c7dBF6f6ba132', // Custom base contract address
        deployProxy: true
    },
})
```
