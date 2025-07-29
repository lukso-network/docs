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
  const handleAssistantClick = () => {
    const currentUrl = window.location.href;
    const assistantUrl = `https://chatgpt.com/g/g-681a44ae29108191b12d97296ab25912-lukso-assistant?hints=search&prompt=Read+from+${encodeURIComponent(currentUrl)}+so+I+can+ask+questions+about+it`;
    window.open(assistantUrl, '_blank', 'noreferrer');
  };

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
        <button
          className="table-of-contents table-of-contents__link toc-highlight"
          onClick={handleAssistantClick}
          style={{ 
            background: 'none', 
            border: 'none', 
            width: '100%', 
            textAlign: 'left',
            cursor: 'pointer',
            font: 'inherit',
            color: 'inherit',
            padding: 'inherit'
          }}
        >
          <p>
            <strong>Questions? Ask about this page to LUKSO Assistant!</strong>
          </p>
        </button>
      </div>
      <div></div>
    </div>
  );
}
