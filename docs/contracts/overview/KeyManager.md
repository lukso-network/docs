---
sidebar_position: 2
---

# Key Manager

The Key Manager uses the concept of permissions to _authorize_ any addresses (dApps, protocols, devices, etc…) to do certain specific actions on the contract it is linked to.

But why should you give anybody access to your smart contract? What is the intention behind doing this? How does the Key Manager enables that?

As we will see, the Key Manager brings a different insight into the concept of ownership and permissions. 

Let's illustrate with some examples. A Key Manager can be used with different setups. For intance:

- to control a LSP0ERC725Account like a Universal Profile.
- to control a Token contract.

## Example with a Universal Profile

To illustrate, in the case of Universal Profile and the browser extension, you can define your EOA / private keys (hold within your device, like in the Browser Extension) to be **the address with all the permissions** to do anything (the main admin account). 

Afterwards, you can grant partial access to dApp and protocol (more specifically the smart contract addresses behind them), so that they can use your Universal Profile to interact on your behalf. This catalyze interactions on the blockchain, where your Universal Profile can do more and operate automatically in controlled manner, without requiring the main profile owner to have to do everything.

### Allowed ERC725Y Data Keys

:::note

If controller has `SETDATA` permission but has no `AllowedERC725YDataKeys`, controller will not be able to use the `SETDATA` permission at all. 

:::

Key Manager allows for restricting controller addresses to change only specific or dynamic data keys. In order to achieve such functionallity one could encode a set of data keys to [`bytes[CompactBytesArray]`](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md#bytescompactbytesarray), and store them under the [Allowed ERC725Y Data Keys](../../standards/universal-profile/lsp6-key-manager.md#allowed-erc725y-data-keys) data key.

#### Specific Data Keys

A _Specific Data Key_ must have the length of 32 bytes. Setting a _Specific Data Key_ in the [Allowed ERC725Y Data Keys](../../standards/universal-profile/lsp6-key-manager.md#allowed-erc725y-data-keys) will allow the controller to only modify the data value of that _Specific Data Key_.

#### Dynamic Data Keys

A _Dynamic Data Key_ can have any length between 0 and 32 (except 0 and 32). Setting a _Dynamic Data Key_ in the [Allowed ERC725Y Data Keys](../../standards/universal-profile/lsp6-key-manager.md#allowed-erc725y-data-keys) will allow the controller to modify the data value of any data key that starts exactly with that  _Dynamic Data Key_.

Example:

Dynamic Data Key - `0xcafe0000cafe0000beef0000beef`

|                              Data key                               | Can modify data value? |
| :------------------------------------------------------------------ | :--------------------- |
| `0xcafe0000cafe0000beef0000beef000000000000000000000000000000000000`|           ✅           |
| `0xcafe0000cafe0000beef0000beef000000000000000000000000000000000123`|           ✅           |
| `0xcafe0000cafe0000beef0000beefcafecafecafecafecafecafecafecafecafe`|           ✅           |
| `0x0000000000000000000000000000cafecafecafecafecafecafecafecafecafe`|           ❌           |
| `0x000000000000000000000000000000000000cafe0000cafe0000beef0000beef`|           ❌           |

## Further Reading

- [The Bytecode episode #4 (Youtube) - overview of the Solidity code of the `LSP6KeyManagerCore.sol` by Jean Cavallera](https://www.youtube.com/watch?v=2Sm9LsCPjdE)