import React, { FC } from 'react';

interface HeaderProps {
  visualizeDijkstra: () => void;
  clearWall: () => void;
  clearMap: () => void;
}

const Header: FC<HeaderProps> = ({
  visualizeDijkstra,
  clearWall,
  clearMap,
}) => {
  return (
    <div className="header">
      <button onClick={visualizeDijkstra}>
        Visualize Dijkstra's Algorithm
      </button>
      <button onClick={clearMap}>Clear Map</button>
      <button onClick={clearWall}>Clear Wall</button>
    </div>
  );
};

export default Header;
