import React from 'react';
import "./tooltip.scss";

interface Props {
  children: React.ReactElement;
  text: string;
}

const Tooltip: React.FC<Props> = ({ children, text }) => {
  return (
    <div className="tooltip" data-tooltip={text}>
      {children}
    </div>
  )
}

export default Tooltip
