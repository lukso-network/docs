---
sidebar_position: 1
---

# Getting Started

- [GitHub Repository](https://github.com/lukso-network/tools-lsp6-signer)
- [NPM Package](https://www.npmjs.com/package/@lukso/lsp6-signer.js)

The `@lukso/eip191-signer.js` package is used to sign any EIP191 data.

The following format is used to sign data :

```bash
0x19 <1 byte version> <version specific data> <data to sign>
```

In the case of an Ethereum Signed Message:

- 1 byte version = `0x45`
- version specific data = `thereum Signed Message:\n + len(message)`

In the case of data with intended validator:

- 1 byte version = `0x00`
- version specific data = validatorAddress

  This prefix is used so that a transaction cannot be inadvertently signed when signing an Ethereum signed message.

# Install

```bash
npm install @lukso/eip191-signer.js
```

# Setup

```javascript
import { EIP191Signer } from '@lukso/eip191-signer.js';

const eip191Signer = new EIP191Signer();
```
