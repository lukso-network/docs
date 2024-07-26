import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CustomAccordion({ accordionData }) {
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

// example of data that should be added to the top of the markdown page
//
// const accordionData = [
//   {
//     summary: <summary or heading of the accordion line>,
//     details: <whatever data you want to appear in the drop down></whatever>
//   },
// ];
