---
sidebar_label: '🔀 Transfer Tokens / NFTs in Batch'
sidebar_position: 6
description: This guide shows you how to transfer a token to multiple addresses or multiple NFTs from a collection to the same or different recipient addresses.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Transfer Tokens / NFTs in Batch

The LSP7 and LSP8 standards contain a `transferBatch(...)` function that can be useful to perform batch transfers in a single transaction. For instance, it enables to:

- transfer the same LSP7 token to multiple different addresses.
- transfer multiple NFTs from the same LSP8 collection to the same recipient.
- transfer multiple NFTs from the same LSP8 collection to different recipients.

The code snippets below are coupled with examples of use cases of how the `transferBatch(...)` can be used for real life examples in applications.

## Setup

You will need the following dependencies here:

<Tabs groupId="provider-lib">
<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```bash
npm install ethers @lukso/lsp-smart-contracts
```

  </TabItem>

<TabItem value="web3" label="web3" attributes={{className: "tab_web3"}}>

```bash
npm install web3 @lukso/lsp-smart-contracts
```

  </TabItem>

</Tabs>

## Transfer tokens to multiple recipients

The code snippet below uses the [`transferBatch(...)`](../../contracts/contracts/LSP7DigitalAsset/LSP7DigitalAsset.md#transferbatch) function from `LSP7DigitalAsset` to transfer to multiple recipients can be useful for scenarios such as:

Examples scenarios of transferring the same or different amounts of a token to multiple recipients could be:

- distribute token dividends to multiple shareholders in a single transaction.
- provide the same token for different liquidity pools in a defi protocol.

<Tabs groupId="provider-lib">
<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```ts
import { ethers } from 'ethers';
import LSP7DigitalAssetArtifact from '@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json';

// Connect to the wallet in the browser 🧩
// and retrieve signer (🆙 Browser Extension or any other wallet 👝)
const provider = new ethers.BrowserProvider(window.lukso || window.ethereum);
const account = await provider.getSigner();
console.log('Connect to account: ', account.address);

const token = new ethers.Contract(
  '0x...', // token contract address
  LSP7DigitalAssetArtifact.abi,
  account,
);

await token.transferBatch(
    [ // from
        account.address,
        account.address,
        account.address,
    ]
    [ // to (= recipients)
        "0x...", // alice address
        "0x...", // bob address
        "0x...", // carol address
    ],
    [
        ethers.parseEther("10"), // transfer 10 tokens to Alice
        ethers.parseEther("20"), // transfer 20 tokens to Bob
        ethers.parseEther("30"), // transfer 30 tokens to Carol
    ],
    [ // `force` parameter, defines if we can transfer to EOA or contracts that do not implement LSP1
        true,
        true,
        true
    ],
    [ // data
        "0x", // no extra data
        "0x",
        "0x",
    ]
);
```

  </TabItem>

<TabItem value="web3" label="web3" attributes={{className: "tab_web3"}}>

```ts
import Web3 from 'web3';
import LSP7Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP7DigitalAsset.json';

// Connect to the wallet in the browser 🧩
// and retrieve signer (🆙 Browser Extension or any other wallet 👝)
const web3 = new Web3(window.lukso || window.ethereum);
const [account] = await web3.eth.getAccounts(); // get the first account
console.log('Connect to account: ', account);

const token = new web3.eth.Contract(
    LSP7Artifact.abi,
  '0x...', // token contract address
);

await token.methods.transferBatch(
    [ // from
        account.address,
        account.address,
        account.address,
    ]
    [ // to (= recipients)
        "0x...", // alice address
        "0x...", // bob address
        "0x...", // carol address
    ],
    [
        ethers.parseEther("10"), // transfer 10 tokens to Alice
        ethers.parseEther("20"), // transfer 20 tokens to Bob
        ethers.parseEther("30"), // transfer 30 tokens to Carol
    ],
    [ // `force` parameter, defines if we can transfer to EOA or contracts that do not implement LSP1
        true,
        true,
        true
    ],
    [ // data
        "0x", // no extra data
        "0x",
        "0x",
    ]
).send({ from: account });
```

  </TabItem>

</Tabs>

## Transfer multiple NFTs to one recipient

Examples scenarios of transferring NFTs from the same collection in batch for the same recipient could be:

- putting some valuable NFTs from a collection you hold into a safe vault.

<Tabs groupId="provider-lib">
<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```ts
import { ethers } from 'ethers';
import LSP8Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';

// Connect to the wallet in the browser 🧩
// and retrieve signer (🆙 Browser Extension or any other wallet 👝)
const provider = new ethers.BrowserProvider(window.lukso || window.ethereum);
const account = await provider.getSigner();
console.log('Connected to account: ', account.address);

const nftContract = new ethers.Contract(
  '0x86e817172b5c07f7036bf8aa46e2db9063743a83', // Chillwhale NFT contract address
  LSP8Artifact.abi,
  account,
);

const nftsRecipient = "0xcafecafecafecafecafecafecafecafecafecafe";

await nftContract.transferBatch(
    [ // from
        account.address,
        account.address,
        account.address,
    ]
    [ // to (= recipient, 3 x times the same address)
        nftsRecipient,
        nftsRecipient,
        nftsRecipient,
    ],
    [ // bytes32 tokenIds
        "0x0000000000000000000000000000000000000000000000000000000000001579", // chillwhale ID 5497 (= 0x1579 in hex)
        "0x00000000000000000000000000000000000000000000000000000000000006e6", // chillwhale ID 1766 (= 0x06e6 in hex)
        "0x00000000000000000000000000000000000000000000000000000000000016a1", // chillwhale ID 5793 (= 0x16a1 in hex)
    ],
    [ // `force` parameter, defines if we can transfer to EOA or contracts that do not implement LSP1
        true,
        true,
        true
    ],
    [ // data
        "0x", // no extra data
        "0x",
        "0x",
    ]
);
```

  </TabItem>

<TabItem value="web3" label="web3" attributes={{className: "tab_web3"}}>

```ts
import Web3 from 'web3';
import LSP8Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';

// Connect to the wallet in the browser 🧩
// and retrieve signer (🆙 Browser Extension or any other wallet 👝)
const web3 = new Web3(window.lukso || window.ethereum);
const [account] = await web3.eth.getSigner(); // get the first account
console.log('Connected to account: ', account);

const nftContract = new ethers.Contract(
    LSP8Artifact.abi,
    '0x86e817172b5c07f7036bf8aa46e2db9063743a83', // Chillwhale NFT contract address
);

const nftsRecipient = "0xcafecafecafecafecafecafecafecafecafecafe";

await nftContract.methods.transferBatch(
    [ // from
        account.address,
        account.address,
        account.address,
    ]
    [ // to (= recipient, 3 x times the same address)
        nftsRecipient,
        nftsRecipient,
        nftsRecipient,
    ],
    [ // bytes32 tokenIds
        "0x0000000000000000000000000000000000000000000000000000000000001579", // chillwhale ID 5497 (= 0x1579 in hex)
        "0x00000000000000000000000000000000000000000000000000000000000006e6", // chillwhale ID 1766 (= 0x06e6 in hex)
        "0x00000000000000000000000000000000000000000000000000000000000016a1", // chillwhale ID 5793 (= 0x16a1 in hex)
    ],
    [ // `force` parameter, defines if we can transfer to EOA or contracts that do not implement LSP1
        true,
        true,
        true
    ],
    [ // data
        "0x", // no extra data
        "0x",
        "0x",
    ]
).send({ from: account });
```

  </TabItem>

</Tabs>

## Transfer multiple NFTs to many recipients

Examples scenarios of transferring NFTs from the same collection in batch to different recipients could be:

- perform an airdrop.
- following an auction for the same collection, transfer the NFTs to the winner of each lot (lot referring to each `tokenId`).

<Tabs groupId="provider-lib">
<TabItem value="ethers" label="ethers" attributes={{className: "tab_ethers"}}>

```ts
import { ethers } from 'ethers';
import LSP8Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';

// Connect to the wallet in the browser 🧩
// and retrieve signer (🆙 Browser Extension or any other wallet 👝)
const provider = new ethers.BrowserProvider(window.lukso || window.ethereum);
const account = await provider.getSigner();
console.log('Connected to account: ', account.address);

const nftContract = new ethers.Contract(
  '0x86e817172b5c07f7036bf8aa46e2db9063743a83', // Chillwhale NFT contract address
  LSP8Artifact.abi,
  account,
);

await nftContract.transferBatch(
    [ // from
        account.address,
        account.address,
        account.address,
    ]
    [ // to (= recipients)
        "0x...", // Alice address
        "0x...", // Bob address
        "0x...", // Carol address
    ],
    [ // bytes32 tokenIds
        "0x0000000000000000000000000000000000000000000000000000000000001579", // chillwhale ID 5497 (= 0x1579 in hex)
        "0x00000000000000000000000000000000000000000000000000000000000006e6", // chillwhale ID 1766 (= 0x06e6 in hex)
        "0x00000000000000000000000000000000000000000000000000000000000016a1", // chillwhale ID 5793 (= 0x16a1 in hex)
    ],
    [ // `force` parameter, defines if we can transfer to EOA or contracts that do not implement LSP1
        true,
        true,
        true
    ],
    [ // data
        "0x", // no extra data
        "0x",
        "0x",
    ]
);
```

  </TabItem>

<TabItem value="web3" label="web3" attributes={{className: "tab_web3"}}>

```ts
import Web3 from 'web3';
import LSP8Artifact from '@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';

// Connect to the wallet in the browser 🧩
// and retrieve signer (🆙 Browser Extension or any other wallet 👝)
const web3 = new Web3(window.lukso || window.ethereum);
const [account] = await web3.eth.getSigner(); // get the first account
console.log('Connected to account: ', account);

const nftContract = new ethers.Contract(
  '0x86e817172b5c07f7036bf8aa46e2db9063743a83', // Chillwhale NFT contract address
  LSP8Artifact.abi,
  account,
);

await nftContract.methods.transferBatch(
    [ // from
        account.address,
        account.address,
        account.address,
    ]
    [ // to (= recipients)
        "0x...", // Alice address
        "0x...", // Bob address
        "0x...", // Carol address
    ],
    [ // bytes32 tokenIds
        "0x0000000000000000000000000000000000000000000000000000000000001579", // chillwhale ID 5497 (= 0x1579 in hex)
        "0x00000000000000000000000000000000000000000000000000000000000006e6", // chillwhale ID 1766 (= 0x06e6 in hex)
        "0x00000000000000000000000000000000000000000000000000000000000016a1", // chillwhale ID 5793 (= 0x16a1 in hex)
    ],
    [ // `force` parameter, defines if we can transfer to EOA or contracts that do not implement LSP1
        true,
        true,
        true
    ],
    [ // data
        "0x", // no extra data
        "0x",
        "0x",
    ]
).send({ from: account });
```

  </TabItem>

</Tabs>
