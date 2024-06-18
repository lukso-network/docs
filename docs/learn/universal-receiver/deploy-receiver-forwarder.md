---
sidebar_label: 'Deploy a LSP1 Forwarder'
sidebar_position: 3
---

## Test our custom LSP1 Delegate forwarder

Now that all the pieces are connected, we can try it out!

The expected behaviour is that **everytime the UP on which the custom LSP1 Delegate contract has been set receives an allowed token (either through `transfer` or `mint`), it will automatically send a percentage to the specified receiver.**

Here are the test data:

- I set up the custom LSP1 Delegate contract on a test UP (neo: `0xD62940E95A7A4a760c96B1Ec1434092Ac2C4855E`)
- I created a custom LSP7 token named "My USDC" with symbol "MUSDC" (LSP7: `0x63890ea231c6e966142288d805b9f9de7e0e5927` / owner neo / 20k pre-minted to neo)
- The custom LSP1 Delegate contract will send 20% of the received (transfer or mint) MUSDC
- The recipient will be another test UP (karasu: `0xe5B9B2C3f72bA13fF43A6CfC6205b5147F0BEe84`)
- The custom LSP1 Delegate contract is deployed at address `0x4f614ebd07b81b42373b136259915b74565fedf5`

Let's go to [the test dapp](https://up-test-dapp.lukso.tech/) and connect with neo's profile.

<div style={{textAlign: 'center'}}>
<img
    src="/img/guides/lsp1/TestConnectNeo.png"
    alt="TestConnectNeo"
/>
</div>

Click on "Refresh tokens" to see our `MUSDC` balance.

<div style={{textAlign: 'center'}}>
<img
    src="/img/guides/lsp1/TestRefreshTokens.png"
    alt="TestRefreshTokens"
/>
<img
    src="/img/guides/lsp1/TestPreMint.png"
    alt="TestPreMint"
/>
</div>

Use the "Mint" box to mint an additional 10k `MUSDC` to ourself (to neo's UP). This should trigger the custom LSP1 Delegate forwarder and send 20% of 10k (= 2k) to karasu.

<div style={{textAlign: 'center'}}>
<img
    src="/img/guides/lsp1/TestMintTx.png"
    alt="TestMintTx"
/>
</div>

We will then disconnect neo's profile from the test dapp.

:::note

There is a bug currently on the test dapp where the `disconnect` button doesn't work properly. In order to disconnect from the dapp, we need to remove the connection from the "connections" tab by clicking the ❌ icon on the right.

:::

<div style={{textAlign: 'center'}}>
<img
    src="/img/guides/lsp1/TestDisconnectNeo.png"
    alt="TestDisconnectNeo"
/>
</div>

We connect karasu's profile to the test dapp

<div style={{textAlign: 'center'}}>
<img
    src="/img/guides/lsp1/TestConnectKarasu.png"
    alt="TestConnectKarasu"
/>
</div>

... click on "Refresh tokens" and ...

<div style={{textAlign: 'center'}}>
<img
    src="/img/guides/lsp1/TestSuccess.png"
    alt="TestSuccess"
/>
</div>

... Success 🎉 ! Our custom LSP1 Delegate forwarder worked as expected!

## Congratulations 🥳

You now have a fully functional custom LSP1 Delegate contract that will automatically forward a certain amount of the allowed received tokens to another UP!
