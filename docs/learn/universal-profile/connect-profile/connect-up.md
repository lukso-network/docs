---
sidebar_label: 'Connect UP with Providers'
sidebar_position: 1
description: Learn how to connect your Universal Profile to a dApp (decentralized application) on LUKSO.
---

# Connect a Universal Profile

There are several methods to connect to a [Universal Profile](../../../standards/accounts/introduction.md), each catering to different developer requirements and scenarios. Below, we detail the most common approaches and explain why a developer might prefer one over the others.

## Universal Profiles Apps

Universal Profiles can be accessed through **UP Apps**, which serve as the bridge between users and decentralized applications on LUKSO. There are two primary UP Apps available:

### UP Browser Extension

The [Universal Profile Browser Extension](https://chromewebstore.google.com/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn) is designed for desktop users who want to interact with dApps through their web browser. It provides a seamless experience for managing Universal Profiles and connecting to decentralized applications. The extension is compatible with modern browsers and supports standard wallet connection protocols.

### UP Mobile App

The Universal Profile Mobile App brings the power of Universal Profiles to mobile devices, allowing users to manage their profiles and interact with dApps on the go. The mobile app supports QR code scanning for quick connections and provides a native mobile experience for LUKSO ecosystem interactions.

## Connection Methods

Connecting to the [Universal Profile Browser Extension](https://chromewebstore.google.com/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn) will trigger the following connection screen:

<div style={{textAlign: 'center'}}>

<img
    src="/img/learn/up_extension_connect.png"
    alt="Example of UP Connection Screen"
    width="600"
/>

</div>

:::success Request Handling

The [Universal Profile Extension](/install-up-browser-extension) returns the address of the connected [Universal Profile](../../../standards/accounts/introduction.md). Making transactions is the same as with any wallet, you just use the profile address as a `from` in your transactions.

:::

### Wagmi + RainbowKit

#### Mermaid Diagram

```
<!-- TODO: Add Mermaid diagram -->
```

#### Install Dependencies

```sh
# TODO: Add installation instructions
```

#### Code Snippet

```js
// TODO: Add Wagmi + RainbowKit code snippet
```

### Wagmi + ReOwn (WalletConnect)

```mermaid
sequenceDiagram
    participant User
    participant DApp
    participant WalletConnect
    participant UP Extension

    User->>DApp: Click Connect
    DApp->>WalletConnect: Request Connection
    WalletConnect->>UP Extension: Initiate Pairing
    UP Extension->>DApp: Return UP Address
```

**Step 1: Install Dependencies**

```sh
npm install @reown/appkit @reown/appkit-adapter-wagmi wagmi @tanstack/react-query
```

**Step 2: Configure the WagmiAdapter with LUKSO**

Set up the adapter with LUKSO network configuration:

```js
import { WagmiProvider } from 'wagmi';
import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { lukso } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a new QueryClient instance for React Query,
// which Wagmi uses under the hood to manage cache, background updates, and request deduplication.
// This is required to provide <QueryClientProvider> higher up in your component tree.
const queryClient = new QueryClient();

const wagmiAdapter = new WagmiAdapter({
  projectId: 'YOUR_PROJECT_ID', // Get your project ID from ReOwn dashboard
  networks: [lukso],
  transports: {
    [lukso.id]: http('https://rpc.mainnet.lukso.network'),
  },
});
```

**Step 3: Create the AppKit Modal**

Initialize the modal with your dApp metadata and LUKSO-specific settings:

```js
const metadata = {
  name: 'LUKSO Wallet Connect',
  description: 'Connect your Universal Profile',
  url: 'https://universaleverything.io',
  icons: ['https://lukso.network/favicon.ico'],
};

createAppKit({
  adapters: [wagmiAdapter],
  projectId: 'YOUR_PROJECT_ID', // Get your project ID from ReOwn dashboard
  networks: [lukso],
  defaultNetwork: lukso,
  metadata,
  features: {
    analytics: false,
    email: false,
    socials: false,
  },
});
```

**Step 4: Wrap Your App with the Provider**

```jsx
function App() {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      {/* 
        Place your main application content here. 
        <YourAppContent />  

        This ensures that all components within <YourAppContent /> 
        have access to the connected wallet context provided by WagmiProvider,
        enabling features like reading connection state or sending transactions.
      */}
    </WagmiProvider>
  );
}
```

**Step 5: Add the `Connect` button to your project**

```jsx
<appkit-button />
```

**Step 6: Access Connection State**

Use `Wagmi` hooks to read the connected Universal Profile details:

```js
import { useAccount, useChainId } from 'wagmi';

function YourAppContent() {
  const { address, isConnected, chain } = useAccount();
  const chainId = useChainId();

  return (
    <div>
      <appkit-button />
      {isConnected && (
        <div>
          <p>Address: {address}</p>
          <p>Network: {chain?.name}</p>
          <p>Chain ID: {chainId}</p>
        </div>
      )}
    </div>
  );
}
```

**Optional: Configure the DeepLink for UP Mobile**

DeepLink can be configured for QR login when using the UP Mobile app with _ReOwn (WalletConnect)_.

:::success Configuring DeepLink

Simply replace the `wc:` alias with `io.universaleverything.universalprofiles://wallet-connect/`:

```ts
const exampleWcUri =
  'wc:8c4d7a9e5f2b3c1d@2?relay-protocol=irn&symKey=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
const exampleDeepLink = exampleWcUri.replace(
  'wc:',
  'io.universaleverything.universalprofiles://wallet-connect/',
);
```

:::

## Helpful Resources

- Check our sample implementations for NextJS on the [dApp Boilerplate](https://boilerplate.lukso.tech/).
- Read Profile Data
- LUKSO Mainnet Parameters, RPC Providers
