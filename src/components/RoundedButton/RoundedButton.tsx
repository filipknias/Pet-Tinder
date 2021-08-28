import React from 'react';
import "./roundedButton.scss";
import { Colors } from "../../utilities/types";

interface Props {
  color: Colors;
  iconFontSize?: number | string;
  padding?: number | string;
  onClick?: () => void;
  children: React.ReactElement;
}

const RoundedButton: React.FC<Props> = ({ children, color, iconFontSize, onClick, padding }) => {
  return (
    <div 
      className={`roundedButton roundedButton--icon-${color}`} 
      onClick={onClick || undefined} 
      style={{ fontSize: iconFontSize, padding }}
    >
      {children}
    </div>
  )
}

export default RoundedButton;