import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import styles from './index.module.scss';

function Index() {
  return (
    <Layout>
      <div className={styles.container}>
        <div
          style={{
            padding: '4rem 0',
          }}
        >
          <h1>Welcome to LUKSO Docs</h1>
        </div>
        <div className={styles.cardContainer}>
          <Link style={{ textDecoration: 'none' }} to="./networks/l15-testnet">
            <div className={styles.card}>
              <h3>🧬 Networks</h3>
              <p>Everything related to LUKSO's networks.</p>
            </div>
          </Link>
          <Link style={{ textDecoration: 'none' }} to="./tools/getting-started">
            <div className={styles.card}>
              <h3>🛠 Tools</h3>
              <p>
                Discover our open-source tools to interact with LUKSO ecosystem.
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
                Learn about our standards such as Universal Profiles and NFT2.0.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Index;
