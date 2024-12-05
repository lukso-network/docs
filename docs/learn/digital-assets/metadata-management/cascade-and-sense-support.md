---
sidebar_label: 'Cascade And Sense Support For NFTs'
sidebar_position: 6
description: 'Introduction to implementation cascade and sense protocol of nfts at LUKSO network'
---

# Tokens & NFT 2.0

:::success Useful Tip

The [guide section](../../digital-assets/token/create-lsp7-token.md) will walk you through uploading images and metadata to Cascade and Sense protocol on [LUKSO Testnet](../../../networks/testnet/parameters.md).

:::

## Introduction

[Cascade](https://cascade.pastel.network) is a protocol that allows users to store data permanently in a highly redundant, distributed fashion with a single upfront fee.

[Sense](https://sense.pastel.network) is a lightweight protocol on the Pastel Network, built to assess the relative rareness of a given NFT against near-duplicate meta-data. Sense can recognize even the most subtle similarities between two digital collectibles, even if one has been transformed. The protocol goes beyond the standard “digital fingerprint” approach to establishing the rareness of an NFT, and actually looks at the rareness of the pixel patterns in data. While digital fingerprints do allow users to verify that an NFT was created by a particular creator, this is a fairly weak form of rareness. Sense solves this problem by assigning a ‘Relative Rareness Score’ to quantify how rare an NFT is relative to all NFTs in the underlying dataset.

## Uploading files to Cascade and Sense Protocol

To upload files to Cascade and Sense protocol, you need gateway api key.

### Upload files to Cascade Protocol

You can use CascadeUploader of `@lukso/data-provider-cascade` library to upload files to Cascade Protocol and retrieve result id and ipfs link.

```
import { createReadStream } from "node:fs";
import { CascadeUploader } from "@lukso/data-provider-cascade";
import { config } from "dotenv";

config({ path: "./.env.test" });

const provider = new CascadeUploader(
	process.env.CASCADE_API_KEY || ""
);

const file = createReadStream("./examples/test-image.png");

const result = await provider.uploadToCascade(file);

if (result) {
  console.log(result.ipfs_url);
}
```

### Upload files to Sense Protocol

You can use SenseUploader of `@lukso/data-provider-sense` library to upload files to Sense Protocol and retrieve result id and ipfs link.

```
import { createReadStream } from "node:fs";
import { SenseUploader } from "@lukso/data-provider-sense";
import { config } from "dotenv";

config({ path: "./.env.test" });

const provider = new SenseUploader(
	process.env.SENSE_API_KEY || ""
);

const file = createReadStream("./examples/test-image.png");

const result = await provider.uploadToSense(file);

if (result) {
  console.log(result.ipfs_url);
}
```

### Retrieve activation ticket transaction id

To get activation ticket transaction status and id, you can use `retrieveTxId` function of provider.

```
const { result_id } = await provider.uploadToCascade(file);
const { status, tx_id } = await provider.retrieveTxId(result_id);
console.log(tx_id);
```

## Add Cascade and Sense's result id and activation ticket id to metadata

After you upload files to Cascade and Sense protocol, you need to save those information at metadata of nft.

```
{
  ... other properties
  cascadeId: "fc67a80d-0d4a-4065-868f-8c9bd1d0efb6", // Cascade upload result id
  cascadeTxId: "4482769c-7256-4339-97ad-f563c11e38ad", // Cascade Activation Ticket TxId
  senseId: "3959c860-ccbd-402c-8617-6cdac8cfef7f" // Sense upload result id
  senseTxId: "b1641fd0-328a-4c62-913b-3e7414c3b154" // Sense Activation Ticket TxId
}
```

## References

- [Cascade Overview](https://docs.pastel.network/cascade-protocol/cascade-overview)
- [Sense Overview](https://docs.pastel.network/sense-protocol/master)
