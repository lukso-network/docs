---
sidebar_position: 1
---

# LSP6Signer

## hashMessage

```javascript
lsp6Signer.hashMessage(message);
```

Hashes the given message. The message will be enveloped as follows: `'\x19LSP6 ExecuteRelayCall:\n' + message.length + message` and hashed using keccak256.

### Parameters

`message` - `String`: A message to hash.

### Returns

`String`: The hashed message constructed as `'\x19LSP6 ExecuteRelayCall:\n'+ message.length + message`.

### Example

```javascript
lsp6Signer.hashMessage('Hello World');
// '0x267dbe91dc4e45f9ab588be314b8f954513a4bcd55015a9380bea074b76dc91f';
```

## sign

```javascript
lsp6Signer.sign(message, signingKey);
```

Signs a message. The message passed as parameter will be wrapped as follows: `'\x19LSP6 ExecuteRelayCall:\n' + message.length + message`.

### Parameters

1. `message` - `String`: The message to sign.

2. `signingKey` - `String`: The private key to sign with.

### Returns

`Object`: **The Message object**

- `message` - `String`: The given message.
- `messageHash` - `String`: The hash of the given message constructed as `'\x19LSP6 ExecuteRelayCall:\n' + message.length + message`.
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
    messageHash:
      '0xd8fd712232755d5f8819c95fdd911dcd51c012b8a66f9710ef0c86ad30925fa6',
    v: '0x1c',
    r: '0x1eab2de0103b8e82650f9706b17cf2adce55a335e7041bad5a94ab49c56a9c12',
    s: '0x662e80a369ffa2a6a77fbeaad1f32653cbd74860c8fbc999b1fc47b8d1cb7d93',
    signature:
      '0x1eab2de0103b8e82650f9706b17cf2adce55a335e7041bad5a94ab49c56a9c12662e80a369ffa2a6a77fbeaad1f32653cbd74860c8fbc999b1fc47b8d1cb7d931c',
  };
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
   - `messageHash` - `String`: The hash of the given message constructed as `'\x19LSP6 ExecuteRelayCall:\n' + message.length + message`.
   - `r` - `String`: First 32 bytes of the signature.
   - `s` - `String`: Next 32 bytes of the signature.
   - `v` - `String`: Recovery value + 27.
   - `signature` - `String`: The raw RLP encoded signature.

2. `signature` - `String`: The raw RLP encoded signature.
3. `isMessagePrefixed` - `Boolean` (optional, default: false): If true, the given message will NOT automatically be prefixed and hashed as `'\x19LSP6 ExecuteRelayCall:\n' + message.length + message`, and assumed to be already prefixed and hashed.

### Returns

`String`: The address used to sign the given message.

### Example

```javascript
lsp6Signer.recover(
  'hello',
  '0x1eab2de0103b8e82650f9706b17cf2adce55a335e7041bad5a94ab49c56a9c12662e80a369ffa2a6a77fbeaad1f32653cbd74860c8fbc999b1fc47b8d1cb7d931c',
  false,
);
// 0xe66Df2466ed6d92AC8c261b98ddAFbec65C6dCC8;
```
