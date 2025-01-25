---
sidebar_label: '🔌 Connect to UP Provider'
description: 'How to integrate your mini-app with the UP Provider'
sidebar_position: 1
---

# Connect to UP Provider

## Overview

The UP Provider is a library that allows you to connect your mini-app to the Universal Profile Browser Extension. It enables your application to interact with Universal Profiles, handle wallet connections, and manage account states.

## Installation

```bash
npm install @lukso/up-provider
```

## Basic Usage

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
const [walletConnected, setWalletConnected] = useState(false);

// Helper to check connection status
const updateConnected = useCallback(
  (_accounts: Array<`0x${string}`>, _contextAccounts: Array<`0x${string}`>) => {
    setWalletConnected(_accounts.length > 0 && _contextAccounts.length > 0);
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

### State Management

This implementation manages three main states:

- `accounts`: Array of connected wallet accounts
- `contextAccounts`: Array of context accounts (current active Universal Profile)
- `walletConnected`: Boolean indicating if the wallet is connected

### Event Handling

The provider emits two important events:

- `accountsChanged`: Triggered when the connected accounts change
- `contextAccountsChanged`: Triggered when the active Universal Profile changes

### Cleanup

Clean up the event listeners when unmounting to prevent memory leaks.
