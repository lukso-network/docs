---
sidebar_position: 1
---

# Getting Started

The `@lukso/lsp6-signer.js` package is used to sign an LSP6 Execute Relay Call transaction.

This library will add the `\x19Execute Relay Call:\n` prefix to a message and sign it.

The ExcuteRelayCall prefix is used instead of the standard Ethereum transaction prefix to sign messages so that an executeRelayCall transaction cannot be inadvertently signed when signing an Ethereum signed message.

- [GitHub Repository](https://github.com/lukso-network/tools-lsp6-signer)
- [NPM Package](https://www.npmjs.com/package/@lukso/lsp6-signer.js)

# Install

```bash
npm install @lukso/lsp6-signer.js
```

# Setup

```javascript
import { LSP6Signer } from '@lukso/lsp6-signer.js';

const lsp6Signer = new LSP6Signer();
```
