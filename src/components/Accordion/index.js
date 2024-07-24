import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Accordion({ accordionData }) {
  return (
    <div>
      {accordionData.map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            {item.summary}
          </AccordionSummary>
          <AccordionDetails>{item.details}</AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
