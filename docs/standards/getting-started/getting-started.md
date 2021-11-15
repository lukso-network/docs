---
sidebar_label: "Setup"
sidebar_position: 2.1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Setup

We will first start by creating an instance of web3.js, connected to L14 test network.

_add your address with a password (take Fabian gist)_

<Tabs>

  <TabItem value="web3js" label="web3.js" default>

```javascript
const Web3 = require("web3");

const web3 = new Web3("https://rpc.l14.lukso.network");
```

  </TabItem>

  <TabItem value="etherjs" label="ether.js" default>

```javascript
import { ether } from "ethers";

const provider = new ethers.provider.JsonRpcProvider("https://rpc.l14.lukso.network", { name: "L14", chainId: 22 });
```

  </TabItem>
</Tabs>
