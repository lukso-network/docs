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

