import {
  Application,
  useApplication,
  extend,
  useSuspenseAssets,
} from "@pixi/react";
import { Container, Graphics, Sprite, SCALE_MODES } from "pixi.js";
import { useCallback, useRef, useState } from "react";
import styles from "./DraggingPage.module.css";

extend({ Container, Graphics, Sprite });

interface Position {
  x: number;
  y: number;
}

interface BunnyProps {
  x?: number;
  y?: number;
}

const BunnySprite = ({ x = 0, y = 0 }: BunnyProps) => {
  const isDragging = useRef(false);
  const offset = useRef<Position>({ x: 0, y: 0 });
  const [position, setPosition] = useState<Position>({ x, y });
  const [alpha, setAlpha] = useState(1);
  
  const [bunnyTexture] = useSuspenseAssets([
    "https://pixijs.com/assets/bunny.png",
  ]);
  bunnyTexture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
  
  const onStart = (e: any) => {
    isDragging.current = true;
    offset.current = {
      x: e.data.global.x - position.x,
      y: e.data.global.y - position.y
    };
    setAlpha(0.5);
    
    window.addEventListener('mousemove', onGlobalMove);
    window.addEventListener('mouseup', onGlobalEnd);
  };

  const onGlobalEnd = () => {
    if (isDragging.current) {
      isDragging.current = false;
      setAlpha(1);
      window.removeEventListener('mousemove', onGlobalMove);
      window.removeEventListener('mouseup', onGlobalEnd);
    }
  };

  const onGlobalMove = (e: MouseEvent) => {
    if (isDragging.current) {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        setPosition({
          x: ((e.clientX - rect.left) * scaleX) - offset.current.x,
          y: ((e.clientY - rect.top) * scaleY) - offset.current.y,
        });
      }
    }
  };

  return (
    <pixiSprite
      texture={bunnyTexture}
      eventMode="static"
      cursor="pointer"
      anchor={0.5}
      scale={3}
      position={position}
      interactive={true}
      onPointerDown={onStart}
      alpha={alpha}
    />
  );
};

function ChildComponent() {
  const { app } = useApplication();
  const bunnies = Array.from({ length: 10 }, (_, i) => (
    <BunnySprite
      key={`bunny-${i}`}
      x={Math.floor(Math.random() * app.screen.width)}
      y={Math.floor(Math.random() * app.screen.height)}
    />
  ));

  return <pixiContainer>{bunnies}</pixiContainer>;
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
          <PixiApplication background="#1099bb" width={800} height={600} resizeTo={parentRef} />
        </div>
      </div>
    </div>
  );
}

export default DraggingPage;
