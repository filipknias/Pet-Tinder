import React from 'react';
import "./roundedButton.scss";
import { Colors } from "../../utilities/types/globalTypes";

interface Props {
  color: Colors;
  style?: React.CSSProperties;
  onClick?: () => void;
  children: React.ReactElement;
}

const RoundedButton: React.FC<Props> = ({ children, color, style, onClick }) => {
  return (
    <button
      type="button" 
      className={`roundedButton roundedButton--icon-${color}`} 
      onClick={onClick || undefined} 
      style={style}
    >
      {children}
    </button>
  )
}

export default RoundedButton;