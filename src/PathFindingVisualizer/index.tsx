import React, { useState, useEffect } from 'react';
import Node from '../components/Node';
import {
  dijkstra,
  getNodesInShortestPathInOrder,
} from '../algorithms/dijkstra';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export class NodeAlgo {
  isStart: boolean;
  isFinish: boolean;
  distance: number;
  isVisited: boolean;
  isWall: boolean;
  previousNode: NodeAlgo | null;

  constructor(public row: number, public col: number) {
    this.isStart = row === START_NODE_ROW && col === START_NODE_COL;
    this.isFinish = row === FINISH_NODE_ROW && col === FINISH_NODE_COL;
    this.distance = Infinity;
    this.isVisited = false;
    this.isWall = false;
    this.previousNode = null;
  }
}

const PathFindingVisualizer = () => {
  const [grid, setGrid] = useState<NodeAlgo[][]>([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  

  useEffect(() => {
    const grid = getInitialGrid();
    setGrid(grid);
  }, []);

  const handleMouseDown = (row: number, col: number): void => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row: number, col: number): void => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = (): void => {
    setMouseIsPressed(false);
  };

  let algoDone: boolean = false;
  
  const visualizeDijkstra = () => {
    console.log('algoDone before', algoDone);
    if (algoDone) return;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathInOrder = getNodesInShortestPathInOrder(
      finishNode
    );

    if (visitedNodesInOrder) {
      for (let i = 1; i < visitedNodesInOrder.length - 1; i++) {
        if (i === visitedNodesInOrder.length - 2) {
          setTimeout(() => {
            animateShortestPath(nodesInShortestPathInOrder);
          }, 10 * (i + 2));
          algoDone = true;
          console.log('algoDone', algoDone);
          return;
        }
        const node = visitedNodesInOrder[i];
        const visitedNode = document.getElementById(
          `node-${node.row}-${node.col}`
        );

        setTimeout(() => {
          if (visitedNode) {
            visitedNode.className = 'node node-visited';
          }
        }, 10 * i);
      }
    }
    
  };

  const animateShortestPath = (nodesInShortestPathInOrder: NodeAlgo[]) => {
    
    for (let i = 1; i < nodesInShortestPathInOrder.length - 1; i++) {
      const node = nodesInShortestPathInOrder[i];
      const visitedNode = document.getElementById(
        `node-${node.row}-${node.col}`
      );

      setTimeout(() => {
        if (visitedNode) {
          visitedNode.className = 'node node-shortest-path';
        }
      }, 50 * i);
    }
    
  };
  // console.log('algoDone :>> ', algoDone);
  return (
    <div className="header">
      <button onClick={visualizeDijkstra}>
        Visualize Dijkstra's Algorithm
      </button>
      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { row, col, isStart, isFinish, isWall } = node;
              return (
                <Node
                  row={row}
                  col={col}
                  isWall={isWall}
                  key={nodeIdx}
                  isStart={isStart}
                  isFinish={isFinish}
                  onMouseEnter={() => handleMouseEnter(row, col)}
                  onMouseDown={() => handleMouseDown(row, col)}
                  onMouseUp={() => handleMouseUp()}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
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

const getNewGridWithWallToggled = (
  grid: NodeAlgo[][],
  row: number,
  col: number
): NodeAlgo[][] => {
  const newGrid: NodeAlgo[][] = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default PathFindingVisualizer;
