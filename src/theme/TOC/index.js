import React from 'react';
import clsx from 'clsx';
import TOCItems from '@theme/TOCItems';
import styles from './styles.module.css';
import DiscordLogo from '../../../static/img/icons/discord.svg';

// Using a custom className
// This prevents TOCInline/TOCCollapsible getting highlighted by mistake
const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';
export default function TOC({ className, ...props }) {
  return (
    <div className={clsx(styles.tableOfContents, 'thin-scrollbar', className)}>
      <TOCItems
        {...props}
        linkClassName={LINK_CLASS_NAME}
        linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
      />
      <div className={styles.feedbacks}>
        <a
          className="table-of-contents table-of-contents__link toc-highlight"
          href="https://github.com/lukso-network/docs/issues/new/choose"
          target="_blank"
          rel="noreferrer"
        >
          <p>
            Found an error in the docs?
            <br />
            Thinking of a missing guide?
            <br />
            Give us feedback →
          </p>
        </a>
        <a
          className="table-of-contents table-of-contents__link toc-highlight"
          href="https://discord.com/channels/359064931246538762/620552532602912769"
          target="_blank"
          rel="noreferrer"
        >
          <p>
            <strong>Questions? Want to learn more?</strong>
          </p>
          <p>
            Ask your questions to the team or community on the LUKSO Discord
            server.
          </p>
        </a>
      </div>
      <div></div>
    </div>
  );
}
