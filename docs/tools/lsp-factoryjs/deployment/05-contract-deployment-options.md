---
sidebar_position: 5
title: Contract Deployment Options
---

Using the LSP Factory, you can specify custom deployment parameters for your contracts.

The `deploy` function takes an object `contractDeploymentOptions` as its second parameter where the contract `version`, `byteCode`, and `libAddress` can be specified:

## Deployment Properties

The `contractDeploymentOptions?` is an `Object` with the following properties:

- `version?`: The contract's version you want to deploy as `string`. <br/>
- `byteCode?`: The custom bytecode to be deployed as `string`.
- `deployProxy?`: Indicator `boolean` if the contract will be deployed using a proxy contract (e.g., [EIP1167](https://eips.ethereum.org/EIPS/eip-1167)).
- `libAddress?`: The address of a base contract for proxy deployment as `string` (e.g., [EIP1167](https://eips.ethereum.org/EIPS/eip-1167)).
- `uploadOptions?`: Specification `Object` how the metadata should be uploaded.
- `ipfsClientOptions?`: Optional IPFS Client Options as `Object` defined by the [IPFS-HTTP Client](https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client#createoptions) library used internally.

### Default Values

- `version?`: defaults to the latest version of the [lsp-smart-contracts](https://github.com/lukso-network/lsp-smart-contracts) library.
- `deployProxy?`: defaults to `true`.

### IPFS Client Options

The property `ipfsClientOptions` is an optional parameter and so may be omitted. If no contract deployment options are specified, `LSPFactory` will deploy a **minimal proxy contract** based on the [EIP1167](https://eips.ethereum.org/EIPS/eip-1167. The proxy contract will reference the address of a base contract implementation already deployed on the network.

### Proxy Deployment

If you do not want your contract to use proxy deployment, you can set the `deployProxy` property to `false`, which will deploy a standalone contract with a constructor rather than a proxy deployment with an initializer.

:::info Info
LSPFactory stores the base contract addresses for different versions [internally](https://github.com/lukso-network/tools-lsp-factory/blob/main/src/versions.json) and uses the latest available version if no one is specified.
:::

## Custom Bytecode

You can specify the bytecode you want your contract to use by providing the `byteCode` parameter. This will deploy a standalone contract from your custom bytecode without using a proxy.

For example, you could deploy a Universal Profile with a Key Manager that uses your custom bytecode:

```javascript title="Deploying a Universal Profile with a custom Key Manager base contract"
lspFactory.LSP3UniversalProfile.deploy({...}, {
    version: '0.4.1'
    KeyManager: {
        bytecode: '0x...',
    }
})
```

### Custom Universal Profile Deployment

A [Universal Profile](../classes/lsp3-universal-profile) is composed of three different contracts. By passing the global `version` parameter you can set the version for all contracts at once.

```javascript title="Deploying a Universal Profile with all contracts at version 0.4.1"
lspFactory.LSP3UniversalProfile.deploy({...}, {
    version: '0.4.1'
})
```

LSPFactory also allows contracts to be **individually customisable** by allowing you to set the version per contract. Individual versioning will take precedence over the global version.

```javascript title="Deploying a Universal Profile at version 0.4.1 with ERC725Account contract at version 0.3.9"
lspFactory.LSP3UniversalProfile.deploy({...}, {
    version: '0.4.1'
    ERC725Account: {
        version: '0.3.9'
    }
})
```

You can also use a combination of the properties `libAddress`, `bytecode` and `version`.

```javascript title="Deploying a Universal Profile with specific contract deployment options"
lspFactory.LSP3UniversalProfile.deploy({...}, {
    ERC725Account: {
        version: '0.4.1',
    }
    UniversalRecieverDelegate: {
        baseContract: '0x...'
    }
    KeyManager: {
        libAddress: '0x6c1F3Ed2F99054C88897e2f32187ef15c62dC560'
    }
})
```

### Custom Digital Asset Deployment

Because deploying an [`LSP7DigitalAsset`](../classes/lsp7-digital-asset) or an [`LSP8IdentifiableDigitalAsset`](../classes/lsp8-identifiable-digital-asset) involves the deployment of one single contract, the standards share the same `contractDeploymentOptions` object structure

```javascript title="Deploying an LSP7 Digital Asset with a specified base contract address"
lspFactory.LSP7DigitalAsset.deploy({...}, {
    libAddress: '0xdD373889355d37D6cb9A5028Ce74cDBacC7CF782'
})
```

```javascript title="Deploying a specific version of LSP8 Identifiable Digital Asset"
lspFactory.LSP8IdentifiableDigitalAsset.deploy({...}, {
    version: '0.1.1'
})
```

```javascript title="Deploying specific bytecode for LSP8 Identifiable Digital Asset base contract"
lspFactory.LSP8IdentifiableDigitalAsset.deploy({...}, {
    bytecode: '0x...'
})
```
