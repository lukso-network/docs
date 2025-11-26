---
title: 🔍 Indexer API
sidebar_position: 2
---

# Indexer API

The LUKSO GraphQL Indexer provides a powerful way to query Universal Profiles, assets, LSP7 tokens, LSP8 NFTs, and metadata from the LUKSO blockchain. It offers flexible querying capabilities with support for filtering, pagination, and real-time subscriptions.

## Getting Started

### GraphQL Endpoint

```
https://envio.mainnet.lukso.dev/v1/graphql
```

### Installation

To interact with the indexer, install the `graphql-request` library:

```bash
npm install graphql-request graphql
```

### Basic Setup

```typescript
import { request, gql } from 'graphql-request';

const GRAPHQL_ENDPOINT = 'https://envio.mainnet.lukso.dev/v1/graphql';

// Example query
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

## Query Examples

### Search Universal Profiles

Search for profiles by name, address, or other identifiers using the `search_profiles` function.

**Query:**

```graphql
query SearchProfiles($search: String!) {
  search_profiles(args: { search: $search }) {
    id
    name
    fullName
    profileImages(
      where: { error: { _is_null: true } }
      order_by: { width: asc }
    ) {
      width
      src
      url
      verified
    }
  }
}
```

**Variables:**

```json
{
  "search": "lukso"
}
```

**TypeScript Implementation:**

```typescript
import { request, gql } from 'graphql-request';

const GRAPHQL_ENDPOINT = 'https://envio.mainnet.lukso.dev/v1/graphql';

const searchProfilesQuery = gql`
  query SearchProfiles($search: String!) {
    search_profiles(args: { search: $search }) {
      id
      name
      fullName
      profileImages(
        where: { error: { _is_null: true } }
        order_by: { width: asc }
      ) {
        width
        src
        url
        verified
      }
    }
  }
`;

type ProfileImage = {
  width: number;
  src: string;
  url: string;
  verified: boolean;
};

type Profile = {
  id: string;
  name?: string;
  fullName?: string;
  profileImages?: ProfileImage[];
};

type SearchProfilesResponse = {
  search_profiles: Profile[];
};

async function searchProfiles(searchTerm: string): Promise<Profile[]> {
  try {
    const data = await request<SearchProfilesResponse>(
      GRAPHQL_ENDPOINT,
      searchProfilesQuery,
      { search: searchTerm },
    );
    return data.search_profiles;
  } catch (error) {
    console.error('Error searching profiles:', error);
    throw error;
  }
}

// Usage
const profiles = await searchProfiles('lukso');
console.log(profiles);
```

[**Try it in the playground →**](https://envio.mainnet.lukso.dev/)

---

### Get Profile Data by Address

Fetch detailed profile information for a specific address.

**Query:**

```graphql
query GetProfile($address: String!) {
  Profile(where: { id: { _eq: $address } }) {
    id
    name
    fullName
    description
    profileImages(
      where: { error: { _is_null: true } }
      order_by: { width: asc }
    ) {
      width
      src
      url
      verified
    }
    backgroundImages(where: { error: { _is_null: true } }) {
      width
      src
      url
      verified
    }
    links {
      title
      url
    }
  }
}
```

**Variables:**

```json
{
  "address": "0x1234567890abcdef1234567890abcdef12345678"
}
```

**TypeScript Implementation:**

```typescript
const getProfileQuery = gql`
  query GetProfile($address: String!) {
    Profile(where: { id: { _eq: $address } }) {
      id
      name
      fullName
      description
      profileImages(
        where: { error: { _is_null: true } }
        order_by: { width: asc }
      ) {
        width
        src
        url
        verified
      }
      backgroundImages(where: { error: { _is_null: true } }) {
        width
        src
        url
        verified
      }
      links {
        title
        url
      }
    }
  }
`;

