import React, { useState } from 'react';

const ToggleDetail = ({ detail }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="toggle-detail">
      <div className="toggle-header" onClick={toggle}>
        {detail.title}
      </div>
      {isOpen && (
        <div className="toggle-content">
          {detail.content}
        </div>
      )}
    </div>
  );
};

export default ToggleDetail;