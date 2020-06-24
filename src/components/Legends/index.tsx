import React from 'react';
import Legend, { LegendProps } from './Legend';

const Legends = () => {
  const legendsArr: LegendProps[] = [
    {
      legendClassName: 'draggable-icon',
      fontIcon: true,
      fontIconName: 'paper-plane',
      label: 'Draggable Start Node',
      textOnHover: 'Click and drag me in the grid',
    },
    {
      legendClassName: 'draggable-icon draggable-icon-finish-node',
      fontIcon: true,
      fontIconName: 'flag-checkered',
      label: 'Draggable Finish Node',
      textOnHover: 'Click and drag me in the grid',
    },
    {
      fontIcon: false,
      label: 'Unvisited Node',
      iconClassName: 'unvisited-node',
    },
    {
      fontIcon: false,
      label: 'Node being visited',
      iconClassName: 'being-visited-node',
    },
    {
      fontIcon: false,
      label: 'Visited Node',
      iconClassName: 'visited-node',
    },
    {
      fontIcon: false,
      label: 'Shortest Path Node',
      iconClassName: 'shortest-path-node',
    },
    {
      legendClassName: 'draggable-icon draggable-icon-wall-node',
      iconClassName: 'wall-node',
      fontIcon: false,
      label: 'Wall Node',
      textOnHover:
        'Clicking and draging on unvisited nodes creates walls which no path will penetrate through',
    },
  ];

  return (
    <div className="legends">
      {legendsArr.map((legend) => (
        <Legend
          key={legend.label}
          legendClassName={legend.legendClassName}
          fontIcon={legend.fontIcon}
          fontIconName={legend.fontIconName}
          label={legend.label}
          textOnHover={legend.textOnHover}
          iconClassName={legend.iconClassName}
        />
      ))}
    </div>
  );
};

export default Legends;