async function getProfile(address: string) {
  const data = await request(GRAPHQL_ENDPOINT, getProfileQuery, { address });
  return data.Profile[0];
}
```

[**Try it in the playground →**](https://envio.mainnet.lukso.dev/)

---

### Get Assets

Query assets (LSP7 and LSP8 tokens) from the blockchain.

**Query:**

```graphql
query GetAssets($limit: Int = 10, $offset: Int = 0) {
  Asset(limit: $limit, offset: $offset, order_by: { createdTimestamp: desc }) {
    id
    name
    lsp4TokenSymbol
    lsp4TokenType
    description
    lsp4Creators {
      profile {
        address: id
      }
    }
    images(where: { error: { _is_null: true } }, limit: 1) {
      src
      url
      verified
    }
    attributes {
      key
      value
    }
  }
}
```

**Variables:**

```json
{
  "limit": 10,
  "offset": 0
}
```

**TypeScript Implementation:**

```typescript
const getAssetsQuery = gql`
  query GetAssets($limit: Int = 10, $offset: Int = 0) {
    Asset(limit: $limit, offset: $offset, order_by: { createdTimestamp: desc }) {
      id
      name
      lsp4TokenSymbol
      lsp4TokenType
      description
      lsp4Creators {
        profile {
          address: id
        }
      }
      images(where: { error: { _is_null: true } }, limit: 1) {
        src
        url
        verified
      }
      attributes {
        key
        value
      }
    }
  }
`;

async function getAssets(limit: number = 10, offset: number = 0) {
  const data = await request(GRAPHQL_ENDPOINT, getAssetsQuery, {
    limit,
    offset,
  });
  return data.Asset;
}
```

[**Try it in the playground →**](https://envio.mainnet.lukso.dev/)

---

### Search Assets

Search for assets by name, symbol, or other criteria.

**Query:**

```graphql
query SearchAssets($search: String) {
  search_assets(args: { search_query: $search }) {
    asset_id
    name
    symbol
    is_lsp7
    asset {
      images(where: { error: { _is_null: true } }, limit: 1) {
        src
        url
      }
    }
  }
}
```

**Variables:**

```json
{
  "search": "LUKSO"
}
```

**TypeScript Implementation:**

```typescript
const searchAssetsQuery = gql`
  query SearchAssets($search: String) {
    search_assets(args: { search_query: $search }) {
      asset_id
      name
      symbol
      is_lsp7
      asset {
        images(where: { error: { _is_null: true } }, limit: 1) {
          src
          url
        }
      }
    }
  }
`;

async function searchAssets(searchTerm: string) {
  const data = await request(GRAPHQL_ENDPOINT, searchAssetsQuery, {
    search: searchTerm,
  });
  return data.search_assets;
}
```

[**Try it in the playground →**](https://envio.mainnet.lukso.dev/)

---

### Get LSP7 Tokens

Query LSP7 (fungible) tokens with detailed metadata.

**Query:**

```graphql
query GetLSP7Tokens {
  Asset(where: { lsp4TokenType: { _eq: 0 } }, limit: 10) {
    id
    name
    lsp4TokenSymbol
    lsp4TokenType
    totalSupply
    description
    images(where: { error: { _is_null: true } }) {
      src
      url
      verified
    }
    lsp4Creators {
      profile {
        address: id
      }
    }
  }
}
```

**Variables:**

```json
{}
```

**TypeScript Implementation:**

```typescript
const getLSP7TokensQuery = gql`
  query GetLSP7Tokens {
    Asset(where: { lsp4TokenType: { _eq: 0 } }, limit: 10) {
      id
      name
      lsp4TokenSymbol
      lsp4TokenType
      totalSupply
      description
      images(where: { error: { _is_null: true } }) {
        src
        url
        verified
      }
      lsp4Creators {
        profile {
          address: id
        }
      }
    }
  }
`;

