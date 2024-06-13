---
title: ⛽️ Relayer access
sidebar_position: 10
---

# Relayer developer access

:::info 🔓 Private Beta access

This feature is currently in private beta. If you are interested, please [contact us](https://forms.gle/rhWA25m3jjuPNPva9).

:::

If you are building on LUKSO, you can request a developer access to our relayer to create Universal Profiles for your users.

## Request access

Please fill out [this form](https://forms.gle/rhWA25m3jjuPNPva9) to request access to our relayer.

## API Documentation

- Testnet: [https://relayer-api.testnet.lukso.network/](https://relayer-api.testnet.lukso.network/docs#/)
- Mainnet: [https://relayer-api.mainnet.lukso.network/](https://relayer-api.mainnet.lukso.network/docs#/)

## Features

### Deploy Universal Profiles

You can deploy Universal Profiles for users by providing either:

- a controller address (`lsp6ControllerAddress`) and metadata (`lsp3Profile`)
- or a `salt` and `postDeploymentCallData`

Please refer to the Swagger docs (links below) for more information.

In this process, you might need to use the [`up_import`](../standards/rpc-api#up_import) RPC call from the [Universal Profile Extension](/install-up-browser-extension).

### Register Users and Universal Profiles

If your project has already created Universal Profiles (UP) for your users, you can register these profiles to our relayer so they can benefit from the gasless transactions experience provided by the LUKSO relayer.

### How it works

- Developer provides a Universal Profile (UP) address to be registered in the LUKSO relayer.

  - If the UP is not already registered, the relayer creates a new `User` with the new UP attached.
  - New `User` is granted the default gas quota (20m).

- Developer may also provide a `User ID`, to register a Universal Profile for an already created User.
  - For example a Developer may build a platform where enterprise users can deploy Universal Profiles for their organisation, we can attach multiple Universal Profiles per organisation
