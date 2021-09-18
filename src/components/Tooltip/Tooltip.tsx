import React from 'react';
import "./tooltip.scss";
import { Placement } from "../../types/global";

interface Props {
  children: React.ReactElement;
  text: string;
  placement?: Placement;
}

const Tooltip: React.FC<Props> = ({ children, text, placement }) => {
  return (
    <div className={`tooltip tooltip--placement-${placement}`} data-tooltip={text}>
      {children}
    </div>
  )
}

export default Tooltip
