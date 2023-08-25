---
sidebar_position: 2
---

# Key Manager

The Key Manager uses the concept of permissions to _authorize_ any addresses (dApps, protocols, devices, etc…) to do certain specific actions on the contract it is linked to.

This brings a different insight in the concept of ownership. To illustrate, in the case of Universal Profile and the browser extension, you can define your EOA / private keys (hold within your device, like in the Browser Extension) to be the address with All the permissions to do anything (the main admin account). Afterwards, you can grant additional permissions to dApp and protocol to use your account to interact on its behalf.

But why should you give anybody access to you smart contract? What is the intention behind doing this? How are we doing it?

Catalyze interactions on the blockchain. Have dApps execute interactions on my behalf. Giving partial access, only what they only need to do.

## How the Key Manager can be used

A Key Manager can be used with different setups. For intance:

- to control a LSP0ERC725Account like a Universal Profile.
- to control a Token contract.

## Adding new controllers

- ADD CONTROLLERS = add a **new** controller address that had no permissions before.
- EDIT PERMISSIONS = edit the existing permissions of a controller.