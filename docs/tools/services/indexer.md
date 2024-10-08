---
title: 📑 Indexer API
sidebar_position: 1
---

# Indexer API

:::info 🔓 Private Beta access

This feature is currently in private beta. If you are interested, please [contact us](https://forms.gle/rhWA25m3jjuPNPva9).

:::

If you are building on LUKSO, you can request a developer access to our indexer. This will allow you to query Universal Profiles and LSP7/8 assets.

## [Algolia](https://www.algolia.com/)

<p align="center">
<img src="/img/tools/algolia_example.png" height="600px" alt="example of Algolia search"/>
</p>

Our backend system indexes profiles and assets and sends the data to Algolia.

You can use the following Algolia API key to build a quick search engine for Universal Profiles and/or assets (as seen on the screenshot above). This is the technology that powers the search bar on [https://universalprofile.cloud/](https://universalprofile.cloud/).

```
APPLICATION_ID = YHFN1WRCR5
API_KEY = [request it from us]
```

**Indices:**

- `prod_mainnet_assets`
- `prod_testnet_assets`
- `prod_mainnet_universal_profiles`
- `prod_testnet_universal_profiles`

**Access Control Lists (ACLs):**

- `search`

### Resources

- [Algolia Docs](https://www.algolia.com/doc/)

## LUKSO API

We provide the following API to help you get the nice information about the profiles and assets:

```
https://api.universalprofile.cloud/
```

### `GET /v1/:chainId/address/:address`

Return [LSP4 - Digital Asset Metadata](https://docs.lukso.tech/standards/tokens/LSP4-Digital-Asset-Metadata/) or [LSP3 - Profile Metadata](https://docs.lukso.tech/standards/metadata/lsp3-profile-metadata). Loads data directly from Algolia and caches it for a while. Adding /TOKENID at the end will retrieve tokenId data for LSP8 tokens.

### `GET /v1/:chainId/stats`

Get statistics of profile and asset indexes for the particular chain.

### `GET /ipfs/:cid*`

Return content from IPFS gateways.
