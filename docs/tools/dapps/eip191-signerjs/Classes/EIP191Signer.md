---
sidebar_position: 1
---

# EIP191Signer

## hashEthereumSignedMessage

```javascript
eip191Signer.hashEthereumSignedMessage(message);
```

Hashes the given message. The message will be enveloped as follows: `'\x19' + '\x45' + 'thereum Signed Message:\n' + messageBytes.length + message` and hashed using keccak256.

### Parameters

`message` - `String`: A message to hash.

### Returns

`String`: The hashed message constructed as `'\x19' + '\x45' + 'thereum Signed Message:\n' + messageBytes.length + message`

### Example

```javascript
eip191Signer.hashEthereumSignedMessage('Hello World');
// '0xa1de988600a42c4b4ab089b619297c17d53cffae5d5120d82d8a92d0bb3b78f2';
```

## hashDataWithIntendedValidator

```javascript
eip191Signer.hashDataWithIntendedValidator(validatorAddress, message);
```

Hashes the given message. The message will be enveloped as follows: `'\x19' + '\x00' + validatorAddress + message` and hashed using keccak256.

### Parameters

`validatorAddress` - `String`: The address of the validator.

`message` - `String`: A message to hash.

### Returns

`String`: The hashed message constructed as `'\x19' + '\x00' + validatorAddress + message`

### Example

```javascript
eip191Signer.hashDataWithIntendedValidator(
  0xad278a6ead89f6b6c6fdf54a3e6e876660593b45,
  'Hello World',
);
// '0xa63022286ecaa3317625e319a64b3bf01c41da558dfc1890e8cb196eb414ffd5';
```

## signEthereumSignedMessage

```javascript
eip191Signer.signEthereumSignedMessage(message, signingKey);
```

Signs a message. The message passed as parameter will be wrapped as follows: `'\x19' + '\x45' + 'thereum Signed Message:\n' + messageBytes.length + message`

### Parameters

1. `message` - `String`: The message to sign.

2. `signingKey` - `String`: The private key to sign with.

### Returns

`Object`: **The Message object**

- `message` - `String`: The given message.
- `messageHash` - `String`: The hash of the given message constructed as `'\x19' + '\x45' + 'thereum Signed Message:\n' + messageBytes.length + message`.
- `r` - `String`: First 32 bytes of the signature.
- `s` - `String`: Next 32 bytes of the signature.
- `v` - `String`: Recovery value + 27.
- `signature` - `String`: The raw RLP encoded signature.

### Example

```javascript
eip191Signer.signEthereumSignedMessage(
  'Hello World',
  'ffeb17b9a6059fec3bbab63d76b060b7380cac7a62ce6621a134531a46458968',
);
/**
{     message: 'Hello World',
      messageHash: '0xa1de988600a42c4b4ab089b619297c17d53cffae5d5120d82d8a92d0bb3b78f2',
      v: '0x1c',
      r: '0x85c15865f2909897c1be6d66c1d9c86d6125978aec9e28d1a69d4d306bde694f',
      s: '0x7cf9723f0eeaf8815e3fa984ac1d7bf3c420786ead91abd4dd9c1657897efec1',
      signature: '0x85c15865f2909897c1be6d66c1d9c86d6125978aec9e28d1a69d4d306bde694f7cf9723f0eeaf8815e3fa984ac1d7bf3c420786ead91abd4dd9c1657897efec11c'
    }
*/
```

## signDataWithIntendedValidator

```javascript
eip191Signer.signDataWithIntendedValidator(
  validatorAddress,
  message,
  signingKey,
);
```

Signs a message. The message passed as parameter will be wrapped as follows: `'\x19' + '\x00' + validatorAddress + message`

### Parameters

1. `validatorAddress` - `String`: The address of the validator.

2. `message` - `String`: The message to sign.

3. `signingKey` - `String`: The private key to sign with.

### Returns

`Object`: **The Message object**

- `message` - `String`: The given message.
- `messageHash` - `String`: The hash of the given message constructed as `'\x19' + '\x00' + validatorAddress + message`.
- `r` - `String`: First 32 bytes of the signature.
- `s` - `String`: Next 32 bytes of the signature.
- `v` - `String`: Recovery value + 27.
- `signature` - `String`: The raw RLP encoded signature.

### Example

```javascript
eip191Signer.signDataWithIntendedValidator(
  '0xad278a6ead89f6b6c6fdf54a3e6e876660593b45',
  'Hello World',
  'ffeb17b9a6059fec3bbab63d76b060b7380cac7a62ce6621a134531a46458968',
);
/**
    {
      message: 'Hello World',
      messageHash: '0xa1de988600a42c4b4ab089b619297c17d53cffae5d5120d82d8a92d0bb3b78f2',
      v: '0x1c',
      r: '0x85c15865f2909897c1be6d66c1d9c86d6125978aec9e28d1a69d4d306bde694f',
      s: '0x7cf9723f0eeaf8815e3fa984ac1d7bf3c420786ead91abd4dd9c1657897efec1',
      signature: '0x85c15865f2909897c1be6d66c1d9c86d6125978aec9e28d1a69d4d306bde694f7cf9723f0eeaf8815e3fa984ac1d7bf3c420786ead91abd4dd9c1657897efec11c'
    }

*/
```

## recover

```javascript
eip191Signer.recover(message, signature);
```

Recovers the address which was used to sign the given message.

### Parameters

1. `messageHash` - `String|Object`: **Either signed message already prefixed and hashed or Message object with the following values**:

   - `message` - `String`: The given message.
   - `messageHash` - `String`: The hash of the given message.
   - `r` - `String`: First 32 bytes of the signature.
   - `s` - `String`: Next 32 bytes of the signature.
   - `v` - `String`: Recovery value + 27.
   - `signature` - `String`: The raw RLP encoded signature.

2. `signature` - `String`: The raw RLP encoded signature.

### Returns

`String`: The address used to sign the given message.

### Example

```javascript
eip191Signer.recover(
  'Hello World',
  '0x1eab2de0103b8e82650f9706b17cf2adce55a335e7041bad5a94ab49c56a9c12662e80a369ffa2a6a77fbeaad1f32653cbd74860c8fbc999b1fc47b8d1cb7d931c',
);
// 0x4C58e78663CB5D2Bd84Dc10beDe82A7C83442a8d;
```
