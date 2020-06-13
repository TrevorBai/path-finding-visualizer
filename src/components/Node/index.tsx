import React, { FC } from 'react';

export interface NodeProps {
  row: number;
  col: number;
  isWall: boolean;
  clearWall: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

const Node: FC<NodeProps> = ({
  row,
  col,
  isWall,
  clearWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) => {
  let extraClassName = '';
  if (isWall) extraClassName = extraClassName.concat('node-wall');
  if (clearWall) extraClassName = '';

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    />
  );
};

export default Node;
