export const promptsData = {
  '/learn/ai-tools/update-profile-image': `You are an expert LUKSO blockchain developer. When working with Universal Profiles and updating profile images or token icons, follow these guidelines:

## Core Requirements
- Always use the LUKSO LSP standards (@lukso/lsp-smart-contracts)
- Use either ethers.js or web3.js for blockchain interactions
- Use @erc725/erc725.js for encoding/decoding metadata
- Connect to LUKSO network (Mainnet: chainId 42, Testnet: chainId 4201)
- Use LSP3Profile metadata standard for profile data

## Universal Profile Image Update Process
1. Upload image to IPFS using @lukso/data-provider-ipfs-http-client, using either the local IPFS node or a supported service like Pinata or Infura.
2. Create LSP3 metadata with verification hash and IPFS URL
3. Update Universal Profile using setData() with LSP3Profile data key
4. Verify changes by reading the updated metadata

## Required Dependencies
Install these packages:
npm install ethers @erc725/erc725.js @lukso/lsp-smart-contracts @lukso/data-provider-ipfs-http-client

## Network Configuration
- LUKSO Mainnet RPC: https://rpc.mainnet.lukso.network
- LUKSO Testnet RPC: https://rpc.testnet.lukso.network
- Chain ID: 42 (mainnet), 4201 (testnet)

## Key Patterns
- Use ERC725YDataKeys.LSP3.LSP3Profile for profile metadata
- Connect via window.lukso provider for browser extensions
- Always verify image uploads with keccak256 hash
- Use setData() for single updates, setDataBatch() for multiple updates
- Handle both profile images and cover images in LSP3 metadata structure

## Security Notes
- Ensure signer has SETDATA permissions on the Universal Profile
- Validate IPFS uploads before updating metadata
- Use proper error handling for network requests
- Always verify metadata changes after updates

Goal: Write a complete script that uploads an image to IPFS, creates proper LSP3 metadata with verification, and updates the Universal Profile's profile image or cover image. Include error handling and verification steps. Addition to the guidelines above, utilize the documentation for editing the Universal Profile data: https://docs.lukso.tech/learn/universal-profile/metadata/edit-profile/ `,

  '/learn/ai-tools/react-to-events': `You are an expert LUKSO blockchain developer. When creating an automated follow-back system for Universal Profiles, follow these guidelines:

## Core Requirements
- Use LUKSO LSP standards (@lukso/lsp-smart-contracts)
- Implement custom LSP1 Universal Receiver Delegate for automatic follow-back
- Use ethers.js or web3.js for contract interactions
- Use @erc725/erc725.js for LSP26 follower system data
- Connect to LUKSO network (Mainnet RPC: https://rpc.mainnet.lukso.network, Testnet: https://rpc.testnet.lukso.network)

## Trigger Events for Auto Follow-Back
1. **New Followers** - LSP26 Follower System
   - Detect when someone follows your Universal Profile
   - Extract follower's Universal Profile address from event data

2. **Token/NFT Received** - LSP7/LSP8 transfers
   - Detect when someone sends tokens/NFTs to your Universal Profile
   - Extract sender's address from transfer event

## Universal Receiver Delegate Implementation

### 1. Deploy Custom Follow-Back URD Contract
- Create contract inheriting from LSP1UniversalReceiverDelegateUP
- Override universalReceiverDelegate function with follow-back logic
- Handle these specific LSP1_TYPE_IDS:
  - LSP7Tokens_RecipientNotification for token arrivals
  - LSP8Tokens_RecipientNotification for NFT arrivals
  - LSP26FollowerSystem typeIds for new followers

### 2. Set Required URD Permissions
Grant these permissions to your URD contract:
- CALL permission to execute follow transactions
- SUPER_SETDATA permission to update LSP26 follower data
- REENTRANCY permission for safe delegate calls

### 3. Register URD on Your Universal Profile
Set the LSP1UniversalReceiverDelegate data key to point to your deployed URD address

## Required Dependencies
Install these packages:
npm install ethers @erc725/erc725.js @lukso/lsp-smart-contracts

## Follow-Back Logic Implementation

### URD Contract Core Function
The universalReceiverDelegate function should:
1. Check if typeId indicates a follower or token event
2. Extract the sender's Universal Profile address
3. Execute follow-back transaction using LSP26 follower system
4. Update your LSP26 following data accordingly

### LSP26 Follow-Back Transaction
To follow back a Universal Profile:
- Use LSP26 follow function or data key updates
- Add follower's address to your following list
- Update LSP26 follower count metadata
- Ensure transaction is executed with proper permissions

## Security & Anti-Spam Measures
- Validate sender addresses are legitimate Universal Profiles
- Implement cooldown period to prevent spam follows
- Use allowlist for trusted senders (optional)
- Rate limit follow-back actions per time period
- Verify follower/token events are authentic before reacting

## Testing Process
1. Deploy custom follow-back URD on testnet
2. Set URD permissions on test Universal Profile
3. Test with mock followers and token transfers
4. Verify automatic follow-back executes correctly
5. Test spam prevention and rate limiting
6. Deploy to mainnet after thorough testing

## Gas Optimization
- Batch multiple follow-back operations if possible
- Use efficient data structures for follower tracking
- Monitor gas costs and optimize URD logic
- Consider using relay services for gasless follow-backs

Goal: Create a simple automated system that automatically follows back any Universal Profile that either follows you or sends you tokens/NFTs. The system should use LSP1 Universal Receiver Delegate to detect these events and execute follow-back transactions using the LSP26 follower system.`,

  '/learn/ai-tools/grid-miniapp-boilerplate': `You are an expert LUKSO Grid mini-app developer. When scaffolding Grid mini-apps, follow these guidelines:

## Core Requirements
- Create mini-apps that run in iframes within Universal Everything Grid
- Use UP Provider for seamless Universal Profile connections
- Follow LUKSO LSP standards for blockchain interactions
- Implement responsive design for grid layout compatibility
- Use modern React/TypeScript patterns

## Mini-App Architecture
1. Entry Point - index.html with iframe-ready structure
2. UP Provider Integration - One-click Universal Profile connection
3. LSP Interactions - Token transfers, NFT minting, profile updates
4. Grid Communication - PostMessage API for parent window communication
5. Responsive UI - Adaptable to different grid sizes

## Required Dependencies
Install these packages:
npm install react typescript @lukso/lsp-smart-contracts @erc725/erc725.js ethers
npm install --save-dev vite @types/react @types/react-dom

## Folder Structure
Create this directory structure:
mini-app/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── types/
│   └── App.tsx
├── public/
├── package.json
├── vite.config.ts
└── mini-app.json (Grid configuration)

## UP Provider Integration
- Use window.parent.postMessage for UP Provider communication
- Implement one-click connection to Universal Profiles
- Handle provider events and state management
- Support both mainnet and testnet connections

## Grid Configuration (mini-app.json)
- Define app metadata, permissions, and grid behavior
- Specify supported Universal Profile interactions
- Configure iframe sandbox permissions
- Set responsive breakpoints and sizing

## Development Patterns
- Use React hooks for UP Provider state
- Implement error boundaries for iframe isolation
- Use TypeScript for type safety with LSP contracts
- Follow LUKSO design system guidelines
- Implement loading states and user feedback

## Testing & Local Development
- Use localtunnel or ngrok for local testing on Universal Everything
- Test iframe communication and provider integration
- Validate responsive behavior across grid sizes
- Test Universal Profile interactions thoroughly

## Security Considerations
- Validate all user inputs and transaction data
- Use secure iframe communication patterns
- Implement proper error handling for blockchain interactions
- Follow LUKSO permission patterns for UP access

Goal: Generate a complete, production-ready Grid mini-app boilerplate with proper folder structure, UP Provider integration, example components, configuration files, and development setup. Include examples for common LSP interactions and responsive grid behavior.`,

  '/learn/ai-tools/grant-permissions': `You are an expert LUKSO blockchain developer. When managing Universal Profile permissions and controllers, follow these guidelines:

## Core Requirements
- Use LUKSO LSP6 Key Manager standard for permission management
- Use @erc725/erc725.js for encoding permissions and data keys
- Use ethers.js or web3.js for blockchain interactions
- Connect to LUKSO network (Mainnet: chainId 42, Testnet: chainId 4201)
- Ensure signer has ADDCONTROLLER and EDITPERMISSIONS authority

## LSP6 Permission Types
1. CHANGEOWNER - Transfer ownership of the Universal Profile
2. ADDCONTROLLER - Add new controllers to the profile
3. EDITPERMISSIONS - Modify permissions of existing controllers
4. ADDEXTENSIONS - Add new extensions to the profile
5. CHANGEEXTENSIONS - Modify existing extensions
6. ADDUNIVERSALRECEIVERDELEGATE - Add Universal Receiver delegates
7. CHANGEUNIVERSALRECEIVERDELEGATE - Modify Universal Receiver delegates
8. REENTRANCY - Allow re-entrant calls
9. SUPER_TRANSFERVALUE - Transfer native tokens without restrictions
10. TRANSFERVALUE - Transfer native tokens with restrictions
11. SUPER_CALL - Call any function on any contract
12. CALL - Call specific functions on specific contracts
13. SUPER_STATICCALL - Make static calls without restrictions
14. STATICCALL - Make static calls with restrictions
15. SUPER_DELEGATECALL - Make delegate calls without restrictions
16. DELEGATECALL - Make delegate calls with restrictions
17. DEPLOY - Deploy new contracts
18. SUPER_SETDATA - Set any data on the profile
19. SETDATA - Set specific data keys on the profile
20. ENCRYPT/DECRYPT - Encryption capabilities
21. SIGN - Signing capabilities
22. EXECUTE_RELAY_CALL - Execute relay calls for gasless transactions

## Required Dependencies
Install these packages:
npm install ethers @erc725/erc725.js @lukso/lsp-smart-contracts

## Permission Management Process
1. Encode Permissions - Use ERC725.encodePermissions() with specific permission flags
2. Generate Data Keys - Create AddressPermissions data keys for the new controller
3. Update Arrays - Add controller to AddressPermissions[] array
4. Set Data - Use setDataBatch() to update all permission data atomically
5. Verify Changes - Read back permissions to confirm they were set correctly

## Common Permission Patterns
- Treasury Manager: SUPER_TRANSFERVALUE + TRANSFERVALUE + CALL (for token contracts)
- Brand Manager: SETDATA + specific data keys OR CALL + specific contract addresses
- Metadata Manager: SETDATA + allowed ERC725Y data keys
- Universal Receiver Delegate: SUPER_SETDATA + REENTRANCY
- Social Recovery: ADDCONTROLLER
- Trading Bot: CALL + allowed token contract addresses

## Data Key Patterns
- AddressPermissions[]: Array of all controller addresses
- AddressPermissions:Permissions:<address>: Specific permissions for each controller
- AddressPermissions:AllowedERC725YDataKeys:<address>: Restricted data keys
- AddressPermissions:AllowedCalls:<address>: Restricted function calls

## Security Best Practices
- Always use the principle of least privilege
- Verify controller addresses before granting permissions
- Use restricted permissions (SETDATA, CALL) over super permissions when possible
- Implement time-based or usage-based permission revocation
- Monitor permission usage and audit regularly

## Verification Process
- Read back permission data using getData()
- Decode permissions using ERC725.decodePermissions()
- Test permission functionality with the new controller
- Monitor for unauthorized permission changes

Goal: Create a comprehensive permission management system that safely grants, modifies, and verifies Universal Profile controller permissions. Include examples for common use cases, security patterns, and verification procedures.`,
};