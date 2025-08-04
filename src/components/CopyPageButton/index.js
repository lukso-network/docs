import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

export default function CopyPageButton({ currentPath }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('Copy page');
  const dropdownRef = useRef(null);

  // Try to use hooks, but fall back to props if not in router context
  let location = { pathname: currentPath || '' };
  let siteConfig = { url: 'https://docs.lukso.tech' };

  try {
    // Only use hooks if we're in a proper React context
    if (typeof window !== 'undefined') {
      location = useLocation();
      const context = useDocusaurusContext();
      siteConfig = context.siteConfig || { url: 'https://docs.lukso.tech' };
    }
  } catch (e) {
    // If hooks fail (e.g., when rendered outside router context), use props
    // Keep the default values
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCopyPage = async () => {
    try {
      // Get the markdown content container
      const markdownContainer = document.querySelector('.markdown');

      if (!markdownContainer) {
        console.error('Could not find markdown content');
        return;
      }

      // Clone the markdown container to manipulate it without affecting the DOM
      const clonedContainer = markdownContainer.cloneNode(true);

      // Remove the copy page button container from the cloned content
      const copyButtonContainer = clonedContainer.querySelector(
        '.copy-page-button-container',
      );
      if (copyButtonContainer) {
        copyButtonContainer.remove();
      }

      // Get the page title
      const titleElement =
        document.querySelector('h1') ||
        document.querySelector(
          '.docTitle_src-theme-DocItem-Layout-styles-module',
        );
      const title = titleElement
        ? titleElement.textContent
        : 'Documentation Page';

      // Get the current page URL
      const pathname = location.pathname || currentPath || '';
      const currentPageUrl = `${siteConfig.url}${pathname}`;

      // Extract text content from the cloned container (excluding button texts)
      const textContent =
        clonedContainer.textContent || clonedContainer.innerText || '';

      // Format the content for clipboard with title and URL on same line
      const formattedContent = `# ${title} - ${currentPageUrl}\n\n${textContent}`;

      // Copy to clipboard
      await navigator.clipboard.writeText(formattedContent);

      // Show feedback
      setCopyFeedback('Copied to Clipboard!');
      // Don't close the dropdown so user can see the feedback

      // Reset feedback after 1 second
      setTimeout(() => {
        setCopyFeedback('Copy page');
      }, 1000);
    } catch (error) {
      console.error('Failed to copy content:', error);
      setCopyFeedback('Copy failed');

      // Reset feedback after 1 second
      setTimeout(() => {
        setCopyFeedback('Copy page');
      }, 1000);
    }
  };

  const handleOpenAssistant = () => {
    // Get the full URL of the current page without hash
    const pathname = location.pathname || currentPath || '';
    const currentPageUrl = `${siteConfig.url}${pathname}`;

    // Create the ChatGPT URL with the prompt
    const chatGptUrl = `https://chatgpt.com/g/g-681a44ae29108191b12d97296ab25912-lukso-assistant?hints=search&prompt=${encodeURIComponent(`Fetch the document at ${currentPageUrl}. I want to review its content so I can ask targeted questions.`)}`;

    // Open in a new tab
    window.open(chatGptUrl, '_blank', 'noopener,noreferrer');

    setIsOpen(false);
  };

  return (
    <div className={styles.copyPageButton} ref={dropdownRef}>
      <button
        className={styles.mainButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className={styles.buttonText}>Copy Page</span>
        <svg
          className={`${styles.dropdownIcon} ${isOpen ? styles.dropdownIconOpen : ''}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <button className={styles.dropdownItem} onClick={handleCopyPage}>
            <svg
              className={styles.dropdownItemIcon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z"
                stroke="currentColor"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.33333 10H2.66667C2.31305 10 1.97391 9.85952 1.72386 9.60948C1.47381 9.35943 1.33333 9.02029 1.33333 8.66667V2.66667C1.33333 2.31305 1.47381 1.97391 1.72386 1.72386C1.97391 1.47381 2.31305 1.33333 2.66667 1.33333H8.66667C9.02029 1.33333 9.35943 1.47381 9.60948 1.72386C9.85952 1.97391 10 2.31305 10 2.66667V3.33333"
                stroke="currentColor"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles.dropdownItemText}>{copyFeedback}</span>
            <span className={styles.dropdownItemDescription}>
              Copy the page content for LLMs
            </span>
          </button>

          <button className={styles.dropdownItem} onClick={handleOpenAssistant}>
            <svg
              className={styles.dropdownItemIcon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 10.6667C14 11.0203 13.8595 11.3594 13.6095 11.6095C13.3594 11.8595 13.0203 12 12.6667 12H4L1.33333 14.6667V3.33333C1.33333 2.97971 1.47381 2.64057 1.72386 2.39052C1.97391 2.14048 2.31305 2 2.66667 2H12.6667C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333V10.6667Z"
                stroke="currentColor"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles.dropdownItemText}>
              Open with LUKSO Assistant
            </span>
            <span className={styles.dropdownItemDescription}>
              Ask questions about this page
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
