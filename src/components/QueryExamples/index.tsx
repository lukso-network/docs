import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ThemeProvider } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useColorMode } from '@docusaurus/theme-common';
import createCustomTheme from '../../theme/themedComponents';
import { queryExamples, QueryExample } from './examples';
import styles from './QueryExamples.module.scss';

const QueryExamples: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<QueryExample>(
    queryExamples[0],
  );
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';
  const theme = createCustomTheme(isDarkTheme);

  return (
    <div className={styles.container}>
      {/* Left Sidebar - Example List */}
      <div className={styles.sidebar}>
        <ul className={styles.exampleList}>
          {queryExamples.map((example) => (
            <li
              key={example.id}
              className={`${styles.exampleItem} ${
                selectedExample.id === example.id ? styles.active : ''
              }`}
              onClick={() => setSelectedExample(example)}
            >
              {example.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Content - Accordion Sections */}
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.description}>{selectedExample.description}</p>
        </div>

        <ThemeProvider theme={theme}>
          {/* Query Section */}
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="query-content"
              id="query-header"
            >
              <strong>Query</strong>
            </AccordionSummary>
            <AccordionDetails>
              <CodeBlock language="graphql">{selectedExample.query}</CodeBlock>
            </AccordionDetails>
          </Accordion>

          {/* Variables Section */}
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="variables-content"
              id="variables-header"
            >
              <strong>Variables</strong>
            </AccordionSummary>
            <AccordionDetails>
              <CodeBlock language="json">{selectedExample.variables}</CodeBlock>
            </AccordionDetails>
          </Accordion>

          {/* TypeScript Section */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="typescript-content"
              id="typescript-header"
            >
              <strong>TypeScript</strong>
            </AccordionSummary>
            <AccordionDetails>
              <CodeBlock language="typescript">
                {selectedExample.typescript}
              </CodeBlock>
            </AccordionDetails>
          </Accordion>

          {/* Schema Section */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="schema-content"
              id="schema-header"
            >
              <strong>Schema</strong>
            </AccordionSummary>
            <AccordionDetails>
              <CodeBlock language="graphql">{selectedExample.schema}</CodeBlock>
            </AccordionDetails>
          </Accordion>
        </ThemeProvider>

        <a
          href="https://envio.lukso-mainnet.universal.tech/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.playgroundLink}
        >
          Try it in the playground →
        </a>
      </div>
    </div>
  );
};

export default QueryExamples;
