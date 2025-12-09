---
title: 🔍 Indexer API
sidebar_position: 2
---

# Indexer API

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import MainnetIcon from '@site/static/img/icons/lukso-signet-fuschia.svg';
import TestnetIcon from '@site/static/img/icons/lukso-signet-yellow.svg';

The [**Envio Indexer**](https://envio.lukso-mainnet.universal.tech/) provides a powerful way to query any information, past events or metadata from the LUKSO blockchain. It offers flexible querying capabilities with support for filtering and real-time subscriptions.

## Get Started

Based on your use case, you can choose between HTTP or WebSocket client for interacting with the indexer:

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

The following examples demonstrate common use cases for querying the LUKSO Indexer:

|                           |                                                                                                                             |
| :------------------------ | :-------------------------------------------------------------------------------------------------------------------------- |
| **👤 Universal Profiles** | [Search Universal Profiles](#search-universal-profiles) — [Get UP Data by Address](#get-profile-data-by-address)            |
| **🎨 Digital Assets**     | [Get All Assets](#get-assets) — [Search Assets](#search-assets) — [Search Assets by Attribute](#search-assets-by-attribute) |
| **🪙 Tokens & NFTs**      | [Get LSP7 Tokens](#get-lsp7-tokens) — [Get LSP8 NFTs](#get-lsp8-nfts)                                                       |
| **📋 Metadata**           | [Get LSP4 Asset Metadata](#get-lsp4-digital-asset-metadata)                                                                 |

<span id="search-universal-profiles"></span>

**Search Universal Profiles**

Search for profiles by name, address, or other identifiers using the `search_profiles` function.

<Tabs>
  <TabItem value="query" label="Query" default>

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

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
import { request, gql } from 'graphql-request';

const GRAPHQL_ENDPOINT =
  'https://envio.lukso-mainnet.universal.tech/v1/graphql';

// Query to search for Universal Profiles by name or address
// Returns matching profiles with their images sorted by width (smallest first)
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

// Usage: Search for profiles containing "lukso" in their name or address
const profiles = await searchProfiles('lukso');
```

  </TabItem>
</Tabs>

<details>
  <summary>Relative Schema</summary>

```graphql
type Profile {
  id: String!
  name: String
  fullName: String
  profileImages: [ProfileImageURL!]!
  # ... other fields
}

type ProfileImageURL {
  width: Int
  src: String
  url: String
  verified: verificationstatus!
  # ... other fields
}
```

</details>

[**Try it in the playground →**](https://envio.lukso-mainnet.universal.tech/)

---

<span id="get-profile-data-by-address"></span>

**Get Profile Data by Address**

Fetch detailed profile information for a specific address.

<Tabs>
  <TabItem value="query" label="Query" default>

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

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
// Query to fetch complete profile data for a specific Universal Profile address
// Retrieves profile metadata, images, background images, and social links
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

// Usage: Fetch profile data for a specific address
const profile = await getProfile('0x1234567890abcdef1234567890abcdef12345678');
```

  </TabItem>
</Tabs>

<details>
  <summary>Relative Schema</summary>

```graphql
type Profile {
  id: String!
  name: String
  fullName: String
  description: String
  profileImages: [ProfileImageURL!]!
  backgroundImages: [ProfileBackgroundImageURL!]!
  links: [ProfileLink!]!
  # ... other fields
}

type ProfileImageURL {
  width: Int
  src: String
  url: String
  verified: verificationstatus!
}

type ProfileBackgroundImageURL {
  width: Int
  src: String
  url: String
  verified: verificationstatus!
}

type ProfileLink {
  title: String
  url: String
}
```

</details>

[**Try it in the playground →**](https://envio.lukso-mainnet.universal.tech/)

---

<span id="get-assets"></span>

**Get Assets**

Query assets (LSP7 and LSP8 tokens) from the blockchain.

<Tabs>
  <TabItem value="query" label="Query" default>

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

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
// Query to fetch assets (LSP7 tokens and LSP8 NFTs) with pagination
// Returns assets ordered by creation time (newest first) with their metadata and images
const getAssetsQuery = gql`
  query GetAssets($limit: Int = 10, $offset: Int = 0) {
    Asset(
      limit: $limit
      offset: $offset
      order_by: { createdTimestamp: desc }
    ) {
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

// Usage: Fetch the first 10 assets, or use offset for pagination
const assets = await getAssets(10, 0);
```

  </TabItem>
</Tabs>

<details>
  <summary>Relative Schema</summary>

```graphql
type Asset {
  id: String!
  name: String
  lsp4TokenSymbol: String
  lsp4TokenType: Int
  description: String
  lsp4Creators: [AssetCreators!]!
  images: [AssetImageURL!]!
  attributes: [AssetAttribute!]!
  # ... other fields
}

type AssetCreators {
  profile: Profile
}

type AssetImageURL {
  src: String
  url: String
  verified: verificationstatus!
}

type AssetAttribute {
  key: String
  value: String
}
```

</details>

[**Try it in the playground →**](https://envio.lukso-mainnet.universal.tech/)

---

<span id="search-assets"></span>

**Search Assets**

Search for assets by name, symbol, or other criteria.

<Tabs>
  <TabItem value="query" label="Query" default>

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

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
// Query to search for assets by name or symbol
// Returns matching assets with their type (LSP7 or LSP8) and primary image
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

// Usage: Search for assets by name or symbol
const luksoAssets = await searchAssets('LUKSO');
```

  </TabItem>
</Tabs>

<details>
  <summary>Relative Schema</summary>

```graphql
type Asset {
  images: [AssetImageURL!]!
  # ... other fields
}

type AssetImageURL {
  src: String
  url: String
}
```

</details>

[**Try it in the playground →**](https://envio.lukso-mainnet.universal.tech/)

---

<span id="get-lsp7-tokens"></span>

**Get LSP7 Tokens**

Query LSP7 (fungible) tokens with detailed metadata.

<Tabs>
  <TabItem value="query" label="Query" default>

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

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
// Query to fetch LSP7 (fungible) tokens
// Filters assets by lsp4TokenType = 0 and returns token metadata with creator information
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

// Usage: Fetch all LSP7 fungible tokens
const lsp7Tokens = await getLSP7Tokens();
```

  </TabItem>
</Tabs>

<details>
  <summary>Relative Schema</summary>

```graphql
type Asset {
  id: String!
  name: String
  lsp4TokenSymbol: String
  lsp4TokenType: Int
  totalSupply: numeric
  description: String
  images: [AssetImageURL!]!
  lsp4Creators: [AssetCreators!]!
  # ... other fields
}

type AssetImageURL {
  src: String
  url: String
  verified: verificationstatus!
}

type AssetCreators {
  profile: Profile
}
```

</details>

[**Try it in the playground →**](https://envio.lukso-mainnet.universal.tech/)

---

<span id="get-lsp8-nfts"></span>

**Get LSP8 NFTs**

Query LSP8 (non-fungible) tokens including individual token IDs and their metadata.

<Tabs>
  <TabItem value="query" label="Query" default>

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

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
// Query to fetch individual LSP8 (non-fungible) tokens for a specific asset
// Returns token IDs with their metadata, images, and custom attributes
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

// Usage: Fetch all NFTs for a specific LSP8 collection
const nfts = await getLSP8NFTs('0x1234567890abcdef1234567890abcdef12345678');
```

  </TabItem>
</Tabs>

<details>
  <summary>Relative Schema</summary>

```graphql
type Token {
  id: String!
  tokenId: String!
  asset_id: String
  name: String
  description: String
  images: [TokenImageURL!]!
  attributes: [TokenAttribute!]!
  # ... other fields
}

type TokenImageURL {
  src: String
  url: String
  verified: verificationstatus!
}

type TokenAttribute {
  key: String
  value: String
}
```

</details>

[**Try it in the playground →**](https://envio.lukso-mainnet.universal.tech/)

---

<span id="get-lsp4-digital-asset-metadata"></span>

**Get LSP4 Digital Asset Metadata**

Query [LSP4 Digital Asset Metadata](/standards/tokens/LSP4-Digital-Asset-Metadata/) for assets and tokens.

<Tabs>
  <TabItem value="query" label="Query" default>

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

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
// Query to fetch LSP4 Digital Asset Metadata for a specific asset
// Retrieves comprehensive metadata including images sorted by size and custom attributes
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

// Usage: Fetch complete LSP4 metadata for an asset
const metadata = await getAssetMetadata(
  '0x1234567890abcdef1234567890abcdef12345678',
);
```

  </TabItem>
</Tabs>

<details>
  <summary>Relative Schema</summary>

```graphql
type Asset {
  id: String!
  name: String
  lsp4TokenSymbol: String
  description: String
  lsp4TokenType: Int
  images: [AssetImageURL!]!
  attributes: [AssetAttribute!]!
  # ... other fields
}

type AssetImageURL {
  width: Int
  height: Int
  src: String
  url: String
  verified: verificationstatus!
}

type AssetAttribute {
  key: String
  value: String
}
```

</details>

[**Try it in the playground →**](https://envio.lukso-mainnet.universal.tech/)

---

<span id="search-assets-by-attribute"></span>

**Search Assets by Attribute**

Filter assets or tokens by attributes and categories defined in their metadata.

<Tabs>
  <TabItem value="query" label="Query" default>

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

  </TabItem>
  <TabItem value="typescript" label="TypeScript">

```typescript
// Query to search for assets by specific attribute key-value pairs
// Uses _ilike for case-insensitive pattern matching on attribute values
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
    categoryValue: `%${categoryValue}%`, // Add wildcards for partial matching
  });
  return data.Asset;
}

// Usage: Search for assets by a specific attribute (e.g., Author name)
const artAssets = await searchByCategory('Author', 'Deez');
```

  </TabItem>
</Tabs>

<details>
  <summary>Relative Schema</summary>

```graphql
type Asset {
  id: String!
  name: String
  lsp4TokenSymbol: String
  lsp4TokenType: Int
  images: [AssetImageURL!]!
  attributes: [AssetAttribute!]!
  # ... other fields
}

type AssetImageURL {
  src: String
  url: String
}

type AssetAttribute {
  key: String
  value: String
}
```

</details>

[**Try it in the playground →**](https://envio.lukso-mainnet.universal.tech/)

---

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

**Variables:**

```json
{
  "limit": 10,
  "offset": 0,
  "nameFilter": "%lukso%"
}
```

## Resources

- [LUKSO Indexer Playground](https://envio.lukso-mainnet.universal.tech/)
- [LSP4 - Digital Asset Metadata](/standards/tokens/LSP4-Digital-Asset-Metadata/)
- [LSP3 - Profile Metadata](/standards/metadata/lsp3-profile-metadata/)
