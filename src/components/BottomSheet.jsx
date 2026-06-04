import React, { useState } from 'react';
import './BottomSheet.css';

const BottomSheet = ({ children, initialExpanded = false, collapsedHeight = 120 }) => {
  const [expanded, setExpanded] = useState(initialExpanded);
  
  const toggleSheet = () => {
    setExpanded(!expanded);
  };

  return (
    <div 
      className={`bottom-sheet ${expanded ? 'expanded' : 'collapsed'}`} 
      style={!expanded ? { height: `${collapsedHeight}px` } : {}}
    >
      <div className="sheet-handle-area" onClick={toggleSheet}>
        <div className="sheet-handle"></div>
      </div>
      <div className="sheet-content">
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;
