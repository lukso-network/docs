import React from 'react';

export default function Erc20LSP7Table() {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>ERC20 Function</th>
          <th>LSP7 Equivalent</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ backgroundColor: '#dcfce7' }}>
          <td>
            <code>name()</code>
          </td>
          <td>
            <code>getData(bytes32 dataKey)</code> with <br />{' '}
            <code>dataKey = keccak256('LSP4TokenName')</code>
          </td>
        </tr>
        <tr style={{ backgroundColor: '#dcfce7' }}>
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
            <code>decimals()</code>
          </td>
          <td>
            <code>decimals()</code>
          </td>
        </tr>
        <tr style={{ backgroundColor: '#dcfce7' }}>
          <td>
            <code>totalSupply()</code>
          </td>
          <td>
            <code>totalSupply()</code>
          </td>
        </tr>
        <tr style={{ backgroundColor: '#dcfce7' }}>
          <td>
            <code>balanceOf(address account)</code>
          </td>
          <td>
            <code>balanceOf(address account)</code>
          </td>
        </tr>
        <tr style={{ backgroundColor: '#dcfce7' }}>
          <td>
            <code>approve(address spender, uint256 amount)</code>
          </td>
          <td>
            <code>
              authorizeOperator(address spender,
              <br />
              uint256 amount,
              <br />
              bytes memory data)
            </code>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
