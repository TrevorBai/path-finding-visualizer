import React, { FC, ChangeEvent } from 'react';

interface HeaderProps {
  visualizeDijkstra: () => void;
  clearWall: () => void;
  clearMap: () => void;
  sliderChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Header: FC<HeaderProps> = ({
  visualizeDijkstra,
  clearWall,
  clearMap,
  sliderChange,
}) => {
  return (
    <div className="header">
      <h1>Path Finder Visualizer</h1>
      <button onClick={visualizeDijkstra}>
        Visualize Dijkstra's Algorithm
      </button>
      <button onClick={clearMap}>Clear Map</button>
      <button onClick={clearWall}>Clear Wall</button>
      <div className="animation-speed">
        <label>Animation Speed</label>
        <input type="range" onChange={sliderChange} min="0" max="5" defaultValue="4" />
      </div>
    </div>
  );
};

export default Header;
