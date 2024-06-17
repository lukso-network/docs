---
sidebar_label: '👋🏻 Getting Started'
sidebar_position: 1
description: Getting started building dApps on the LUKSO ecosystem.
---

import CallToActionButton from '@site/src/components/CallToActionButton';

# Getting started building dApps with 🆙

When building dApps on LUKSO, you are interacting with [Universal Profiles](../../standards/universal-profile/introduction.md) through the [Universal Profile Browser Extension](https://chromewebstore.google.com/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn). This page guides you on the first step to get started building on LUKSO with the 🆙 Browser Extension.

<div style={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
  <CallToActionButton
    color="white"
    target="_blank"
    link="/install-up-browser-extension"
    text="1 - Installing the Universal Profile Browser Extension 🧩"
  />
</div>

<div
  style={{
    display: 'flex',
    justifyContent: 'center',
    fontSize: '3em',
  }}
>
  <p style={{ marginBottom: 0 }}>⬇</p>
</div>

<div
  style={{
    display: 'flex',
    justifyContent: 'center',
  }}
>
  <CallToActionButton
    color="white"
    target="_blank"
    link="https://my.universalprofile.cloud"
    text="2 - Create your Universal Profile 🆙"
  />
</div>

<div
  style={{
    display: 'flex',
    justifyContent: 'center',
    fontSize: '3em',
  }}
>
  <p style={{ marginBottom: 0 }}>⬇</p>
</div>

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <CallToActionButton
    color="white"
    link="/learn/universal-profile/connect-profile"
    text="3 - Get started building! 🫡"
  />
</div>

:::note Manual Deployment

You can also create new [Universal Profiles](../../standards/universal-profile/introduction.md) by ⚒️ [deploying them programmatically](../expert-guides/deploy-up-with-lsp23.md). However, please keep in mind that you would also have to deploy your own [Transaction Relay Service](../../standards/relayer-api.md) to allow gasless onboarding. Customly deployed profiles will not receive free monthly transaction quota through the LUKSO Transaction Relay Service.

:::

:::tip Relayer API

If you want to deploy Universal Profiles for your users, please check out our [Relayer API](../../tools/relayer-developer.md).

:::

## Code Repositories

Want to dive into the code directly? Check the following repos 😉

### Next.js Boilerplate

The [`tools-dapp-boilerplate`](https://github.com/lukso-network/tools-dapp-boilerplate) is a Next.js repository that gives you a fully working dApp with lot of ready to use components and features:

<div style={{textAlign: 'center'}}>

<img
  src="https://github.com/lukso-network/tools-dapp-boilerplate/raw/main/img/front_page.png"
  alt="LUKSO Boilerplate"
/>

</div>

### Playground

The [`lukso-playground`](https://github.com/lukso-network/lukso-playground) repository allows you to see how to fetch profile and asset information, encode data, change permissions etc.

<div style={{textAlign: 'center'}}>

<img src="/img/guides/playground_dapp.png" alt="LUKSO Playground dApp" />

</div>
