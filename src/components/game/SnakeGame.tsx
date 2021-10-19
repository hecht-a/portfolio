import React, { ComponentProps, useCallback, useEffect, useState } from "react";

import { Buttons } from "../Buttons";
import { Drag } from "../Drag";
import { Food } from "./Food";
import { Snake } from "./Snake";

const getRandomCoordinates = () => {
  let min = 1;
  let max = 96;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

export function SnakeGame({ id, closeWindow, changeHeader }: ComponentProps<any>) {
  const handle = useCallback((e) => {
    closeWindow(Number(e.target.id));
    changeHeader("finder");
    clearTimeout();
  }, []);

  const [, setReset] = useState(true);

  const [gameOverEffect, setGameOverEffect] = useState(false);

  const [food, setFood] = useState(getRandomCoordinates);
  const [speed, setSpeed] = useState(100);
  const [direction, setDirection] = useState<string | null>("RIGHT");
  const [snakeDots, setSnakeDots] = useState([
    [0, 0],
    [2, 0],
  ]);
  const [pause, setPause] = useState(true);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (pause) {
      return;
    }
    checkIfOutOfBorders();
    checkIfCollapsed();
    setTimeout(() => moveSnake(snakeDots, checkIfEat()), speed);
  }, [snakeDots, pause]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "ArrowUp":
          !["DOWN", "UP"].includes(direction!) && setDirection("UP");
          break;
        case "ArrowDown":
          !["DOWN", "UP"].includes(direction!) && setDirection("DOWN");
          break;
        case "ArrowLeft":
          !["LEFT", "RIGHT"].includes(direction!) && setDirection("LEFT");
          break;
        case "ArrowRight":
          !["LEFT", "RIGHT"].includes(direction!) && setDirection("RIGHT");
          break;

        default:
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [direction, setDirection]);

  const moveSnake = useCallback(
    (snakeDots, eaten) => {
      let dots = [...snakeDots];
      let head = dots[dots.length - 1];

      switch (direction) {
        case "RIGHT":
          head = [head[0] + 2, head[1]];
          break;
        case "LEFT":
          head = [head[0] - 2, head[1]];
          break;
        case "DOWN":
          head = [head[0], head[1] + 2];
          break;
        case "UP":
          head = [head[0], head[1] - 2];
          break;

        default:
          break;
      }
      if (direction) {
        dots.push(head);

        if (eaten) {
          setFood(getRandomCoordinates());
          setPoints((prev) => prev + 1);
        } else {
          dots.shift();
        }

        setSnakeDots([...dots]);
      }
    },
    [direction],
  );

  const checkIfOutOfBorders = () => {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 98 || head[1] >= 98 || head[0] < 0 || head[1] < 0) {
      onGameOver();
    }
  };

  const checkIfCollapsed = () => {
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        onGameOver();
      }
    });
  };

  const checkIfEat = () => {
    let head = snakeDots[snakeDots.length - 1];
    return head[0] === food[0] && head[1] === food[1];
  };

  const onGameOver = () => {
    handleGameOverEffect();
    setSnakeDots([
      [0, 0],
      [2, 0],
    ]);
    setDirection(null);
    setReset(false);
  };

  const handleGameOverEffect = () => {
    setGameOverEffect(true);

    setTimeout(() => {
      setGameOverEffect(false);
    }, 1000);
  };

  return (
    <>
      <Drag class="snake" handle=".header__snake" bounds="parent">
        <div className="header__snake">
          <Buttons windowId={id} handle={handle} />
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div className="content__snake" onClick={changeHeader}>
          <div className="controls">
            <p>Points: {points}</p>
            <p>Vitesse: {250 - speed}</p>
            <input
              type="range"
              min="50"
              max="200"
              step="10"
              value={speed}
              className="slider"
              onChange={(e) => setSpeed(Number(e.target.value))}
            />

            <button onClick={() => setPause((p) => !p)}>
              {pause ? "Play" : "Pause"}
            </button>
          </div>
          <div className="game-area">
            <div className={`${gameOverEffect && "game-over"}`} />
            <Snake snakeDots={snakeDots} />
            <Food dot={food} />
          </div>
        </div>
      </Drag>
    </>
  );
}
