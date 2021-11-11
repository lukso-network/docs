---
title: Interfaces ID
sidebar_position: 7
---

# Interfaces ID

**Interfaces ID** helps to check if a contract supports an interface, it's a meta-interface so to say. This is useful if we want to interact with a contract but we don't know if it supports an interface such as **[ERC725Y](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-725.md#erc725y)** or **[LSP1](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-1-UniversalReceiver.md)** , etc .

The `supportsInterface` function for **[ERC165 Standard](https://eips.ethereum.org/EIPS/eip-165)** returns **TRUE** if the standard is supported, **FALSE** otherwise.


| Contract                          | InterfaceId | Description                                                                                  |
| :-------------------------------- | :---------- | :------------------------------------------------------------------------------------------  |
| ERC725X                           | `0x44c028fe`| General executor.                                                                            |
| ERC725Y                           | `0x5a988c0f`| General key-value store.                                                                     |
| LSP1-UniversalReceiver            | `0x6bb56a14`| Universal Receiver entry function.                                                           |
| ERC1271                           | `0x1626ba7e`| Standard Signature Validation Method for Contracts.                                          |
| LSP0-ERC725Account                | `0x63cb749b`| **UniversalProfile** containing `ERC725X` + `ERC725Y` + `LSP1-UniversalReceiver` + `ERC1271` |
| LSP6-KeyManager                   | `0x6f4df48b`| Controller for the **UniversalProfile**.                                                     |
| LSP1-UniversalReceiverDelegate    | `0xc2d7bcc1`| Universal Receiver delegated to an other smart contract.                                     |
| LSP7-DigitalAsset                 | `0xe33f65c3`| Digital Assets either fungible or non-fungible. _ERC20 A-like_                               |
| LSP8-IdentifiableDigitalAsset     | `0x49399145`| Identifiable Digital Assets (NFT). _ERC721 A-like_                                           |

