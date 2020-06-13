import React, { useState, useEffect, ChangeEvent, useCallback } from 'react';
import Node from '../components/Node';
import {
  dijkstra,
  getNodesInShortestPathInOrder,
} from '../algorithms/dijkstra';
import Header from '../components/Header';
import Draggable, {
  DraggableData,
  DraggableEventHandler,
} from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NodeAlgo } from '../algorithms/dijkstra';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export interface NodePos {
  row: number;
  col: number;
}

const PathFindingVisualizer = () => {
  const [grid, setGrid] = useState<NodeAlgo[][]>([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [clearWall, setClearWall] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(11);
  const [deltaPositionStart, setDeltaPositionStart] = useState({ x: 0, y: 0 });
  const [deltaPositionFinish, setDeltaPositionFinish] = useState({
    x: 0,
    y: 0,
  });
  const [startNode, setStartNode] = useState<NodePos>({
    row: START_NODE_ROW,
    col: START_NODE_COL,
  });
  const [finishNode, setFinishNode] = useState<NodePos>({
    row: FINISH_NODE_ROW,
    col: FINISH_NODE_COL,
  });

  let algoDone: boolean = false;

  const getInitialGrid = useCallback((): NodeAlgo[][] => {
    const grid: NodeAlgo[][] = [];
    for (let row = 0; row < 20; row++) {
      const currentRow: NodeAlgo[] = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(new NodeAlgo(row, col, startNode, finishNode));
      }
      grid.push(currentRow);
    }
    return grid;
  }, [startNode, finishNode]);

  useEffect(() => {
    const grid = getInitialGrid();
    setGrid(grid);
  }, [getInitialGrid, startNode, finishNode]);

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
    const startNodeAlgo = grid[startNode.row][startNode.col];
    const finishNodeAlgo = grid[finishNode.row][finishNode.col];

    visitedNodesInOrder = dijkstra(
      grid,
      startNodeAlgo,
      finishNodeAlgo
    ) as NodeAlgo[];
    const nodesInShortestPathInOrder = getNodesInShortestPathInOrder(
      finishNodeAlgo
    );

    if (visitedNodesInOrder) {
      for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
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
        }, 10 * i * animationSpeed);
      }
    }
  };

  const animateShortestPath = (nodesInShortestPathInOrder: NodeAlgo[]) => {
    for (let i = 0; i < nodesInShortestPathInOrder.length; i++) {
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
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
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
    setAnimationSpeed(51 - 10 * speedScale);
  };

  const handleStopStartNode = () => {
    setStartNode({
      row: START_NODE_ROW + deltaPositionStart.y / 24,
      col: START_NODE_COL + deltaPositionStart.x / 24,
    });
  };

  const handleStopFinishNode = () => {
    setFinishNode({
      row: FINISH_NODE_ROW + deltaPositionFinish.y / 24,
      col: FINISH_NODE_COL + deltaPositionFinish.x / 24,
    });
  };

  const handleDragStartNode = (e: Event, ui: DraggableData) => {
    setDeltaPositionStart({
      x: deltaPositionStart.x + ui.deltaX,
      y: deltaPositionStart.y + ui.deltaY,
    });
  };

  const handleDragFinishNode = (e: Event, ui: DraggableData) => {
    setDeltaPositionFinish({
      x: deltaPositionFinish.x + ui.deltaX,
      y: deltaPositionFinish.y + ui.deltaY,
    });
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
              return isStart ? (
                <Draggable
                  grid={[24, 24]}
                  key={nodeIdx}
                  onStop={handleStopStartNode}
                  onDrag={handleDragStartNode as DraggableEventHandler}
                >
                  <div id={`node-${row}-${col}`} className="node">
                    <FontAwesomeIcon
                      icon="paper-plane"
                      size="lg"
                      className="node-start"
                    />
                  </div>
                </Draggable>
              ) : isFinish ? (
                <Draggable
                  grid={[24, 24]}
                  key={nodeIdx}
                  onStop={handleStopFinishNode}
                  onDrag={handleDragFinishNode as DraggableEventHandler}
                >
                  <div id={`node-${row}-${col}`} className="node">
                    <FontAwesomeIcon
                      icon="flag-checkered"
                      size="lg"
                      className="node-finish"
                    />
                  </div>
                </Draggable>
              ) : (
                <Node
                  row={row}
                  col={col}
                  isWall={isWall}
                  key={nodeIdx}
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
