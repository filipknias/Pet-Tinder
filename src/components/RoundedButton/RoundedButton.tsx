import React from 'react';
import "./roundedButton.scss";
import { Colors } from "../../utilities/types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  icon: any;
  width?: number;
  height?: number;
  color: Colors;
  size?: number | string;
  onClick?: () => void;
}

const RoundedButton: React.FC<Props> = ({ 
  icon, 
  width, 
  height, 
  color,
  size,
  onClick
}) => {
  return (
    <div 
      className={`roundedButton icon-${color}`} 
      style={{ width, height, fontSize: size }} 
      onClick={onClick || undefined}
    >
      <FontAwesomeIcon icon={icon} />
    </div>
  )
}

export default RoundedButton;