async function getLSP7Tokens() {
  const data = await request(GRAPHQL_ENDPOINT, getLSP7TokensQuery);
  return data.Asset;
}
```

[**Try it in the playground →**](https://envio.mainnet.lukso.dev/)

---

### Get LSP8 NFTs

Query LSP8 (non-fungible) tokens including individual token IDs and their metadata.

**Query:**

```graphql
query GetLSP8NFTs($assetId: String!) {
  Token(where: { asset_id: { _eq: $assetId } }) {
    id
    tokenId
    asset_id
    name
    description
    images(where: { error: { _is_null: true } }) {
      src
      url
      verified
    }
    attributes {
      key
      value
    }
  }
}
```

**Variables:**

```json
{
  "assetId": "0x1234567890abcdef1234567890abcdef12345678"
}
```

**TypeScript Implementation:**

```typescript
const getLSP8NFTsQuery = gql`
  query GetLSP8NFTs($assetId: String!) {
    Token(where: { asset_id: { _eq: $assetId } }) {
      id
      tokenId
      asset_id
      name
      description
      images(where: { error: { _is_null: true } }) {
        src
        url
        verified
      }
      attributes {
        key
        value
      }
    }
  }
`;

async function getLSP8NFTs(assetId: string) {
  const data = await request(GRAPHQL_ENDPOINT, getLSP8NFTsQuery, { assetId });
  return data.Token;
}
```

[**Try it in the playground →**](https://envio.mainnet.lukso.dev/)

---

### Get LSP4 Digital Asset Metadata

Query [LSP4 Digital Asset Metadata](/standards/tokens/LSP4-Digital-Asset-Metadata/) for assets and tokens.

**Query:**

```graphql
query GetAssetMetadata($assetId: String!) {
  Asset(where: { id: { _eq: $assetId } }) {
    id
    name
    lsp4TokenSymbol
    description
    lsp4TokenType
    images(where: { error: { _is_null: true } }, order_by: { width: asc }) {
      width
      height
      src
      url
      verified
    }
    attributes {
      key
      value
    }
  }
}
```

**Variables:**

```json
{
  "assetId": "0x1234567890abcdef1234567890abcdef12345678"
}
```

**TypeScript Implementation:**

```typescript
const getAssetMetadataQuery = gql`
  query GetAssetMetadata($assetId: String!) {
    Asset(where: { id: { _eq: $assetId } }) {
      id
      name
      lsp4TokenSymbol
      description
      lsp4TokenType
      images(where: { error: { _is_null: true } }, order_by: { width: asc }) {
        width
        height
        src
        url
        verified
      }
      attributes {
        key
        value
      }
    }
  }
`;

async function getAssetMetadata(assetId: string) {
  const data = await request(GRAPHQL_ENDPOINT, getAssetMetadataQuery, {
    assetId,
  });
  return data.Asset[0];
}
```

[**Try it in the playground →**](https://envio.mainnet.lukso.dev/)

---

### Search Assets by Attribute

Filter assets or tokens by attributes and categories defined in their metadata.

**Query:**

```graphql
query SearchByCategory($categoryKey: String!, $categoryValue: String!) {
  Asset(
    where: {
      attributes: {
        key: { _eq: $categoryKey }
        value: { _ilike: $categoryValue }
      }
    }
  ) {
    id
    name
    lsp4TokenSymbol
    lsp4TokenType
    images(where: { error: { _is_null: true } }, limit: 1) {
      src
      url
    }
    attributes(where: { key: { _eq: $categoryKey } }) {
      key
      value
    }
  }
}
```

**Variables:**

```json
{
  "categoryKey": "Author",
  "categoryValue": "%Deez%"
}
```

**TypeScript Implementation:**

```typescript
const searchByCategoryQuery = gql`
  query SearchByCategory($categoryKey: String!, $categoryValue: String!) {
    Asset(
      where: {
        attributes: {
          key: { _eq: $categoryKey }
          value: { _ilike: $categoryValue }
        }
      }
    ) {
      id
      name
      lsp4TokenSymbol
      lsp4TokenType
      images(where: { error: { _is_null: true } }, limit: 1) {
        src
        url
      }
      attributes(where: { key: { _eq: $categoryKey } }) {
        key
        value
      }
    }
  }
`;

