---
id: create-up
title: Create Universal Profile
sidebar_position: 1
---

To create a [Universal Profile](standards/universal-profile.md) with a key manager and a [LSP-1 UniversalReceiver Delegate](https://github.com/lukso-network/LIPs/blob/master/LSPs/LSP-1-UniversalReceiver.md) contract:

![post](https://img.shields.io/badge/-POST-green) `https://relayer.lukso.network/api/v1/create-profile`

### Payload

```json
{
    "ownerAddress": "0xAF3Bf2FFb025098B79CADdfBdD113B3681817744",
    "salt": "0xAd5b8C240097b7c9F8A8151C13F897B1093703C8a6b80bde39837c769f4c1079",
    "profileJsonUrl": "ipfs://XXXX"
}
```

- `ownerAddress`: the public key you control. This key will be granted an executor role in the key manager.
- `salt`: some random 32 bytes to determine the address.
- `profileJsonUrl`: (optional) the [LSP3Profile](standards/universal-profile.md) JSON file, http(s) doesn't work yet.

### Response

```json
{
    "address": "0xb6c076B6D368df8C54ab26b39467c113fBEFFc95",
    "ownerAddress": "0xAF3Bf2FFb025098B79CADdfBdD113B3681817744",
    "keyManagerAddress": "0x44dcC53994F1dFBa7c3f6f73E7c4E02B9F1817de",
    "universalDelegateAddress": "0xBF32C2E62d2C239f8F3ea2d5E03dfAeE11bBab7E"
}
```

- `address`: address of the deployed Universal Profile contract. You can view this profile on `https://universalprofile.cloud/{address}`.
- `ownerAddress`: same as above, the public key you control.
- `keyManagerAddress`: address of the deployed [SimpleKeyManager](https://github.com/lukso-network/universalprofile-smart-contracts/blob/legacy-contracts/contracts/KeyManager/SimpleKeyManager.sol) smart contract. This key manager smart contract has ownership on the Universal Profile smart contract.
- `universalDelegateAddress`: address of the deployed [UniversalReceiverAddressStore](https://github.com/lukso-network/universalprofile-smart-contracts/blob/legacy-contracts/contracts/UniversalReceiver/UniversalReceiverAddressStore.sol) delegate smart contract.

## Smart contracts

The source code of the deployed smart contracts is available in the [universalprofile-smart-contracts](https://github.com/lukso-network/universalprofile-smart-contracts/tree/legacy-contracts) repository. The relayer currently deploys the legacy smart contracts. The relayer and this documentation will be updated once the new Universal Profile smart contracts are available.
