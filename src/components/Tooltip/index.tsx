import React, { useState } from 'react';
import styles from './Tooltip.module.scss';

type TooltipProps = {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
};

const Tooltip: React.FC<TooltipProps> = ({ 
  text, 
  children, 
  position = 'top' 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className={styles.tooltipWrapper}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div 
        className={`${styles.tooltipTip} ${styles[position]} ${isVisible ? styles.visible : ''}`}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip; 