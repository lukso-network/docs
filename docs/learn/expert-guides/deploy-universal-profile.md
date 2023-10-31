---
sidebar_label: '👩‍🎤 Deploy Your Universal Profile'
sidebar_position: 10
---

# Deploy Your Universal Profile

### Deploy your Universal Profile

After you craeted your [Universal Profile (UP)](./create-profile.md), you can deploy your UP by calling `lspFactory.UniversalProfile.deploy(...)`. This method will deploy and set up the three main contracts shown in the [architecture diagram above](#contracts-overview).

The `deploy` function takes an object as an argument that contains two elements:

- `controllerAddresses`: the EOA address(es) that we will use to control our UP.
- `lsp3Profile`: an object that represents your [`LSP3Profile` Metadata](../../standards/universal-profile/lsp3-profile-metadata).

You can easily add more metadata to your UP such as `profileImage`, `backgroundImage` and `avatar`. Read how to do this with lsp-factory [here](../../tools/lsp-factoryjs/deployment/universal-profile.md#setting-images-in-lsp3metadata)

```javascript title="main.js"
import { LSPFactory } from '@lukso/lsp-factory.js';

// Step 3.1 - Load our EOA
// ...

// Step 3.2 - Setup the lsp-factory
// ...

// Step 3.3 - Deploy our Universal Profile
async function createUniversalProfile() {
  const deployedContracts = await lspFactory.UniversalProfile.deploy({
    controllerAddresses: [myEOA.address], // our EOA that will be controlling the UP
    lsp3Profile: {
      name: 'My Universal Profile',
      description: 'My Cool Universal Profile',
      tags: ['Public Profile'],
      links: [
        {
          title: 'My Website',
          url: 'https://my-website.com',
        },
      ],
    },
  });

  return deployedContracts;
}

createUniversalProfile().then((deployedContracts) => {
  console.log(deployedContracts);
});

/**
{
  LSP0ERC725Account: {
    address: '0x...',
    receipt: {
      to: null,
      from: '0x...',
      contractAddress: '0x...',
      blockNumber: ...,
      transactionHash: '0x...',
      gasUsed: [BigNumber],
      blockHash: '0x...',
      ...
    }
  },
  LSP6KeyManager: {
    address: '0x...',
    receipt: {
      ...
    }
  },
}
 */
```

## Visualize our new Universal Profile

If the deployment is successful, we can access the address of our newly created Universal Profile from the returned value.

```javascript title="main.js"
async function createUniversalProfile() {
  const deployedContracts = await lspFactory.UniversalProfile.deploy({
    // deployment details omitted for brevity
    // see Step 3.3 above
  });

  const myUPAddress = deployedContracts.LSP0ERC725Account.address;
  console.log('my Universal Profile address: ', myUPAddress);
  // my Universal Profile address: 0x...

  return deployedContracts;
}

createUniversalProfile();

// my Universal Profile address: 0x2875d1733346bF4618485a91F2D9E5FB544f4fc5
```

We can also visualize our UP on the [wallet.universalprofile.cloud](https://wallet.universalprofile.cloud) website by adding the address of the deployed UP in the URL, after the `/` (slash), as follow:

*https://wallet.universalprofile.cloud/{your-up-address}*

![Universal Profile example on wallet.universalprofile.cloud](/img/universal-profile/profile.png)

You can also see the contracts created by the lsp-factory.js library on the LUKSO Testnet Block explorer:

- *https://explorer.execution.testnet.lukso.network/address/{your-eoa-address}/transactions*

The figure below describes each transaction performed by the lsp-factory.js. It also shows how transactions <br/> are mapped to the **[Contracts Overview](#contracts-overview)** diagram introduced at the beginning of this guide.

![lsp-factory.js: contract deployed on Testnet and transactions flow](img/lsp-factory-deployments-explained.jpeg)

## Congratulations 🥳

**You have successfully created your first Universal Profile!**
