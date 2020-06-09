import { NodeAlgo } from '../PathFindingVisualizer';

const getAllNodes = (grid: NodeAlgo[][]): NodeAlgo[] => {
  const nodes: NodeAlgo[] = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

const dijkstra = (
  grid: NodeAlgo[][],
  startNode: NodeAlgo,
  finishNode: NodeAlgo
) => {
  // Set S
  const visitedNodesInOrder: NodeAlgo[] = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  // console.log('unvisitedNodes', unvisitedNodes);
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // consider wall

    // If the closet node is at a distance of infinity,
    // we must be trapped and therefore should stop the loop.
    if (!closestNode || closestNode.distance === Infinity) return visitedNodesInOrder;
    
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
};

const sortNodesByDistance = (unvisitedNodes: NodeAlgo[]): void => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const updateUnvisitedNeighbors = (node: NodeAlgo, grid: NodeAlgo[][]): void => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  // Relax all unvisitedNeighbors
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    // CAN NOT mark as visited,
    // neighbor.isVisited = true;
    neighbor.previousNode = node;
  }
};

const getUnvisitedNeighbors = (node: NodeAlgo, grid: NodeAlgo[][]): NodeAlgo[] => {
  const neighbors: NodeAlgo[] = [];
  const { row, col } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => neighbor.isVisited === false);
};

export { dijkstra };
