import React from 'react';

export default function Erc721LSP8Table() {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>ERC721 Function</th>
          <th>LSP8 Equivalent</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>name()</code>
          </td>
          <td>
            <code>getData(bytes32 dataKey)</code> with <br />{' '}
            <code>dataKey = keccak256('LSP4TokenName')</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>symbol()</code>
          </td>
          <td>
            <code>getData(bytes32 dataKey)</code> with <br />{' '}
            <code>dataKey = keccak256('LSP4TokenSymbol')</code>
          </td>
        </tr>
        <tr style={{ backgroundColor: '#dcfce7' }}>
          <td>
            <code>balanceOf(address owner)</code>
          </td>
          <td>
            <code>balanceOf(address tokenOwner)</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>ownerOf(uint256 tokenId)</code>
          </td>
          <td>
            <code>tokenOwnerOf(bytes32 tokenId)</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>approve(address to, uint256 tokenId)</code>
          </td>
          <td>
            <code>
              authorizeOperator(address operator,
              <br />
              bytes32 tokenId,
              <br />
              bytes memory data)
            </code>
          </td>
        </tr>
        <tr>
          <td>
            <code>getApproved(uint256 tokenId)</code>
          </td>
          <td>
            <code>getOperatorsOf(bytes32 tokenId)</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>setApprovalForAll(address operator, bool approved) </code>
          </td>
          <td>
            <i>
              No direct equivalent, use <b>authorizeOperator</b> for each token
            </i>
          </td>
        </tr>
        <tr>
          <td>
            <code>isApprovedForAll(address owner, address operator)</code>
          </td>
          <td>
            <code>
              isOperatorFor(address operator,
              <br />
              bytes32 tokenId)
            </code>
          </td>
        </tr>
        <tr>
          <td>
            <code>transferFrom(address from, address to, uint256 tokenId)</code>
          </td>
          <td>
            <code>
              transfer(address from,
              <br />
              address to,
              <br />
              bytes32 tokenId,
              <br />
              bool force,
              <br />
              bytes memory data)
            </code>
          </td>
        </tr>
        <tr>
          <td>
            <code>
              safeTransferFrom(address from, address to, uint256 tokenId)
            </code>
          </td>
          <td>
            <code>
              transfer(address from,
              <br />
              address to,
              <br />
              bytes32 tokenId,
              <br />
              bool force,
              <br />
              bytes memory data)
            </code>
          </td>
        </tr>
        <tr>
          <td>
            <i>No equivalent</i>
          </td>
          <td>
            <code>
              revokeOperator(address operator,
              <br />
              bytes32 tokenId,
              <br />
              bool notify,
              <br />
              bytes memory data)
            </code>
          </td>
        </tr>
        <tr>
          <td>
            <i>No equivalent</i>
          </td>
          <td>
            <code>batchCalls(bytes[] memory data)</code>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
