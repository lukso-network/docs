---
title: ⛽️ Relayer API
sidebar_position: 2
---

# Relayer API

:::info 🔓 Private Beta access

This feature is currently in private beta. If you are interested, please [contact us](https://forms.gle/rhWA25m3jjuPNPva9).

:::

The LUKSO Relayer API provides developers with powerful tools to create and manage Universal Profiles, as well as facilitate gasless transactions for users by registering.

## Key Features

Developers can use the LUKSO Relayer API to:

- Deploy Universal Profiles
- Register existing Universal Profiles

Organizations and applications can use the Relayer API to deploy Universal Profiles and register on behalf of their users, enabling gas-free transactions.

### 1. Deploy Universal Profiles

The Relayer API allows you to deploy Universal Profiles for your users using two different ways:

#### Option 1: Using `lsp6ControllerAddress` and `lsp3Profile` as arguments:

```mermaid
sequenceDiagram
    participant App
    participant Relayer
    participant LUKSO Network

    App->>Relayer: POST /api/universal-profile with:
    Note over App,Relayer: - lsp6ControllerAddress[]<br>- lsp3Profile metadata
    Relayer->>LUKSO Network: Deploy UP Contract
    Relayer->>LUKSO Network: Set Controllers
    Relayer->>LUKSO Network: Set LSP3 Metadata
    LUKSO Network-->>Relayer: Deployment Success
    Relayer-->>App: Return UP Address
```

Provide a list of controller addresses `lsp6ControllerAddress` and metadata `lsp3Profile` to set up the Universal Profile.

```javascript
async function deployUniversalProfile() {
  const apiKey = 'your-api-key';
  const url = 'https://relayer-api.testnet.lukso.network/api/universal-profile';

  const data = {
    lsp6ControllerAddress: ['0x9d9b6B38049263d3bCE80fcA3314d9CbF00C9E9D'],
    lsp3Profile:
      '0x6f357c6a3e2e3b435dd1ee4b8a2435722ee5533ea3f6cf6cb44c7fc278ac57ea1480295e697066733a2f2f516d5861714d67646971664b7931384373574768534a4c62626136316f6676666857387175506e6e6a6e76625966',
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Universal Profile deployed:', result);
  } catch (error) {
    console.error('Error deploying Universal Profile:', error.message);
  }
}

deployUniversalProfile();
```

#### Option 2: Using `salt` and [`postDeploymentCallData`](../../learn/universal-profile/advanced-guides/deploy-up-with-lsp23#create-the-universal-profile-initialization-calldata) as arguments:

```mermaid
sequenceDiagram
    participant App
    participant Relayer
    participant LUKSO Network

    Note over App: Generate random salt
    Note over App: Prepare postDeploymentCallData<br>(controllers + metadata)
    App->>Relayer: POST /api/universal-profile with:
    Note over App,Relayer: - salt<br>- postDeploymentCallData
    Relayer->>LUKSO Network: Deploy UP Contract<br>with deterministic address
    Relayer->>LUKSO Network: Execute postDeployment setup
    LUKSO Network-->>Relayer: Deployment Success
    Relayer-->>App: Return UP Address
```

This method allows for deterministic deployment across different chains.

```javascript
async function deployUniversalProfileWithSalt() {
  const apiKey = 'your-api-key';
  const url = 'https://relayer-api.testnet.lukso.network/api/universal-profile';

  const salt = ethers.utils.randomBytes(32);
  const lsp6Controllers = ['0x9d9b6B38049263d3bCE80fcA3314d9CbF00C9E9D'];
  const lsp3Profile = '0x6f357c6a...'; // Encoded LSP3 Profile Data

  const postDeploymentCallData = generatePostDeploymentCallData(
    lsp6Controllers,
    lsp3Profile,
  );

  const data = {
    salt,
    postDeploymentCallData,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Universal Profile deployed:', result);
  } catch (error) {
    console.error('Error deploying Universal Profile:', error.message);
  }
}

deployUniversalProfileWithSalt();
```

### 2. Register Existing Universal Profiles

You can register existing Universal Profiles with the Relayer to enable gasless transactions for your users.

```javascript
async function registerUniversalProfile() {
  const apiKey = 'your-api-key';
  const url = 'https://relayer-api.testnet.lukso.network/api/users';

  const data = {
    universalProfileAddress: '0x1234567890123456789012345678901234567890',
    // userId: 'optional-user-id-for-existing-users',
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log('Universal Profile registered:', result);

  } catch (error) {
    console.error('Error registering Universal Profile:', error.message);
  }
}

registerUniversalProfile();
```

## Integration Guide

1. Obtain API credentials by filling out the access request form.
2. Use the provided API key in the `X-API-KEY` header for all requests.
3. Implement error handling for various HTTP status codes (400, 401, 403, 404, 429, 500).

## API Documentation

- Testnet: [https://relayer-api.testnet.lukso.network/](https://relayer-api.testnet.lukso.network/docs#/)
- Mainnet: [https://relayer-api.mainnet.lukso.network/](https://relayer-api.mainnet.lukso.network/docs#/)

## Support and Resources

- For technical issues or questions, contact our support team at [support@lukso.network](mailto:support@lukso.network).
- Join our [Discord community](https://discord.com/invite/lukso) for discussions and updates.
- Explore the [LUKSO documentation](https://docs.lukso.tech/) for more information on building with Universal Profiles.

By leveraging the LUKSO Relayer API, you can create seamless, user-friendly experiences for your decentralized applications on the LUKSO network.
