import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
import PromptModal from '../PromptModal';
import styles from './LinkCards.module.scss';

type LinkCardsProps = {
  links: {
    title: string;
    link: string;
    description?: string;
    showAsCode: boolean;
  }[];
  enableModal?: boolean;
};

const LinkCards: React.FC<LinkCardsProps> = ({ links, enableModal = false }) => {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<{
    title: string;
    description?: string;
    link: string;
  } | null>(null);

  const handleCardClick = (item: { title: string; link: string; description?: string }) => {
    if (enableModal) {
      setSelectedPrompt(item);
      setModalOpen(true);
    }
  };
  
  return (
    <>
      <div className={styles.containerBoxLinks}>
        {links.map((item) => {
          if (enableModal) {
            return (
              <div
                key={item.link}
                className={`${styles.boxLink} ${styles.modalCard} ${isDarkTheme ? 'darkModeInteractive' : ''}`}
                onClick={() => handleCardClick(item)}
                style={{ cursor: 'pointer' }}
              >
                <h3>{item.showAsCode ? <code>{item.title}</code> : item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          } else {
            return (
              <Link key={item.link} to={item.link} className={`${styles.boxLink} ${isDarkTheme ? 'darkModeInteractive' : ''}`}>
                <h3>{item.showAsCode ? <code>{item.title}</code> : item.title}</h3>
                <p>{item.description}</p>
              </Link>
            );
          }
        })}
      </div>
      
      {enableModal && selectedPrompt && (
        <PromptModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={selectedPrompt.title}
          promptPath={selectedPrompt.link}
        />
      )}
    </>
  );
};

export default LinkCards;
