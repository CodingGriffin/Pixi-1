import {
  Application,
  useApplication,
  extend,
  useSuspenseAssets,
} from "@pixi/react";
import { Container, Graphics, Sprite } from "pixi.js";
import { useCallback, useRef, useState } from "react";
import styles from "./DraggingPage.module.css";

extend({ Container, Graphics, Sprite });

let index = 1;

const BunnySprite = ({...props}) => {
  const isDragging = useRef(false);
  const offset = useRef({x:0, y:0});
  const [position, setPosition] = useState({x:props.x||0, y:props.y||0});
  const [alpha, setAlpha] = useState(1);
  const [zIndex, setZIndex] = useState(index);
  
  const onStart = (e:any) => {
    isDragging.current = true;
    offset.current = {
      x:e.data.global.x - position.x,
      y:e.data.global.y - position.y
    };

    setAlpha(0.5);
    setZIndex(index++);
  }

  const onEnd = () => {
    isDragging.current = false;
    setAlpha(1);
  }

  const onMove = (e:any) => {
    if (isDragging.current) {
      setPosition({
        x:e.data.global.x - offset.current.x,
        y:e.data.global.y - offset.current.y,
      })
    }
  }

  const [bunnyTexture] = useSuspenseAssets([
    "https://pixijs.com/assets/bunny.png",
  ]);
  // bunnyTexture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

  return (
    <pixiSprite
      texture={bunnyTexture}
      eventMode={"static"}
      cursor={"pointer"}
      anchor={0.5}
      scale={3}
      position={position}
      zIndex={zIndex}
      interactive={true}
      onPointerDown={onStart}
      onPointerUp={onEnd}
      onPointerUpOutside={onEnd}
      onPointerMove={onMove}
      alpha={alpha}
      {...props}
    />
  );
};

function ChildComponent() {
  const { app } = useApplication();
  const bunnies: Array<any> = [];
  
  for (let i = 0; i < 10; i++) {
    bunnies.push(
      <BunnySprite
        key={`bunny-${i}`}
        x={Math.floor(Math.random() * app.screen.width)}
        y={Math.floor(Math.random() * app.screen.height)}
      />
    );
  }

  return <pixiContainer>
    {bunnies}
  </pixiContainer>
}

function PixiApplication({ ...props }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const handleInit = useCallback(() => setIsInitialized(true), []);

  return (
    <Application onInit={handleInit} {...props}>
      {isInitialized && <ChildComponent />}
    </Application>
  );
}

function DraggingPage() {
  const parentRef = useRef(null);
  return (
    <div className={styles["full-height"]}>
      <div className={styles["main-title"]}>
        <h1>7 - Event Dragging</h1>
      </div>
      <div className={styles["main-stage"]}>
        <div className={styles["stage-container"]} ref={parentRef}>
          <PixiApplication background={"#1099bb"} width={800} height={600} resizeTo={parentRef} />
        </div>
      </div>
    </div>
  );
}

export default DraggingPage;
