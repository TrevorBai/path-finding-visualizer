import React, { useState, useEffect, ChangeEvent } from 'react';
import Node from '../components/Node';
import {
  dijkstra,
  getNodesInShortestPathInOrder,
} from '../algorithms/dijkstra';
import Header from '../components/Header';

import {
  NodeAlgo,
  START_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_ROW,
  FINISH_NODE_COL,
} from '../algorithms/dijkstra';

const PathFindingVisualizer = () => {
  const [grid, setGrid] = useState<NodeAlgo[][]>([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [clearWall, setClearWall] = useState(false);
  let algoDone: boolean = false;
  let animationSpeed: number = 11;

  useEffect(() => {
    const grid = getInitialGrid();
    setGrid(grid);
  }, []);

  const handleMouseDown = (row: number, col: number): void => {
    setClearWall(false);
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

  let visitedNodesInOrder: NodeAlgo[] = [];

  const visualizeDijkstra = () => {
    if (algoDone) return;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

    visitedNodesInOrder = dijkstra(grid, startNode, finishNode) as NodeAlgo[];
    const nodesInShortestPathInOrder = getNodesInShortestPathInOrder(
      finishNode
    );

    if (visitedNodesInOrder) {
      for (let i = 1; i < visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length - 1) {
          setTimeout(() => {
            animateShortestPath(nodesInShortestPathInOrder);
          }, 10 * (i + 2) * animationSpeed);
          algoDone = true;
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
        }, (10 * i) * animationSpeed);
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
      }, 50 * i * animationSpeed);
    }
  };

  const clearWallHandler = () => {
    setClearWall(true);
    const grid = getInitialGrid();
    setGrid(grid);
  };

  const clearMapHandler = () => {
    for (let i = 1; i < visitedNodesInOrder.length - 1; i++) {
      const node = visitedNodesInOrder[i];
      const visitedNode = document.getElementById(
        `node-${node.row}-${node.col}`
      );
      if (visitedNode) {
        visitedNode.className = 'node';
      }
    }
    algoDone = false;
  };

  const sliderChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let speedScale = Number(e.target.value);
    console.log(e.target.value);
    animationSpeed = 51 - 10 * speedScale;
  };
  
  console.log('rerender');
  return (
    <div className="container">
      <Header
        visualizeDijkstra={visualizeDijkstra}
        clearWall={clearWallHandler}
        clearMap={clearMapHandler}
        sliderChange={sliderChangeHandler}
      />
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
                  clearWall={clearWall}
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
