---
sidebar_label: '🔌 Connect to a mini-app'
description: 'How to connect your mini-app using the UP Provider'
sidebar_position: 1
---

# Connect to a mini-app

<img width="300" alt="Screenshot 2025-01-27 at 14 15 22" src="https://github.com/user-attachments/assets/7f0b7875-c402-440d-b77f-935cf90f241d" align="right" />

Mini-apps are dApps that run in an iframe of a parent page that hosts them. [universaleverything.io](https://universaleverything.io) is such a website.
An example of mini-apps can be found at [the app-store profile](https://universaleverything.io/0x7b258dD350227CFc9Da1EDD7f4D978f7Df20fD40) (See on the right).

For users connecting to a mini-app would mean to connect to each mini-app via a connect button, web3 modal, or wallet connect process. This makes connecting to mini-apps cumbersome and not fun.

The [up-provider](https://github.com/lukso-network/tools-up-provider) solves this by giving mini-apps a way for the user visiting the parent page, to connect to the mini-app directly with one-click.

**Additionally the mini-app has access to `context addresses`**, which in the case of [universaleverything.io](https://universaleverything.io) is the universal profile under which the mini-app is hosted.

The up-provider is a [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) compatible provider, meaning it will work with all major web3 libraries. For examples using viem, web3.js or ethers, [see the readme of the up-provider](https://github.com/lukso-network/tools-up-provider/blob/main/README.md#provider-for-mini-apps).

## Installation

```bash
npm install @lukso/up-provider
```

## Example implementation using react

Here's a step-by-step guide to implement UP Provider connection in your react application:

1. First, import the necessary dependencies:

```typescript
import { createClientUPProvider } from '@lukso/up-provider';
```

2. Create a provider instance outside your component:

```typescript
const provider = createClientUPProvider();
```

3. To implement the UP Provider connection in your component, you can use the following code:

```typescript
// Track connected accounts
const [accounts, setAccounts] = useState<Array<`0x${string}`>>([]);
const [contextAccounts, setContextAccounts] = useState<Array<`0x${string}`>>(
  [],
);
const [profileConnected, setProfileConnected] = useState(false);

// Helper to check connection status
const updateConnected = useCallback(
  (_accounts: Array<`0x${string}`>, _contextAccounts: Array<`0x${string}`>) => {
    setProfileConnected(_accounts.length > 0 && _contextAccounts.length > 0);
  },
  [],
);

useEffect(() => {
  async function init() {
    try {
      const _accounts = provider.accounts as Array<`0x${string}`>;
      setAccounts(_accounts);

      const _contextAccounts = provider.contextAccounts;
      updateConnected(_accounts, _contextAccounts);
    } catch (error) {
      console.error('Failed to initialize provider:', error);
    }
  }

  // Handle account changes
  const accountsChanged = (_accounts: Array<`0x${string}`>) => {
    setAccounts(_accounts);
    updateConnected(_accounts, contextAccounts);
  };

  const contextAccountsChanged = (_accounts: Array<`0x${string}`>) => {
    setContextAccounts(_accounts);
    updateConnected(accounts, _accounts);
  };

  init();

  // Set up event listeners
  provider.on('accountsChanged', accountsChanged);
  provider.on('contextAccountsChanged', contextAccountsChanged);

  // Cleanup listeners
  return () => {
    provider.removeListener('accountsChanged', accountsChanged);
    provider.removeListener('contextAccountsChanged', contextAccountsChanged);
  };
}, [accounts[0], contextAccounts[0], updateConnected]);
```

## Understanding the Implementation

### Provider Creation

The `createClientUPProvider()` function creates a new instance of the UP Provider. This should be done outside your component to maintain a single instance.

### State variables

This implementation gives you access to:

- `accounts`: Array of connected accounts, in our case the universal profile of the visitor
- `contextAccounts`: Array of context accounts, which in our case is the universal profile on [universaleverything.io](https://universaleverything.io) where the mini-app is hosted under.
- `profileConnected`: Boolean indicating if a user is connected to the mini-app

### Event Handling

The provider emits two important events:

- `accountsChanged`: Triggered when the connected accounts change, this is universal profile of the visitor
- `contextAccountsChanged`: Triggered when the context accounts change, this is the universal profile on [universaleverything.io](https://universaleverything.io) where the mini-app is hosted under.

### Cleanup

Clean up the event listeners when unmounting to prevent memory leaks.
