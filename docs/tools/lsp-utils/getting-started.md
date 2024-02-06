---
sidebar_position: 1
---

# Getting Started

:::caution
This package is currently in the early stages of development. Please use it for testing or experimentation purposes only.
:::

The `@lukso/lsp-utils` package allows you to interact with the LSPs in a easier way. It provides a set of utility functions. The package is meant to speed up the frontend/backend development using LSP smart contracts.

- GitHub repo: http://github.com/lukso-network/lsp-utils
- NPM: https://www.npmjs.com/package/@lukso/lsp-utils

## Installation

### General package

```bash
npm install @lukso/lsp-utils
```

### Specific package

```bash
npm install @lukso/lsp-utils/LSP2
```

## Usage

```ts
import { generateArrayElementKeyAtIndex } from '@lukso/lsp-utils';

const indexDataKey = generateArrayElementKeyAtIndex('ArrayName[]', 1);
```

```ts
import { generateMappingKey } from '@lukso/lsp-utils/LSP2';

const mappingDataKey = generateMappingKey(
  'FirstMappingPart',
  'SecondMappingPart',
);
```
