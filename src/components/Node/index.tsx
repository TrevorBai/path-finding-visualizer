import React, { FC } from 'react';

export interface NodeProps {
  row?: number;
  col?: number;
  isFinish: boolean;
  isStart: boolean;
  isVisited: boolean;
  isWall?: boolean;
  onMouseDown?: (row: number, col: number) => void;
  onMouseEnter?: (row: number, col: number) => void;
  onMouseUp?: () => void;
}

const Node: FC<NodeProps> = ({
  row,
  col,
  isFinish,
  isStart,
  isVisited,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) => {
  const extraClassName = isFinish
    ? 'node-finish'
    : isStart
    ? 'node-start'
    : isVisited
    ? 'node-visited'
    : isWall
    ? 'node-wall'
    : '';

  // console.log('extraClassName :>> ', extraClassName);
  return <div 
    id={`node-${row}-${col}`}
    className={`node ${extraClassName}`}
    // onMouseDown={() => onMouseDown(row, col)}
    // onMouseEnter={() => onMouseEnter(row, col)}
    // onMouseUp={() => onMouseUp()}
  />
  ;
};

export default Node;
