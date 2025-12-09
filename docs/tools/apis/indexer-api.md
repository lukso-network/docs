---
title: 🔍 Indexer API
sidebar_position: 2
---

# Indexer API

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import MainnetIcon from '@site/static/img/icons/lukso-signet-fuschia.svg';
import TestnetIcon from '@site/static/img/icons/lukso-signet-yellow.svg';
import QueryExamples from '@site/src/components/QueryExamples';

The [**Envio Indexer**](https://envio.lukso-mainnet.universal.tech/) provides a powerful way to query any information, past events or metadata from the LUKSO blockchain. It offers flexible querying capabilities with support for filtering and real-time subscriptions.

![Envio Indexer](/img/tools/envio_indexer.png)

## Get Started

This guide covers how to query the LUKSO Indexer using GraphQL, with practical examples and code samples.

Choose the client that best fits your use case:

- **[HTTP client](#http-client)**: Best for one-time queries, searches, and fetching data on demand
- **[WebSocket client](#websocket-client)**: Best for real-time updates, monitoring changes, and live data feeds

:::success Interactive Playground

Explore the full schema and test queries in the interactive playground:
**[https://envio.lukso-mainnet.universal.tech/](https://envio.lukso-mainnet.universal.tech/)**

:::

**GraphQL Endpoint:**

<Tabs>
  <TabItem value="mainnet" label={<><MainnetIcon style={{width: '20px', height: '20px', marginRight: '8px', marginTop: '4px', verticalAlign: 'text-bottom'}} /> Mainnet</>} default>

```
https://envio.lukso-mainnet.universal.tech/v1/graphql
```

  </TabItem>
  <TabItem value="testnet" label={<><TestnetIcon style={{width: '20px', height: '20px', marginRight: '8px', marginTop: '4px', verticalAlign: 'text-bottom'}} /> Testnet</>}>

```
https://envio.lukso-testnet.universal.tech/v1/graphql
```

  </TabItem>
</Tabs>

## HTTP Client

Install the `graphql-request` library to interact with the indexer:

```bash
npm install graphql-request graphql
```

Once installed, you can start making queries:

```typescript
import { request, gql } from 'graphql-request';

const GRAPHQL_ENDPOINT =
  'https://envio.lukso-mainnet.universal.tech/v1/graphql';

// Example query to retrieve the Universal Profile's name and its images
const query = gql`
  query {
    Profile(limit: 5) {
      id
      name
      fullName
    }
  }
`;

const data = await request(GRAPHQL_ENDPOINT, query);
console.log(data);
```

### Query Examples

Below are the most common use cases for querying the LUKSO Indexer:

<QueryExamples />

## WebSocket Client

For real-time data subscriptions, use the WebSocket protocol with the `graphql-ws` library:

```bash
npm install graphql-ws
```

Once installed, you can subscribe to live updates:

```typescript
import { createClient } from 'graphql-ws';

const wsClient = createClient({
  url: 'wss://envio.lukso-mainnet.universal.tech/v1/graphql',
});

// Subscribe to profile updates for a specific Universal Profile address
const subscription = wsClient.subscribe(
  {
    query: `
      subscription OnProfileUpdate($profileId: String!) {
        Profile(where: { id: { _eq: $profileId } }) {
          id
          name
          fullName
          profileImages(where: { error: { _is_null: true } }) {
            src
            url
          }
        }
      }
    `,
    variables: { profileId: '0x...' },
  },
  {
    next: (data) => {
      console.log('Profile updated:', data);
    },
    error: (error) => {
      console.error('Subscription error:', error);
    },
    complete: () => {
      console.log('Subscription complete');
    },
  },
);

// Unsubscribe when done
subscription();
```

## Resources

- [LUKSO Indexer Playground](https://envio.lukso-mainnet.universal.tech/)
- [LSP4 - Digital Asset Metadata](/standards/tokens/LSP4-Digital-Asset-Metadata/)
- [LSP3 - Profile Metadata](/standards/metadata/lsp3-profile-metadata/)
