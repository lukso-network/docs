---
sidebar_label: 'Universal Profiles'
sidebar_position: 1
---

# Universal Profiles

## Is there a Universal Profile Explorer?

Yes, you can find the Universal Profile Explorer at [universalprofile.cloud](https://universalprofile.cloud/).

## Why did LUKSO not launch Universal Profiles on Ethereum?

On LUKSO, users are onboarded directly with Universal Profiles to offer a more **efficient and user-friendly experience**. This is not feasible on Ethereum currently due to high deployment costs on the occupied chain.

As many users are already onboarded with regular EOAs on Ethereum, creating new applications, or tokens demands backward compatibility with existing applications. This requirement can potentially **limit innovation** and introduce complexity.

The full potential of new accounts like Universal Profiles can't be realized if **only a fraction of the network is onboarded** through it or if new account schemes aren't implemented within the protocol directly.

## Can I use a regular wallet to control my Universal Profile?

As a developer, you can connect a regular wallet to the network where the Universal Profile was deployed and **manually add its EOA** as a controller. You will then have to send all transactions through the [Key Manager](../../standards/universal-profile/lsp6-key-manager) of the Universal Profile to execute them as your persona. However, we recommend directly using the [Universal Profile Extension](/install-up-browser-extension) to interact with dApps on LUKSO.

## How safe are assets stored within a Universal Profile?

The safety of a Universal Profile **depends on the security steps taken by its owner**. If only one EOA controller owns the profile, the security level is equivalent to regular EOA wallets. If a more secure access control system is built and multiple controllers are added with different permissions, the security level of the Universal Profile would be **as robust as a multi-signature wallet**. Also, custom ownership contracts can be added as controllers. In essence, the security of a UP directly corresponds to the security measures put in place by the owner.

## Can I send Ether, Token, or NFTs from Ethereum to my Universal Profile?

You can't send any assets to the address if you do not deploy the Universal Profile on Ethereum. Most Universal Profiles are currently deployed on the [L14 Testnet](/networks/l14-testnet), a different network than Ethereum. Users will lose their assets if they send them to other networks without having access to the controller key.

## Which tokens and coins can my UniversalProfile hold?

A Universal Profile can hold any asset on the same network it's deployed on. On LUKSO, the native coin is LYX. While native coins from other networks can't be held directly in Universal Profiles deployed on LUKSO, external services might also create token bridges for external assets.

## Can I control assets using Universal Profiles on any blockchain?

You can manage your assets through a Universal Profile on any blockchain the contract is deployed on. This would also include cases where the standardization was rewritten in a different language. If a service or project would allow you to create Universal Profiles on Ethereum, you could manage your assets through it.

## Can I use an existing EOA to control my Universal Profile?

You can add any new or existing Externally Owned Account as a controller to your deployed Universal Profile of a specific chain. This also includes already existing keys from wallets. However, please remember that your previous assets and token remain on the EOA address.
