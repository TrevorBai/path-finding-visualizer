import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface LegendProps {
  legendClassName?: string;
  iconClassName?: string;
  fontIcon: boolean;
  fontIconName?: string;
  label: string;
  textOnHover?: string;
}

const Legend: FC<LegendProps> = ({
  fontIcon,
  legendClassName,
  iconClassName,
  label,
  textOnHover,
  fontIconName,
}) => {
  return (
    <div className={legendClassName}>
      {fontIcon ? (
        <FontAwesomeIcon icon={fontIconName as IconProp} size="lg" />
      ) : (
        <div className={iconClassName}></div>
      )}
      <label>{label}</label>
      <p>{textOnHover}</p>
      {textOnHover && <div className="triangle-down"></div>}
    </div>
  );
};

export default Legend;
