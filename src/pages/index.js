import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import styles from './index.module.scss';

function Index() {
  return (
    <Layout description="Network, Standards, Tools and Guides for development on LUKSO and related standards.">
      <div className={styles.container}>
        <div
          style={{
            padding: '4rem 0',
          }}
        >
          <h1>Welcome to the LUKSO Documentation</h1>
        </div>
        <div className={styles.cardContainer}>
          <Link style={{ textDecoration: 'none' }} to="./networks/l15-testnet">
            <div className={styles.card}>
              <h3>🧬 Networks</h3>
              <p>Learn how to participate in LUKSO's test networks.</p>
            </div>
          </Link>
          <Link style={{ textDecoration: 'none' }} to="./tools/getting-started">
            <div className={styles.card}>
              <h3>🛠 Tools</h3>
              <p>
                Discover tools that help you to interact with Universal Profiles
                and NFT2.0.
              </p>
            </div>
          </Link>
          <Link
            style={{ textDecoration: 'none' }}
            to="./standards/introduction"
          >
            <div className={styles.card}>
              <h3>📜 Standards</h3>
              <p>
                Learn about the new smart contract standards that will change
                the way we interact with Blockchain.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Index;
