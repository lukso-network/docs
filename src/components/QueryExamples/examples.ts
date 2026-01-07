export interface QueryExample {
  id: string;
  title: string;
  description: string;
  query: string;
  variables: string;
  typescript: string;
  schema: string;
}

export const queryExamples: QueryExample[] = [
  {
    id: 'search-profiles',
    title: 'Search Universal Profiles',
    description:
      'Search for profiles by name, address, or other identifiers using the search_profiles function.',
    query: `query SearchProfiles($search: String!) {
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
}`,
    variables: `{
  "search": "lukso"
}`,
    typescript: `import { request, gql } from 'graphql-request';

const GRAPHQL_ENDPOINT =
  'https://envio.lukso-mainnet.universal.tech/v1/graphql';

// Query to search for Universal Profiles by name or address
// Returns matching profiles with their images sorted by width (smallest first)
const searchProfilesQuery = gql\`
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
\`;

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
const profiles = await searchProfiles('lukso');`,
    schema: `type Profile {
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
}`,
  },
  {
    id: 'get-profile-by-address',
    title: 'Get Profile Data by Address',
    description: 'Fetch detailed profile information for a specific address.',
    query: `query GetProfile($address: String!) {
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
}`,
    variables: `{
  "address": "0x1234567890abcdef1234567890abcdef12345678"
}`,
    typescript: `// Query to fetch complete profile data for a specific Universal Profile address
// Retrieves profile metadata, images, background images, and social links
const getProfileQuery = gql\`
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
\`;

async function getProfile(address: string) {
  const data = await request(GRAPHQL_ENDPOINT, getProfileQuery, { address });
  return data.Profile[0];
}

// Usage: Fetch profile data for a specific address
const profile = await getProfile('0x1234567890abcdef1234567890abcdef12345678');`,
    schema: `type Profile {
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
}`,
  },
  {
    id: 'get-assets',
    title: 'Get Assets',
    description: 'Query assets (LSP7 and LSP8 tokens) from the blockchain.',
    query: `query GetAssets($limit: Int = 10, $offset: Int = 0) {
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
}`,
    variables: `{
  "limit": 10,
  "offset": 0
}`,
    typescript: `// Query to fetch assets (LSP7 tokens and LSP8 NFTs) with pagination
// Returns assets ordered by creation time (newest first) with their metadata and images
const getAssetsQuery = gql\`
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
\`;

async function getAssets(limit: number = 10, offset: number = 0) {
  const data = await request(GRAPHQL_ENDPOINT, getAssetsQuery, {
    limit,
    offset,
  });
  return data.Asset;
}

// Usage: Fetch the first 10 assets, or use offset for pagination
const assets = await getAssets(10, 0);`,
    schema: `type Asset {
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
}`,
  },
  {
    id: 'search-assets',
    title: 'Search Assets',
    description: 'Search for assets by name, symbol, or other criteria.',
    query: `query SearchAssets($search: String) {
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
}`,
    variables: `{
  "search": "LUKSO"
}`,
    typescript: `// Query to search for assets by name or symbol
// Returns matching assets with their type (LSP7 or LSP8) and primary image
const searchAssetsQuery = gql\`
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
\`;

async function searchAssets(searchTerm: string) {
  const data = await request(GRAPHQL_ENDPOINT, searchAssetsQuery, {
    search: searchTerm,
  });
  return data.search_assets;
}

// Usage: Search for assets by name or symbol
const luksoAssets = await searchAssets('LUKSO');`,
    schema: `type Asset {
  images: [AssetImageURL!]!
  # ... other fields
}

type AssetImageURL {
  src: String
  url: String
}`,
  },
  {
    id: 'get-lsp7-tokens',
    title: 'Get LSP7 Tokens',
    description: 'Query LSP7 (fungible) tokens with detailed metadata.',
    query: `query GetLSP7Tokens {
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
}`,
    variables: `{}`,
    typescript: `// Query to fetch LSP7 (fungible) tokens
// Filters assets by lsp4TokenType = 0 and returns token metadata with creator information
const getLSP7TokensQuery = gql\`
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
\`;

async function getLSP7Tokens() {
  const data = await request(GRAPHQL_ENDPOINT, getLSP7TokensQuery);
  return data.Asset;
}

// Usage: Fetch all LSP7 fungible tokens
const lsp7Tokens = await getLSP7Tokens();`,
    schema: `type Asset {
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
}`,
  },
  {
    id: 'get-lsp8-nfts',
    title: 'Get LSP8 NFTs',
    description:
      'Query LSP8 (non-fungible) tokens including individual token IDs and their metadata.',
    query: `query GetLSP8NFTs($assetId: String!) {
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
}`,
    variables: `{
  "assetId": "0x1234567890abcdef1234567890abcdef12345678"
}`,
    typescript: `// Query to fetch individual LSP8 (non-fungible) tokens for a specific asset
// Returns token IDs with their metadata, images, and custom attributes
const getLSP8NFTsQuery = gql\`
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
\`;

async function getLSP8NFTs(assetId: string) {
  const data = await request(GRAPHQL_ENDPOINT, getLSP8NFTsQuery, { assetId });
  return data.Token;
}

// Usage: Fetch all NFTs for a specific LSP8 collection
const nfts = await getLSP8NFTs('0x1234567890abcdef1234567890abcdef12345678');`,
    schema: `type Token {
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
}`,
  },
  {
    id: 'get-lsp4-metadata',
    title: 'Get LSP4 Digital Asset Metadata',
    description: 'Query LSP4 Digital Asset Metadata for assets and tokens.',
    query: `query GetAssetMetadata($assetId: String!) {
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
}`,
    variables: `{
  "assetId": "0x1234567890abcdef1234567890abcdef12345678"
}`,
    typescript: `// Query to fetch LSP4 Digital Asset Metadata for a specific asset
// Retrieves comprehensive metadata including images sorted by size and custom attributes
const getAssetMetadataQuery = gql\`
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
\`;

async function getAssetMetadata(assetId: string) {
  const data = await request(GRAPHQL_ENDPOINT, getAssetMetadataQuery, {
    assetId,
  });
  return data.Asset[0];
}

// Usage: Fetch complete LSP4 metadata for an asset
const metadata = await getAssetMetadata(
  '0x1234567890abcdef1234567890abcdef12345678',
);`,
    schema: `type Asset {
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
}`,
  },
  {
    id: 'search-assets-by-attribute',
    title: 'Search Assets by Attribute',
    description:
      'Filter assets or tokens by attributes and categories defined in their metadata.',
    query: `query SearchByCategory($categoryKey: String!, $categoryValue: String!) {
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
}`,
    variables: `{
  "categoryKey": "Author",
  "categoryValue": "%Deez%"
}`,
    typescript: `// Query to search for assets by specific attribute key-value pairs
// Uses _ilike for case-insensitive pattern matching on attribute values
const searchByCategoryQuery = gql\`
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
\`;

async function searchByCategory(categoryKey: string, categoryValue: string) {
  const data = await request(GRAPHQL_ENDPOINT, searchByCategoryQuery, {
    categoryKey,
    categoryValue: \`%\${categoryValue}%\`, // Add wildcards for partial matching
  });
  return data.Asset;
}

// Usage: Search for assets by a specific attribute (e.g., Author name)
const artAssets = await searchByCategory('Author', 'Deez');`,
    schema: `type Asset {
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
}`,
  },
];
