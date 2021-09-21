import React from 'react';
import "./roundedButton.scss";
import { Colors } from "../../types/global";

interface Props {
  color: Colors;
  style?: React.CSSProperties;
  onClick?: () => void;
  badge?: string;
  children: React.ReactElement;
}

const RoundedButton: React.FC<Props> = ({ children, color, style, badge, onClick }) => {
  return (
    <button
      type="button" 
      className={`roundedButton roundedButton--icon-${color} ${badge ? "roundedButton--badge" : ""}`} 
      onClick={onClick || undefined} 
      style={style}
      data-badge={badge ? badge : undefined}
    >
      {children}
    </button>
  )
}

export default RoundedButton;