import React from 'react';

export default function Erc721LSP8Table() {
  return (
    <table id="erc721-to-lsp8-table" width="100%">
      <thead>
        <tr>
          <th>ERC721 Function</th>
          <th>LSP8 Equivalent</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <pre language="solidity">name()</pre>
          </td>
          <td>
            <pre language="javascript">
              const dataKey = keccak256('LSP4TokenName')
              <br />
              getData(bytes32 dataKey)
            </pre>
          </td>
        </tr>
        <tr>
          <td>
            <pre language="solidity">symbol()</pre>
          </td>
          <td>
            <pre language="javascript">
              const dataKey = keccak256('LSP4TokenSymbol')
              <br />
              getData(bytes32 dataKey)
            </pre>
          </td>
        </tr>
        <tr style={{ backgroundColor: '#65b033' }}>
          <td>
            <pre language="solidity">balanceOf(address owner)</pre>
          </td>
          <td>
            <pre language="solidity">balanceOf(address tokenOwner)</pre>
          </td>
        </tr>
        <tr>
          <td>
            <pre language="solidity">ownerOf(uint256 tokenId)</pre>
          </td>
          <td>
            <pre language="solidity">tokenOwnerOf(bytes32 tokenId)</pre>
          </td>
        </tr>
        <tr>
          <td>
            <pre language="solidity">approve(address to, uint256 tokenId)</pre>
          </td>
          <td>
            <pre language="solidity">
              authorizeOperator(
              <br />
              {'  '}address operator,
              <br />
              {'  '}bytes32 tokenId,
              <br />
              {'  '}bytes memory data
              <br />)
            </pre>
            <a href="/contracts/contracts/LSP8IdentifiableDigitalAsset/#authorizeoperator">
              🔍 Function details
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <pre language="solidity">getApproved(uint256 tokenId)</pre>
          </td>
          <td>
            <pre language="solidity">getOperatorsOf(bytes32 tokenId)</pre>
            <a href="/contracts/contracts/LSP8IdentifiableDigitalAsset/#getoperatorsof">
              🔍 Function details
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <pre language="solidity">
              setApprovalForAll(address operator, bool approved)
            </pre>
          </td>
          <td>
            <i>
              No direct equivalent, use <b>authorizeOperator</b> for each token
            </i>
          </td>
        </tr>
        <tr>
          <td>
            <pre language="solidity">
              isApprovedForAll(address owner, address operator)
            </pre>
          </td>
          <td>
            <pre language="solidity">
              isOperatorFor(
              <br />
              {'  '}address operator,
              <br />
              {'  '}bytes32 tokenId
              <br />)
            </pre>
            <a href="/contracts/contracts/LSP8IdentifiableDigitalAsset/#isoperatorfor">
              🔍 Function details
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <pre language="solidity">
              transferFrom(
              <br />
              {'  '}address from,
              <br />
              {'  '}address to,
              <br />
              {'  '}uint256 tokenId
              <br />)
            </pre>
          </td>
          <td>
            <pre language="solidity">
              transfer(
              <br />
              {'  '}address from,
              <br />
              {'  '}address to,
              <br />
              {'  '}bytes32 tokenId,
              <br />
              {'  '}bool force,
              <br />
              {'  '}bytes memory data
              <br />)
            </pre>
            <a href="/contracts/contracts/LSP8IdentifiableDigitalAsset/#transfer">
              🔍 Function details
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <pre language="solidity">
              safeTransferFrom(
              <br />
              {'  '}address from,
              <br />
              {'  '}address to,
              <br />
              {'  '}uint256 tokenId
              <br />)
            </pre>
          </td>
          <td>
            <pre language="solidity">
              transfer(
              <br />
              {'  '}address from,
              <br />
              {'  '}address to,
              <br />
              {'  '}bytes32 tokenId,
              <br />
              {'  '}bool force,
              <br />
              {'  '}bytes memory data
              <br />)
            </pre>
            <p style={{ marginBottom: '1rem' }}>
              Set <code>force = false</code> for safe transfer behavior
            </p>
            <a href="/contracts/contracts/LSP8IdentifiableDigitalAsset/#transfer">
              🔍 Function details
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <i>No equivalent</i>
          </td>
          <td>
            <pre language="solidity">
              revokeOperator(
              <br />
              {'  '}address operator,
              <br />
              {'  '}bytes32 tokenId,
              <br />
              {'  '}bool notify,
              <br />
              {'  '}bytes memory data
              <br />)
            </pre>
            <a href="/contracts/contracts/LSP8IdentifiableDigitalAsset/#revokeoperator">
              🔍 Function details
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <i>No equivalent</i>
          </td>
          <td>
            <pre language="solidity">batchCalls(bytes[] memory data)</pre>
            <p style={{ marginBottom: '1rem' }}>
              Allows to pass multiple calls into a single transaction. For
              instance:
              <ol>
                <li>Transfer an NFT to an address.</li>
                <li>
                  Authorize an operator for a specific <code>tokenId</code>.
                </li>
                <li>Update the NFT metadata.</li>
                <li>etc...</li>
              </ol>
            </p>
            <a href="/contracts/contracts/LSP8IdentifiableDigitalAsset/#batchcalls">
              🔍 Function details
            </a>
            {/* <li>
                <a href="#">🔀 Example Transaction</a>
              </li> */}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
