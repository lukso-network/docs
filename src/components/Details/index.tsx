import styles from './Details.module.scss';

/**
 * Component to encapsulate the HTML `<details>` element for
 * collapsible content sections within Markdown files.
 *
 * Using raw MDX `<details>` and `<summary>` tags in Markdown
 * leads to server-side processing issues. Therefore, the details
 * content is processed within JSX.
 *
 * children: The content that will be wrapped by the `<details>` element.
 *
 */
import React from 'react';

const Details = ({ children }) => (
  <details className={styles.detailsContainer}>{children}</details>
);

export default Details;
