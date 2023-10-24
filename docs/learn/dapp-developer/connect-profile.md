---
sidebar_label: '🔗 Connect a Universal Profile'
sidebar_position: 1
---

# Connect Your Universal Profile to a Dapp

To allow your users to connect to your dApp with their Universal Profile, they need to ✨ [create a Universal Profile](https://my.universalprofile.cloud) and install the 🖥️ [Universal Profile Browser Extension](../../guides/browser-extension/install-browser-extension.md).

The easiest way for your users to create a Universal Profile, is through 👉 [my.universalprofile.cloud](https://my.universalprofile.cloud).

:::note

Optionally you can ⚒️ [deploy a Universal Profile porgrammatically](../../guides/universal-profile/create-profile.md) for your users, but then they will not benefit from free transactions through the LUKSO Transaction Relay Service.

:::

<div style={{textAlign: 'center'}}>

<img
    src="/img/learn/up_extension_connect.png"
    alt="Example of Sign-In with Ethereum screen"
    width="300"
/>

</div>

## Connect to a Dapp

```js
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

try {
  const accounts = await web3.eth.requestAccounts();
  console.log('Connected with', accounts[0]);
} catch (error) {
  // handle connection error
}
```
