---
sidebar_position: 4
description: Overview of the LUKSO smart contract variables from the constants.ts file.
---

# Constants

The [`constants.ts`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/constants.ts) file exposes many useful variables.

```ts
import {
  INTERFACE_IDS,
  ERC1271,
  OPERATIONS,
  SupportedStandards,
  ERC725YDataKeys,
  PERMISSIONS,
  ALL_PERMISSIONS,
  LSP8_TOKEN_ID_TYPES,
  LSP25_VERSION,
  ErrorSelectors,
  EventSigHashes,
  FunctionSelectors,
  ContractsDocs,
  StateVariables,
} from '@lukso/lsp-smart-contracts';
```

The following additional typescript types are also available, including types for the JSON format of the LSP3 Profile and LSP4 Digital Asset metadata.

```ts
import {
  LSP2ArrayKey,
  LSPSupportedStandard,
  LSP6PermissionName,
  LSP3ProfileMetadataJSON,
  LSP3ProfileMetadata,
  LSP4DigitalAssetMetadataJSON,
  LSP4DigitalAssetMetadata,
  ImageMetadata,
  LinkMetadata,
  AssetMetadata,
} from '@lukso/lsp-smart-contracts';
```

You can find the [interface IDs](../../contracts/interface-ids) of the smart contracts in or more information in the [`README.md`](https://github.com/lukso-network/lsp-smart-contracts/blob/develop/README.md).
