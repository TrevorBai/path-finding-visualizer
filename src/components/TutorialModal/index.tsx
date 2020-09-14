import React, { FC, useState } from 'react';
import pathFindingImg from '../../assets/pathFinding.jpg';
import pathBetweenTwoPoints from '../../assets/pathBetweenTwoPoints.jpg';

const TutorialModal: FC = () => {
  const [showTutorialModal, setshowTutorialModal] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);

  const clicked = () => {
    setshowTutorialModal(false);
  };

  const prevPage = () => {
    if (pageNumber > 0) setPageNumber(pageNumber - 1);
  };

  const nextPage = () => {
    if (pageNumber < 1) setPageNumber(pageNumber + 1);
    if (pageNumber >= 1) setshowTutorialModal(false);
  };

  console.log('pageNumber :>> ', pageNumber);

  const tutorialContent =
    pageNumber === 0 ? (
      <div className="tutorial">
        <div className="close-icon" onClick={clicked}>
          x
        </div>
        <h1>Welcome to Path Finder Visualizer</h1>
        <p>
          This tutorial will walk you through basics of this application. If you
          are comfortable of playing with it by yourself, go ahead and cross out
          this dialog on the right top corner. Otherwise, click next on the
          right bottom corner.
        </p>
        <img src={pathFindingImg} alt="path finding" />
        <div className="button-row">
          <button onClick={prevPage}>Previous</button>
          <button onClick={nextPage}>Next</button>
        </div>
      </div>
    ) : (
      <div className="tutorial">
        <div className="close-icon" onClick={clicked}>
          x
        </div>
        <h1>What is a path finding algorithm?</h1>
        <p>
          A path finding algorithm is aiming to find the shortest path between
          two points. This application visualize one of many path finding
          algorithms called Dijkstra's algorithm in action.
        </p>
        <br />
        <p>
          If you click and drag on the grids, you are literally creating walls, the algorithm
          does not alow the path to penetrate through any walls.
        </p>
        <img src={pathBetweenTwoPoints} alt="path between two points" />
        <div className="button-row">
          <button onClick={prevPage}>Previous</button>
          <button onClick={nextPage}>{pageNumber === 0 ? 'Next' : 'Have fun'}</button>
        </div>
      </div>
    );

  return <>{showTutorialModal && tutorialContent}</>;
};

export default TutorialModal;
