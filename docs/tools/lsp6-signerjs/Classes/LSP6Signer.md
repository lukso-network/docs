---
sidebar_position: 1
---

# LSP6Signer

## hashMessage

```javascript
lsp6Signer.hashMessage(message);
```

Hashes the given message. The message will be enveloped as follows: `'\x19Execute Relay Call:\n' + message.length + message` and hashed using keccak256.

### Parameters

`message` - `String`: A message to hash.

### Returns

`String`: The hashed message constructed as `'\x19Execute Relay Call:\n'+ message.length + message`.

### Example

```javascript
lsp6Signer.hashMessage('Hello World');
// '0x677739c1b99336b0c40ed12a4d77c68805f8b5ca2d865676de85bf83b3b664ee';
```

## sign

```javascript
lsp6Signer.sign(message, signingKey);
```

Signs a message. The message passed as parameter will be wrapped as follows: `'\x19Execute Relay Call:\n' + message.length + message`.

### Parameters

1. `message` - `String`: The message to sign.

2. `signingKey` - `String`: The private key to sign with.

### Returns

`Object`: **The Message object**

- `message` - `String`: The given message.
- `messageHash` - `String`: The hash of the given message constructed as `'\x19Execute Relay Call:\n' + message.length + message`.
- `r` - `String`: First 32 bytes of the signature.
- `s` - `String`: Next 32 bytes of the signature.
- `v` - `String`: Recovery value + 27.
- `signature` - `String`: The raw RLP encoded signature.

### Example

```javascript
lsp6Signer.sign(
  'hello',
  'ffeb17b9a6059fec3bbab63d76b060b7380cac7a62ce6621a134531a46458968',
);
/**
  {
    message: 'hello',
    messageHash: '0x934569d4db7a78dc4711efd76caf79ce700d9a8e947922b7485517cec1d61020',
    v: '0x1b',
    r: '0xa334735fad35cc38712daf7b4c584d67cfc9db2decf4b9a361d38106c87826d7',
    s: '0x2e7c53539c3f4427c35986b961489fc593b36730ce1ef1b80b835452b725e8e4',
    signature: '0xa334735fad35cc38712daf7b4c584d67cfc9db2decf4b9a361d38106c87826d72e7c53539c3f4427c35986b961489fc593b36730ce1ef1b80b835452b725e8e41b'
  }
*/
```

## recover

```javascript
lsp6Signer.recover(message, signature, isMessagePrefixed);
```

Recovers the address which was used to sign the given message.

### Parameters

1. `message` - `String|Object`: **Either signed message or Message object with the following values**:

   - `message` - `String`: The given message.
   - `messageHash` - `String`: The hash of the given message constructed as `'\x19Execute Relay Call:\n' + message.length + message`.
   - `r` - `String`: First 32 bytes of the signature.
   - `s` - `String`: Next 32 bytes of the signature.
   - `v` - `String`: Recovery value + 27.
   - `signature` - `String`: The raw RLP encoded signature.

2. `signature` - `String`: The raw RLP encoded signature.
3. `isMessagePrefixed` - `Boolean` (optional, default: false): If true, the given message will NOT automatically be prefixed and hashed as `'\x19Execute Relay Call:\n' + message.length + message`, and assumed to be already prefixed and hashed.

### Returns

`String`: The address used to sign the given message.

### Example

```javascript
lsp6Signer.recover(
  'hello',
  '0x1eab2de0103b8e82650f9706b17cf2adce55a335e7041bad5a94ab49c56a9c12662e80a369ffa2a6a77fbeaad1f32653cbd74860c8fbc999b1fc47b8d1cb7d931c',
  false,
);
// 0x41516F337a32133a6C1FAb8F853F60f909ccd1eD;
```
