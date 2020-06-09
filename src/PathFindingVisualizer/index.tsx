import React, { useState, useEffect } from 'react';
import Node from '../components/Node';
import { dijkstra } from '../algorithms/dijkstra';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export class NodeAlgo {
  isStart: boolean;
  isFinish: boolean;
  distance: number;
  isVisited: boolean;
  isVisitedClass?: boolean;
  isWall: false;
  previousNode: NodeAlgo | null;

  constructor(public row: number, public col: number) {
    this.isStart = row === START_NODE_ROW && col === START_NODE_COL;
    this.isFinish = row === FINISH_NODE_ROW && col === FINISH_NODE_COL;
    this.distance = Infinity;
    this.isVisited = false;
    this.isVisitedClass = false;
    this.isWall = false;
    this.previousNode = null;
  }
}

const PathFindingVisualizer = () => {
  const [grid, setGrid] = useState<NodeAlgo[][]>([]);

  useEffect(() => {
    const grid = getInitialGrid();
    setGrid(grid);
  }, []);

  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    // console.log('visitedNodesInOrder :>> ', visitedNodesInOrder);

    if (visitedNodesInOrder) {
      for (let i = 0; i < visitedNodesInOrder.length; i++) {
        setTimeout(() => {
          const node = visitedNodesInOrder[i];
          const newGrid = grid.slice();
          const newNode = {
            ...node,
            isVisitedClass: true,
          };
          newGrid[node.row][node.col] = newNode;
          setGrid(newGrid);
        }, 20 * i);
      }
    }
  };

  console.log('rerender');
  return (
    <>
      <button onClick={visualizeDijkstra}>
        Visualize Dijkstra's Algorithm
      </button>
      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { isStart, isFinish, isVisitedClass } = node;
              return (
                <Node
                  key={nodeIdx}
                  isStart={isStart}
                  isFinish={isFinish}
                  isVisited={isVisitedClass as boolean}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

const getInitialGrid = (): NodeAlgo[][] => {
  const grid: NodeAlgo[][] = [];
  for (let row = 0; row < 20; row++) {
    const currentRow: NodeAlgo[] = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(new NodeAlgo(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

export default PathFindingVisualizer;
