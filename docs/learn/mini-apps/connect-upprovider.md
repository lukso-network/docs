---
sidebar_label: '🔌 Connect to a Mini-App'
description: 'How to connect your Mini-App using the UP Provider'
sidebar_position: 1
---

# Connect to a Mini-App

<img width="300" alt="Screenshot 2025-01-27 at 14 15 22" src="https://github.com/user-attachments/assets/7f0b7875-c402-440d-b77f-935cf90f241d" align="right" />

## What are Mini-Apps?

Mini-Apps are dApps that run in an iframe of a parent page that hosts them. You can see [examples of Mini-Apps in action on universaleverything.io](https://universaleverything.io/0x7b258dD350227CFc9Da1EDD7f4D978f7Df20fD40).

## The Challenge with Mini-Apps

Traditionally, users would need to connect to each Mini-App individually through:

- Connect buttons
- Web3 modals
- WalletConnect processes

This makes the user experience cumbersome.

## Introducing the UP Provider

The [up-provider](../../tools/dapps/up-provider/getting-started) solves this by giving Mini-Apps a way for the user visiting the parent page, to connect to the Mini-App directly with one-click.

**Additionally**, the Mini-App has access to `context addresses`, which in the case of [universaleverything.io](https://universaleverything.io) is the Universal Profile under which the Mini-App is hosted.

> The up-provider is a [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) compatible provider, meaning it will work with all major web3 libraries. For examples using viem, web3.js or ethers, [see the readme of the up-provider](https://github.com/lukso-network/tools-up-provider/blob/main/README.md#provider-for-mini-apps).

## Installation

```bash
npm install @lukso/up-provider
```

## Example implementation using React

Here's a step-by-step guide to implement UP Provider connection in your React application:

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
