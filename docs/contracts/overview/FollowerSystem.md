---
sidebar_label: 'Follower System'
sidebar_position: 9
description: How to interact with and implement the LUKSO LSP26 Follower System in your dApps and smart contracts.
---

# Follower System

The LSP26 Follower System provides a standardized way to manage social connections on-chain. This guide will help you understand how to interact with the LSP26 contract.

## Interacting with the LSP26 - Follower System Contract

### Following an Address

To follow an address, call the `follow` function:

```solidity
function follow(address addr) external;
```

Example usage:

```javascript
await followerSystemContract.follow(addressToFollow);
```

### Unfollowing an Address

To unfollow an address, use the `unfollow` function:

```solidity
function unfollow(address addr) external;
```

Example usage:

```javascript
await followerSystemContract.unfollow(addressToUnfollow);
```

### Checking Follow Status

To check if one address is following another:

```solidity
function isFollowing(address follower, address addr) external view returns (bool);
```

Example usage:

```javascript
const isFollowing = await followerSystemContract.isFollowing(
  followerAddress,
  followedAddress,
);
```

### Retrieving Follower and Following Counts

To get the number of followers or followed addresses:

```solidity
function followerCount(address addr) external view returns (uint256);
function followingCount(address addr) external view returns (uint256);
```

Example usage:

```javascript
const followers = await followerSystemContract.followerCount(address);
const following = await followerSystemContract.followingCount(address);
```

## Best Practices

1. **Batch Operations**: For following or unfollowing multiple addresses at once, use the `followBatch` and `unfollowBatch` functions to save on gas costs.

2. **Pagination**: When retrieving large lists of followers or following, use the paginated `getFollowersByIndex` and `getFollowsByIndex` functions to avoid gas limits and improve performance.

3. **Event Listening**: Set up event listeners for the `Follow` and `Unfollow` events to keep your dApp's state in sync with on-chain changes.

4. **LSP1 Integration**: If your dApp interacts with LSP1-compatible contracts, be prepared to handle the LSP26 follow/unfollow notifications through the `universalReceiver` function.