async function searchByCategory(categoryKey: string, categoryValue: string) {
  const data = await request(GRAPHQL_ENDPOINT, searchByCategoryQuery, {
    categoryKey,
    categoryValue: `%${categoryValue}%`,
  });
  return data.Asset;
}

// Example: Search for assets by Author
const artAssets = await searchByCategory('Author', 'Deez');
```

[**Try it in the playground →**](https://envio.mainnet.lukso.dev/)

---

## Advanced: WebSocket Client for Real-Time Updates

For real-time data subscriptions, use the WebSocket protocol with the `graphql-ws` library.

### Setup

```bash
npm install graphql-ws
```

### WebSocket Client Implementation

```typescript
import { type Client, createClient } from 'graphql-ws';
import type { Chain } from 'viem';
import { lukso, luksoTestnet } from 'viem/chains';

const wsClients: Record<string, Client> = {};

/**
 * Get web socket graphql client for a given chain
 *
 * @param wsGraphqlHost WebSocket GraphQL host URL
 * @param chain Chain to use
 * @returns web socket graphql client
 */
export const useWSClient = (wsGraphqlHost: string, chain: Chain) => {
  if (wsClients[chain.id]) return wsClients[chain.id];

  if (chain.id !== lukso.id && chain.id !== luksoTestnet.id) {
    throw new Error('Unsupported chain for GraphQL WebSocket client');
  }

  wsClients[chain.id] = createClient({
    url: wsGraphqlHost,
  });

  return wsClients[chain.id];
};
```

### Subscription Example

```typescript
const wsClient = useWSClient('wss://envio.mainnet.lukso.dev/', lukso);

const subscription = wsClient.subscribe(
  {
    query: `
      subscription OnProfileUpdate($profileId: String!) {
        Profile(where: { id: { _eq: $profileId } }) {
          id
          name
          fullName
          profileImages {
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

### When to Use WebSocket vs HTTP

- **HTTP (graphql-request)**: Best for one-time queries, searches, and fetching data on demand
- **WebSocket (graphql-ws)**: Best for real-time updates, monitoring changes, and live data feeds

---

## Interactive Playground

Explore the full GraphQL schema and test queries in the interactive playground:

**[https://envio.mainnet.lukso.dev/](https://envio.mainnet.lukso.dev/)**

### Tips for Using the Playground

1. **Explore the Schema**: Click the "Docs" button on the right to browse all available types and queries
2. **Auto-complete**: Press `Ctrl+Space` to see available fields and arguments
3. **Prettify**: Use `Shift+Ctrl+P` to format your queries
4. **Test Variables**: Use the Variables panel at the bottom to test different inputs
5. **Copy Queries**: Once satisfied, copy your queries directly into your code

---

## Pagination and Filtering

Most queries support pagination and filtering:

```graphql
query GetProfilesPaginated($limit: Int!, $offset: Int!, $nameFilter: String) {
  Profile(
    limit: $limit
    offset: $offset
    where: { name: { _ilike: $nameFilter } }
    order_by: { createdAt: desc }
  ) {
    id
    name
    fullName
  }
}
```

**Variables:**

```json
{
  "limit": 10,
  "offset": 0,
  "nameFilter": "%lukso%"
}
```

**Common Filter Operators:**

- `_eq`: Equal to
- `_neq`: Not equal to
- `_gt`: Greater than
- `_gte`: Greater than or equal to
- `_lt`: Less than
- `_lte`: Less than or equal to
- `_ilike`: Case-insensitive pattern matching
- `_is_null`: Check for null values
- `_in`: Value in array

## Resources

- [GraphQL Playground](https://envio.mainnet.lukso.dev/)
- [LSP4 - Digital Asset Metadata](/standards/tokens/LSP4-Digital-Asset-Metadata/)
- [LSP3 - Profile Metadata](/standards/metadata/lsp3-profile-metadata/)
- [GraphQL Documentation](https://graphql.org/learn/)
- [graphql-request Library](https://github.com/jasonkuhrt/graphql-request)
- [graphql-ws Library](https://github.com/enisdenjo/graphql-ws)
