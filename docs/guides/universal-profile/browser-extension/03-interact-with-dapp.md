---
sidebar_label: 'Interact with dApp'
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Interact with dApp

:::note Notice
The UP Browser Extenstion is currently in the **development alpha** version.
:::

:::danger
metamask (or any other ethereum provider) cannot be running at the same time.
:::
The extension injects an 'ethereum' object into a web page as `window.ethereum`. That object is used to interact with the extension.

### Setup

#### Initialize a provider

<Tabs>
  <TabItem value="web3" label="web3">

  ```js
  import Web3 from 'web3';
  const web3 = new Web3(window.ethereum);
  ```

  </TabItem>
  <TabItem value="etherjs" label="etherjs">

  ```js
  import { ethers } from 'ethers';
  const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
  ```

  </TabItem>
</Tabs>


  
#### Get an access to the UP address the user is controlling

A call to `requestAccounts` will open an extension popup to authorize an account.

<Tabs>
  <TabItem value="web3" label="web3">

  ```js
  const accountsRequest: string[] = await web3.eth.requestAccounts();
  const accounts: string[] = await web3.eth.getAccounts(); //should also yield the same address
  ```

  </TabItem>
  <TabItem value="etherjs" label="etherjs">

  ```js
  const accountsRequest: string[] = await etherProvider.send('eth_requestAccounts', []);
  const signer = etherProvider.getSigner();
  await signer.getAddress(); //should also yield the same address
  ```

  </TabItem>
  <TabItem value="raw" label="raw">

  ```js
  const accountsRequest: string[] = await window.ethereum.request({method:'eth_requestAccounts', params:[]});
  const accounts: string[] = await window.ethereum.request({method:'eth_accounts', params:[]}); //should also yield the same address
  ```

  </TabItem>
</Tabs>

### Operations

Each operation will open an extension popup window for a user to confirm the transaction / sign the message.

:::note
If you don't have funds on your EOA address, the relayer service will be used to pay the gas fees (thus ignoring gas properties).
:::

#### Send a transaction

You can send any kind of transaction (a value transfer or a smart contract interaction with or without a value).  

<Tabs>
  <TabItem value="web3" label="web3">

  ```js
  await web3.eth.sendTransaction({
    from: UP_ADDRESS,
    to: RECIPIENT_ADDRESS,
    value: 100,
    data: '0x',
    gas: 5_000_000,
    gasPrice: '1000000000',
  })
  ```

  </TabItem>
  <TabItem value="etherjs" label="etherjs">

  ```js
  await signer.sendTransaction({
    from: UP_ADDRESS,
    to: RECIPIENT_ADDRESS,
    value: 100,
    gas: 5_000_000,
    gasPrice: '1000000000',
  });
  ```

  </TabItem>
  <TabItem value="raw" label="raw">

  ```js
  await window.ethereum.request({
    method:'eth_sendTransaction', 
    params:[{ 
      from: UP_ADDRESS, 
      to: RECIPIENT_ADDRESS, 
      value:'0xB1A2BC2EC50000',
      gas: '0x76c0',
      gasPrice: '0x9184e72a000'
    }]})
  ```

  </TabItem>
</Tabs>

You can also add a `chainId` parameter i.e. `chaidId: '0x16'` to make sure the transaction will run on the specified network.

#### Sign a message

<Tabs>
  <TabItem value="web3" label="web3">

  ```js
  await web3.eth.sign('message', UP_ADDRESS);
  ```

  </TabItem>
  <TabItem value="etherjs" label="etherjs">

  ```js
  await signer.signMessage('message');
  ```

  </TabItem>
  <TabItem value="raw" label="raw">

  ```js
  await window.ethereum.request({method:'eth_sign', params:[UP_ADDRESS, '0xdeadbeaf']});
  ```

  </TabItem>
</Tabs>

### Events

#### Listening for accounts changed event

<Tabs>
  <TabItem value="web3" label="web3">

  ```js
  window.ethereum.on('accountsChanged', (addresses: string[]) => {
    const newAddress = addresses[0];
    ...
  }
  ```

  </TabItem>
</Tabs>

### Extra: Interacting with the extension using web3 and universal-profiles-smart-contract abi

```shell
  npm install @lukso/lsp-smart-contracts
  ```

```js
import UniversalProfile from "@lukso/universalprofile-smart-contracts/artifacts/UniversalProfile.json";

const contract = new web3.eth.Contract(
  UniversalProfile.abi as unknown, UP_ADDRESS, {
    gas: 5_000_000, 
    gasPrice: '1000000000',
  })
```

- setData example:

```js
await contract.methods
  .setData([key], [value])
  .send({
      from: UP_ADDRESS,
  })
  .on("receipt", (receipt: TransactionReceipt) => {
      ...
  })
  .once("sending", (payload: unknown) => {
      ...
  })
);
```

### Sample dApp

Check [sample dApp](https://up-sample-web-app.staging.lukso.dev/) for more examples. [Repository](https://github.com/lukso-network/universalprofile-sample-web-app)
